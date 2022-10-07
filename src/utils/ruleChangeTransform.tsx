abstract class Block {
  abstract toJsx(): JSX.Element;
}

class JsxBlock extends Block {
  constructor(private jsx: JSX.Element) {
    super();
  }

  toJsx() {
    return this.jsx;
  }
}

interface ConstructorOf<T> {
  new (text: string): T;
}

abstract class TextBlock extends Block {
  text: string;

  constructor(text: string) {
    super();
    this.text = text;
  }

  toString() {
    return this.text;
  }

  protected wrapWithSpan(className: string) {
    return <span className={className}>{this.text}</span>;
  }

  cloneWith(text: string) {
    const cst = this.constructor as ConstructorOf<this>;
    return new cst(text);
  }
}

class SameText extends TextBlock {
  toJsx() {
    return <>{this.text}</>;
  }
}

abstract class Change extends TextBlock {
  static readonly regex: RegExp = /<<<<(.*?)>>>>/;
}

class Addition extends Change {
  toJsx() {
    return this.wrapWithSpan("new");
  }
}

class Removal extends Change {
  toJsx() {
    return this.wrapWithSpan("old");
  }
}

class NewRule extends TextBlock {
  toJsx() {
    return this.wrapWithSpan("add");
  }
}

class DeletedRule extends TextBlock {
  toJsx() {
    return this.wrapWithSpan("remove");
  }
}

// transforms the text of a rule into an array of TextBlocks, based on where the diff marks are
function detectChanges<T extends Change>(ruleText: string, type: ConstructorOf<T>): TextBlock[] {
  const split = ruleText.split(Change.regex);

  // every odd index is a separator
  return split.map((e, i) => (i % 2 === 1 ? new type(e) : new SameText(e)));
}

// given a list of blocks representing a subtype rule, return a string array of all subtypes participating in the changes
// this is needed because some subtypes are in Change blocks due to separator changes only, and those need to be removed
function getActualSubtypeChanges(text: TextBlock[]): string[] {
  return text
    .filter((e) => e instanceof Change)
    .map((e) => e.toString().replaceAll(/[,.]/g, ""))
    .reduce((acc: string[], val: string) => {
      acc.push(...val.split(" "));
      return acc;
    }, []);
}

// diffs of subtype rules are displayed differently from other diffs
function prettifySubtypes(oldText: TextBlock[], newText: TextBlock[]): [Block[], Block[]] {
  const regex = /^.+these subtypes are called (.+ types)\.|^.+(Ability words).+entries in the Comprehensive Rules./;

  const match = oldText[0].toString().match(regex);
  if (!match) return [oldText, newText];

  const matchName = match[1] || match[2].toLowerCase();
  const oldChanges = getActualSubtypeChanges(oldText);
  const newChanges = getActualSubtypeChanges(newText);

  const uniqueAdded = newChanges.filter((e) => !oldChanges.includes(e)).join(", ");
  const uniqueRemoved = oldChanges.filter((e) => !newChanges.includes(e)).join(", ");

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
