import { ToolbarButton } from "@fluentui/react-components";
import { ToolBarCommandProps } from "../ToolBar.tsx";
import { Link20Regular } from "@fluentui/react-icons";
import { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { EditorSelection } from "@codemirror/state";

const Link = (props: ToolBarCommandProps) => {
  const execute = (editor: ReactCodeMirrorRef) => {
    const { state, view } = editor;
    if (!state || !view) return;
    const main = view.state.selection.main;
    const txt = view.state.sliceDoc(view.state.selection.main.from, view.state.selection.main.to);
    view.dispatch({
      changes: {
        from: main.from,
        to: main.to,
        insert: `[${txt}]()`,
      },
      selection: EditorSelection.range(main.from + 3 + txt.length, main.to + 3),
      // selection: { anchor: main.from + 4 },
    });
  };
  return (
    <ToolbarButton
      key={"link"}
      icon={<Link20Regular />}
      onClick={() => execute(props.editor)}
    />
  );
};

export default Link;
