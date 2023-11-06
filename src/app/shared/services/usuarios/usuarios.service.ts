declare var nsj;

export class Usuarios {
  static $inject = ['$rootScope', 'moment'];

  public entities: any = [];
  public profile: any;
  public estabelecimentoAtual: any;
  public trabalhadorAtual: any;
  public dataRescisaoTrabalhadorAtual: any;


  constructor(
    protected $rootScope: angular.IRootScopeService,
    public moment: any

  ) {

  }

  /**
   * Seta dados de profile do usuário
   * @param profile
   */
  public setProfile(profile){
    this.profile = profile;
  }

  /**
   * Retorna dados de profile do usuário
   */
  public getProfile() {
    return new Promise((resolve) => {
      resolve({
        data: this.profile
      });
    });
  }

/**
 * Métodos set e get de trabalhador e estabalecimento atuais
*/

  public setEstabelecimentoAtual(estabelecimento: any) {
    this.estabelecimentoAtual = estabelecimento;
  }

  public getEstabelecimentoAtual(): any {
    return this.estabelecimentoAtual;
  }

  public setTrabalhadorAtual(trabalhador: any) {
    this.trabalhadorAtual = trabalhador;
  }

  public getTrabalhadorAtual(): any {
    return this.trabalhadorAtual;
  }


  public setDataRescisaoTrabalhadorAtual(dataRescisaoTrabalhadorAtual: any) {
    this.dataRescisaoTrabalhadorAtual = dataRescisaoTrabalhadorAtual;
  }

  public getDataRescisaoTrabalhadorAtual(): any {
    return this.dataRescisaoTrabalhadorAtual;
  }

  public trabalhadorInativo(): any {
    var datarescisao = this.moment(this.dataRescisaoTrabalhadorAtual, "YYYY-MM-DD");
    var dataatual = this.moment();
    return dataatual.isAfter(datarescisao);
  }

  //Busca as permissões do profile obtido no Admin
  public obterChaves() : any[] {
    var permissoes = [];
    if (nsj.globals.getInstance().a) {
      var tenant = nsj.globals.getInstance().a.tenantCodigo;
      var estabelecimento_id = nsj.globals.getInstance().a.estabelecimento;

      this.profile.organizacoes.forEach(function(organizacao) {
        if(organizacao.codigo.localeCompare(tenant) == 0) {
          organizacao.estabelecimentos.forEach(function(estabelecimento) {
            if(estabelecimento.estabelecimento.localeCompare(estabelecimento_id) == 0) {
              permissoes = estabelecimento.permissoes;
            }
          });
        }
      });
    }
    return permissoes;
  }

  public temPermissao(chave: any[]) {
    return  this.obterChaves().indexOf(chave) >= 0;
  }
}