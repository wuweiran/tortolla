import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
import { CKFinder } from "@ckeditor/ckeditor5-ckfinder";
import { CreatePostRequest, createPost } from "../../containers/post.ts";
import * as msg from "../../containers/message.ts";
import { useTranslation } from "react-i18next";
import {
  Button,
  Field,
  Input,
  Spinner,
  makeStyles,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
});

const CreatePost = () => {
  const style = useStyles();
  const { t, i18n } = useTranslation();
  const [isSaving, setSaving] = useState<boolean>(false);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [content, setContent] = useState<string>("");

  const onFinish = (request: CreatePostRequest) => {
    setSaving(true);
    createPost(request)
      .then(() => {
        msg.info("Login succeeded!");
      })
      .catch(() => {
        msg.info("Login failed");
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
      <Field label={t("post.content")}></Field>
      <CKEditor
        editor={ClassicEditor}
        config={{
          language: i18n.language,
          ckfinder: {
            uploadUrl: "/posts/upload_image",
          },
          plugins: [CKFinder],
        }}
        onChange={() => {
          setContent("default");
        }}
      />
      <Button onClick={() => onFinish({ title: title!, body: content })}>
        {isSaving ? <Spinner /> : t("post.act.create")}
      </Button>
    </div>
  );
};

export default CreatePost;
