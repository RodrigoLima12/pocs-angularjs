import { Catch } from "@core/decorators/catch";
import { NsjConfig } from '@core/nsj-core';
import { httpClient } from '@core/services/http-client';
import { ServerError } from "@core/services/server-error";
import { Usuario } from './models/usuario-model';

class UsuarioService {

  public Usuario: Usuario;
  private static inst: UsuarioService;

  private constructor() {
  }

  public static getUsuario(): UsuarioService {
    if (!UsuarioService.inst) {
      UsuarioService.inst = new UsuarioService();
    }
    return UsuarioService.inst;
  }

  @Catch(TypeError, (error, ctx) => {
    console.error({ error, ctx });
    ServerError.showErrorPage('Ocorreu um erro ao carregar dados do usuário');
  })
  public async carregarUsuario() {

    const auth = await NsjConfig.getConfig("auth");
    const url = auth["url"] + "/realms/" + auth["realm"] + "/protocol/openid-connect/userinfo";

    try {
      const response = await httpClient.get(url);
      const responseBody = response.parsedBody;
      this.Usuario = {
        conta_url: await NsjConfig.getConfig("contaURL"),
        username: responseBody["name"],
        email: responseBody["email"],
        nome: responseBody["name"]
      }
    } catch (e) {
      console.log("Userinfo: " + e);
    }
  }
}

export const NsjUsuarioInstance: UsuarioService = UsuarioService.getUsuario();

