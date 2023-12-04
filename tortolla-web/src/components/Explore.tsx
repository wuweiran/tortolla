import { useEffect, useState } from "react";
import { Post, listLatestPosts } from "../containers/post.ts";
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
} from "@fluentui/react-components";
import {
  DocumentText24Regular,
  Open20Regular,
  Share20Regular,
} from "@fluentui/react-icons";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  card: {
    paddingBottom: tokens.spacingVerticalL,
  },
});

const Explore = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    void listLatestPosts().then((posts) => {
      setPosts(posts);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {isLoading && (
        <Skeleton>
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
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
                <Persona size="extra-small" name={post.author.username} />
              }
            />
            <CardFooter>
              <Button icon={<Open20Regular />}>{t("post.open")}</Button>
              <Button icon={<Share20Regular />}>Share</Button>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Explore;
