import { Fetcher } from "../fetchers/fetcher";
import { Parser } from "../parsers/parser";
import { Listener } from "./listener";

export class PnpmWorkspaceListener extends Listener {
  constructor(fetcher: Fetcher, parser: Parser) {
    super(fetcher, parser);
  }
}
