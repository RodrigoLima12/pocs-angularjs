import * as angular from 'angular';

import { ModalConfirmController } from './modal.confirm.controller';
import { ModalConfirmService } from './modal.confirm.service';
 
export const ModalConfirmModule =
  angular.module('modalConfirmModule', [])
         .controller('ModalConfirmController', ModalConfirmController)
         .service('ModalConfirmService', ModalConfirmService)
         .name;
