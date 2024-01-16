import { handleRegisterApi } from '@app/services/auth'; // Import your registration API function
import { create } from 'zustand';

interface RegisterState {
  isRegistered: boolean;
  error: string | null;
  isLoading: boolean;
}

interface RegisterActions {
  registerAccount: (displayName: string, email: string, password: string) => Promise<void>;
}

const useRegisterStore = create<RegisterState & RegisterActions>((set) => ({
  isRegistered: false,
  error: null,
  isLoading: false,

  registerAccount: async (displayName: string, email: string, password: string) => {
    set({ isLoading: true, error: null });

    try {
      // Make your registration API call here
      await handleRegisterApi(displayName, email, password);

      // Update Zustand state on successful registration
      set({ isRegistered: true, isLoading: false, error: null });
    } catch (error) {
      set({ isRegistered: false, isLoading: false, error: (error as Error).message });
    }
  },
}));

export default useRegisterStore;
