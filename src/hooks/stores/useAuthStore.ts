import { handleLoginApi } from "@app/services/auth";
import { SESSION_KEY } from "@app/utils/constant";
import { IUser, SessionToken } from "@library/api/dto/user.dto";
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean | null;
  user?: IUser;
  error: string | null;
  isLoading: boolean;
}

interface AuthActions {
  login: (
    username: string,
    password: string,
    isRememberMe?: boolean
  ) => Promise<void>;
  logout: () => void;
  setAuthenticateData: (data: SessionToken) => void;
}

const useAuthStore = create<AuthState & AuthActions>((set) => ({
  isAuthenticated: null,
  error: null,
  isLoading: false,

  setAuthenticateData: (authToken: SessionToken) => {
    // Update Zustand state
    set({
      isAuthenticated: true,
      isLoading: false,
      error: null,
      user: authToken.user,
    });

    // You can save the authentication token to localStorage or handle it as needed
    localStorage.setItem(SESSION_KEY, JSON.stringify(authToken));

    console.log('set authenticated user!!!');
  },

  login: async (username: string, password: string, isRememberMe?: boolean) => {
    set({ isLoading: true, error: null });

    try {
      // Make your login API call here
      // For example, assuming your API client has a login method
      const authToken = await handleLoginApi(
        username,
        password,
        isRememberMe || false
      );
      set((state) => {
        state.setAuthenticateData(authToken.data);
        return state;
      });
    } catch (error) {
      set({
        isAuthenticated: false,
        isLoading: false,
        error: (error as Error).message,
      });
    }
  },

  logout: () => {
    // Add any additional cleanup or logout logic here
    // For example, clear the authentication token from localStorage
    localStorage.removeItem(SESSION_KEY);

    // Update Zustand state
    set({ isAuthenticated: false, error: null, isLoading: false });
  },
}));

export default useAuthStore;
