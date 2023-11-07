import ng from 'angular';
import { NovaestruturaFormController } from './novaestrutura.form.controller';

export class NovaestruturaFormComponent implements ng.IComponentOptions {
  static selector = 'NovaestruturaFormComponent';
  static controller = NovaestruturaFormController;
  static template = require('!!html-loader!./novaestrutura.form.html');
  static controllerAs = 'ctrl_form';
  static transclude = true;

  static bindings = {
    form: '=',
    entity: '=',
    busy: '=',
    action: '<'
  };
}
