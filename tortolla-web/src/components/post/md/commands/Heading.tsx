import { ToolbarButton } from "@fluentui/react-components";
import { ToolBarCommandProps } from "../ToolBar.tsx";
import { DocumentHeader20Regular } from "@fluentui/react-icons";
import * as monaco from "monaco-editor";

const Heading = (props: ToolBarCommandProps) => {
  const execute = (editor: monaco.editor.IStandaloneCodeEditor) => {
    const model = editor.getModel();
    if (!model) return;
    const selection = editor.getSelection();
    if (!selection) return;
    const line = model.getLineContent(selection.startLineNumber);
    const startColumn = model.getLineMinColumn(selection.startLineNumber);
    let mark = "#";
    const matchMark = line.match(/^#+/);
    if (matchMark && matchMark[0]) {
      const txt = matchMark[0];
      if (txt.length < 6) {
        mark = txt + "#";
      }
    }
    if (mark.length > 6) {
      mark = "#";
    }
    const title = line.replace(/^#+/, "");
    editor.executeEdits("header", [
      {
        range: new monaco.Range(
          selection.startLineNumber,
          startColumn,
          selection.startLineNumber,
          model.getLineMaxColumn(selection.startLineNumber)
        ),
        text: `${mark} ${title}`,
        forceMoveMarkers: true,
      },
    ]);
    editor.setSelection(
      new monaco.Selection(
        selection.startLineNumber,
        startColumn + mark.length + 1,
        selection.startLineNumber,
        startColumn + mark.length + 1
      )
    );
  };

  return (
    <ToolbarButton
      key={"heading"}
      icon={<DocumentHeader20Regular />}
      onClick={() => execute(props.editor)}
    />
  );
};

export default Heading;
