<?php


namespace ModelAdmin;

use Model\Song;
use SilverStripe\Admin\ModelAdmin;

class SongAdmin extends ModelAdmin
{
    private static $menu_title = 'Songs';

    private static $url_segment = 'songs';

    private static $managed_models = [
        Song::class
    ];
}