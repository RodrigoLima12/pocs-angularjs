import * as angular from 'angular';

export class ConfirmarModalController {
    static $inject = ['entity', '$uibModalInstance', '$sce'];

    public subentity: any = {};

    constructor(
        public entity: any, 
        public $uibModalInstance: any, 
        public $sce: any)
        {

    }

    close () {
        this.$uibModalInstance.close();
    };

    confirmar() {
        this.entity.confirmar = true;
        this.$uibModalInstance.close(this.entity);
    };
}
