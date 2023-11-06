import { NsjAuthInstance } from '@core/authentication/nsj-autenticacao';
import { ErrorPageRoutes } from '@core/components/error-page.routes';
import { configInstance } from '@core/configuracao/nsj-config';
import { Catch } from "@core/decorators/catch";

import { ServerError } from "@core/services/server-error";

import { Usuario } from '@core/usuario/models/usuario-model';
import { NsjUsuarioInstance } from '@core/usuario/nsj-usuario';

class InicializacaoService {

    constructor(private bootstrap: Function) {

    }

    async run() {
        ErrorPageRoutes.initRouter();
        configInstance.iniciarConfig();
        
        NsjAuthInstance.iniciarAuth()
            .then(() => NsjUsuarioInstance.carregarUsuario())
            .then(() => this.bootstrapApp())
    }

    @Catch('object', (error, ctx) => {
        console.error({ error, ctx });
        ServerError.showErrorPage(error.message);
    })

    async bootstrapApp() {
        const usuario: Usuario = NsjUsuarioInstance.Usuario;

        let globals: any = {};

        if (!usuario) {
            throw new Error('Erro ao carregar usuário.')
        }

        //Busco a tag Base
        let baseTag = document.getElementsByTagName('base')[0];

        //Adiciono Url de redirecionamento no logout do sistema. Quando deslogar, vai pra página inicial
        usuario.logout_url = NsjAuthInstance.nsjAuth.createLogoutUrl({
            redirectUri: baseTag.href
        });
        configInstance.setConfig('globals', globals);
        ErrorPageRoutes.removeRouter();

        this.bootstrap();
    }
}

export const NsjInicializacao = InicializacaoService;