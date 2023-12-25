import { useEffect, useState } from 'react';
import { ToolBarCommandProps } from '../ToolBar.tsx';
import { ToolbarButton } from '@fluentui/react-components';
import { Eye20Regular } from "@fluentui/react-icons";

const Preview = (props: ToolBarCommandProps) => {
  const { editorProps, containerEditor, preview } = props;
  const previewWidth = "50%";
  const enablePreview = true;
  const [visible, setVisible] = useState(editorProps.visible);
  useEffect(() => setVisible(editorProps.visible), [editorProps.visible]);
  useEffect(() => {
    preview.style.borderBottomRightRadius = '3px';
      if (visible) {
        preview.style.width = previewWidth;
        preview.style.overflow = 'auto';
        preview.style.borderLeft = '1px solid var(--color-border-muted)';
        preview.style.padding = '20px';
        containerEditor.style.width = `calc(100% - ${previewWidth})`;
      } else {
        preview.style.width = '0%';
        preview.style.overflow = 'hidden';
        preview.style.borderLeft = '0px';
        preview.style.padding = '0';
        containerEditor.style.width = '100%';
      }
  }, [visible, containerEditor, preview, previewWidth]);

  if (!enablePreview) return;
  const handle = () => {
    editorProps.onPreviewMode && editorProps.onPreviewMode(!visible);
    setVisible(!visible);
  };
  return (
    <ToolbarButton
      key={"preview"}
      icon={<Eye20Regular />}
      onClick={handle}
    />
  );
};

export default Preview;