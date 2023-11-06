export class ModulosHabilitados {

  static $inject = [];

  public modulosHabilitados: any;

  public setModulos(dadosIniciais: any) {
    this.modulosHabilitados = {};
  }

  public getModulos(): any[] {
    return this.modulosHabilitados;
  }

  public temModulo(modulo: string): boolean {
    if(this.modulosHabilitados.hasOwnProperty(modulo)) {
      return this.modulosHabilitados[modulo];
    }
  }

}