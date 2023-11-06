import * as angular from 'angular';

export class ConfirmarModalService {
    static $inject = ['$uibModal'];

    constructor(public $uibModal: any){

    }

    open(subentity: any){
        return this.$uibModal.open({
            template: require('html-loader!./confirmar.modal.html'),
            controller: 'ConfirmarModalController',
            controllerAs: '$ctrl',
            resolve: {
                entity: () => {
                    return angular.copy(subentity);
                }
            }
        });
    }
}