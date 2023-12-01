import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { CKFinder } from "@ckeditor/ckeditor5-ckfinder";
import { UploadAdapter } from "@ckeditor/ckeditor5-adapter-ckfinder";
import { Link } from "@ckeditor/ckeditor5-link";
import { Image } from "@ckeditor/ckeditor5-image";
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
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";

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
      <CKEditor
        editor={ClassicEditor}
        config={{
          language: i18n.language,
          ckfinder: {
            uploadUrl: "/posts/upload_image",
          },
          plugins: [CKFinder, UploadAdapter, Link, Image],
        }}
        data={content}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log(event, data);
          setContent(data);
        }}
      />
      <Button onClick={() => onFinish({ title: title, body: content })}>
        {isSaving ? <Spinner /> : t("post.act.create")}
      </Button>
    </div>
  );
};

export default CreatePost;
