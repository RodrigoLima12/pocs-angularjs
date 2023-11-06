import angular from 'angular';

import { NsjCore, NsjConfig } from './app/core/nsj-core';
import { Usuarios } from './app/shared/services/usuarios/usuarios.service';
import { app } from './app/app.module';
import { NsjUsuarioInstance } from './app/core/usuario/nsj-usuario';

class BootstrapAngular {
	constructor() {
		const USA_GRUPO_EMPRESARIAL = false;
		const USA_ESTABELECIMENTO = false;
		NsjCore.bootstrap(this.bootstrap);
	}

	private bootstrap() {
		/*
		TODO: Remover e injetar a instância de do usuário carregado pelo core .
		header Nasajon-ui necessita de um service com uma function getProfile retornando dados do profile em uma promisse
		*/
		angular.module(app).service('Usuarios', Usuarios);

		angular.module(app).run(['Usuarios', 'ModulosHabilitados', '$rootScope', function (Usuarios, ModulosHabilitados, $rootScope) {
			const dadosIniciais = {
				dadosUsuario: NsjUsuarioInstance.Usuario,
				globals: NsjConfig.config.globals
			};
			Usuarios.setProfile(dadosIniciais.dadosUsuario);
			ModulosHabilitados.setModulos(dadosIniciais);
			$rootScope['carregouProfile'] = true;
		}]);

		angular.element(document).ready(function () {
			angular.bootstrap(document, [app]);
		});
	}
}

new BootstrapAngular();
