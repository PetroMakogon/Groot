<?php


namespace Model;

use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Assets\File;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\NumericField;
use SilverStripe\Forms\TabSet;
use SilverStripe\Forms\TextField;
use SilverStripe\ORM\DataObject;
use SilverStripe\Security\Permission;

class Song extends DataObject
{
    private static $table_name = 'Song';

    private static $db = [
        'Title' => 'Varchar(255)',
        'Length' => 'Decimal',
    ];

    private static $has_one = [
        'StreamFile' => File::class,
    ];

    private static $owns = ['StreamFile'];

    public function getCMSfields()
    {
        $fields = FieldList::create(TabSet::create('Root'));

        $titleField = TextField::create('Title');

        $lengthField = NumericField::create('Length');
        $lengthField->setScale(2);

        $streamFileField = UploadField::create('StreamFile', 'The Song File');
        $streamFileField->setFolderName('Songs');
        $streamFileField->getValidator()->setAllowedExtensions(['mp3']);
        $streamFileField->getValidator()->setAllowedMaxFileSize('50M');
        

        $fields->addFieldsToTab('Root.Main', [
            $titleField,
            $lengthField,
            $streamFileField
        ]);

        return $fields;
    }
}