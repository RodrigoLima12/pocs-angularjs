export const routingHome =['$stateProvider', ($stateProvider: angular.ui.IStateProvider) => {
  $stateProvider
    .state('home', {
      url: '/home',
      template: require('html-loader!./home.html'),
      controller: 'HomeController',
      controllerAs: 'hm_cntrllr',
    })
}];
