import { Spinner, makeStyles, tokens } from "@fluentui/react-components";
import * as monaco from "monaco-editor";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import ToolBar from "./ToolBar.tsx";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import MarkdownPreview from "./MarkdownPreview.tsx";
export interface MarkdownEditorRef {
  getText: () => string;
}

const useStyles = makeStyles({
  root: {
    borderTopLeftRadius: tokens.borderRadiusMedium,
    borderTopRightRadius: tokens.borderRadiusMedium,
    borderBottomLeftRadius: tokens.borderRadiusMedium,
    borderBottomRightRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow8,
    marginBottom: tokens.spacingVerticalM,
  },
  wrapper: {
    height: "320px",
    paddingBottom: tokens.spacingVerticalS,
    position: "relative",
  },
  editor: {
    position: "absolute",
    top: 0,
    bottom: tokens.spacingVerticalS,
    width: "100%",
    zIndex: 1,
  },
  preview: {
    position: "absolute",
    top: tokens.spacingVerticalM,
    bottom: tokens.spacingVerticalM,
    borderTopLeftRadius: tokens.borderRadiusMedium,
    borderBottomLeftRadius: tokens.borderRadiusMedium,
    width: "50%",
    right: 0,
    zIndex: 2,
    backgroundColor: tokens.colorNeutralBackground1,
    paddingLeft: tokens.spacingHorizontalL,
    overflowX: "auto",
    overflowY: "scroll",
    boxShadow: tokens.shadow8,
  },
});

self.MonacoEnvironment = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getWorker: function (_workerId: string, _label: string) {
    return new editorWorker();
  },
};

const MarkdownEditor = forwardRef<MarkdownEditorRef>(
  function MarkdownEditor(_, ref) {
    const styles = useStyles();
    const monacoContainer = useRef<HTMLDivElement | null>(null);
    const preview = useRef<HTMLDivElement | null>(null);
    const monacoEditor = useRef<monaco.editor.IStandaloneCodeEditor>();
    const [text, setText] = useState<string>("");

    useEffect(() => {
      if (!monacoContainer.current || monacoEditor.current) {
        return;
      }

      const editor = monaco.editor.create(monacoContainer.current, {
        language: "markdown",
        minimap: {
          enabled: false,
        },
        automaticLayout: true,
      });

      monacoEditor.current = editor;
      editor.setValue(text);
      editor.onDidChangeModelContent(() => {
        setText(editor.getValue());
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        getText: () => {
          return monacoEditor.current ? monacoEditor.current.getValue() : "";
        },
      }),
      [monacoEditor]
    );

    return (
      <div className={styles.root}>
        <ToolBar editor={monacoEditor} preview={preview} />
        <div className={styles.wrapper}>
          {!monacoEditor.current && <Spinner />}
          <div ref={monacoContainer} className={styles.editor} />
          <div ref={preview} className={styles.preview} hidden>
            <MarkdownPreview source={text} />
          </div>
        </div>
      </div>
    );
  }
);

export default MarkdownEditor;
