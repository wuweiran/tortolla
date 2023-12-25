import { ToolbarButton } from "@fluentui/react-components";
import { ToolBarCommandProps } from "../ToolBar.tsx";
import { CodeBlock20Regular } from "@fluentui/react-icons";
import { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { EditorSelection } from "@codemirror/state";

const CodeBlock = (props: ToolBarCommandProps) => {
  const execute = (editor: ReactCodeMirrorRef) => {
    const { state, view } = editor;
    if (!state || !view) return;
    const main = view.state.selection.main;
    const txt = view.state.sliceDoc(
      view.state.selection.main.from,
      view.state.selection.main.to
    );
    view.dispatch({
      changes: {
        from: main.from,
        to: main.to,
        insert: `\`\`\`js\n${txt}\n\`\`\``,
      },
      selection: EditorSelection.range(main.from + 3, main.from + 5),
    });
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
