import { ToolbarButton } from "@fluentui/react-components";
import { ToolBarCommandProps } from "../ToolBar.tsx";
import { TextBold20Regular } from "@fluentui/react-icons";
import { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { EditorSelection } from "@codemirror/state";

const Bold = (props: ToolBarCommandProps) => {
  const execute = (editor: ReactCodeMirrorRef) => {
    const { state, view } = editor;
    if (!state || !view) return;
    view.dispatch(
      view.state.changeByRange((range) => ({
        changes: [
          { from: range.from, insert: "**" },
          { from: range.to, insert: "**" },
        ],
        range: EditorSelection.range(range.from + 2, range.to + 2),
      }))
    );
  };
  return (
    <ToolbarButton
      key={"bold"}
      icon={<TextBold20Regular />}
      onClick={() => execute(props.editor)}
    />
  );
};

export default Bold;
