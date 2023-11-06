import ng from 'angular';

export class VerticalViewerController implements ng.IController {
	static $inject = [];

	public entity: object;
	public link: {
		target: string | null;
		href: string | null;
	}

	constructor() {
		this.dadosIniciais();
	}

	public validURL(str: string): void {
		var pattern = new RegExp(
			'^(https?:\\/\\/)?' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$', 'i' // fragment locator
		);

		if (!!pattern.test(str)) {
			this.link = {
				target: '_blank',
				href: str
			}
		}
	}

	private dadosIniciais() {
		this.link = {
			target: null,
			href: null
		};
	}
}