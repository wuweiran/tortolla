import { ToolbarButton } from "@fluentui/react-components";
import { ToolBarCommandProps } from "../ToolBar.tsx";
import { TextBulletList20Regular } from "@fluentui/react-icons";
import { ReactCodeMirrorRef } from "@uiw/react-codemirror";

const OrderedList = (props: ToolBarCommandProps) => {
  const execute = (editor: ReactCodeMirrorRef) => {
    const { state, view } = editor;
    if (!state || !view) return;
    const lineInfo = view.state.doc.lineAt(view.state.selection.main.from);
    let mark = "1. ";
    const matchMark = lineInfo.text.match(/^\1\./);
    if (matchMark && matchMark[0]) {
      mark = "";
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
      key={"olist"}
      icon={<TextBulletList20Regular />}
      onClick={() => execute(props.editor)}
    />
  );
};

export default OrderedList;
