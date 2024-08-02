import { Fetcher } from "../fetchers/fetcher";
import { Language } from "../Language";
import { Parser } from "../parsers/parser";
import { JsonListener } from "./JsonListener";

export class PhpListener extends JsonListener {
	constructor(
		public fetcher: Fetcher,
		public parser: Parser,
	) {
		super(fetcher, parser, Language.PHP);
	}
}