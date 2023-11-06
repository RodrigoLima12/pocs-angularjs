import * as angular from 'angular';

export class ModalConfirmService {
    static $inject = ['$uibModal'];

    constructor(public $uibModal: any){

    }

    open(subentity: any, tipo: any){
        return this.$uibModal.open({
            template: require('html-loader!./modal.confirm.html'),
            controller: 'ModalConfirmController',
            controllerAs: '$ctrl',
            resolve: {
                entity: () => {
                    return angular.copy(subentity);
                },
                tipo: () => {
                    return angular.copy(tipo);
                }
            }
        });
    }
}