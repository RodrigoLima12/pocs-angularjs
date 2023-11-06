import * as angular from 'angular';

export class ModalConfirmController {
    static $inject = ['entity', '$uibModalInstance', '$sce', 'tipo'];

    public tipoSolicitacaoTexto: '';

    constructor(
        public entity: any, 
        public $uibModalInstance: any, 
        public $sce: any,
        public tipo: any)
        {
            this.tipoSolicitacaoTexto = tipo;
    }

    close () {
        // this.$uibModalInstance.close();
        this.$uibModalInstance.dismiss('cancelar');
    };

    confirmar() {
        this.$uibModalInstance.close(this.entity);
    };
}