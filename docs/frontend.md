### Estrutura Frontend do Pocs Angularjs
```html
|-- [-] src
	|-- [-] app
		|-- [-] core
			|-- [-] authentication
				|-- [-] services
					|-- keycloak.service.ts
				|-- nsj-autenticacao.service.ts
			|-- [+] components
			|-- [-] configuração
				|-- nsj-config.ts
			|-- [+] decorators
			|-- [-] inicialização
				|-- nsj-inicializacao.ts
			|-- [+] interceptors
			|-- [-] routing
				|-- nsj-rotas.ts
			|-- [+] services
			|-- [-] usuario
      			|-- [+] models
      			|-- nsj-usuario.ts
			|-- nsj-core.ts
		|-- [-] modules
			|-- [+] Home
		|-- [-] shared
			|-- [+] components
			|-- [+] directives
			|-- [+] services
			|-- [+] utils
		|-- [+] utils
		|-- app.controller.ts
		|-- app.module.ts [main]
		|-- app.routes.ts
		|-- index.html
	|-- [-] assets
		|-- [+] img
		|-- [-] sass
			|-- style.scss
	|-- [+] config
	|-- bootstrap-angular.ts

```
### Conteúdo dos arquivos:

`app.module.ts ->` Contém o módulo principal da aplicação, onde é chamado pelo ng-app. Ele é o responsável por carregar todos os outros módulos.

`app.controller.ts ->` Contém o controller principal da aplicação, chamado pelo app.module.ts

`app.routes.ts` Responsável por controlar as rotas de inicialização da aplicação.

`keycloak.service.ts ->` Métodos relacionados à autenticação no keycloak

`initialize-keycloak.ts ->` Responsável por iniciar o keycloak e chamar o `bootstrap-angular.ts`

`bootstrap-angular.ts ->` Responsável pelo carregamento manual da aplicação. É onde começa a aplicação.

`nsj-routes.ts ->` Responsável por fazer o `resolve` dos dados do profile do usuário para o resto da aplicação. **Outros arquivos de rota devem incluir `parent: root` para obter o resultado do `resolve`**


### Conteúdo das pastas

`modules ->` Diretório responsável por guardar as pastas sobrescritas do caso de uso.

`core ->` Diretório responsável por guardar pastas e arquivos que são carregados na primeira inicialização do sistema, suas subpastas são:

```html

|-- authentication -> Aqui vão arquivos responsáveis pela autenticação do usuário ou no geral e services, como o uso do Keycloak.

|-- components -> Components usados para auxiliar a inicialização, como páginas de erro.

|-- inicialização -> Aqui vai o nsj-inicialização.ts, que é responsável por carregar as rotas do sistema e configurações do usuário.

|-- interceptors -> Aqui vão todos os interceptors da aplicação

|-- routing -> Aqui vai o arquivo de carrega as rotas enviadas pela inicialização

|-- services -> Aqui vão serviços usados apenas vez ou no carregamento da aplicação

|-- usuario -> Responsável por carregar os dados de profile do usuário

```

`shared ->` Diretório onde vão todos os arquivos que podem ser exportados ou usados por outros módulos da aplicação, componentes, diretivas e serviços compartilhadas.

```html

|-- components -> Componentes que podem ser reutilizados em toda a aplicação.

|-- directives -> Diretivas que podem ser reutilizadas em toda a aplicação.

|-- models -> Interfaces que podem ser reutilizadas em toda a aplicação.

|-- services -> Services usados por mais de um caso de uso.

|-- utils -> Funções de utilidades que podem ser reutilizadas por toda a aplicação.

```

`assets ->` Diretório onde vão todos os arquivos de estilização da aplicação, seguindo os padrões de UI/UX determinados para o sistema.

```html

|-- img -> Imagens utilizadas por toda a aplicação.

|-- sass -> Arquivos de estilização em SCSS utilizadas por toda a aplicação.

```
