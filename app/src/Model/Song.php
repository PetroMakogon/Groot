<?php


namespace Model;

use getID3;
use getid3_lib;
use GraphQL\Type\Definition\ResolveInfo;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Assets\File;
use SilverStripe\Assets\Image;
use SilverStripe\Forms\CheckboxField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\NumericField;
use SilverStripe\Forms\ReadonlyField;
use SilverStripe\Forms\TabSet;
use SilverStripe\Forms\TextareaField;
use SilverStripe\Forms\TextField;
use SilverStripe\GraphQL\OperationResolver;
use SilverStripe\GraphQL\Scaffolding\Interfaces\ScaffoldingProvider;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\ListQueryScaffolder;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\SchemaScaffolder;
use SilverStripe\ORM\DataObject;
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
 * @property File CoverImage
 * @property string StreamFileURL
 */
class Song extends DataObject implements ScaffoldingProvider
{
    public const MP3_FOLDER_NAME = 'Songs';
    public const COVER_FOLDER_NAME = 'Covers';

    private static $table_name = 'Song';

    private static $db = [
        'Title'         => 'Varchar(255)',
        'Length'        => 'Decimal',
        'Artist'        => 'Varchar(255)',
        'Album'         => 'Varchar(255)',
        'Disc'          => 'Int',
        'Track'         => 'Int',
        'TXTLyric'      => 'Text',
        'LRCLyric'      => 'Text',
        'StreamFileURL' => 'Text'
    ];

    private static $owns = ['StreamFile', 'CoverImage'];

    private static $has_one = [
        'StreamFile' => File::class,
        'CoverImage' => Image::class
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

        $mp3Uploader = UploadField::create('StreamFile', 'The Song File');
        $mp3Uploader->setFolderName(self::MP3_FOLDER_NAME);
        $mp3Uploader->getValidator()->setAllowedExtensions(['mp3']);
        $mp3Uploader->getValidator()->setAllowedMaxFileSize('50M');

        $coverUploader = UploadField::create('CoverImage', 'The Cover Image');
        $coverUploader->setFolderName(self::COVER_FOLDER_NAME);

        $fields->addFieldsToTab('Root.Main', [
            $mp3Uploader,
            $coverUploader,
            CheckboxField::create('ExtractInfo', 'Extract Information from Mp3 File?'),
            TextField::create('Title'),
            TextField::create('Artist'),
            TextField::create('Album'),
            NumericField::create('Length')->setScale(2),
            NumericField::create('Disc'),
            NumericField::create('Track'),
            TextareaField::create('TXTLyric'),
            TextareaField::create('LRCLyric'),
            ReadonlyField::create('StreamFileURL'),
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

        if (!$this->StreamFileURL) {
            $this->StreamFileURL = $this->StreamFile->getURL();
        }

        return $result;
    }

    /*
    protected function onAfterWrite()
    {
        if ($this->CoverImage && $this->CoverImage->getWidth() > 100 && $this->CoverImage->getHeight() > 100) {
            $cropped = $this->CoverImage->getImageBackend()->crop(100, 100, 100, 100);
            $result = $cropped->writeTo(PUBLIC_PATH . '/cropped.png');
        }

        parent::onAfterWrite();
    }
    */

    /**
     * @param SchemaScaffolder $schema
     * @return SchemaScaffolder
     * @throws \RuntimeException
     * @throws \InvalidArgumentException
     */
    public function provideGraphQLScaffolding(SchemaScaffolder $schema): SchemaScaffolder
    {
        $song = $schema->type(Song::class)->addAllFields();

        /* @var $readSongs ListQueryScaffolder */
        $readSongs = $song->operation(SchemaScaffolder::READ);
        $readSongs->addArg('keyword', 'String');
        $readSongs->addSortableFields(['Title', 'Artist', 'Album']);
        $readSongs->setUsePagination(false);
        $readSongs->setName('readSongs');

        $readSongs->setResolver(new class implements OperationResolver
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
             * @throws \SilverStripe\Security\PermissionFailureException
             */
            public function resolve($object, array $args, $context, ResolveInfo $info)
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

                $arr = $list->toArray();
                foreach ($arr as $song) {
                    /* @var Song $song */
                    $song->StreamFileURL = $song->StreamFile->getAbsoluteURL();
                }

                return $arr;
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