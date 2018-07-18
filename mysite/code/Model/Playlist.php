<?php

namespace Model;

use SilverStripe\GraphQL\Scaffolding\Interfaces\ScaffoldingProvider;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\ListQueryScaffolder;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\SchemaScaffolder;
use SilverStripe\ORM\DataObject;

class Playlist extends DataObject implements ScaffoldingProvider
{
    private static $table_name = 'Playlist';

    private static $db = [
        'Title'       => 'Varchar(255)',
        'Description' => 'Varchar(255)'
    ];

    private static $many_many = [
        'Songs' => Song::class
    ];

    /**
     * @param SchemaScaffolder $schema
     * @return SchemaScaffolder
     * @throws \InvalidArgumentException
     */
    public function provideGraphQLScaffolding(SchemaScaffolder $schema): SchemaScaffolder
    {
        $playlist = $schema->type(Playlist::class);

        /* @var $readPlaylists ListQueryScaffolder */
        $readPlaylists = $playlist
            ->addAllFields(true)
            ->operation(SchemaScaffolder::READ);
        $readPlaylists->addSortableFields(['Title']);
        $readPlaylists->setUsePagination(false);

        /* @var $readSongs ListQueryScaffolder */
        $readSongs = $playlist->nestedQuery('Songs');
        $readSongs->setUsePagination(false);

        return $schema;
    }
}