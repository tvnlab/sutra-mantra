import { handleGetTopicsApi } from "@app/services/topic";
import { ITopic } from "@library/api/dto/topic.dto";
import { TopicSortBy } from "@library/api/utils/constants";
import { create } from "zustand";

interface UseAdminGetTopicsState {
  topics: ITopic[];
  error: string | null;
  isLoading: boolean;
  filter: {
    searchNameOrContent?: string;
    sortBy?: TopicSortBy;
    page?: number;
    pageSize?: number;
  };
}

interface UseAdminGetTopicsActions {
  setFilterParams: (params: {
    searchNameOrContent?: string;
    sortBy?: TopicSortBy;
    page?: number;
    pageSize?: number;
  }) => void;
  getTopics: () => Promise<void>;
}

const useAdminGetTopics = create<
  UseAdminGetTopicsState & UseAdminGetTopicsActions
>((set, getState) => ({
  topics: [],
  error: null,
  isLoading: false,
  filter: {
    page: 1,
    pageSize: 10,
    searchNameOrContent: "",
    sortBy: TopicSortBy.CREATED_AT,
  },

  setFilterParams(params) {
    set({
      filter: {
        ...params,
      },
    });
  },

  getTopics: async () => {
    const state = getState();
    const { filter } = state;
    set({ isLoading: true, error: null });

    try {
      // Make your login API call here
      // For example, assuming your API client has a login method
      const response = await handleGetTopicsApi(
        filter.searchNameOrContent || "",
        filter.sortBy,
        filter.page,
        filter.pageSize
      );
      set({ isLoading: false, topics: response.data });
    } catch (error) {
      set({
        isLoading: false,
        error: (error as Error).message,
      });
    }
  },
}));

export default useAdminGetTopics;
