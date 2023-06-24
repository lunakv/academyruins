interface CrDiffRule {
  ruleNumber: string;
  ruleText: string;
}

export interface CrDiffItem {
  old?: CrDiffRule;
  new?: CrDiffRule;
}

export interface MtrChunk {
  section: number | undefined;
  subsection: number | undefined;
  title: string;
  content: string | undefined;
}

export interface MtrDiffItem {
  old: MtrChunk | undefined;
  new: MtrChunk | undefined;
}
