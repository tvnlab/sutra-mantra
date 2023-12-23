import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
// import topicData from "@app/variables/topicData";

const useFetchTopicDetail = () => {
  let searchParams = useSearchParams();
  const topicId = searchParams.get("id");

  // const topic = useMemo(() => {
  //   return topicData.find((v) => v.id === topicId);
  // }, [topicId]);
  return null;
};

export default useFetchTopicDetail;
