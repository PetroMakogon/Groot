<?php

namespace Model;

use GraphQL\Type\Definition\ResolveInfo;
use SilverStripe\GraphQL\Scaffolding\Interfaces\ResolverInterface;
use SilverStripe\GraphQL\Scaffolding\Interfaces\ScaffoldingProvider;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\ListQueryScaffolder;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\SchemaScaffolder;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\DataObjectInterface;
use SilverStripe\ORM\ManyManyList;
use SilverStripe\ORM\ValidationException;
use SilverStripe\ORM\ValidationResult;
use SilverStripe\Security\Permission;
use SilverStripe\Security\PermissionFailureException;
use SilverStripe\Security\Security;

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

    /**
     * @param SchemaScaffolder $schema
     * @return SchemaScaffolder
     * @throws \SilverStripe\ORM\ValidationException
     * @throws \Exception
     * @throws \InvalidArgumentException
     */
    public function provideGraphQLScaffolding(SchemaScaffolder $schema): SchemaScaffolder
    {
        $this->provideGraphQLScaffoldingCRUD($schema);

        $this->provideGraphQLScaffoldingAddSong($schema);

        $this->provideGraphQLScaffoldingRemoveSong($schema);

        return $schema;
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

        /* @var $readPlaylists ListQueryScaffolder */
        $readPlaylists = $playlist->operation(SchemaScaffolder::READ);
        $readPlaylists->addSortableFields(['Title']);
        $readPlaylists->setUsePagination(false);

        $playlist->operation(SchemaScaffolder::READ_ONE);
        $playlist->operation(SchemaScaffolder::CREATE);
        $playlist->operation(SchemaScaffolder::DELETE);
        $playlist->operation(SchemaScaffolder::UPDATE);
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

                $playlist->Songs()->add($song->data());
                $playlist->write();
                return $playlist;
            }
        });
    }

    /**
     * @param SchemaScaffolder $schema
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

                $playlist->Songs()->removeByID($songID);
                $playlist->write();
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