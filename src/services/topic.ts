import apiClient from "@app/utils/apiClient";
import { ITopic } from "@library/api/dto/topic.dto";
import { TopicSortBy } from "@library/api/utils/constants";

export const handleGetTopicsApi = (
  searchNameOrContent: string,
  sortBy = TopicSortBy.CREATED_AT,
  page = 1,
  pageSize = 10
) => {
  return apiClient.get<Array<ITopic>>("/topics", {
    params: {
      searchNameOrContent,
      sortBy,
      page,
      pageSize,
    },
  });
};

export const handleDeleteTopicsApi = (ids: string[]) => {
  return apiClient.delete<Array<ITopic>>("/topics", {
    params: {
      ids,
    },
  });
};
