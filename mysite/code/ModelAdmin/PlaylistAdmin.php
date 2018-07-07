<?php


namespace ModelAdmin;

use Model\Playlist;
use SilverStripe\Admin\ModelAdmin;

class PlaylistAdmin extends ModelAdmin
{
    private static $menu_title = 'Playlists';

    private static $url_segment = 'playlists';

    private static $managed_models = [
        Playlist::class
    ];
}