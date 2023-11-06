
import angular from 'angular';
import 'typeface-lato';

import { appRoutes } from './app.routes';

import { AppController } from './app.controller';

import { HomeModule } from './modules/Home/home.module';
import { ConfirmarModalModule } from './shared/components/confirmar.modal/confirmar.modal.module';
import { nsGoogleanalytics } from './shared/directives/googleanalytics/nsgoogleanalytics.module';
import { ModulosHabilitados } from './shared/services/moduloshabilitados/moduloshabilitados.service'
import { permissoes } from './shared/directives/permissoes/permissoes.module';
import { moduloshabilitados } from './shared/directives/moduloshabilitados/moduloshabilitados.module';
import { ModalConfirmModule } from './shared/components/modal-confirm/modal.confirm.module';
import { loadingComponent } from "@Shared/components/loading/loading.component";

export const app = angular.module('main',
  [
    'ui.router',
    'ui.bootstrap',
    'ngSanitize',
    'ngMessages',
    'treeGrid',
    'angularMoment',
    'toaster',
    'convertToNumber',
    'checklist-model',
    'dateInput',
    'multipleDatePicker',
    'nasajon-ui',
    HomeModule,
    ConfirmarModalModule,
    nsGoogleanalytics,
    permissoes.name,
    moduloshabilitados.name,
    ModalConfirmModule,
  ])
  .config(appRoutes)
  .controller('AppController', AppController)
  .service('ModulosHabilitados', ModulosHabilitados)
  .component('loadingComponent', loadingComponent)
  .constant('angularMomentConfig', {
    timezone: "America/Sao_Paulo",
    locale: 'pt-br'
  })
  .name;
