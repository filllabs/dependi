import { JsonParser } from "./JsonParser";

export class NpmParser extends JsonParser {
	constructor() {
		super('dependencies', 'devDependencies')
	}
}
