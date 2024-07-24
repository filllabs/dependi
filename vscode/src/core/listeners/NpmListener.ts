import path from "node:path";
import { TextEditor, Uri, workspace } from "vscode";
import Dependency from "../Dependency";
import { Fetcher } from "../fetchers/fetcher";
import Item from "../Item";
import { Language } from "../Language";
import { Parser } from "../parsers/parser";
import { JsonListener } from "./JsonListener";
import { Settings } from "../../config";

export class NpmListener extends JsonListener {
	constructor(
		public fetcher: Fetcher,
		public parser: Parser,
	) {
		super(fetcher, parser, Language.JS)
  }

	async parseAndDecorate(editor: TextEditor) {
		let namespaces = await this.parsePrivateNameSpaces(editor);

		super.parseAndDecorate(editor, (dependencies) => { 
			if (!namespaces.length) {
				return dependencies;
			}

			return dependencies.filter(item => namespaces.every(ms => !item.key.startsWith(`${ms}/`)));
		});
	}

	async parsePrivateNameSpaces(editor: TextEditor) {
		let namespaces: string[] = [];

		try {
			const packageDir = path.dirname(editor.document.fileName);
			const dotNpmrcUri = Uri.parse(path.join(packageDir, '.npmrc'));
			const buf = await workspace.fs.readFile(dotNpmrcUri);
			const content = buf.toString();
			const lines = content.split('\n');
			const replacePattern = /\s*=\s*/;
	
			const padUrl = (url: string) => url.endsWith('/') ? url : `${url}/`;
			const configIndex = padUrl(Settings.npm.index);
	
			lines.forEach(line => {
				const trimmedLine = line.trim();

				// ignore comments
				if (trimmedLine.startsWith(';') || trimmedLine.startsWith('#')) {
					return;
				}
	
				if (trimmedLine) {
					const [name, index] = trimmedLine.replace(replacePattern, '=').split(':registry=');

					// if the index is not the same as the config index
					if (name && index && configIndex !== padUrl(index)) {
						namespaces.push(name);
					}
				}
			});
	
		} catch (e) {
			console.error(e);
		}
		return namespaces;
	}
}

var dependencies: Item[];
var fetchedDeps: Dependency[];
var fetchedDepsMap: Map<string, Dependency[]>;
var fetchedLatest: Dependency[];
var fetchedLatestsMap: Map<string, Dependency[]>;
export { dependencies, fetchedDeps, fetchedDepsMap, fetchedLatest, fetchedLatestsMap };
