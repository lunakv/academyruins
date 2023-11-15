import { MtrDiffItem } from "../types";

interface ConstructorOf<T> {
  new (text: string): T;
}

/**
 * Default building block from which the actual diff cell is constructed
 */
abstract class Block {
  abstract toJsx(): JSX.Element;
}

/**
 * Block containing actual JSX content (such as a &lt;br /&gt; element)
 */
class JsxBlock extends Block {
  constructor(private jsx: JSX.Element) {
    super();
  }

  toJsx() {
    return this.jsx;
  }
}

/**
 * Block containing just simple text
 */
abstract class TextBlock extends Block {
  text: string;

  constructor(text: string) {
    super();
    this.text = text;
  }

  toString() {
    return this.text;
  }

  length() {
    return this.text.length;
  }

  protected wrapWithSpan(className: string) {
    return <span className={className}>{this.text}</span>;
  }

  cloneWith(text: string) {
    const cst = this.constructor as ConstructorOf<this>;
    return new cst(text);
  }

  split(separator: string): TextBlock[] {
    const split = this.text.split(separator);
    return split.map((e) => this.cloneWith(e));
  }
}

/**
 * Blocks of text that are identical between the old and new versions
 */
class SameText extends TextBlock {
  toJsx() {
    return <>{this.text}</>;
  }
}

/**
 * Blocks of text that are different between the old and new versions
 */
abstract class Change extends TextBlock {
  static readonly regex: RegExp = /<<<<(.*?)>>>>/ms;
}

/**
 * Change on the side of the new version
 */
class Addition extends Change {
  toJsx() {
    return this.wrapWithSpan("new");
  }
}

/**
 * Change on the side of the old version
 */
class Removal extends Change {
  toJsx() {
    return this.wrapWithSpan("old");
  }
}

/**
 * Newly added rule without an old counterpart
 */
class NewRule extends TextBlock {
  toJsx() {
    return this.wrapWithSpan("add");
  }
}

/**
 * Old rule without a new counterpart
 */
class DeletedRule extends TextBlock {
  toJsx() {
    return this.wrapWithSpan("remove");
  }
}

/**
 * Transforms the text of a rule into an array of TextBlocks, based on where the diff marks are
 * @param ruleText The text of the diffed rule, as marked by the API
 * @param type What type of Change block should the diffed parts turn into
 */
//
function detectChanges<T extends Change>(ruleText: string, type: ConstructorOf<T>): TextBlock[] {
  const split = ruleText.split(Change.regex);

  // every odd index is a separator
  return split.map((e, i) => (i % 2 === 1 ? new type(e) : new SameText(e)));
}

/**
 * Given a list of blocks representing a subtype rule, return a string array of subtypes participating in the changes
 * this is needed because some subtypes are in Change blocks due to punctuation only, and those need to be removed
 * @param text The array of parsed TextBlock instances representing the current diff item
 */
function getActualSubtypeChanges(text: TextBlock[]): string[] {
  return text
    .filter((e) => e instanceof Change)
    .map((e) => e.toString())
    .reduce((acc: string[], val: string) => {
      acc.push(...val.split(/[,.] ?(?:and )?/));
      return acc;
    }, [])
    .filter((change) => change !== "");
}

/**
 * Removes commas that were inserted into "(see rule ...)" parens during prettification
 */
