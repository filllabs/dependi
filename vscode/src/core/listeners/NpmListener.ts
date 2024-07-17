import Dependency from "../Dependency";
import { Fetcher } from "../fetchers/fetcher";
import Item from "../Item";
import { Language } from "../Language";
import { Parser } from "../parsers/parser";
import { JsonListener } from "./JsonListener";

export class NpmListener extends JsonListener {
	constructor(
		public fetcher: Fetcher,
		public parser: Parser,
	) {
		super(fetcher, parser, Language.JS)
  }
}

var dependencies: Item[];
var fetchedDeps: Dependency[];
var fetchedDepsMap: Map<string, Dependency[]>;
var fetchedLatest: Dependency[];
var fetchedLatestsMap: Map<string, Dependency[]>;
export { dependencies, fetchedDeps, fetchedDepsMap, fetchedLatest, fetchedLatestsMap };
