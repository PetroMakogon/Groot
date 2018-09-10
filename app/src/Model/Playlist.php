<?php

namespace Model;

use GraphQL\Type\Definition\ResolveInfo;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\Forms\GridField\GridFieldConfig_RelationEditor;
use SilverStripe\GraphQL\OperationResolver;
use SilverStripe\GraphQL\Scaffolding\Interfaces\ResolverInterface;
use SilverStripe\GraphQL\Scaffolding\Interfaces\ScaffoldingProvider;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\ListQueryScaffolder;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\SchemaScaffolder;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\DataObjectInterface;
use SilverStripe\ORM\DB;
use SilverStripe\ORM\ManyManyList;
use SilverStripe\ORM\Queries\SQLUpdate;
use SilverStripe\ORM\ValidationException;
use SilverStripe\ORM\ValidationResult;
use SilverStripe\Security\Permission;
use SilverStripe\Security\PermissionFailureException;
use SilverStripe\Security\Security;
use UndefinedOffset\SortableGridField\Forms\GridFieldSortableRows;

/**
 * Class Playlist
 * @package Model
 *
 * @property string $Title
 * @property string $Description
 * @property integer $NumberOfSongs
 * @method ManyManyList Songs()
 */
class Playlist extends DataObject implements ScaffoldingProvider
{
    private static $table_name = 'Playlist';

    private static $db = [
        'Title'         => 'Varchar(255)',
        'Description'   => 'Varchar(255)',
        'NumberOfSongs' => 'Int'
    ];

    private static $many_many = [
        'Songs' => Song::class
    ];

    private static $many_many_extraFields = [
        'Songs' => [
            'SortOrder' => 'Int'
        ]
    ];

    public function validate()
    {
        $result = parent::validate();

        if (!$this->Title) {
            $result->addFieldError('Title', 'Title cannot be empty');
        }

        return $result;
    }

    protected function onBeforeWrite()
    {
        parent::onBeforeWrite();

        $this->NumberOfSongs = $this->Songs()->count();
    }

    public function getCMSFields()
    {
        $fields = parent::getCMSFields();

        $conf = GridFieldConfig_RelationEditor::create(1000);
        $conf->addComponent(new GridFieldSortableRows('SortOrder'));

        $fields->addFieldToTab(
            'Root.Songs',
            $grid = new GridField(
                'Songs',
                'Songs',
                $this->getManyManyComponents('Songs')->sort('SortOrder'),
                $conf));

        return $fields;
    }

    /**
     * @param SchemaScaffolder $schema
     * @return SchemaScaffolder
     * @throws \SilverStripe\Security\PermissionFailureException
     * @throws \SilverStripe\ORM\ValidationException
     * @throws \Exception
     * @throws \InvalidArgumentException
     */
    public function provideGraphQLScaffolding(SchemaScaffolder $schema): SchemaScaffolder
    {
        $this->provideGraphQLScaffoldingCRUD($schema);

        $this->provideGraphQLScaffoldingAddSong($schema);

        $this->provideGraphQLScaffoldingReorderSong($schema);

        $this->provideGraphQLScaffoldingRemoveSong($schema);

        return $schema;
    }

    /**
     * @param Song|int $song
     * @throws \Exception
     */
    public function addSong($song)
    {
        $sortOrder = $this->Songs()->count() + 1;
        $this->Songs()->add($song, ['SortOrder' => $sortOrder]);
        $this->write();
    }

    /**
     * @param Song|int $song
     * @throws ValidationException
     */
    public function removeSong($song)
    {
        if ($song instanceof Song) {
            $songID = $song->ID;
        } else {
            $songID = (int)$song;
        }

        $this->Songs()->removeByID($songID);
        $this->write();
    }

    /**
     * @param int[] $songIDs
     */
    public function updateSongsOrder(array $songIDs)
    {
        $component = $this->getManyManyComponents('Songs');
        $localKey = $component->getLocalKey();
        $foreignKey = $component->getForeignKey();
        DB::get_conn()->transactionStart();
        foreach ($songIDs as $index => $value) {
            $update = SQLUpdate::create($component->getJoinTable());
            $update->addWhere([
                $foreignKey => $this->ID,
                $localKey   => $value
            ]);
            $update->assign('SortOrder', $index + 1);
            $update->execute();
        }
        DB::get_conn()->transactionEnd();
    }

