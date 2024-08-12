import {
  Spinner,
  createPresenceComponent,
  makeStyles,
  motionTokens,
  tokens,
} from "@fluentui/react-components";
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
    width: "50%",
    top: tokens.spacingVerticalM,
    bottom: tokens.spacingVerticalM,
    right: 0,
    zIndex: 2,
    backgroundColor: tokens.colorNeutralBackground1,
    borderTopLeftRadius: tokens.borderRadiusMedium,
    borderBottomLeftRadius: tokens.borderRadiusMedium,
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

const Fade = createPresenceComponent({
  enter: {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    duration: motionTokens.durationSlower,
  },
  exit: {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    duration: motionTokens.durationSlow,
  },
});

const MarkdownEditor = forwardRef<MarkdownEditorRef>(
  function MarkdownEditor(_, ref) {
    const styles = useStyles();
    const monacoContainer = useRef<HTMLDivElement | null>(null);
    const [isPreviewVisible, setPreviewVisibility] = useState(false);
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
      editor.onDidChangeModelContent(() => {
        setText(editor.getValue());
      });
      setText(editor.getValue());

      return () => {
        monacoEditor.current?.dispose();
        monacoEditor.current = undefined;
      };
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
        <ToolBar
          editor={monacoEditor}
          setPreviewVisibility={setPreviewVisibility}
        />
        <div className={styles.wrapper}>
          {!monacoEditor.current && <Spinner />}
          <div ref={monacoContainer} className={styles.editor} />
          <Fade visible={isPreviewVisible}>
            <div className={styles.preview}>
              <MarkdownPreview source={text} />
            </div>
          </Fade>
        </div>
      </div>
    );
  }
);

export default MarkdownEditor;
