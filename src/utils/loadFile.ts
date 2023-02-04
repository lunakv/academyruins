import { ChangeEvent } from "react";

function loadFile(onLoad: (_: any) => void) {
  return (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      onLoad(undefined);
      return;
    }
    const file = e.target.files[0] as File;
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      let text = (event.target?.result ?? "undefined") as string;
      const json = JSON.parse(text);
      onLoad(json);
    };
    reader.readAsText(file);
  };
}

export default loadFile;
