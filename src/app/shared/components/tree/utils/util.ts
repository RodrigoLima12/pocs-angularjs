import angular = require("angular");

    export const montarNoTree = function (tipo, entity, identificador, pai = null, hashAuxiliar = '', actions = []) {
      const cod = tipo + identificador + hashAuxiliar;
      const no = {
        _id_: cod,
        _parentId_: pai,
        _info_: null,
        children: [],
        cargo: entity.cargo ? entity.cargo : null,
        cargonivel: entity.cargonivel ? entity.cargonivel : null,
        tipo: entity.tipo  ? entity.tipo  : null,
        periodo: entity.mes ? entity.mes : null,
        caminhodocumento: entity.caminhodocumento ? entity.caminhodocumento : null,
        liquido: entity.liquido ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(entity.liquido) : null,
        obj: entity
      }

      return no;
    }

export const editarNode = function (nodes: any[], update: any) {
  for (let [index, nodeParaAlterar] of Object.entries(nodes)) {
    if (nodeParaAlterar._id_ === update._id_) {
      /**
       * guarda o array de filhos para garantir que 
       * não sejam perdidos
       */
      const { children } = nodeParaAlterar;
      angular.copy(update, nodeParaAlterar);
      nodeParaAlterar['children'] = children;
    }
    if (nodeParaAlterar && nodeParaAlterar.children && nodeParaAlterar.children.length) {
      this.editarNode(nodeParaAlterar.children, update)
    }
  }
}