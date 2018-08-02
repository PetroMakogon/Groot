<?php


namespace Model;

use getID3;
use getid3_lib;
use GraphQL\Type\Definition\ResolveInfo;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Assets\File;
use SilverStripe\Forms\CheckboxField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\NumericField;
use SilverStripe\Forms\TabSet;
use SilverStripe\Forms\TextField;
use SilverStripe\GraphQL\Scaffolding\Interfaces\ResolverInterface;
use SilverStripe\GraphQL\Scaffolding\Interfaces\ScaffoldingProvider;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\ListQueryScaffolder;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\SchemaScaffolder;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\DataObjectInterface;
use SilverStripe\Security\Permission;
use SilverStripe\Security\PermissionFailureException;
use SilverStripe\Security\Security;

/**
 * Class Song
 * @package Model
 *
 *
 * @property string Title
 * @property float Length
 * @property string Artist
 * @property string Album
 * @property int Disc
 * @property int Track
 * @property File StreamFile
 */
class Song extends DataObject implements ScaffoldingProvider
{
    public const FOLDER_NAME = 'Songs';

    private static $table_name = 'Song';

    private static $db = [
        'Title'  => 'Varchar(255)',
        'Length' => 'Decimal',
        'Artist' => 'Varchar(255)',
        'Album'  => 'Varchar(255)',
        'Disc'   => 'Int',
        'Track'  => 'Int'
    ];

    private static $owns = ['StreamFile'];

    private static $has_one = [
        'StreamFile' => File::class
    ];

    private static $belongs_many_many = [
        'InPlaylists' => 'Playlist',
    ];

    private static $summary_fields = [
        'Title',
        'Artist',
        'Album',
        'Length'
    ];

    private static $searchable_fields = [
        'Title',
        'Artist',
        'Album'
    ];

    public function getCMSfields()
    {
        $fields = FieldList::create(TabSet::create('Root'));

        $uploader = UploadField::create('StreamFile', 'The Song File');
        $uploader->setFolderName(self::FOLDER_NAME);
        $uploader->getValidator()->setAllowedExtensions(['mp3']);
        $uploader->getValidator()->setAllowedMaxFileSize('50M');

        $fields->addFieldsToTab('Root.Main', [
            $uploader,
            CheckboxField::create('ExtractInfo', 'Extract Information from Mp3 File?'),
            TextField::create('Title'),
            TextField::create('Artist'),
            TextField::create('Album'),
            NumericField::create('Length')->setScale(2),
            NumericField::create('Disc'),
            NumericField::create('Track')
        ]);

        return $fields;
    }

    /**
     * @return array
     */
    public function getID3Info(): array
    {
        $info = [];

        if (!$this->StreamFile || !$this->StreamFile->exists()) {
            return $info;
        }

        if (!$this->StreamFile->isPublished()) {
            $this->StreamFile->publishFile();
        }

        $fullPath = PUBLIC_PATH . $this->StreamFile->getSourceURL();
        try {
            $getID3 = new getID3;
            $raw = $getID3->analyze($fullPath);
            getid3_lib::CopyTagsToComments($raw);

            $comments = $raw['comments'] ?? [];
            $comments['playtime_seconds'] = $raw['playtime_seconds'] ?? 0;

            $attr = [
                'title'            => 'Title',
                'artist'           => 'Artist',
                'album'            => 'Album',
                'track_number'     => 'Track',
                'part_of_a_set'    => 'Disc',
                'playtime_seconds' => 'Length'
            ];

            foreach ($attr as $rawKey => $newKey) {
                $value = $comments[$rawKey] ?? null;
                if (\is_array($value)) {
                    $value = reset($value);
                }
                if (empty($value)) {
                    continue;
                }

                $info[$newKey] = $value;
            }
        } catch (\getid3_exception $e) {
        }

        return $info;
    }

    public function validate()
    {
        $result = parent::validate();

        if (!empty($this->record['StreamFileID']) && !empty($this->record['ExtractInfo'])) {
            $info = $this->getID3Info();
            foreach ($info as $key => $value) {
                $this->record[$key] = $value;
            }
        }

        if (!$this->StreamFile->exists()) {
            $result->addFieldError('StreamFile', 'File is not uploaded');
        }

        if (!$this->Title) {
            $result->addFieldError('Title', 'Title cannot be empty');
        }

        return $result;
    }

    /**
     * @param SchemaScaffolder $schema
     * @return SchemaScaffolder
     * @throws \RuntimeException
     * @throws \InvalidArgumentException
     */
    public function provideGraphQLScaffolding(SchemaScaffolder $schema): SchemaScaffolder
    {
        $song = $schema->type(Song::class)->addAllFields(true);

        /* @var $readSongs ListQueryScaffolder */
        $readSongs = $song->operation(SchemaScaffolder::READ);
        $readSongs->addArg('keyword', 'String');
        $readSongs->addSortableFields(['Title', 'Artist', 'Album']);
        $readSongs->setUsePagination(false);
        $readSongs->setResolver(new class implements ResolverInterface
        {
            /**
             * @param DataObjectInterface $object
             * @param array $args
             * @param array $context
             * @param ResolveInfo $info
             * @return mixed
             */
            public function resolve($object, $args, $context, $info)
            {
                if (!Permission::check('ADMIN', 'any', Security::getCurrentUser())) {
                    throw new PermissionFailureException('Permission denied');
                }

                $list = Song::get();

                $keyword = $args['keyword'] ?? null;
                if ($keyword) {
                    $list = $list->filterAny([
                        'Title:PartialMatch'  => $keyword,
                        'Artist:PartialMatch' => $keyword,
                        'Album:PartialMatch'  => $keyword,
                    ]);
                }

                return $list;
            }
        });

        $song->operation(SchemaScaffolder::READ_ONE);

        return $schema;
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