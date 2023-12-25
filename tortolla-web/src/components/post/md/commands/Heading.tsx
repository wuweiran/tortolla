import { ToolbarButton } from "@fluentui/react-components";
import { ToolBarCommandProps } from "../ToolBar.tsx";
import { DocumentHeader20Regular } from "@fluentui/react-icons";
import { ReactCodeMirrorRef } from "@uiw/react-codemirror";

const Heading = (props: ToolBarCommandProps) => {
  const execute = (editor: ReactCodeMirrorRef) => {
    const { state, view } = editor;
    if (!state || !view) return;
    const lineInfo = view.state.doc.lineAt(view.state.selection.main.from);
    let mark = '#';
    const matchMark = lineInfo.text.match(/^#+/);
    if (matchMark && matchMark[0]) {
      const txt = matchMark[0];
      if (txt.length < 6) {
        mark = txt + '#';
      }
    }
    if (mark.length > 6) {
      mark = '#';
    }
    const title = lineInfo.text.replace(/^#+/, '');
    view.dispatch({
      changes: {
        from: lineInfo.from,
        to: lineInfo.to,
        insert: `${mark} ${title}`,
      },
      // selection: EditorSelection.range(lineInfo.from + mark.length, lineInfo.to),
      selection: { anchor: lineInfo.from + mark.length + 1 },
    });
  };
  return (
    <ToolbarButton
      key={"heading"}
      icon={<DocumentHeader20Regular />}
      onClick={() => execute(props.editor)}
    />
  );
};

export default Heading;
