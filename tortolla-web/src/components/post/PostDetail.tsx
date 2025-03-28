import {
  Skeleton,
  SkeletonItem,
  LargeTitle,
  makeStyles,
  tokens,
  Persona,
  Button,
  Spinner,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogContent,
  Text,
  DialogActions,
} from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  DeletePostRequest,
  Post,
  deletePost,
  getPost,
} from "../../containers/post.ts";
import { useTranslation } from "react-i18next";
import { currentUser } from "../../containers/user.ts";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../../containers/message.ts";
import MarkdownPreview from "./md/MarkdownPreview.tsx";
import { ApiErrorCode } from "../../containers/api.ts";

const useStyles = makeStyles({
  article: {
    display: "flex",
    flexDirection: "column",
    marginLeft: tokens.spacingHorizontalL,
    marginBottom: tokens.spacingVerticalM,
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
  const navigate = useNavigate();
  const { success, warn, error } = useMessage();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isDeleting, setDeleting] = useState<boolean>(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [post, setPost] = useState<Post | undefined>(undefined);
  const postId = Number(params.postId!);

  useEffect(() => {
    void getPost(postId)
      .then((post) => {
        setPost(post);
      })
      .catch((apiError) => {
        if (apiError.code === ApiErrorCode.NOT_FOUND) {
          error(t("message.post not found"));
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [postId]);

  const onDelete = (request: DeletePostRequest) => {
    setDeleting(true);
    deletePost(request)
      .then(() => {
        success(t("message.delete post succeed"));
        navigate("/");
      })
      .catch(() => {
        warn(t("message.delete post fail"));
      })
      .finally(() => {
        setDeleting(false);
      });
  };

  return isLoading ? (
    <Skeleton>
      <SkeletonItem className={styles.title} size={40} />
      <Persona className={styles.author}></Persona>
      <SkeletonItem size={128} />
    </Skeleton>
  ) : post ? (
    <>
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
        <MarkdownPreview source={post.body} />
      </article>
      {currentUser()?.id == post.author.id && (
        <Dialog
          open={isDeleteDialogOpen}
          onOpenChange={(_, data) => setDeleteDialogOpen(data.open)}
        >
          <DialogTrigger disableButtonEnhancement>
            <Button>
              {isDeleting ? <Spinner /> : t("post.delete.submit")}
            </Button>
          </DialogTrigger>
          <DialogSurface>
            <DialogBody>
              <DialogTitle>{t("post.delete.confirm title")}</DialogTitle>
              <DialogContent>
                <Text>
                  {t("post.delete.confirm body", { title: post.title })}
                </Text>
              </DialogContent>
              <DialogActions>
                <Button
                  appearance="primary"
                  onClick={() => {
                    setDeleteDialogOpen(false);
                    onDelete({ postId: post.id });
                  }}
                >
                  {t("post.delete.confirm")}
                </Button>
                <DialogTrigger disableButtonEnhancement>
                  <Button appearance="secondary">{t("back")}</Button>
                </DialogTrigger>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      )}
    </>
  ) : (
    <Text>{t("message.post not found")}</Text>
  );
};

export default PostDetail;
