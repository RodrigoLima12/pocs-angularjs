import angular from 'angular';
import { ICadastro } from './interfaces/ICadastro';

export class NovaestruturaServiceBase {

  public $inject = [
    '$timeout'
  ];

  private entities: ICadastro[];

  constructor(
    private $timeout: angular.ITimeoutService
  ) {
    this.entities = [
      {
        id: '1',
        nome: 'Fulano da Silva',
        email: 'fulano@gmail.com'
      },
      {
        id: '2',
        nome: 'Beltrano Lopes',
        email: 'beltrano@gmail.com'
      }
    ]
  }

  public async save(form: ICadastro): Promise<string> {
    await this.$timeout(() => {
      form.id = this.entities.length.toString();

      this.entities.push(form);
    }, 3000);

    return form.id;
  }

  public async get(identification: string): Promise<ICadastro> {
    let entity: ICadastro;

    await this.$timeout(() => {
      entity = this.entities.find(entity => entity.id === identification);
    }, 3000);

    return entity;
  }

  public async getAll(): Promise<ICadastro[]> {
    let entities: ICadastro[];

    await this.$timeout(() => {
      entities = this.entities;
    }, 3000);

    return entities;
  }

  public async delete(identification: string): Promise<void> {
    await this.$timeout(() => {
      this.entities = this.entities.filter(entity => entity.id !== identification);
    }, 3000);
  }
}
