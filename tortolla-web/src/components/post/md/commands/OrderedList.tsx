import { ToolbarButton } from "@fluentui/react-components";
import { ToolBarCommandProps } from "../ToolBar.tsx";
import { TextBulletList20Regular } from "@fluentui/react-icons";
import * as monaco from "monaco-editor";

const OrderedList = (props: ToolBarCommandProps) => {
  const execute = (editor: monaco.editor.IStandaloneCodeEditor) => {
    const model = editor.getModel();
    if (!model) return;
    const selection = editor.getSelection();
    if (!selection) return;
    const line = model.getLineContent(selection.startLineNumber);
    const startColumn = model.getLineMinColumn(selection.startLineNumber);
    let mark = "1. ";
    const matchMark = line.match(/^\d+\./);
    if (matchMark && matchMark[0]) {
      mark = "";
    }
    editor.executeEdits("ordered-list", [
      {
        range: new monaco.Range(
          selection.startLineNumber,
          startColumn,
          selection.startLineNumber,
          model.getLineMaxColumn(selection.startLineNumber)
        ),
        text: `${mark}${line}`,
        forceMoveMarkers: true,
      },
    ]);
    editor.setSelection(
      new monaco.Selection(
        selection.startLineNumber,
        startColumn + mark.length,
        selection.startLineNumber,
        startColumn + mark.length
      )
    );
  };

  return (
    <ToolbarButton
      key={"olist"}
      icon={<TextBulletList20Regular />}
      onClick={() => execute(props.editor)}
    />
  );
};

export default OrderedList;
