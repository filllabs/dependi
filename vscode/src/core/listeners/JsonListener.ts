import { Language } from "../Language";
import { Fetcher } from "../fetchers/fetcher";
import { Parser } from "../parsers/parser";
import { Listener } from "./listener";

export class JsonListener extends Listener {
  lang: Language;
  constructor(fetcher: Fetcher, parser: Parser, lang: Language) {
    super(fetcher, parser);
    this.lang = lang;
  }
}
