import { AppError } from '../errors/AppError';

export enum CharacterClass {
  JEDI = 'Jedi',
  SITH = 'Sith',
  USUARIO_DA_FORCA = 'Usuario da Forca',
  SOLDADO = 'Soldado',
  SENADOR = 'Senador',
  DIPLOMATA = 'Diplomata',
  CHANCELER = 'Chanceler',
  REI = 'Rei',
  CAVALEIRO_DE_REN = 'Cavaleiro de Ren',
  CONTRABANDISTA = 'Contrabandista',
  PILOTO = 'Piloto',
  CIVIL = 'Civil',
}

export enum CharacterRace {
  HUMANO = 'Humano',
  TWILEK = "Twi'lek",
  TOGRUTA = 'Togruta',
  WOOKIEE = 'Wookiee',
  ZABRAK = 'Zabrak',
  RODIANO = 'Rodiano',
  MON_CALAMARI = 'Mon Calamari',
  DATHOMIRIANO = 'Dathomiriano',
  DROIDE = 'Droide',
}

export enum CharacterAlliance {
  REPUBLICA = 'Republica',
  SEPARATISTA = 'Separatista',
  IMPERIO = 'Imperio',
  REBELDE = 'Rebelde',
  ORDEM_JEDI = 'Ordem Jedi',
  ORDEM_SITH = 'Ordem Sith',
  PRIMEIRA_ORDEM = 'Primeira Ordem',
  RESISTENCIA = 'Resistencia',
  CAVALEIROS_DE_REN = 'Cavaleiros de Ren',
}

export interface CharacterProps {
  id: string;
  nome: string;
  raca: CharacterRace;
  classes: CharacterClass[];
  aliancas: CharacterAlliance[];
  planetaNatal: string;
}

export class Character {
  private props: CharacterProps;

  constructor(props: CharacterProps) {
    if (!props.id || props.id.trim() === '') {
      throw new AppError('O personagem deve ter um ID definido!');
    }
    if (!props.nome || props.nome.trim() === '') {
      throw new AppError('O personagem deve ter um nome!');
    }
    if (!props.raca) {
      throw new AppError('O personagem deve ter uma raça definida!');
    }
    if (!props.classes || props.classes.length === 0) {
      throw new AppError('O personagem deve ter pelo menos uma classe!');
    }
    if (!props.aliancas || props.aliancas.length === 0) {
      throw new AppError('O personagem deve ter pelo menos uma aliança!');
    }
    if (!props.planetaNatal || props.planetaNatal.trim() === '') {
      throw new AppError('O personagem deve ter um planeta natal definido!');
    }

    this.props = {
      ...props,
      id: props.id.trim(),
      nome: props.nome.trim(),
    };
  }

  get id() {
    return this.props.id;
  }

  get nome() {
    return this.props.nome;
  }

  get raca() {
    return this.props.raca;
  }

  get classes() {
    return this.props.classes;
  }

  get aliancas() {
    return this.props.aliancas;
  }

  get planetaNatal() {
    return this.props.planetaNatal;
  }

  update(props: Partial<Omit<CharacterProps, 'id'>>) {
    if (props.nome !== undefined) this.props.nome = props.nome.trim();
    if (props.raca !== undefined) this.props.raca = props.raca;
    if (props.classes !== undefined) this.props.classes = props.classes;
    if (props.aliancas !== undefined) this.props.aliancas = props.aliancas;
    if (props.planetaNatal !== undefined) this.props.planetaNatal = props.planetaNatal;
  }
}