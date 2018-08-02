<?php


namespace Helper;


class FileNameFilter
{
    public function filter($name)
    {
        return md5($name);
    }
}