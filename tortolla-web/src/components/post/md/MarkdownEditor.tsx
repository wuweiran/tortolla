import { Spinner, makeStyles, tokens } from "@fluentui/react-components";
import * as monaco from "monaco-editor";
import {
  RefObject,
  createRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import ToolBar from "./ToolBar.tsx";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
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
  editor: {
    height: "250px",
    paddingBottom: tokens.spacingVerticalS,
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
    const monacoContainer: RefObject<HTMLDivElement> = createRef();
    const monacoEditor = useRef<monaco.editor.IStandaloneCodeEditor>();

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
        {monacoEditor.current && <ToolBar editor={monacoEditor.current} />}
        <div ref={monacoContainer} className={styles.editor}>
          {!monacoEditor.current && <Spinner />}
        </div>
      </div>
    );
  }
);

export default MarkdownEditor;
