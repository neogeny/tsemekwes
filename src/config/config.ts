export interface Configurable {
  configure(cfg: Cfg): void;
}

export class Cfg {
  source = "";
  ignoreCase = false;
  nameChars = "";
  nameGuard: boolean | null = null;
  whitespace: string | null = null;
  comments = "";
  eolComments = "";
}

export function defaultCfg(): Cfg {
  return new Cfg();
}
