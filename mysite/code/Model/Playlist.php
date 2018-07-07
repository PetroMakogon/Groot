<?php

namespace Model;

use SilverStripe\ORM\DataObject;

class Playlist extends DataObject
{
    private static $table_name = 'Playlist';

    private static $db = [
        'Title' => 'Varchar(255)',
        'Description' => 'Varchar(255)'
    ];

    private static $many_many = [
        'Songs' => Song::class
    ];
}