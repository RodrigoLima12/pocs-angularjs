import ng from "angular";
import { ICadastro } from "modules/poc-novaEstrutura/interfaces/ICadastro";

export class DadosgeraisController implements ng.IController {

  public entity: ICadastro;
  public form: ng.IFormController;
  public action: 'new' | 'edit' | 'show';
  public busy: boolean;

}
