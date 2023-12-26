import { ToolbarButton } from "@fluentui/react-components";
import { ToolBarCommandProps } from "../ToolBar.tsx";
import { TextItalic20Regular } from "@fluentui/react-icons";
import * as monaco from "monaco-editor";

const Italic = (props: ToolBarCommandProps) => {
  const execute = (editor: monaco.editor.IStandaloneCodeEditor) => {
    const model = editor.getModel();
    if (!model) return;
    const selection = editor.getSelection();
    if (!selection) return;
    editor.executeEdits("italic", [
      {
        range: new monaco.Range(
          selection.startLineNumber,
          selection.startColumn,
          selection.startLineNumber,
          selection.startColumn
        ),
        text: "*",
        forceMoveMarkers: true,
      },
      {
        range: new monaco.Range(
          selection.endLineNumber,
          selection.endColumn,
          selection.endLineNumber,
          selection.endColumn
        ),
        text: "*",
        forceMoveMarkers: true,
      },
    ]);
    editor.setSelection(
      new monaco.Selection(
        selection.startLineNumber,
        selection.startColumn,
        selection.endLineNumber,
        selection.endColumn + 2
      )
    );
  };

  return (
    <ToolbarButton
      key={"italic"}
      icon={<TextItalic20Regular />}
      onClick={() => execute(props.editor)}
    />
  );
};

export default Italic;
