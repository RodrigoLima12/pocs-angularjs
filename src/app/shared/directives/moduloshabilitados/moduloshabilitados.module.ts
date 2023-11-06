import * as angular from 'angular';
import { ModulosHabilitadosDirective } from './moduloshabilitados.directive';

export const moduloshabilitados = angular.module('moduloshabilitados', ['ui.router']).directive('temModulo', ModulosHabilitadosDirective.Factory())   
