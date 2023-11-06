import * as angular from 'angular';
import { NgAnaliticsDirective} from './analyticsDirective';
import { GoogleAnalyticsController } from './googleanalytics.controller';

export const nsGoogleanalytics =
	angular.module('nsGoogleanalytics', [])
		.directive( 'ngAnalyticsDirective', NgAnaliticsDirective.Factory())
		.name;
