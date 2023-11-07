import ng from 'angular';
import { DadosgeraisController } from './dadosgerais.controller';

export class DadosgeraisComponent implements ng.IComponentOptions {
  static selector = 'DadosgeraisComponent';
  static controller = DadosgeraisController;
  static template = require('!!html-loader!./dadosgerais.html');

  static bindings = {
    form: '=',
    entity: '=',
    busy: '=',
    action: '<'
  };
}
