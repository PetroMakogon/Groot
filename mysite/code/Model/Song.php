<?php


namespace Model;

use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Assets\File;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\NumericField;
use SilverStripe\Forms\TabSet;
use SilverStripe\Forms\TextField;
use SilverStripe\ORM\DataObject;

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

    private static $owns = ['StreamFile'];

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
            $uploader
        ]);

        return $fields;
    }
}