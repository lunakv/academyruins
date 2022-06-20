class Change {
  text: string;

  constructor(text: string) {
    this.text = text;
  }

  toString() {
    return this.text;
  }
}
type ChangeText = Change | string;

const oldRegex = /old_start (.*?) old_end/;
const newRegex = /new_start (.*?) new_end/;

function detectChanges(ruleText: string, regex: RegExp): ChangeText[] {
  const split = ruleText.split(regex);

  // every odd index is a separator
  return split.map((e, i) => (i % 2 === 1 ? new Change(e) : e));
}

function prettifySubtypes(
  text: ChangeText[],
  old: boolean
): (ChangeText | JSX.Element)[] {
  const regex =
    /^.+these subtypes are called (.+ types)\.|^.+(Ability words).+entries in the Comprehensive Rules./;
  if (typeof text[0] !== "string") return text;

  const match = text[0].match(regex);
  if (!match) return text;

  const matchName = match[1] || match[2].toLowerCase();
  const changes = text.filter((e) => e instanceof Change);
  if (changes.length === 0) {
    return [
      match[0],
      <br />,
      `No ${matchName} were ${old ? "removed" : "added"} in this update.`,
    ];
  }

  return [
    match[0],
    <br />,
    `The ${old ? "old" : "new"} ${matchName} this update are: `,
    new Change(changes.map((c) => c.toString().slice(0, -1)).join(", ")),
  ];
}

function wrapChanges(
  changeArray: (ChangeText | JSX.Element)[],
  type: string
): (string | JSX.Element)[] {
  return changeArray.map((e) =>
    e instanceof Change ? <span className={type}>{e.text}</span> : e
  );
}

export function transformRuleText(
  text: string | undefined,
  isOld: boolean
): (string | JSX.Element)[] {
  if (!text) return [];
  const regex = isOld ? oldRegex : newRegex;
  const type = isOld ? "old" : "new";
  return wrapChanges(prettifySubtypes(detectChanges(text, regex), isOld), type);
}
