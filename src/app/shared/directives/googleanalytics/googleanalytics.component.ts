import { GoogleAnalyticsController } from './googleanalytics.controller';

export class GoogleAnalyticsComponent implements angular.IComponentOptions {

  static selector = 'nsGoogleanalytics';
  static bindings = {
    sender: '=',
    guid: '=',
    hittype: '=',
    category: '=',
    action: '=',
    label: '=',
    options: '=',
    event: '&',
  };

  static controller = GoogleAnalyticsController;
  static template = require('!!html-loader!./googleanalytics.html');

}
