import { useEffect, useState } from "react";
import { PostPreview, listLatestPosts } from "../../containers/post.ts";
import {
  Subtitle1,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Persona,
  Skeleton,
  SkeletonItem,
  makeStyles,
  tokens,
  Text,
} from "@fluentui/react-components";
import {
  DocumentText24Regular,
  Open20Regular,
  Share20Regular,
} from "@fluentui/react-icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../../containers/message.ts";

const useStyles = makeStyles({
  card: {
    paddingBottom: tokens.spacingVerticalL,
  },
});

const Explore = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { info } = useMessage();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<PostPreview[]>([]);

  useEffect(() => {
    void listLatestPosts(0, 10).then((posts) => {
      setPosts(posts);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {isLoading && (
        <Skeleton>
          <div className={styles.card}>
            <Card>
              <CardHeader
                image={<SkeletonItem shape="square" />}
                header={<SkeletonItem />}
                description={
                  <>
                    <Persona size="extra-small" />
                    <SkeletonItem />
                  </>
                }
              />
              <CardFooter>
                <Button disabled>
                  <SkeletonItem />
                </Button>
                <Button disabled>
                  <SkeletonItem />
                </Button>
              </CardFooter>
            </Card>
          </div>
          <SkeletonItem />
        </Skeleton>
      )}
      {posts.map((post) => (
        <div className={styles.card} key={post.id}>
          <Card title={post.title}>
            <CardHeader
              image={<DocumentText24Regular />}
              header={<Subtitle1>{post.title}</Subtitle1>}
              description={
                <>
                  <Persona size="extra-small" name={post.author.username} />
                  <Text>
                    &nbsp;-&nbsp;
                    {new Date(post.createdTime).toLocaleDateString()}
                  </Text>
                </>
              }
            />
            <CardFooter>
              <Button
                icon={<Open20Regular />}
                onClick={() => navigate(`/post/${post.id}`)}
              >
                {t("post.open")}
              </Button>
              <Button
                icon={<Share20Regular />}
                onClick={() => {
                  void navigator.clipboard
                    .writeText(
                      `${window.location.protocol}//${window.location.host}/post/${post.id}`
                    )
                    .then(() => info(t("message.post link copied")));
                }}
              >
                {t("post.share")}
              </Button>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Explore;
