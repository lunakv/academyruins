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

interface ChangeConstructor<T> extends ConstructorOf<T> {
  regex: RegExp;
}

abstract class Change extends TextBlock {}

class Addition extends Change {
  static readonly regex: RegExp = /new_start (.*?) new_end/;

  toJsx() {
    return this.wrapWithSpan("new");
  }
}

class Removal extends Change {
  static readonly regex = /old_start (.*?) old_end/;
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

const oldRegex = /old_start (.*?) old_end/;
const newRegex = /new_start (.*?) new_end/;

function detectChanges<T extends Change>(
  ruleText: string,
  regex: RegExp,
  type: ChangeConstructor<T>
): TextBlock[] {
  const split = ruleText.split(type.regex);

  // every odd index is a separator
  return split.map((e, i) => (i % 2 === 1 ? new type(e) : new SameText(e)));
}

function prettifySubtypes(text: TextBlock[], old: boolean): Block[] {
  const regex =
    /^.+these subtypes are called (.+ types)\.|^.+(Ability words).+entries in the Comprehensive Rules./;

  const match = text[0].toString().match(regex);
  if (!match) return text;

  const matchName = match[1] || match[2].toLowerCase();
  const changes = text.filter((e) => e instanceof Change);

  const retVal = [new SameText(match[0]), new JsxBlock(<br />)];

  if (changes.length === 0) {
    retVal.push(
      new SameText(
        `No ${matchName} were ${old ? "removed" : "added"} in this update.`
      )
    );
  } else {
    // the changes include a trailing comma, hence the slice
    const changeList = changes.map((c) => c.toString().slice(0, -1)).join(", ");
    retVal.push(
      ...[
        new SameText(
          `The ${old ? "old" : "new"} ${matchName} this update are: `
        ),
        changes[0].cloneWith(changeList),
      ]
    );
  }

  return retVal;
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
    oldChanges = detectChanges(oldText, oldRegex, Removal);
    newChanges = detectChanges(newText, newRegex, Addition);
  } else if (newText) {
    newChanges = [new NewRule(newText)];
  } else if (oldText) {
    oldChanges = [new DeletedRule(oldText)];
  }

  const oldWrapped = wrapChanges(prettifySubtypes(oldChanges, true));
  const newWrapped = wrapChanges(prettifySubtypes(newChanges, false));
  return [oldWrapped, newWrapped];
}
