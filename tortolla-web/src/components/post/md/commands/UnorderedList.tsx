import { ToolbarButton } from "@fluentui/react-components";
import { ToolBarCommandProps } from "../ToolBar.tsx";
import { TextNumberListLtr20Regular } from "@fluentui/react-icons";
import { ReactCodeMirrorRef } from "@uiw/react-codemirror";

const UnorderedList = (props: ToolBarCommandProps) => {
  const execute = (editor: ReactCodeMirrorRef) => {
    const { state, view } = editor;
    if (!state || !view) return;
    const lineInfo = view.state.doc.lineAt(view.state.selection.main.from);
    let mark = '- ';
    const matchMark = lineInfo.text.match(/^-/);
    if (matchMark && matchMark[0]) {
      mark = '';
    }
    view.dispatch({
      changes: {
        from: lineInfo.from,
        to: lineInfo.to,
        insert: `${mark}${lineInfo.text}`,
      },
      // selection: EditorSelection.range(lineInfo.from + mark.length, lineInfo.to),
      selection: { anchor: view.state.selection.main.from + mark.length },
    });
  };
  return (
    <ToolbarButton
      key={"ulist"}
      icon={<TextNumberListLtr20Regular />}
      onClick={() => execute(props.editor)}
    />
  );
};

export default UnorderedList;
