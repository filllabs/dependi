/**
 * Helps to manage decorations for the TOML files.
 */
import {
  DecorationInstanceRenderOptions,
  DecorationOptions,
  MarkdownString,
  Range,
  TextEditor,
} from "vscode";

import { validRange } from "semver";
import { CommandData } from "../commands/replacers";
import { Configs } from "../config";
import Item from "../core/Item";
import { CurrentLanguage, Language } from "../core/Language";
import { checkVersion, convertPythonVersionToSemver } from "../semver/semverUtils";
import DecorationPreferences from "./pref";

type DecorationType = "COMP" | "PATCH" | "INCOMP" | "ERROR";

/**
 * Create a decoration for the given crate.
 * @param editor
 * @param crate
 * @param version
 * @param versions
 */
export default function decoration(
  editor: TextEditor,
  item: Item,
  versions: string[],
  decorationPreferences: DecorationPreferences,
  lang: Language,
  vuln: Map<string, string[]> | undefined,
  error?: string,
): [DecorationOptions, DecorationType] {
  // Also handle json valued dependencies
  let version = item.value?.replace(",", "");
  const [satisfies, hasPatchUpdate, maxSatisfying] = checkVersion(version, versions);

  const formatError = (error: string) => {
    // Markdown does not like newlines in middle of emphasis, or spaces next to emphasis characters.
    const error_parts = error.split('\n');
    const markdown = new MarkdownString("#### Errors ");
    markdown.appendMarkdown("\n");
    // Ignore empty strings
    error_parts.filter(s => s).forEach(part => {
      markdown.appendMarkdown("* ");
      markdown.appendText(part.trim()); // Gets rid of Markdown-breaking spaces, then append text safely escaped.
      markdown.appendMarkdown("\n"); // Put the newlines back
    });
    return markdown;
  };
  let hoverMessage = new MarkdownString();

  const position = decorationPreferences.position;
  const renderOptions: DecorationInstanceRenderOptions = {
    [position]: {
      contentText: "",
    }
  };
  let type: DecorationType = "COMP";


  if (error) {
    hoverMessage = formatError(error);
    type = "ERROR";
  } else {

    appendVulnerabilities(hoverMessage, vuln, version!);

    hoverMessage.appendMarkdown("#### Versions");
    hoverMessage.appendMarkdown(getLinks(lang, item.key));
    hoverMessage.isTrusted = true;
    // Build markdown hover text
    appendVersions(hoverMessage, versions, item, maxSatisfying ?? "", vuln, decorationPreferences, lang);

    if (version == "?") {
      const version = versions[0];
      editor.edit((edit) => {
        edit.replace(item.range, version.slice(1, version.length - 2));
      });
      editor.document.save();
    }
    if (CurrentLanguage === Language.Python) {
      version = convertPythonVersionToSemver(version!);
    }
    if (!validRange(version)) {
      type = "ERROR";
    } else if (versions[0] !== maxSatisfying) {
      type = satisfies ? "COMP" : "INCOMP";
    }
    if (hasPatchUpdate && type === "COMP") {
      type = "PATCH";
    }
  }


  const contentText = getContentText(decorationPreferences, type);
  renderOptions[position]!.contentText = contentText.replace("${version}", versions[0]);

  const vulnerabilities = vuln?.get(version!);
  if (vulnerabilities && vulnerabilities.length > 0) {
    const vulnText = decorationPreferences.vulnText.replace("${count}", `${vulnerabilities?.length}`);
    renderOptions[position]!.contentText = renderOptions[position]!.contentText! + "\t" + vulnText;
  }

  // if local dependency, remove the content text just add version listing
  if (isLocal(version)) {
    renderOptions[position]!.contentText = "";
  }

  const deco: DecorationOptions = {
    range: position == "after" ? item.decoRange : new Range(item.line, 0, item.line, item.endOfLine),
    hoverMessage,
    renderOptions,
  };
  return [deco, type];
}

