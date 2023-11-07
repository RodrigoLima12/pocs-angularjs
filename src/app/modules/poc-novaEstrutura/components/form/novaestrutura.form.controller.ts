import ng from 'angular';

import { NovaestruturaServiceBase } from 'modules/poc-novaEstrutura/novaestruturaBase.service';

import { ICadastro } from 'modules/poc-novaEstrutura/interfaces/ICadastro';


export class NovaestruturaFormController implements ng.IController {

  static $inject = [
    '$scope',
    '$state',
    'NovaestruturaServiceBase'
  ];

  public entity: ICadastro;
  public form: ng.IFormController;
  public action: 'new' | 'edit' | 'show';

  public busy: boolean;

  constructor(
    protected $scope: ng.IScope,
    protected $state: angular.ui.IStateService,
    protected novaestruturaServiceBase: NovaestruturaServiceBase
  ) { }

  public async salvar(): Promise<void> {
    const confirmacao = confirm('Deseja realmente salvar?');

    if (this.form.$valid && confirmacao) {
      this.busy = true;
      const id = await this.novaestruturaServiceBase.save(this.entity);
      this.$state.go('novaestrutura')
      this.busy = false;
      this.$scope.$applyAsync();
    }
  }

  public descartar(): void {
    if (this.form.$dirty) {
      const confirmacao = confirm('Deseja realmente descartar o cadastro?');

      if (!confirmacao) return;
    }

    this.$state.go('novaestrutura');
  }
}
