import angular = require('angular');
import { ModulosHabilitados } from '@Shared/services/moduloshabilitados/moduloshabilitados.service';

export class ModulosHabilitadosDirective implements angular.IDirective {

    public link;
    public compile;

    restrict = 'A';
    scope = false;

    public static Factory() {
        var directive = ($compile: any, ModulosHabilitados: ModulosHabilitados) => {
            return new ModulosHabilitadosDirective($compile, ModulosHabilitados);
        };
        directive.$inject = ['$compile', 'ModulosHabilitados'];
        return directive;
    }

    constructor(public $compile: any, ModulosHabilitados: ModulosHabilitados) {

      ModulosHabilitadosDirective.prototype.compile = (element: any, attr: any) => {

            const modulos = ModulosHabilitados.getModulos();
            
            const chavesModulos = Object.keys(modulos);

            let habilitados = chavesModulos.filter((valor) => {
                return modulos[valor];
            });

            if (habilitados.indexOf(attr.temModulo) == -1) {
                element[0].setAttribute('ng-if', 'false')
                return this.postLink
            }

        };

    }

    postLink(scope, elem, attrs) {
        this.$compile(elem)(scope);
    }
} 