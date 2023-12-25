import React, { useState, useRef, useImperativeHandle, Fragment, useEffect, useCallback } from 'react';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { EditorView, ViewUpdate } from '@codemirror/view';
import * as events from '@uiw/codemirror-extensions-events';
import CodeMirror, { ReactCodeMirrorProps, ReactCodeMirrorRef } from '@uiw/react-codemirror';
import MarkdownPreview, { MarkdownPreviewProps } from '@uiw/react-markdown-preview';
import ToolBar from './ToolBar.tsx';
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';

const defaultTheme = createTheme({
    theme: 'light',
    settings: {
      background: 'var(--color-canvas-subtle)',
      foreground: 'var(--color-fg-default)',
      caret: 'var(--color-fg-default)',
      selection: 'var(--color-border-default)',
      selectionMatch: 'var(--color-border-muted)',
      lineHighlight: 'var(--color-neutral-muted)',
      gutterBackground: 'var(--color-canvas-subtle)',
      gutterForeground: 'var(--color-fg-muted)',
      gutterBorder: 'var(--color-border-muted)',
    },
    styles: [
      { tag: t.comment, color: 'var(--color-prettylights-syntax-comment)' },
      { tag: t.variableName, color: 'var(--color-prettylights-syntax-variable)' },
      { tag: [t.string, t.special(t.brace)], color: 'var(--color-prettylights-syntax-entity)' },
      { tag: t.number, color: 'var(--color-prettylights-syntax-variable)' },
      { tag: [t.bool, t.null], color: 'var(--color-prettylights-syntax-entity)' },
      { tag: t.keyword, color: 'var(--color-prettylights-syntax-keyword)', fontWeight: 'bold' },
      { tag: t.string, color: 'var(--color-prettylights-syntax-string)' },
      { tag: t.operator, color: 'var(--color-accent-emphasis)' },
      { tag: t.deleted, color: 'var(--color-prettylights-syntax-markup-deleted-bg)' },
      { tag: t.deleted, color: 'red' },
      { tag: t.className, color: 'var(--color-prettylights-syntax-variable)' },
      { tag: t.definition(t.typeName), color: 'var(--color-prettylights-syntax-entity)' },
      { tag: t.typeName, color: 'var(--color-prettylights-syntax-entity)' },
      { tag: t.list, color: 'var(--color-prettylights-syntax-markup-list)' },
      { tag: t.heading, color: 'var(--color-prettylights-syntax-markup-heading)', fontWeight: 'bold' },
      { tag: t.regexp, color: 'var(--color-prettylights-syntax-string-regexp)' },
      { tag: t.literal, color: 'var(--color-prettylights-syntax-markup-italic)' },
      {
        tag: t.link,
        color: 'var(--color-prettylights-syntax-constant-other-reference-link)',
        textDecoration: 'underline',
      },
      { tag: t.angleBracket, color: 'var(--color-fg-default)' },
      { tag: t.tagName, color: 'var(--color-prettylights-syntax-entity-tag)' },
      { tag: t.attributeName, color: 'var(--color-prettylights-syntax-constant)' },
    ],
  });

export const scrollerStyle = EditorView.theme({
  '&.cm-editor, & .cm-scroller': {
    borderBottomRightRadius: '3px',
    borderBottomLeftRadius: '3px',
  },
});

export interface IMarkdownEditor extends ReactCodeMirrorProps {
  className?: string;
  prefixCls?: string;
  /** The raw markdown that will be converted to html (**required**) */
  value?: string;
  /** Shows a preview that will be converted to html. */
  visible?: boolean;
  visibleEditor?: boolean;
  /** Override the default preview component */
  renderPreview?: (props: MarkdownPreviewProps, initVisible: boolean) => React.ReactNode;
  /** Preview expanded width @default `50%` */
  previewWidth?: string;
  /** Whether to enable preview function @default `true` */
  enablePreview?: boolean;
  /** Whether to enable scrolling */
  enableScroll?: boolean;
  /** Toolbar on bottom */
  toolbarBottom?: boolean;
  /** Option to hide the tool bar. */
  hideToolbar?: boolean;
  /** [@uiw/react-markdown-preview](https://github.com/uiwjs/react-markdown-preview#options-props) options */
  previewProps?: MarkdownPreviewProps;
  /** replace the default `extensions` */
  reExtensions?: ReactCodeMirrorProps['extensions'];
  /** Edit mode and preview mode switching event */
  onPreviewMode?: (isHide: boolean) => void;
}

export interface ToolBarProps {
  editor: React.RefObject<ReactCodeMirrorRef>;
  preview: React.RefObject<HTMLDivElement>;
  container: React.RefObject<HTMLDivElement>;
  containerEditor: React.RefObject<HTMLDivElement>;
  editorProps: IMarkdownEditor;
}

export interface MarkdownEditorRef {
  editor: React.RefObject<ReactCodeMirrorRef>;
  preview: React.RefObject<HTMLDivElement> | null;
}

const MarkdownEditor: MarkdownEditorComponent = React.forwardRef<MarkdownEditorRef, IMarkdownEditor>(
  MarkdownEditorInternal,
) as unknown as MarkdownEditorComponent;

