import angular from 'angular';

//routes
import { routingHome } from './home.routes';

//controllers
import { HomeController } from './home.controller';

export const HomeModule =
  angular.module('home', ['ui.router'])
    .controller('HomeController', HomeController)
    .config(routingHome)
    .name;
