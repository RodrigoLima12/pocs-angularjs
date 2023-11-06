import angular = require('angular');
//import {NODATA} from 'dns';

export class Tree {

 


  public tree: any = {};
  public expandingProperty: any = {
    titleClass: 'text-center',
    cellClass: 'v-middle',
    displayName: ' '
  }

 

  /**
   * Adiciona o nó no array simples. 
   * o array facilita a busca
   * @param noNovo 
   * @param dados  
   * @todo verificar porque o array de dados originais está sendo modificado
   */
  adicionarNo(noNovo: any, dados: Map<any, any>) {
    dados.set(noNovo._id_, noNovo);
  }

  removerNo(key: string, dados: Map<any, any>) {
    dados.delete(key);
  }

 editarNo(noNovo: any, dados: any[]) {
  
    for (let no in dados) {
      if (dados[no]._id_ === noNovo._id_) {
           angular.copy(noNovo,dados[no]);
      }
    }
    return dados;
  }

  /**
   * A tree-dnd trabalha com uma matriz para gerar a árvore, então esse método chama a função que vai reorganizar os nós em matriz.
   * @param dados 
   */
  getArvore(dados: any[]) {
    let arvore = this._reorganizarNos(dados);
    return arvore;
  }

  /**
   * Esse método pega um array e reorganiza os dados em uma matriz que será consumida pela tree-dnd.
   * @param dados 
   */
  private _reorganizarNos(dados: any[]) {
    let dadosAux = dados.map(function (d) {
      d.children = [];
      return d;
    });

    let dadosTree = [];

    for (let dadoIndex in dadosAux) {
      if (dadosAux[dadoIndex]._parentId_ == null) {
        let no = dadosAux[dadoIndex];
        dadosAux.slice(parseInt(dadoIndex), 1);
        let children = this._adicionarFilhos(no, dadosAux);
        if (children.length > 0) {
          angular.extend(no.children, children);
        }
        dadosTree.push(no);
      }
    }

    return dadosTree;

  }

  /**
   * O método é chamado pelo reorganizarNos() e adiciona os filhos no formato esperado.
   * @param pai 
   * @param dadosAux 
   */
  private _adicionarFilhos(pai: any, dadosAux: any[]) {
    let nos = [];
    for (let dadoIndex in dadosAux) {
      if (dadosAux[dadoIndex]._parentId_ == pai._id_) {
        let no = dadosAux[dadoIndex];
        dadosAux.slice(parseInt(dadoIndex), 1);
        let children = this._adicionarFilhos(no, dadosAux);
        if (children.length > 0) {
          angular.extend(no.children, children);
        }
        nos.push(no);
      }
      // if(dadosAux[dadoIndex].children.includes())
    }
    return nos;
  }

}
angular.module('main').service('Tree', Tree);


