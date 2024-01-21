import { handleDeleteTopicsApi } from "@app/services/topic";
import { cloneDeep } from "lodash";
import { create } from "zustand";
import useAdminGetTopics from "./useAdminGetTopics";
interface UseAdminDeleteTopicsState {
  selectedIds: string[];
  deletedIds: string[] | null;
  error: string | null;
  isLoading: boolean;
}

interface UseAdminDeleteTopicsActions {
  deleteTopics: (ids: string[]) => Promise<void>;
  setSelectedIds: (id: string) => void;
  clearSelectedIds: () => void;
}

const useAdminDeleteTopics = create<
  UseAdminDeleteTopicsState & UseAdminDeleteTopicsActions
>((set, getState) => ({
  // Local states
  selectedIds: [],
  setSelectedIds: (id) => {
    if (!id) return;
    const state = getState();
    let ids = cloneDeep(state.selectedIds);
    const foundIndex = ids.findIndex((v) => v === id);
    if (foundIndex >= 0) {
      ids.splice(foundIndex, 1);
      set({
        selectedIds: ids,
      });
      return;
    }
    ids.push(id);
    set({
      selectedIds: ids,
    });
  },
  clearSelectedIds: () => {
    set({
      selectedIds: [],
    });
  },
  // Server states
  deletedIds: null,
  error: null,
  isLoading: false,
  deleteTopics: async (ids: string[]) => {
    set({ isLoading: true, error: null });
    const {} = useAdminGetTopics.getState();
    try {
      await handleDeleteTopicsApi(ids);
      set({ isLoading: false, deletedIds: ids });
    } catch (error) {
      set({
        isLoading: false,
        error: (error as Error).message,
      });
    }
  },
}));

export default useAdminDeleteTopics;
