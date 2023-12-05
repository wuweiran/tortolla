import {
  Skeleton,
  SkeletonItem,
  LargeTitle,
  makeStyles,
  tokens,
  Persona,
} from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post, getPost } from "../../containers/post.ts";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { useTranslation } from "react-i18next";
import { currentUser } from "../../containers/user.ts";

const useStyles = makeStyles({
  article: {
    display: "flex",
    flexDirection: "column",
    marginLeft: tokens.spacingHorizontalL,
  },
  author: {
    marginBottom: tokens.spacingVerticalM,
  },
  title: {
    marginBottom: tokens.spacingVerticalM,
  },
});

const PostDetail = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const params = useParams();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [post, setPost] = useState<Post | undefined>(undefined);
  const postId = Number(params.postId!);

  useEffect(() => {
    void getPost(postId).then((post) => {
      setPost(post);
      setLoading(false);
    });
  }, [postId]);

  return isLoading ? (
    <Skeleton>
      <SkeletonItem />
    </Skeleton>
  ) : post ? (
    <article className={styles.article}>
      <LargeTitle className={styles.title}>{post.title}</LargeTitle>
      <Persona
        className={styles.author}
        name={post.author.username}
        secondaryText={
          currentUser()?.id == post.author.id
            ? t("user.me")
            : t("post.author")
        }
      ></Persona>
      <MarkdownEditor.Markdown source={post.body} />
    </article>
  ) : (
    <>Cannot find post</>
  );
};

export default PostDetail;
