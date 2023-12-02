import { useEffect, useState } from "react";
import { Post, listLatestPosts } from "../containers/post.ts";
import {
  Card,
  CardHeader,
  Divider,
  Skeleton,
  SkeletonItem,
} from "@fluentui/react-components";

const Explore = () => {
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
        <>
          <Card title={post.title}>
            <CardHeader
              header={post.title}
              description={post.author.username}
            />
          </Card>
          <Divider />
        </>
      ))}
    </div>
  );
};

export default Explore;
