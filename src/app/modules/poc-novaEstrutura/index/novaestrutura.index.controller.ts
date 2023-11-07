import ng from 'angular';

import { NovaestruturaServiceBase } from '../novaestruturaBase.service';

import { ICadastro } from '../interfaces/ICadastro';


export class NovaestruturaControllerIndex implements ng.IController {

  static $inject = [
    '$scope',
    'NovaestruturaServiceBase'
  ];

  public entities: ICadastro[];
  public busy: boolean = true;

  constructor(
    private $scope: ng.IScope,
    private novaestruturaServiceBase: NovaestruturaServiceBase
  ) {
    this.getCadastro();
  }

  private async getCadastro(): Promise<void> {
    this.entities = await this.novaestruturaServiceBase.getAll();
    this.busy = false;
    this.$scope.$applyAsync();
  }
}
