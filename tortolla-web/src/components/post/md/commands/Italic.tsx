import { ToolbarButton } from "@fluentui/react-components";
import { ToolBarCommandProps } from "../ToolBar.tsx";
import { TextItalic20Regular } from "@fluentui/react-icons";
import { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { EditorSelection } from "@codemirror/state";

const Italic = (props: ToolBarCommandProps) => {
  const execute = (editor: ReactCodeMirrorRef) => {
    const { state, view } = editor;
    if (!state || !view) return;
    view.dispatch(
      view.state.changeByRange((range) => ({
        changes: [
          { from: range.from, insert: '*' },
          { from: range.to, insert: '*' },
        ],
        range: EditorSelection.range(range.from + 1, range.to + 1),
      })),
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
