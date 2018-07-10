<?php

namespace BuildTask;

use Model\BatchUploadJob;
use Model\Song;
use SilverStripe\Assets\File;
use SilverStripe\Dev\BuildTask;
use SilverStripe\ORM\ValidationException;

class ProcessBatchUploadJobTask extends BuildTask
{

    private static $segment = 'ProcessBatchUploadJobTask';

    protected $title = 'ProcessBatchUploadJobTask';

    protected $description = 'Process Batch Upload Job';

    /**
     * Implement this method in the task subclass to
     * execute via the TaskRunner
     *
     * @param \SilverStripe\Control\HTTPRequest $request
     */
    public function run($request)
    {
        $queueID = $request->getVar('id');

        /* @var $job BatchUploadJob */
        $job = BatchUploadJob::get()->byID($queueID);
        if ($job->Status !== BatchUploadJob::STATUS_PENDING) {
            $this->exitWithError('This job is not under PENDING status');
        }

        $job->Status = BatchUploadJob::STATUS_PROCESSING;
        try {
            $job->write();
        } catch (ValidationException $e) {
        }

        $files = $job->StreamFiles();
        foreach ($files as $file) {
            /* @var $file File */
            echo 'Processing File: ' . $file->getFilename() . "\n";
            try {
                $song = Song::create();
                $song->StreamFile = $file;
                $info = $song->getID3Info();
                foreach ($info as $key => $value) {
                    $song->$key = $value;
                }
                $song->write();

                /** @noinspection IncrementDecrementOperationEquivalentInspection */
                $job->ProcessedNumberOfFiles += 1;
                $job->write();
            } catch (ValidationException $e) {
                $job->Status = BatchUploadJob::STATUS_ERROR;
                $job->Remark = $e->getMessage();
                try {
                    $job->write();
                } catch (ValidationException $e) {
                }
                $this->exitWithError($e);
            }
        }

        $job->Status = BatchUploadJob::STATUS_FINISHED;
        try {
            $job->write();
        } catch (ValidationException $e) {
        }
    }

    private function exitWithError($error)
    {
        die($error . "\n");
    }
}