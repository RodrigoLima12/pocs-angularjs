import { NsjInicializacao } from './inicializacao/nsj-inicializacao';

export { NsjUsuarioInstance as NsjUsuario } from './usuario/nsj-usuario';
export { configInstance as NsjConfig } from './configuracao/nsj-config';
export { NsjAuthInstance as NsjAuth } from './authentication/nsj-autenticacao';
export { HttpInterceptorService as NsjHttpInterceptorService } from './interceptors/http.interceptors.service';
export { httpClient as NsjHttpClient } from './services/http-client';

export class NsjCore {
    static async bootstrap(bootstrap: Function) {
        const bootstrapApp = new NsjInicializacao(bootstrap);
        await bootstrapApp.run();
    }
}
