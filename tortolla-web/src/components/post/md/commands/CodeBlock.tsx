import { ToolbarButton } from "@fluentui/react-components";
import { ToolBarCommandProps } from "../ToolBar.tsx";
import { CodeBlock20Regular } from "@fluentui/react-icons";
import * as monaco from "monaco-editor";

const CodeBlock = (props: ToolBarCommandProps) => {
  const execute = (editor: monaco.editor.IStandaloneCodeEditor) => {
    const model = editor.getModel();
    if (!model) return;
    const selection = editor.getSelection();
    if (!selection) return;
    editor.executeEdits("code-block", [
      {
        range: new monaco.Range(
          selection.startLineNumber,
          1,
          selection.startLineNumber,
          1
        ),
        text: "```js\n",
        forceMoveMarkers: true,
      },
      {
        range: new monaco.Range(
          selection.endLineNumber,
          model.getLineMaxColumn(selection.endLineNumber),
          selection.endLineNumber,
          model.getLineMaxColumn(selection.endLineNumber)
        ),
        text: "\n```",
        forceMoveMarkers: true,
      },
    ]);
    editor.setSelection(
      new monaco.Selection(
        selection.startLineNumber,
        1,
        selection.endLineNumber + 2,
        model.getLineMaxColumn(selection.endLineNumber + 2)
      )
    );
  };

  return (
    <ToolbarButton
      key={"codeBlock"}
      icon={<CodeBlock20Regular />}
      onClick={() => execute(props.editor)}
    />
  );
};

export default CodeBlock;