function isLocal(version?: string) {
  if (!version)
    return false;

  return version.startsWith("file:") ||
    version.startsWith("path:") ||
    version.startsWith("link:") ||
    version.startsWith("git:") ||
    version.startsWith("git+") ||
    version.startsWith("github:") ||
    version.startsWith("workspace:") ||
    version.startsWith("ssh:") ||
    version.startsWith("http:") ||
    version.startsWith("https:");

}

function getContentText(decorationPreferences: DecorationPreferences, type: string) {
  let contentText = decorationPreferences.compatibleText;
  switch (type) {
    case "PATCH":
      contentText = decorationPreferences.patchUpdateText;
      break;
    case "INCOMP":
      contentText = decorationPreferences.incompatibleText;
      break;
    case "ERROR":
      contentText = decorationPreferences.errorText;
      break;
  }
  return contentText;
}
function getLinks(lang: Language, key: string): string {
  const cleanKey = key.replace(/"/g, "");

  switch (lang) {
    case Language.Rust:
      return ` _([View crate](https://crates.io/crates/${cleanKey}) | [Check reviews](https://web.crev.dev/rust-reviews/crate/${cleanKey}))_`;
    case Language.Golang:
      return ` _([View module](https://pkg.go.dev/${cleanKey}) | [Check docs](https://pkg.go.dev/${cleanKey}#section-documentation))_`;
    case Language.JS:
      return ` _([View package](https://npmjs.com/package/${cleanKey}))_`;
    case Language.PHP:
      return ` _([View package](https://packagist.org/packages/${cleanKey}))_`;
    case Language.Python:
      return ` _([View package](https://pypi.org/project/${cleanKey}))_`;
    default:
      return '';
  }
}

function getDocsLink(lang: Language, key: string, version: string): string {
  switch (lang) {
    case Language.Rust:
      return `[(docs)](https://docs.rs/crate/${key}/${version})`;
    case Language.Golang:
      return `[(docs)](https://pkg.go.dev/${key}@${version}#section-documentation)`;
    case Language.JS:
      return `[(docs)](https://npmjs.com/package/${key}/v/${version})`;
    case Language.PHP:
      return `[(docs)](https://packagist.org/packages/${key}#${version})`;
    case Language.Python:
      return `[(docs)](https://pypi.org/project/${key}/${version})`;
    default:
      return '';
  }
}

function appendVulnerabilities(hoverMessage: MarkdownString, vuln: Map<string, string[]> | undefined, version: string) {
  const v = vuln?.get(version);
  if (v?.length) {
    hoverMessage.appendMarkdown("#### Vulnerabilities (Current)");
    const vulnTexts: string[] = [];
    v?.forEach((v) => {
      const tmp = ` - [${v}](https://osv.dev/vulnerability/${v}) \n`;
      vulnTexts.push(tmp);
    });
    hoverMessage.appendMarkdown("\n" + vulnTexts.join(""));
  }
}


function appendVersions(hoverMessage: MarkdownString, versions: string[], item: Item, maxSatisfying: string, vuln: Map<string, string[]> | undefined, decorationPreferences: DecorationPreferences, lang: Language) {

  for (let i = 0; i < versions.length; i++) {
    const version = versions[i];
    const v = vuln?.get(version);
    const data: CommandData = {
      key: item.key,
      version,
      startLine: item.range.start.line,
    };

    const isCurrent = version === maxSatisfying;
    const encoded = encodeURI(JSON.stringify(data));
    const docs = (i === 0 || isCurrent) ? (' ' + getDocsLink(lang, item.key, version)) : "";
    const vulnText = v?.length ? decorationPreferences.vulnText.replace("${count}", `${v?.length}`) : "";
    const command = `${isCurrent ? "**" : ""}[${version}](command:${Configs.REPLACE_VERSIONS}?${encoded})${docs}${isCurrent ? "**" : ""}  ${vulnText}`;
    hoverMessage.appendMarkdown("\n * ");
    hoverMessage.appendMarkdown(command);
  }
}
