import { NovaestruturaFormController } from "modules/poc-novaEstrutura/components/form/novaestrutura.form.controller";
import { ICadastro } from "modules/poc-novaEstrutura/interfaces/ICadastro";
import { NovaestruturaServiceBase } from "modules/poc-novaEstrutura/novaestruturaBase.service";

export class SubcadastroNewController extends NovaestruturaFormController {

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
  ) {
    super($scope, $state, novaestruturaServiceBase);

    this.action = 'new';
  }
}
