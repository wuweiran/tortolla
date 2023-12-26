import { ToolbarButton } from "@fluentui/react-components";
import { ToolBarCommandProps } from "../ToolBar.tsx";
import { Image20Regular } from "@fluentui/react-icons";
import * as monaco from "monaco-editor";

const Image = (props: ToolBarCommandProps) => {
  const execute = (editor: monaco.editor.IStandaloneCodeEditor) => {
    const model = editor.getModel();
    if (!model) return;
    const selection = editor.getSelection();
    if (!selection) return;
    const txt = model.getValueInRange(selection);
    editor.executeEdits("image", [
      { range: selection, text: `![](${txt})`, forceMoveMarkers: true },
    ]);
    editor.setSelection(
      new monaco.Selection(
        selection.startLineNumber,
        selection.startColumn + 4,
        selection.endLineNumber,
        selection.endColumn + 4
      )
    );
  };

  return (
    <ToolbarButton
      key={"image"}
      icon={<Image20Regular />}
      onClick={() => execute(props.editor)}
    />
  );
};

export default Image;
