import { SessionToken } from "@library/api/dto/user.dto";
import useRegisterStore from "@app/hooks/stores/useRegisterStore";
import { SESSION_KEY } from "@app/utils/constant";
import { useEffect } from "react";
import useAuthStore from "@app/hooks/stores/useAuthStore";

const useCheckAnonymous = () => {
  const { registerAccount } = useRegisterStore();
  const { setAuthenticateData } = useAuthStore(); // Get the increment function from Store A

  useEffect(() => {
    const authDataString = localStorage.getItem(SESSION_KEY);
    const authData: SessionToken = authDataString
      ? JSON.parse(authDataString)
      : null;
    if (!authData?.user?._id || !authData?.accessToken) {
      registerAccount("", "", "", true);
    } else {
      setAuthenticateData(authData);
    }
  }, [setAuthenticateData, registerAccount]);
};

export default useCheckAnonymous;
