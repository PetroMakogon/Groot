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
 * @property bool ExtractInfoFromFile
 * @property File StreamFile
 */
class Song extends DataObject
{
    private static $table_name = 'Song';

    private static $db = [
        'Title'               => 'Varchar(255)',
        'Length'              => 'Decimal',
        'Artist'              => 'Varchar(255)',
        'Album'               => 'Varchar(255)',
        'Disc'                => 'Int',
        'Track'               => 'Int',
        'ExtractInfoFromFile' => 'Boolean'
    ];

    private static $has_one = [
        'StreamFile' => File::class
    ];

    private static $owns = ['StreamFile'];

    private static $summary_fields = [
        'Title',
        'Artist',
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
            TextField::create('Title'),
            TextField::create('Artist'),
            TextField::create('Album'),
            NumericField::create('Length')->setScale(2),
            NumericField::create('Disc'),
            NumericField::create('Track'),
            $uploader,
            CheckboxField::create('ExtractInfoFromFile', 'Extract Information from Mp3 File?')
        ]);

        return $fields;
    }

    /**
     * @return array
     */
    public function getID3Info(): array
    {
        $info = [];

        if ($this->StreamFile) {
            $fullPath = BASE_PATH . $this->StreamFile->getSourceURL();
            try {
                $getID3 = new getID3;
                $raw = $getID3->analyze($fullPath);
                getid3_lib::CopyTagsToComments($raw);

                $comments = $raw['comments'];

                $attr = [
                    'title'         => 'Title',
                    'artist'        => 'Artist',
                    'album'         => 'Album',
                    'track_number'  => 'Track',
                    'part_of_a_set' => 'Disc'
                ];

                foreach ($attr as $rawKey => $newKey) {
                    $info[$newKey] = \is_array($comments[$rawKey]) ?
                        reset($comments[$rawKey]) :
                        $comments[$rawKey];
                }
                return $info;
            } catch (\getid3_exception $e) {
            }
        }

        return $info;
    }

    protected function onBeforeWrite()
    {
        parent::onBeforeWrite();

        if ($this->StreamFile && $this->ExtractInfoFromFile) {
            $info = $this->getID3Info();
            foreach ($info as $key => $value) {
                $this->record[$key] = $value;
            }
        }

    }
}