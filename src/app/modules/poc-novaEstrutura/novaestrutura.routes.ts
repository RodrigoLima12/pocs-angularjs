export const routingNovaEstrutura =['$stateProvider', ($stateProvider: angular.ui.IStateProvider) => {
  $stateProvider
    .state('novaestrutura', {
      url: '/novaestrutura',
      template: require('html-loader!./index/novaestrutura.index.html'),
      controller: 'NovaestruturaControllerIndex',
      controllerAs: 'ctrl_index',
    })
    .state('novaestruturaNew', {
      parent: 'novaestrutura',
      url: '/subcadastro_new',
      template: require('html-loader!./subcadastro/form/new/subcadastro.new.html'),
      controller: 'SubcadastroNewController',
      controllerAs: 'ctrl_new',
    })
}];
