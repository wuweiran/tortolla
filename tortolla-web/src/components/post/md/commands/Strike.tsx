import { ToolbarButton } from "@fluentui/react-components";
import { ToolBarCommandProps } from "../ToolBar.tsx";
import { TextStrikethrough20Regular } from "@fluentui/react-icons";
import * as monaco from "monaco-editor";

const Strike = (props: ToolBarCommandProps) => {
  const execute = (editor: monaco.editor.IStandaloneCodeEditor) => {
    const model = editor.getModel();
    if (!model) return;
    const selection = editor.getSelection();
    if (!selection) return;
    editor.executeEdits("strikethrough", [
      { range: selection, text: "~~", forceMoveMarkers: true },
      {
        range: new monaco.Range(
          selection.endLineNumber,
          selection.endColumn,
          selection.endLineNumber,
          selection.endColumn
        ),
        text: "~~",
        forceMoveMarkers: true,
      },
    ]);
    editor.setSelection(
      new monaco.Selection(
        selection.startLineNumber,
        selection.startColumn + 2,
        selection.endLineNumber,
        selection.endColumn + 2
      )
    );
  };

  return (
    <ToolbarButton
      key={"strike"}
      icon={<TextStrikethrough20Regular />}
      onClick={() => props.editor.current && execute(props.editor.current)}
    />
  );
};

export default Strike;
