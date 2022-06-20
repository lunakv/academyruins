interface DiffItem {
  ruleNum: string;
  ruleText: string;
}

export interface Diff {
  old?: DiffItem;
  new?: DiffItem;
}
