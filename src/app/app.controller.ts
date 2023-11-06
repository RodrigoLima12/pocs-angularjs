import angular from 'angular';
declare var nsj;

import { NsjConfig } from './core/nsj-core';

import { Usuarios } from './shared/services/usuarios/usuarios.service';
import { ModulosHabilitados } from './shared/services/moduloshabilitados/moduloshabilitados.service';

export class AppController {


    static $inject = [
      '$rootScope',
      '$scope',
      'Usuarios',
      'ModulosHabilitados',
      'moment',
      '$window',
      '$location',
      '$http',
      'toaster',
      '$state',
      '$q',
      '$stateParams',
      '$sce',
      '$timeout',
      '$cacheFactory'
    ];


    public isAdmin: Boolean;

    public estabelecimentos: any;
    public listEstabelecimentos: Array<any> = [];
    public listTrabalhadores: Array<any> = [];
    public selectedEstabelecimento: string;
    public selectedTrabalhador: string;
    public estabelecimentolHtml: string;
    public mudouEstabelecimento: boolean;
    public mudouTrabalhador: boolean;
    public trabalhadoresEstab: any = [];
    public logoUrl = '//s3-us-west-2.amazonaws.com/static.nasajon/img/logo.png';
    public showMenuContextual: boolean = false;

    public mockTrabalhador: any;
    public resumoTrabalhador: any;
    public fotoTrabalhador: any;
    loading_deferred: any;
    public constructors: any = [];
    public trabalhadorIndex: any;
    public estabelecimentoIndex: any;
    public informecarregado: boolean = false;
    public recibocarregado: boolean = false;

    constructor(
        public $rootScope: angular.IRootScopeService,
        public $scope: angular.IScope,
        public Usuarios: Usuarios,
        public ModulosHabilitados: ModulosHabilitados,
        public moment: any,
        public $window: angular.IWindowService,
        public $location: angular.ILocationService,
        public $http: angular.IHttpService,
        public toaster: any,
        public $state: angular.ui.IStateService,
        public $q: angular.IQService,
        public $stateParams: any,
        public $sce: angular.ISCEService,
        public $timeout: angular.ITimeoutService,
        public $cacheFactory: angular.ICacheFactoryService
    ) {
        if ($rootScope['carregouProfile']) {
            $timeout(() => this.setDadosIniciais(), 0);
        }
        var $httpDefaultCache = $cacheFactory.get('$http');
        $httpDefaultCache.removeAll();
    }

    setDadosIniciais() {
        this.setGlobals();
        let appLoad = document.querySelector('.nsj-app-load');
        if (appLoad) {
            appLoad.remove();
        }
    }

    setGlobals() {
        nsj.globals.getInstance().setGlobals(NsjConfig.config.globals);
    }

    trustUrl(subentityURL: any) {
        let url = this.$sce.trustAsResourceUrl(subentityURL);
        return url;
    }

    public jsonToArray(json) {
        let arrayOfObjects = [];

        for (const prop in json) {
            if (json.hasOwnProperty(prop)) {
                arrayOfObjects.push(json[prop]);
            }
        } return arrayOfObjects;
    }

    /**
     * Verifica se usuário possui permissão no diretório para exibir ou não link no menu
     * @param chave
     */
    public temPermissao(chave: any) {
        return this.Usuarios.temPermissao(chave);
    }
}