type MarkdownEditorComponent = React.FC<React.PropsWithRef<IMarkdownEditor>> & {
  Markdown: typeof MarkdownPreview;
};

MarkdownEditor.Markdown = MarkdownPreview;

export default MarkdownEditor;

function MarkdownEditorInternal(
  props: IMarkdownEditor,
  ref?: ((instance: MarkdownEditorRef) => void) | React.RefObject<MarkdownEditorRef> | null,
) {
  const {
    prefixCls = 'md-editor',
    className,
    onChange,
    visible = true,
    renderPreview,
    visibleEditor = true,
    hideToolbar = true,
    toolbarBottom = false,
    enableScroll = true,
    enablePreview = true,
    previewProps = {},
    extensions = [],
    previewWidth = '50%',
    reExtensions,
    ...codemirrorProps
  } = props;
  const [value, setValue] = useState(props.value || '');
  const codeMirror = useRef<ReactCodeMirrorRef>(null);
  const container = useRef<HTMLDivElement>(null);
  const containerEditor = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const active = useRef<'editor' | 'preview'>('editor');

  useImperativeHandle(
    ref,
    () => ({
      editor: codeMirror,
      preview: preview,
    }),
    [codeMirror],
  );

  const toolBarProps: ToolBarProps = {
    preview: preview,
    editor: codeMirror,
    container: container,
    containerEditor: containerEditor,
    editorProps: { ...props, previewWidth },
  };
  const height = typeof codemirrorProps.height == "number" ? `${codemirrorProps.height}px` : codemirrorProps.height;

  const preValue = props.value;
  useEffect(() => setValue(preValue ?? ''), [preValue]);

  const previewScrollHandle = useCallback(
    (event: Event) => {
      if (!enableScroll) return;
      const target = event.target as HTMLDivElement;
      const percent = target.scrollTop / target.scrollHeight;
      if (active.current === 'editor' && preview.current) {
        const previewHeihgt = preview.current?.scrollHeight || 0;
        preview.current.scrollTop = previewHeihgt * percent;
      } else if (codeMirror.current && codeMirror.current.view) {
        const editorScrollDom = codeMirror.current.view.scrollDOM;
        const editorScrollHeihgt = codeMirror.current.view.scrollDOM.scrollHeight || 0;
        editorScrollDom.scrollTop = editorScrollHeihgt * percent;
      }
    },
    [enableScroll],
  );
  const mouseoverHandle = () => (active.current = 'preview');
  const mouseleaveHandle = () => (active.current = 'editor');
  useEffect(() => {
    const $preview = preview.current;
    if ($preview && enableScroll) {
      $preview.addEventListener('mouseover', mouseoverHandle, false);
      $preview.addEventListener('mouseleave', mouseleaveHandle, false);
      $preview.addEventListener('scroll', previewScrollHandle, false);
    }
    return () => {
      if ($preview && enableScroll) {
        $preview.removeEventListener('mouseover', mouseoverHandle);
        $preview.removeEventListener('mouseleave', mouseoverHandle);
        $preview.addEventListener('mouseleave', previewScrollHandle, false);
      }
    };
  }, [preview, enableScroll, previewScrollHandle]);

  const scrollExtensions = events.scroll({
    scroll: previewScrollHandle,
  });

  const extensionsData: IMarkdownEditor['extensions'] = reExtensions
    ? reExtensions
    : [markdown({ base: markdownLanguage, codeLanguages: languages }), scrollerStyle, ...extensions];
  if (enableScroll) {
    extensionsData.push(scrollExtensions);
  }
  const clsPreview = `${prefixCls}-preview`;
  const cls = [prefixCls, 'wmde-markdown-var', className].filter(Boolean).join(' ');
  previewProps['source'] = value;
  const handleChange = (value: string, viewUpdate: ViewUpdate) => {
    setValue(value);
    onChange && onChange(value, viewUpdate);
  };
  const conentView = (
    <div className={`${prefixCls}-content`} style={{ height: codemirrorProps.height }}>
      <div className={`${prefixCls}-content-editor`} ref={containerEditor}>
        {visibleEditor && (
          <CodeMirror
            theme={defaultTheme}
            {...codemirrorProps}
            className={`${prefixCls}-inner`}
            extensions={extensionsData}
            height={height}
            ref={codeMirror}
            onChange={handleChange}
          />
        )}
      </div>
      {enablePreview && (
        <div className={clsPreview} ref={preview}>
          {renderPreview ? (
            renderPreview(previewProps, !!visible)
          ) : (
            <MarkdownPreview {...previewProps} data-visible={!!visible} />
          )}
        </div>
      )}
    </div>
  );

  const toolbarView = hideToolbar && (
    <ToolBar {...toolBarProps} />
  );
  const child = toolbarBottom ? (
    <Fragment>
      {conentView}
      {toolbarView}
    </Fragment>
  ) : (
    <Fragment>
      {toolbarView}
      {conentView}
    </Fragment>
  );
  return (
    <div className={cls} ref={container}>
      {child}
    </div>
  );
}