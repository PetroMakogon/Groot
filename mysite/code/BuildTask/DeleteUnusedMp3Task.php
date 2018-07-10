<?php


namespace BuildTask;


use SilverStripe\Control\HTTPRequest;
use SilverStripe\Dev\BuildTask;

class DeleteUnusedMp3Task extends BuildTask
{
    private static $segment = 'DeleteUnusedMp3Task';

    protected $title = 'DeleteUnusedMp3Task';

    protected $description = 'Delete Unused Mp3 Task';

    /**
     * Implement this method in the task subclass to
     * execute via the TaskRunner
     *
     * @param HTTPRequest $request
     * @return
     */
    public function run($request)
    {
        echo "Deleting unused mp3 files\n";
        // TODO:

        // select files that not related to any Song model

        // filter those files to exclude those related to a BatchUploadJob model

        // delete them
    }
}