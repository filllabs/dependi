import Dependency from "../Dependency";
import { Fetcher } from "../fetchers/fetcher";
import Item from "../Item";
import { Language } from "../Language";
import { Parser } from "../parsers/parser";
import { JsonListener } from "./JsonListener";

export class PhpListener extends JsonListener {
  constructor(
		public fetcher: Fetcher,
		public parser: Parser,
	) {
		super(fetcher, parser, Language.PHP)
  }
}

var dependencies: Item[];
var fetchedDeps: Dependency[];
var fetchedDepsMap: Map<string, Dependency[]>;
var fetchedLatest: Dependency[];
var fetchedLatestsMap: Map<string, Dependency[]>;
export { dependencies, fetchedDeps, fetchedDepsMap, fetchedLatest, fetchedLatestsMap };
