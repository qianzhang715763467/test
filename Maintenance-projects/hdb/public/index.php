<?php

use Phalcon\Loader;
use Phalcon\Mvc\View;
use Phalcon\Mvc\Application;
use Phalcon\Di\FactoryDefault;
use Hdb\Plugins\ActionAcl,
    Hdb\Utils\ResultMessage,
    Phalcon\Mvc\Dispatcher,
    Phalcon\Crypt,
    Phalcon\Mvc\Router;

try {

    $loader = new Loader();
    $loader->registerNamespaces(
            array(
                'Hdb\Utils' => '../app/utils/',
                'Hdb\Plugins' => '../app/plugins/',
                'Hdb\Controllers' => '../app/controllers/',
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
        $dispatcher->setDefaultNamespace("Hdb\Controllers");

        $eventsManager = $di->getShared('eventsManager');
        $actionAcl = new ActionAcl($di);
        $eventsManager->attach('dispatch', $actionAcl);
        $dispatcher->setEventsManager($eventsManager);

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
        $crypt->setKey('zhaopeng12345678');
        return $crypt;
    });
    
    $di->set('rm', function() {
        return new ResultMessage();
    });

    $application = new Application($di);



    echo $application->handle()->getContent();
} catch (\Exception $e) {
    echo "Exception: ", $e->getMessage();
}