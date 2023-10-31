import { Card } from "@fluentui/react-components";

const PostCard = (props: { postId: number }) => {
  return <Card>Post {props.postId} here</Card>;
};

export default PostCard;
