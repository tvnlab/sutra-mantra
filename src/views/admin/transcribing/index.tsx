import Notebook from "@app/components/notebook";
import Page from "@app/components/notebook/Page";
import useFetchTopicDetail from "./hooks/useFetchTopicDetail";
import _ from "lodash";
import { PAGE_LIMIT } from "@app/utils/constant";
const SutraTranscribing = () => {
  const topic = useFetchTopicDetail();
  const totalPage = 10;
  // const totalPage = Math.ceil(topic.category.count / PAGE_LIMIT);
  console.log("AAAA", topic, totalPage);

  if(!topic) return null;

  return (
    <div className="mt-4 flex gap-4">
      <Notebook topic={topic}>
        {_.times(totalPage).map((index) => (
          <Page key={`page_${index}`}>
            {_.times(PAGE_LIMIT).map((v) => (
              <p key={v} className="opacity-10">
                {topic.content}
              </p>
            ))}
          </Page>
        ))}
      </Notebook>
    </div>
  );
};

export default SutraTranscribing;
