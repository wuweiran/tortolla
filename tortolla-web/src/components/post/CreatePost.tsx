import { createRef, useState } from "react";
import { CreatePostRequest, createPost } from "../../containers/post.ts";
import { useTranslation } from "react-i18next";
import {
  Button,
  Field,
  InfoLabel,
  Input,
  Spinner,
  makeStyles,
} from "@fluentui/react-components";
import { useMessage } from "../../containers/message.ts";
import MarkdownEditor, { MarkdownEditorRef } from "./md/MarkdownEditor.tsx";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
});

const CreatePost = () => {
  const style = useStyles();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isSaving, setSaving] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const editorRef = createRef<MarkdownEditorRef>();
  const { success, warn } = useMessage();

  const onFinish = (request: CreatePostRequest) => {
    setSaving(true);
    createPost(request)
      .then((postId) => {
        success(t("message.create post succeed"));
        navigate(`/post/${postId}`);
      })
      .catch(() => {
        warn(t("message.create post fail"));
      })
      .finally(() => {
        setSaving(false);
      });
  };

  return (
    <div className={style.root}>
      <Field label={t("post.create.title label")} required>
        <Input
          value={title}
          onChange={(_, data) => {
            setTitle(data.value);
          }}
          placeholder={t("post.create.title placeholder")}
        />
      </Field>
      <Field
        label={{
          children: (
            <InfoLabel info={t("post.create.body label tooltip")} required>
              {t("post.create.body label")}
            </InfoLabel>
          ),
        }}
      >
        <MarkdownEditor ref={editorRef} />
      </Field>
      <Button
        onClick={() =>
          onFinish({ title: title, body: editorRef.current?.getText() || "" })
        }
      >
        {isSaving ? <Spinner /> : t("post.create.submit")}
      </Button>
    </div>
  );
};

export default CreatePost;
