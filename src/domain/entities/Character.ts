import { AppError } from '../errors/AppError';

export enum CharacterClass {
  JEDI = 'JEDI',
  MESTRE_JEDI = 'MESTRE_JEDI',
  SITH = 'SITH',
  LORDE_SITH = 'LORDE_SITH',
  USUARIO_DA_FORCA = 'USUARIO_DA_FORCA',
  SOLDADO = 'SOLDADO',
  OFICIAL = 'OFICIAL',
  COMANDANTE = 'COMANDANTE',
  SENADOR = 'SENADOR',
  DIPLOMATA = 'DIPLOMATA',
  CHANCELER = 'CHANCELER',
  REI = 'REI',
  CAVALEIRO_DE_REN = 'CAVALEIRO_DE_REN',
  CONTRABANDISTA = 'CONTRABANDISTA',
  PILOTO = 'PILOTO',
  CIVIL = 'CIVIL',
}

export enum CharacterRace {
  HUMANO = 'HUMANO',
  TWILEK = 'TWILEK',
  TOGRUTA = 'TOGRUTA',
  WOOKIEE = 'WOOKIEE',
  ZABRAK = 'ZABRAK',
  RODIANO = 'RODIANO',
  MON_CALAMARI = 'MON_CALAMARI',
  DATHOMIRIANO = 'DATHOMIRIANO',
  DROIDE = 'DROIDE',
}

export enum CharacterAlliance {
  REPUBLICA = 'REPUBLICA',
  SEPARATISTA = 'SEPARATISTA',
  IMPERIO = 'IMPERIO',
  REBELDE = 'REBELDE',
  ORDEM_JEDI = 'ORDEM_JEDI',
  ORDEM_SITH = 'ORDEM_SITH',
  PRIMEIRA_ORDEM = 'PRIMEIRA_ORDEM',
  RESISTENCIA = 'RESISTENCIA',
  CAVALEIROS_DE_REN = 'CAVALEIROS_DE_REN',
}

export const CHARACTER_CLASS_EVOLUTION_TRACKS: CharacterClass[][] = [
  [CharacterClass.USUARIO_DA_FORCA, CharacterClass.JEDI, CharacterClass.MESTRE_JEDI],
  [CharacterClass.USUARIO_DA_FORCA, CharacterClass.SITH, CharacterClass.LORDE_SITH],
  [CharacterClass.SOLDADO, CharacterClass.OFICIAL, CharacterClass.COMANDANTE],
];

function isValidClassEvolution(fromClass: CharacterClass, toClass: CharacterClass): boolean {
  return CHARACTER_CLASS_EVOLUTION_TRACKS.some((track) => {
    const fromIndex = track.indexOf(fromClass);
    const toIndex = track.indexOf(toClass);
    return fromIndex !== -1 && toIndex === fromIndex + 1;
  });
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

  evolveClass(fromClass: CharacterClass, toClass: CharacterClass): void {
    if (!this.props.classes.includes(fromClass)) {
      throw new AppError(`O personagem não possui a classe "${fromClass}" para evoluir.`);
    }

    if (!isValidClassEvolution(fromClass, toClass)) {
      throw new AppError(`Não é possível evoluir de "${fromClass}" para "${toClass}".`);
    }

    this.props.classes = this.props.classes.map((classe) =>
      classe === fromClass ? toClass : classe,
    );
  }
}