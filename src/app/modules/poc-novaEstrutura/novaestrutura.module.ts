import angular from 'angular';

//routes
import { routingNovaEstrutura } from './novaestrutura.routes';

//services
import { NovaestruturaServiceBase } from './novaestruturaBase.service';

//controllers
import { NovaestruturaControllerIndex } from './index/novaestrutura.index.controller';
import { SubcadastroNewController } from './subcadastro/form/new/subcadstro.new.controller';
import { DadosgeraisController } from './subcadastro/form/components/dadosgerais/dadosgerais.controller';

// components
import { NovaestruturaFormComponent } from './components/form/novaestrutura.form.component';
import { DadosgeraisComponent } from './subcadastro/form/components/dadosgerais/dadosgerais.component';

export const NovaestruturaModule =
  angular.module('novaestrutura', ['ui.router'])
    .config(routingNovaEstrutura)
    .service('NovaestruturaServiceBase', NovaestruturaServiceBase)
    .controller('NovaestruturaControllerIndex', NovaestruturaControllerIndex)
    .controller('SubcadastroNewController', SubcadastroNewController)
    .controller('DadosgeraisController', DadosgeraisController)
    .component('novaestruturaFormComponent', NovaestruturaFormComponent)
    .component('dadosgeraisComponent', DadosgeraisComponent)
    .name;