    /**
     * @param SchemaScaffolder $schema
     * @throws \InvalidArgumentException
     */
    private function provideGraphQLScaffoldingCRUD(SchemaScaffolder $schema): void
    {
        $playlist = $schema->type(Playlist::class)->addAllFields();
        /* @var $readSongs ListQueryScaffolder */
        $readSongs = $playlist->nestedQuery('Songs');
        $readSongs->setUsePagination(false);
        $readSongs->setResolver(new class implements OperationResolver
        {
            /**
             * Invoked by the Executor class to resolve this mutation / query
             * @see Executor
             *
             * @param Playlist $object
             * @param array $args
             * @param mixed $context
             * @param ResolveInfo $info
             * @return mixed
             */
            public function resolve($object, array $args, $context, ResolveInfo $info)
            {
                return $object->Songs()->sort('SortOrder');
            }
        });

        /* @var $readPlaylists ListQueryScaffolder */
        $readPlaylists = $playlist->operation(SchemaScaffolder::READ);
        $readPlaylists->setUsePagination(false);
        $readPlaylists->setName('readPlaylists');

        // In silverstripe-graphql v2, there is no default operation name been generated
        $playlist->operation(SchemaScaffolder::READ_ONE)->setName('readOnePlaylist');
        $playlist->operation(SchemaScaffolder::CREATE)->setName('createPlaylist');
        $playlist->operation(SchemaScaffolder::DELETE)->setName('deletePlaylist');
        $playlist->operation(SchemaScaffolder::UPDATE)->setName('updatePlaylist');
    }

    /**
     * @param SchemaScaffolder $schema
     * @throws \Exception
     * @throws \SilverStripe\ORM\ValidationException
     * @throws \InvalidArgumentException
     */
    private function provideGraphQLScaffoldingAddSong(SchemaScaffolder $schema): void
    {
        $addSong = $schema->mutation('addSongToPlaylist', Playlist::class);
        $addSong->addArgs([
            'PlaylistID' => 'Int',
            'SongID'     => 'Int'
        ]);
        $addSong->setResolver(new class implements ResolverInterface
        {
            /**
             * @param DataObjectInterface $object
             * @param array $args
             * @param array $context
             * @param ResolveInfo $info
             * @return mixed
             * @throws \Exception
             */
            public function resolve($object, $args, $context, $info)
            {
                if (!Permission::check('ADMIN', 'any', Security::getCurrentUser())) {
                    throw new PermissionFailureException('Permission denied');
                }

                $validationResult = new ValidationResult();

                $songID = $args['SongID'] ?? null;
                if (!$songID) {
                    $validationResult->addFieldError('SongID', 'Song ID can not be empty');
                    throw new ValidationException($validationResult);
                }

                $playlistID = $args['PlaylistID'] ?? null;
                if (!$playlistID) {
                    $validationResult->addFieldError('PlaylistID', 'Playlist ID can not be empty');
                    throw new ValidationException($validationResult);
                }

                /* @var Song $song */
                $song = Song::get()->byID($songID);
                if (!$song || !$song->exists()) {
                    $validationResult->addFieldError('SongID', 'Song does not exist');
                    throw new ValidationException($validationResult);
                }

                /* @var $playlist Playlist */
                $playlist = Playlist::get()->byID($playlistID);

                if (!$playlist || !$playlist->exists()) {
                    $validationResult->addFieldError('PlaylistID', 'Playlist does not exist');
                    throw new ValidationException($validationResult);
                }

                $playlist->addSong($song);
                return $playlist;
            }
        });
    }

