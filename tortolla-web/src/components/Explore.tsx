import { useEffect, useState } from "react";
import { listTopPostIds } from "../containers/post.ts";
import { Divider } from "@fluentui/react-components";
import PostCard from "./post/PostCard.tsx";

const Explore = () => {
  const [postIds, setPostIds] = useState<number[]>([]);

  useEffect(() => {
    void listTopPostIds.then((ids) => setPostIds(ids));
  });

  return (
    <div>
      {postIds.map((postId) => (
        <>
          <PostCard postId={postId}></PostCard>
          <Divider />
        </>
      ))}
    </div>
  );
};

export default Explore;
