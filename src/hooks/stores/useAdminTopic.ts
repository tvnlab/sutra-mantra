import { handleGetTopicsApi } from "@app/services/topic";
import { ITopic } from "@library/api/dto/topic.dto";
import { TopicSortBy } from "@library/api/utils/constants";
import { create } from "zustand";

interface AdminTopicListState {
  topics: ITopic[];
  error: string | null;
  isLoading: boolean;
}

interface AdminTopicListActions {
  getTopics: (
    searchNameOrContent: string,
    sortBy?: TopicSortBy,
    page?: number,
    pageSize?: number
  ) => Promise<void>;
}

const useAdminTopic = create<AdminTopicListState & AdminTopicListActions>(
  (set) => ({
    topics: [],
    error: null,
    isLoading: false,

    getTopics: async (
      searchNameOrContent: string,
      sortBy?: TopicSortBy,
      page?: number,
      pageSize?: number
    ) => {
      set({ isLoading: true, error: null });

      try {
        // Make your login API call here
        // For example, assuming your API client has a login method
        const response = await handleGetTopicsApi(
          searchNameOrContent,
          sortBy,
          page,
          pageSize
        );
        set({ isLoading: false, topics: response.data });
      } catch (error) {
        set({
          isLoading: false,
          error: (error as Error).message,
        });
      }
    },
  })
);

export default useAdminTopic;
