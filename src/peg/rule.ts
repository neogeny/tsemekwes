import type { Exp } from "./exp.js";

export class Rule {
  constructor(
    public name: string,
    public exp: Exp,
    public params: string[] = [],
    public kwParams: Map<string, string> = new Map(),
    public decorators: string[] = [],
    public base: string = "",
    public isName: boolean = false,
    public isTokn: boolean = false,
    public noMemo: boolean = false,
    public noStak: boolean = false,
    public isMemo: boolean = false,
    public isLrec: boolean = false,
  ) {}

  isToken(): boolean {
    if (this.isTokn) return true;
    for (const c of this.name) {
      if (c !== "_") return c === c.toUpperCase() && c !== c.toLowerCase();
    }
    return false;
  }

  isLeftRecursive(): boolean {
    return this.isLrec;
  }

  isMemoizable(): boolean {
    return this.isLrec || (this.isMemo && !this.noMemo);
  }

  shouldTrace(): boolean {
    return !this.noStak && !this.isToken();
  }

  normalize(): void {
    // No-op in TS: defaults handled by constructor params
  }
}
