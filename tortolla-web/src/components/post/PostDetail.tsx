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
import MarkdownIt from "markdown-it";
import { useTranslation } from "react-i18next";
import { currentUser } from "../../containers/user.ts";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../../containers/message.ts";

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
  const { success, warn } = useMessage();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isDeleting, setDeleting] = useState<boolean>(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [post, setPost] = useState<Post | undefined>(undefined);
  const postId = Number(params.postId!);
  {/* @ts-ignore*/}
  const md = new MarkdownIt();

  useEffect(() => {
    void getPost(postId).then((post) => {
      setPost(post);
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
      <SkeletonItem />
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
        {/* @ts-ignore*/}
        <div dangerouslySetInnerHTML={{__html: md.render(post.body)}} />
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
    <>Cannot find post</>
  );
};

export default PostDetail;
