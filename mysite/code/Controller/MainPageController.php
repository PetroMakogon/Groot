<?php

namespace Controller;

use SilverStripe\Control\Controller;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\View\Requirements;

class MainPageController extends Controller
{
    protected function init()
    {
        parent::init();

        Requirements::javascript('scripts/bundle.js');
    }


    public function index(HTTPRequest $request)
    {
        return [
            'Title' => 'Main'
        ];
    }
}