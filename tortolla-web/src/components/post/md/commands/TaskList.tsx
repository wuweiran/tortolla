import { ToolbarButton } from "@fluentui/react-components";
import { ToolBarCommandProps } from "../ToolBar.tsx";
import { TaskListSquareLtr20Regular } from "@fluentui/react-icons";
import * as monaco from "monaco-editor";

const TaskList = (props: ToolBarCommandProps) => {
  const execute = (editor: monaco.editor.IStandaloneCodeEditor) => {
    const model = editor.getModel();
    if (!model) return;
    const selection = editor.getSelection();
    if (!selection) return;
    const line = model.getLineContent(selection.startLineNumber);
    const startColumn = model.getLineMinColumn(selection.startLineNumber);
    let mark = "- [ ]  ";
    const matchMark = line.match(/^-\s\[\s\]\s/);
    if (matchMark && matchMark[0]) {
      mark = "";
    }
    editor.executeEdits("task-list", [
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
      key={"tlist"}
      icon={<TaskListSquareLtr20Regular />}
      onClick={() => execute(props.editor)}
    />
  );
};

export default TaskList;
