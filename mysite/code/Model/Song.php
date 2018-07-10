<?php


namespace Model;

use getID3;
use getid3_lib;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Assets\File;
use SilverStripe\Forms\CheckboxField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\NumericField;
use SilverStripe\Forms\TabSet;
use SilverStripe\Forms\TextField;
use SilverStripe\ORM\DataObject;

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
class Song extends DataObject
{
    private static $table_name = 'Song';

    private static $db = [
        'Title'  => 'Varchar(255)',
        'Length' => 'Decimal',
        'Artist' => 'Varchar(255)',
        'Album'  => 'Varchar(255)',
        'Disc'   => 'Int',
        'Track'  => 'Int'
    ];

    private static $has_one = [
        'StreamFile' => File::class
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
        $uploader->setFolderName('Songs');
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

        $fullPath = BASE_PATH . $this->StreamFile->getSourceURL();
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

        if (!$this->StreamFile->isPublished()) {
            $this->StreamFile->publishFile();
        }

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
}