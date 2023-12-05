import { useState } from "react";
import { CreatePostRequest, createPost } from "../../containers/post.ts";
import { useTranslation } from "react-i18next";
import {
  Button,
  Field,
  Input,
  Spinner,
  makeStyles,
} from "@fluentui/react-components";
import { useMessage } from "../../containers/message.ts";
import MarkdownEditor from "@uiw/react-markdown-editor";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
});

const CreatePost = () => {
  const style = useStyles();
  const { t } = useTranslation();
  const [isSaving, setSaving] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { success, warn } = useMessage();

  const onFinish = (request: CreatePostRequest) => {
    setSaving(true);
    createPost(request)
      .then(() => {
        success("Create post succeeded!");
      })
      .catch(() => {
        warn("Create post failed");
      })
      .finally(() => {
        setSaving(false);
      });
  };

  return (
    <div className={style.root}>
      <Field label={t("post.create.title label")}>
        <Input
          value={title}
          onChange={(_, data) => {
            setTitle(data.value);
          }}
          placeholder={t("post.create.title placeholder")}
        />
      </Field>
      <Field label={t("post.create.body label")}></Field>
      <MarkdownEditor
        onChange={(value) => {
          setContent(value);
        }}
        height="250px"
      />
      <Button onClick={() => onFinish({ title: title, body: content })}>
        {isSaving ? <Spinner /> : t("post.create.submit")}
      </Button>
    </div>
  );
};

export default CreatePost;
