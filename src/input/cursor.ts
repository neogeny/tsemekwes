import type { TokenizingPatterns } from "@input/patterns.js";
import type { Configurable } from "../config/config.js";

export class Location {
	constructor(
		public source: string,
		public line: number,
		public col: number,
	) {}
}

export interface Cursor extends Configurable {
	inputSource(): string;
	mark(): number;
	reset(mark: number): void;
	len(): number;
	lineCount(): number;
	lineAt(n: number): string;
	linesAt(start: number, end: number): string[];
	asStr(): string;
	asRef(): string;
	ignoreCase(): boolean;
	nameGuard(): boolean;
	lookahead(start: number): string;
	atEnd(): boolean;
	next(): string | null;
	peek(): string | null;
	peekToken(token: string): boolean;
	matchToken(token: string): boolean;
	isNameChar(c: string): boolean;
	isName(s: string): boolean;
	matchPattern(pattern: string): [string, boolean];
	getPattern(pattern: string): RegExp | null;
	matchEOL(): boolean;
	nextToken(): void;
	pos(): [number, number];
	posAt(mark: number): [number, number];
	location(): Location;
	locationAt(mark: number): Location;
	setPatterns(patterns: TokenizingPatterns): void;
	setIgnoreCase(ignore: boolean): void;
	clone(): Cursor;
}
