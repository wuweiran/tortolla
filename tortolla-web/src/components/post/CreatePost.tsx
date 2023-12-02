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
  const { info } = useMessage();

  const onFinish = (request: CreatePostRequest) => {
    setSaving(true);
    createPost(request)
      .then(() => {
        info("Create post succeeded!");
      })
      .catch(() => {
        info("Create post failed");
      })
      .finally(() => {
        setSaving(false);
      });
  };

  return (
    <div className={style.root}>
      <Field label={t("post.title")}>
        <Input
          value={title}
          onChange={(_, data) => {
            setTitle(data.value);
          }}
          placeholder="My Post Title"
        />
      </Field>
      <Field label={t("post.body")}></Field>
      <MarkdownEditor
        onChange={(value) => {
          setContent(value);
        }}
      />
      <Button onClick={() => onFinish({ title: title, body: content })}>
        {isSaving ? <Spinner /> : t("post.act.create")}
      </Button>
    </div>
  );
};

export default CreatePost;
