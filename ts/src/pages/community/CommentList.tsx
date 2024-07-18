import useFetch from "@hooks/useFetch";
import CommentItem from "@pages/community/CommentItem";
import CommentNew from "@pages/community/CommentNew";
import { useParams } from "react-router-dom";
import { PostData } from "../../types/community";

interface Props {
  refetch: () => void
}

function CommentList({ refetch}: Props) {
  const { _id } = useParams();
  const { data } = useFetch<PostData[]>(`posts/${_id}/replies`);

  const items = data?.item.map((item) => (
    <CommentItem key={item._id} item={item} />
  ));

  return (
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2">댓글 {items?.length} 개 </h4>
      {items}
      <CommentNew refetch={refetch} />
    </section>
  );
}

export default CommentList;