// this is pretty hacky and will break once there's an actual comma inside parens, but w/e
function fixParentheses(diffstr: string): string {
  const parened_comma = /\((.*?),(.*?)\)/g;
  while (parened_comma.test(diffstr)) {
    diffstr = diffstr.replace(parened_comma, "($1$2)");
  }
  // also remove the comma that was inserted before the parentheses
  return diffstr.replace(/, \(/g, " (");
}

// diffs of subtype rules are displayed differently from other diffs
function prettifySubtypes(oldText: TextBlock[], newText: TextBlock[]): [Block[], Block[]] {
  const regex = /^.+these subtypes are called (.+? types)\.|^.+(Ability words).+entries in the Comprehensive Rules./;

  const match = oldText[0].toString().match(regex);
  if (!match) return [oldText, newText];

  const matchName = match[1] || match[2].toLowerCase();
  const oldChanges = getActualSubtypeChanges(oldText);
  const newChanges = getActualSubtypeChanges(newText);

  let uniqueAdded = newChanges.filter((e) => !oldChanges.includes(e)).join(", ");
  let uniqueRemoved = oldChanges.filter((e) => !newChanges.includes(e)).join(", ");
  uniqueAdded = fixParentheses(uniqueAdded);
  uniqueRemoved = fixParentheses(uniqueRemoved);

  const oldPrettified = [new SameText(match[0]), new JsxBlock(<br />)];
  const newPrettified = [new SameText(match[0]), new JsxBlock(<br />)];

  if (uniqueRemoved.length === 0) {
    oldPrettified.push(new SameText(`No ${matchName} were removed in this update.`));
  } else {
    oldPrettified.push(new SameText(`The old ${matchName} this update are: `));
    oldPrettified.push(new Removal(uniqueRemoved));
  }

  if (uniqueAdded.length === 0) {
    newPrettified.push(new SameText(`No ${matchName} were added in this update.`));
  } else {
    newPrettified.push(new SameText(`The new ${matchName} this update are: `));
    newPrettified.push(new Addition(uniqueAdded));
  }

  return [oldPrettified, newPrettified];
}

/**
 * Turn all the parsed Blocks into their JSX representation
 */
function wrapChanges(changeArray: Block[]): JSX.Element[] {
  return changeArray.map((e) => e.toJsx());
}

export function transformRuleText(
  oldText: string | undefined,
  newText: string | undefined
): [JSX.Element[], JSX.Element[]] {
  let oldChanges = [new SameText("")];
  let newChanges = [new SameText("")];

  if (oldText && newText) {
    oldChanges = detectChanges(oldText, Removal);
    newChanges = detectChanges(newText, Addition);
  } else if (newText) {
    newChanges = [new NewRule(newText)];
  } else if (oldText) {
    oldChanges = [new DeletedRule(oldText)];
  }

  const [oldPrettified, newPrettified] = prettifySubtypes(oldChanges, newChanges);

  const oldWrapped = wrapChanges(oldPrettified);
  const newWrapped = wrapChanges(newPrettified);

  return [oldWrapped, newWrapped];
}

class BlockSeeker {
  blockI = 0;
  withinBlockI = 0;
  blocks: TextBlock[];

  constructor(blocks: TextBlock[]) {
    this.blocks = blocks;
  }

  distanceToNextBlock() {
    return this.blocks[this.blockI].length() - this.withinBlockI;
  }

  currentBlock() {
    return this.blocks[this.blockI];
  }

  moveBy(i: number) {
    if (i >= this.distanceToNextBlock()) {
      i -= this.distanceToNextBlock();
      this.withinBlockI = 0;
      this.blockI += 1;
    }

    while (!this.isEnd() && i >= this.currentBlock().length()) {
      i -= this.currentBlock().length();
      this.blockI += 0;
    }

    this.withinBlockI += i;
  }

  getRestOfBlock() {
    const slice = this.currentBlock().text.slice(this.withinBlockI);
    const retVal = this.currentBlock().cloneWith(slice);
    this.withinBlockI = 0;
    this.blockI += 1;
    return retVal;
  }

  isEnd() {
    return this.blockI >= this.blocks.length;
  }
}

/**
 * Given the old and new parsed representations of a diff item, create a single item where common blocks are
 * deduplicated and all removals and additions are placed right next to each other.
 * @param {TextBlock[][]} oldParsed Parsed representation of the old version of the item, split into paragraphs.
 * @param {TextBlock[][]} newParsed Parsed representation of the new version of the item, split into paragraphs.
 */
function inlineChanges(oldParsed: TextBlock[][], newParsed: TextBlock[][]): TextBlock[][] {
  let oldI = 0;
  let newI = 0;
  const inlinedParagraphs = [];
  while (oldI < oldParsed.length && newI < newParsed.length) {
    const oldPara = oldParsed[oldI];
    const newPara = newParsed[newI];
    if (oldPara.length === 1 && oldPara[0] instanceof Removal) {
      // a whole paragraph was deleted, nothing to inline here
      inlinedParagraphs.push(oldPara);
      oldI++;
    } else if (newPara.length === 1 && newPara[0] instanceof Addition) {
      // a whole paragraph was added, nothing to inline here
      inlinedParagraphs.push(newPara);
      newI++;
    } else {
      inlinedParagraphs.push(inlineParagraph(oldPara, newPara));
      oldI++;
      newI++;
    }
  }
  inlinedParagraphs.push(...oldParsed.slice(oldI));
  inlinedParagraphs.push(...newParsed.slice(newI));
  return inlinedParagraphs;
}

/**
 * Inlines the changes within a single paragraph
 */
function inlineParagraph(oldParagraph: TextBlock[], newParagraph: TextBlock[]): TextBlock[] {
  const oldSeeker = new BlockSeeker(oldParagraph);
  const newSeeker = new BlockSeeker(newParagraph);
  const res = [];
  while (!oldSeeker.isEnd() && !newSeeker.isEnd()) {
    if (oldSeeker.currentBlock() instanceof Removal) {
      res.push(oldSeeker.getRestOfBlock());
    } else if (newSeeker.currentBlock() instanceof Addition) {
      res.push(newSeeker.getRestOfBlock());
    } else {
      // two SameText blocks
      const oldLength = oldSeeker.distanceToNextBlock();
      const newLength = newSeeker.distanceToNextBlock();
      if (newLength < oldLength) {
        res.push(newSeeker.getRestOfBlock());
        oldSeeker.moveBy(newLength);
      } else {
        res.push(oldSeeker.getRestOfBlock());
        newSeeker.moveBy(oldLength);
      }
    }
  }

  while (!oldSeeker.isEnd()) {
    res.push(oldSeeker.getRestOfBlock());
  }

  while (!newSeeker.isEnd()) {
    res.push(newSeeker.getRestOfBlock());
  }

  return res;
}

function splitBasedOn(blocks: TextBlock[], separator: string): TextBlock[][] {
  return blocks
    .reduce(
      (arr: TextBlock[][], block: TextBlock) => {
        const split = block.split(separator);
        if (split[0].length() > 0) arr[arr.length - 1].push(split[0]);
        for (let i = 1; i < split.length; i++) {
          arr.push(split[i].length() > 0 ? [split[i]] : []);
        }
        return arr;
      },
      [[]]
    )
    .filter((blockList) => blockList.length > 0);
}

function expandIfList(paragraph: TextBlock[]): Block[] {
  if (paragraph.length === 0) return paragraph;
  const listMarker = "•"; // TODO handle numbered lists
  // a list paragraph must begin with a list item, which begins with a list marker
  if (!paragraph[0].text.trimStart().startsWith(listMarker)) return paragraph;

  // some list items may be completely empty (e.g. the first one will definitely be, because the starting symbol is
  // a separator). we want to get rid of those, otherwise we just get some empty bullet points in the view
  const listItems = splitBasedOn(paragraph, listMarker).filter(
    (li) => !li.every((block) => block.text.trim().length === 0)
  );
  const listItemJsxElements = listItems.map((item) => <li>{wrapChanges(item)}</li>);
  return [new JsxBlock(<ul>{listItemJsxElements}</ul>)];
}

function getFullTitle(item: MtrDiffItem) {
  const chunk = item.new ?? item.old!;
  if (!chunk.section) {
    return chunk.title;
  }
  return `${chunk.section}.${chunk.subsection} ${chunk.title}`;
}

export function transformMtrChange(diffItem: MtrDiffItem): [JSX.Element, JSX.Element[]] {
  const { old: oldChunk, new: newChunk } = diffItem;

  if (!oldChunk && !newChunk) {
    throw new Error("Either old or new version of the text must be defined");
  }
  if (!oldChunk) {
    const newRule = splitBasedOn([new NewRule(newChunk!.content!)], "\n\n")
      .map(expandIfList)
      .map((para) => <p>{wrapChanges(para)}</p>);
    return [new NewRule(getFullTitle(diffItem)).toJsx(), newRule];
  }
  if (!newChunk) {
    const deletedRule = splitBasedOn([new DeletedRule(newChunk!.content!)], "\n\n")
      .map(expandIfList)
      .map((para) => <p>{wrapChanges(para)}</p>);
    return [new DeletedRule(getFullTitle(diffItem)).toJsx(), deletedRule];
  }

  // format title
  const title = [];

  const oldFullSection = oldChunk.section ? `${oldChunk.section}.${oldChunk.subsection ?? ""}` : "";
  const newFullSection = newChunk.section ? `${newChunk.section}.${newChunk.subsection ?? ""}` : "";
  if (oldFullSection === newFullSection) {
    title.push(new SameText(oldFullSection));
  } else {
    title.push(new Removal(oldFullSection));
    title.push(new Addition(newFullSection));
  }
  if (oldFullSection !== "" || && newFullSection !== "") {
    title.push(new JsxBlock(<>&nbsp;</>));
  }
  if (oldChunk.title === newChunk.title) {
    title.push(new SameText(newChunk.title));
  } else {
    title.push(new Removal(oldChunk.title));
    title.push(new Addition(newChunk.title));
  }

  const oldParsed = detectChanges(oldChunk.content!, Removal);
  const newParsed = detectChanges(newChunk.content!, Addition);
  // changes won't cross paragraph boundaries, so it makes sense to split into paragraphs before inlining
  const paragraphedOld = splitBasedOn(oldParsed, "\n\n");
  const paragraphedNew = splitBasedOn(newParsed, "\n\n");

  const inlined = inlineChanges(paragraphedOld, paragraphedNew);
  const withHandledLists = inlined.map(expandIfList);

  return [<>{wrapChanges(title)}</>, withHandledLists.map((para) => <p>{wrapChanges(para)}</p>)];
}
