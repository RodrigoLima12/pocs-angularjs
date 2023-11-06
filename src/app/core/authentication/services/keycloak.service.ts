import Keycloak from 'keycloak-js'

export class KeycloakService {
    static keycloak = null;
    static updateInterval = null;
    static keycloakAuth: Keycloak.KeycloakInstance;

    /**
     * Configura inicialização do Keycloak.
     *
     * @param configOptions Dados do Json de configuração
     * 
     * @param adapterOptions Configurações de inicialização
     * 
     * @returns {Promise<T>}
     */
    static init(configOptions?: Keycloak.KeycloakConfig, initOptions?: Keycloak.KeycloakInitOptions): Promise<any> {
        KeycloakService.keycloakAuth = Keycloak(configOptions);

        return new Promise((resolve, reject) => {
            KeycloakService.keycloakAuth.init(initOptions)
                .success(() => {
                    this.setToken(KeycloakService.keycloakAuth);
                    resolve();
                })
                .error((errorData: any) => {
                    reject(errorData);
                });
        });
    }

    authenticated(): boolean {
        return KeycloakService.keycloakAuth.authenticated;
    }

    login() {
        KeycloakService.keycloakAuth.login();
    }

    logout() {
        KeycloakService.keycloakAuth.logout();
    }

    account() {
        KeycloakService.keycloakAuth.accountManagement();
    }
    
    authServerUrl(): string {
        return KeycloakService.keycloakAuth.authServerUrl;
    }
    
    realm(): string {
        return KeycloakService.keycloakAuth.realm;
    }

    static setToken(keycloak): void {
      KeycloakService.keycloak = keycloak;

      //Caso o intervalo de atualização já esteja iniciado, limpo ele.
      if (KeycloakService.updateInterval != null){
        clearInterval(KeycloakService.updateInterval);
      }
  
      //Verifico se é necessário atualizar o token a cada 10 segundos
      //Caso apresente erro, deslogo o usuário
      KeycloakService.updateInterval = setInterval(() => {
        // refresh token if it's valid for less then 15 minutes
        KeycloakService.keycloak.updateToken(15)
          .error(() => {
            KeycloakService.keycloak.logout();
          });
      }, 10000);
    }
}

