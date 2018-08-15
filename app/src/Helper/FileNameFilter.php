<?php


namespace Helper;

use SilverStripe\Assets\FileNameFilter as BaseFilter;

class FileNameFilter extends BaseFilter
{
    public function filter($name)
    {
        if (strpos($name, 'mp3')) {
            return md5($name);
        }
        return parent::filter($name);
    }
}