import * as angular from 'angular';

import { VerticalViewerController } from './vertical-viewer.controller';

export class VerticalViewerComponent implements angular.IComponentOptions {
  static controller = VerticalViewerController;
  static controllerAs = "$ctrl";
  static template = require('!!html-loader!./vertical-viewer.html');
  static bindings = {
    entity: '<'
  }
}
        