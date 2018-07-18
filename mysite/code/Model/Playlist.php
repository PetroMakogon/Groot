<?php

namespace Model;

use GraphQL\Type\Definition\ResolveInfo;
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

    public function validate()
    {
        $result = parent::validate();

        if (!$this->Title) {
            $result->addFieldError('Title', 'Title cannot be empty');
        }

        return $result;
    }

    /**
     * @param SchemaScaffolder $schema
     * @return SchemaScaffolder
     * @throws \InvalidArgumentException
     */
    public function provideGraphQLScaffolding(SchemaScaffolder $schema): SchemaScaffolder
    {
        $playlist = $schema->type(Playlist::class)->addAllFields(true);

        /* @var $readPlaylists ListQueryScaffolder */
        $readPlaylists = $playlist->operation(SchemaScaffolder::READ);
        $readPlaylists->addSortableFields(['Title']);
        $readPlaylists->setUsePagination(false);

        /* @var $readSongs ListQueryScaffolder */
        $readSongs = $playlist->nestedQuery('Songs');
        $readSongs->setUsePagination(false);

        $playlist->operation(SchemaScaffolder::READ_ONE);
        $playlist->operation(SchemaScaffolder::CREATE);
        $playlist->operation(SchemaScaffolder::DELETE);
        $playlist->operation(SchemaScaffolder::UPDATE);

        return $schema;
    }
}