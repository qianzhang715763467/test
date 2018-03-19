<?php

use Phalcon\Loader;
use Phalcon\Mvc\View;
use Phalcon\Mvc\Application;
use Phalcon\Di\FactoryDefault;
use HCharts\Plugins\ActionAcl,
    Phalcon\Mvc\Dispatcher,
    Phalcon\Crypt,
    Phalcon\Mvc\Router;

try {

    $loader = new Loader();
    $loader->registerNamespaces(
            array(
                'HCharts\Utils' => '../app/utils/',
                'HCharts\Plugins' => '../app/plugins/',
                'HCharts\Controllers' => '../app/controllers/',
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
        return $view;
    });

    $di->set('dispatcher', function() use ($di) {
        $dispatcher = new Dispatcher();
        $dispatcher->setDefaultNamespace("HCharts\Controllers");

//        $eventsManager = $di->getShared('eventsManager');
//        $actionAcl = new ActionAcl($di);
//        $eventsManager->attach('dispatch', $actionAcl);

//        $dispatcher->setEventsManager($eventsManager);

        return $dispatcher;
    });
    
    $di->set('router', function () {

        $router = new Router();
        $router->add("/pages/{page}", array(
            'controller' => 'pages',
            'action' => 'index',
            'page' => 1
        ));
        return $router;
    });

    $di->set('crypt', function() {
        $crypt = new Crypt();
        $crypt->setKey('zhaopeng');
        return $crypt;
    });

    $application = new Application($di);

    echo $application->handle()->getContent();
} catch (\Exception $e) {
    echo "Exception: ", $e->getMessage();
}