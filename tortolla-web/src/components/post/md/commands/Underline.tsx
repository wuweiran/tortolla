import { ToolbarButton } from "@fluentui/react-components";
import { ToolBarCommandProps } from "../ToolBar.tsx";
import { TextUnderline20Regular } from "@fluentui/react-icons";
import { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { EditorSelection } from "@codemirror/state";

const Underline = (props: ToolBarCommandProps) => {
  const execute = (editor: ReactCodeMirrorRef) => {
    const { state, view } = editor;
    if (!state || !view) return;
    view.dispatch(
      view.state.changeByRange((range) => ({
        changes: [
          { from: range.from, insert: "<u>" },
          { from: range.to, insert: "</u>" },
        ],
        range: EditorSelection.range(range.from + 3, range.to + 3),
      }))
    );
  };
  return (
    <ToolbarButton
      key={"underline"}
      icon={<TextUnderline20Regular />}
      onClick={() => execute(props.editor)}
    />
  );
};

export default Underline;
