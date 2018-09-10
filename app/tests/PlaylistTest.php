<?php

use Model\Playlist;
use SilverStripe\Dev\SapphireTest;

class PlaylistTest extends SapphireTest
{
    protected static $fixture_file = 'PlaylistTest.yml';

    public function testFixture()
    {
        /* @var Playlist $playlist */
        $playlist = $this->objFromFixture(Playlist::class, 'EmptyPlaylist');
        $this->assertEquals('Empty Playlist', $playlist->Title);
        $this->assertEquals(2, $playlist->Songs()->count());
        $this->assertEquals(2, $playlist->NumberOfSongs);
    }
}