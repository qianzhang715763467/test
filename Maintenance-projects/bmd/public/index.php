<?php

use Phalcon\Loader;
use Phalcon\Mvc\View;
use Phalcon\Mvc\Application;
use Phalcon\Di\FactoryDefault;
use Bmd\Plugins\ActionAcl,
    Bmd\Utils\ResultMessage,
    Phalcon\Mvc\Dispatcher,
    Phalcon\Crypt,
    Phalcon\Mvc\Router;
use Phalcon\Cache\Backend\File;
use Phalcon\Cache\Frontend\Data;
use Phalcon\Mvc\View\Engine\Volt;
use Phalcon\Session\Adapter\Files as Session;

try {

    $loader = new Loader();
    $loader->registerNamespaces(
            array(
                'Bmd\Utils' => '../app/utils/',
                'Bmd\Plugins' => '../app/plugins/',
                'Bmd\Controllers' => '../app/controllers/',
            )
    );
    $loader->registerDirs(array(
        '../app/controllers/',
        '../app/models/',
        '../app/conf/'
    ));
    $loader->register();

    $di = new FactoryDefault();

    $di->set('view', function () {
        $view = new View();
        $view->setViewsDir('../app/views/');

        $view->registerEngines(
            array(
                ".phtml" => "Phalcon\\Mvc\\View\\Engine\\Php",
                ".htm"  => "Phalcon\\Mvc\\View\\Engine\\Volt",
            )
        );
        return $view;
    });

    $di->set('dispatcher', function() use ($di) {
        $dispatcher = new Dispatcher();
        $dispatcher->setDefaultNamespace("Bmd\Controllers");

        $eventsManager = $di->getShared('eventsManager');
        $actionAcl = new ActionAcl($di);
        $eventsManager->attach('dispatch', $actionAcl);
        $dispatcher->setEventsManager($eventsManager);

        return $dispatcher;
    });

    $di->set('router', function () {

        $router = new Router();
//        $router->add("/pages/{page}", array(
//            'controller' => 'pages',
//            'action' => 'index',
//            'page' => 1
//        ));

        $router->add("/img/g/:params", array(
            'controller' => 'img',
            'action' => 'g',
            'img' => 1
        ));

        $router->add("/getpage/{report}", array(
            'controller' => 'getpage',
            'action' => 'index',
            'report' => 1
        ));

        return $router;
    });

    $di->set('crypt', function() {
        $crypt = new Crypt();
        $crypt->setKey('zhaopeng12345678');
        return $crypt;
    });

    $di->set('rm', function() {
        return new ResultMessage();
    });

    $di->set('fileCache', function() {
        $frontCache = new Data(
            ["lifetime" => 172800]
        );
        $cache = new File(
            $frontCache,
            ["cacheDir" => "../app/cache/"]
        );
        return $cache;
    });

    $di->setShared('session', function () {
        $session = new Session();
        $session->start();
        return $session;
    });

    $application = new Application($di);
    echo $application->handle()->getContent();
} catch (\Exception $e) {
    echo "Exception: ", $e->getMessage();
}