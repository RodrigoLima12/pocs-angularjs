import * as angular from 'angular';

import { ConfirmarModalController } from './confirmar.modal.controller';
import { ConfirmarModalService } from './confirmar.modal.service';
 
export const ConfirmarModalModule =
  angular.module('confirmarModalModule', [])
         .controller('ConfirmarModalController', ConfirmarModalController)
         .service('ConfirmarModalService', ConfirmarModalService)
         .name;
