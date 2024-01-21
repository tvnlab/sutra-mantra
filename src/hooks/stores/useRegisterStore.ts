import { handleRegisterApi } from "@app/services/auth"; // Import your registration API function
import { SESSION_KEY } from "@app/utils/constant";
import { create } from "zustand";
import useAuthStore from "./useAuthStore";

interface RegisterState {
  isRegistered: boolean;
  error: string | null;
  isLoading: boolean;
}

interface RegisterActions {
  registerAccount: (
    displayName?: string,
    email?: string,
    password?: string,
    isAnonymous?: boolean,
  ) => Promise<void>;
}

const useRegisterStore = create<RegisterState & RegisterActions>((set) => ({
  isRegistered: false,
  error: null,
  isLoading: false,

  registerAccount: async (
    displayName = '',
    email = '',
    password = '',
    isAnonymous = false
  ) => {
    const { setAuthenticateData } = useAuthStore.getState(); // Get the increment function from Store A


    set({ isLoading: true, error: null });
    try {
      // Make your registration API call here
      const response = await handleRegisterApi(
        displayName,
        email,
        password,
        isAnonymous
      );

      // Update Zustand state on successful registration
      set({ isRegistered: true, isLoading: false, error: null });

      setAuthenticateData(response.data)
    } catch (error) {
      set({
        isRegistered: false,
        isLoading: false,
        error: (error as Error).message,
      });
    }
  },
}));

export default useRegisterStore;