    /**
     * @param SchemaScaffolder $schema
     * @throws \Exception
     * @throws \SilverStripe\ORM\ValidationException
     * @throws \InvalidArgumentException
     */
    private function provideGraphQLScaffoldingReorderSong(SchemaScaffolder $schema): void
    {
        $addSong = $schema->mutation('reorderSongsInPlaylist', Playlist::class);
        $addSong->addArgs([
            'PlaylistID' => 'Int',
            'SongIDs'    => 'String'
        ]);
        $addSong->setResolver(new class implements OperationResolver
        {
            /**
             * Invoked by the Executor class to resolve this mutation / query
             * @see Executor
             *
             * @param mixed $object
             * @param array $args
             * @param mixed $context
             * @param ResolveInfo $info
             * @return mixed
             */
            public function resolve($object, array $args, $context, ResolveInfo $info)
            {
                if (!Permission::check('ADMIN', 'any', Security::getCurrentUser())) {
                    throw new PermissionFailureException('Permission denied');
                }

                $validationResult = new ValidationResult();

                $songIDs = json_decode($args['SongIDs'] ?? '') ?? [];
                if (!$songIDs) {
                    $validationResult->addFieldError('SongIDs', 'Song ID List can not be empty');
                    throw new ValidationException($validationResult);
                }

                $playlistID = $args['PlaylistID'] ?? null;
                if (!$playlistID) {
                    $validationResult->addFieldError('PlaylistID', 'Playlist ID can not be empty');
                    throw new ValidationException($validationResult);
                }

                /* @var $playlist Playlist */
                $playlist = Playlist::get()->byID($playlistID);

                if (!$playlist || !$playlist->exists()) {
                    $validationResult->addFieldError('PlaylistID', 'Playlist does not exist');
                    throw new ValidationException($validationResult);
                }

                $playlist->updateSongsOrder($songIDs);
                return $playlist;
            }
        });
    }

    /**
     * @param SchemaScaffolder $schema
     * @throws \SilverStripe\ORM\ValidationException
     * @throws \SilverStripe\Security\PermissionFailureException
     * @throws \Exception
     * @throws \InvalidArgumentException
     */
    private function provideGraphQLScaffoldingRemoveSong(SchemaScaffolder $schema): void
    {
        $addSong = $schema->mutation('removeSongFromPlaylist', Playlist::class);
        $addSong->addArgs([
            'PlaylistID' => 'Int',
            'SongID'     => 'Int'
        ]);
        $addSong->setResolver(new class implements ResolverInterface
        {
            /**
             * @param DataObjectInterface $object
             * @param array $args
             * @param array $context
             * @param ResolveInfo $info
             * @return mixed
             * @throws \Exception
             */
            public function resolve($object, $args, $context, $info)
            {
                if (!Permission::check('ADMIN', 'any', Security::getCurrentUser())) {
                    throw new PermissionFailureException('Permission denied');
                }

                $validationResult = new ValidationResult();

                $songID = $args['SongID'] ?? null;
                if (!$songID) {
                    $validationResult->addFieldError('SongID', 'Song ID can not be empty');
                    throw new ValidationException($validationResult);
                }

                $playlistID = $args['PlaylistID'] ?? null;
                if (!$playlistID) {
                    $validationResult->addFieldError('PlaylistID', 'Playlist ID can not be empty');
                    throw new ValidationException($validationResult);
                }

                /* @var $playlist Playlist */
                $playlist = Playlist::get()->byID($playlistID);

                if (!$playlist || !$playlist->exists()) {
                    $validationResult->addFieldError('PlaylistID', 'Playlist does not exist');
                    throw new ValidationException($validationResult);
                }

                $playlist->removeSong($songID);
                return $playlist;
            }
        });
    }

    public function canCreate($member = null, $context = array())
    {
        return Permission::check('ADMIN', 'any', Security::getCurrentUser());
    }

    public function canView($member = null)
    {
        return Permission::check('ADMIN', 'any', Security::getCurrentUser());
    }

    public function canDelete($member = null)
    {
        return Permission::check('ADMIN', 'any', Security::getCurrentUser());
    }

    public function canEdit($member = null)
    {
        return Permission::check('ADMIN', 'any', Security::getCurrentUser());
    }
}