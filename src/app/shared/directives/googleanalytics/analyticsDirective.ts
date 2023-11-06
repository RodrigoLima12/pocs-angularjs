export class NgAnaliticsDirective implements ng.IDirective {

	static restrict = 'A';

	public guid: string = '';
	public onlyPageView: boolean = false;

	static Factory() {

		const directive = ($window: ng.IWindowService, $rootScope: ng.IRootScopeService, $location: ng.ILocationProvider, $transitions: any) => {
			return new NgAnaliticsDirective($window, $rootScope, $location, $transitions);
		};

		directive.$inject = ['$window', '$rootScope', '$location', '$transitions'];

		return directive;
	}

	constructor(public $window: ng.IWindowService, public $rootScope: any, public $location: any, public $transitions: any) {

		if (this.isLocalHost()) {
			return;
		}

		// cria a requisição do GA global
		this.$window.ga('create', 'UA-26375873-13', 'auto');
		this.$window.ga('send', 'pageview', this.$location.$$url);

		// retorna o guid do cliente e cria a requisição do GA para o cliente
		this.guid = this.$window.nsj.globals.getInstance().get('guid');
		if (this.guid && !this.isLocalHost()) {

			this.$window.ga('create', this.guid, 'auto', 'cliente');
			this.$window.ga('cliente.send', 'pageview', this.$location.$$url);
		}

		this.$transitions.onSuccess({}, () => {
			this.sendPageView();
		});
	}

	sendPageView() {

		this.$window.ga('send', 'pageview', this.$location.$$url);

		if (this.guid) {
			this.$window.ga('cliente.send', 'pageview', this.$location.$$url);
		}

		this.$window.onbeforeunload = undefined;
	}

	isLocalHost() {
		return location.host === 'localhost';
	}

	link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {

		if (this.isLocalHost()) {
			return;
		}

		let params = (attrs['gaOptions']) ? attrs['gaOptions'] : attrs['ngAnalyticsDirective'];

		params = params.split('|')
						.filter(o => o !== '')
						.map(o => o.trim());

		let categoria = params[0];
		let evento = params[1];
		let label = params[2];

		element.on(evento, (el) => {

			this.sendAnalyticsInformation('send', categoria, evento, label);

			if (this.guid) {
				this.sendAnalyticsInformation('cliente.send', categoria, evento, label);
			}
		});
	}

	sendAnalyticsInformation = function (cliente: any, categoria: any, evento: any, label: any) {

		let self = this;

		self.$window.ga(cliente, {
			hitType: 'event',
			eventCategory: categoria,
			eventAction: evento,
			eventLabel: label
		});
	};
}
