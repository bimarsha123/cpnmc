import React, {
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { router } from "expo-router";
import axios from "axios";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  client_id,
  getUserInfo,
  refreshToken,
  socialLogin,
  updateUser,
} from "./api";
import Snackbar from "react-native-snackbar";
import {
  ACCESS_TOKEN,
  BEARER,
  REFRESH_TOKEN,
  TOKEN_EXPIRY,
} from "@/constants/Strings";
import { getData, removeDataMulty, storeData } from "./storage";
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import moment from "moment";
import { UserInfoType } from "./types";
const AuthContext = createContext<{
  googleSignIn: () => void;
  googleSignOut?: () => void;
  logout: () => void;
  authenticate: () => void;
  refreshToken: (token: string) => void;
  isAuthenticated: boolean;
  isSocialLoginPending: boolean;
  isRefreshTokenPending: boolean;
  loading: boolean;
  me: UserInfoType;
}>({
  googleSignIn: () => null,
  googleSignOut: () => null,
  refreshToken: () => null,
  logout: () => null,
  authenticate: () => null,
  isAuthenticated: false,
  isSocialLoginPending: false,
  isRefreshTokenPending: false,
  loading: false,
  me: {
    id: 0,
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    picture: null,
  },
});

export function useAuth() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <AuthProvider />");
    }
  }

  return value;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleAxios = (token: string) => {
    if (token) {
      axios.defaults.headers.Authorization = `${BEARER} ${token}`;
    }
  };

  const { data: me, isLoading: meLoading } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: getUserInfo,
    enabled: isAuthenticated,
  });

  const authenticate = () => {
    setLoading(false);
    setIsAuthenticated(true);
    router.replace("/(app)/(tabs)/");
  };

  const socialLoginMutation = useMutation({
    mutationFn: socialLogin,
    onError: (error) => {
      console.log(error.message);
      setIsAuthenticated(false);
      Snackbar.show({
        text: "Login Error!",
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: "red",
      });
    },
    onSuccess: async (data) => {
      await storeData(ACCESS_TOKEN, data.access_token);
      await storeData(REFRESH_TOKEN, data.refresh_token);
      await storeData(TOKEN_EXPIRY, `${data.expires_in}`);
      console.log({ data });
      // updateUserMutation.mutate({
      //   id: data.id,
      //   photo:
      // })

      handleAxios(data.access_token);
      authenticate();
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onError: (error) => {
      console.log({ error });
    },
    onSuccess: async (data) => {
    },
  });

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log({ userInfo });
      if (userInfo.idToken) {
        socialLoginMutation.mutate({
          token: userInfo.idToken,
          backend: "google-identity",
          grant_type: "convert_token",
          client_id: client_id,
        });
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            // user cancelled the login flow
            console.log("cancelled");
            break;
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            console.log("in progress");

            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // play services not available or outdated
            console.log("not available");
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };
  const refreshTokenMutation = useMutation({
    mutationFn: refreshToken,
    onError: (error) => {
      Snackbar.show({
        text: "Login Error!",
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: "red",
      });
      setIsAuthenticated(false);
      setLoading(false);
    },
    onSuccess: async (data) => {
      await storeData(ACCESS_TOKEN, data.access_token);
      await storeData(REFRESH_TOKEN, data.refresh_token);
      await storeData(TOKEN_EXPIRY, `${data.expires_in}`);

      handleAxios(data.access_token);
      authenticate();
    },
  });

  const handleRefreshToken = (refresh_token: string) => {
    refreshTokenMutation.mutate({
      refresh_token: refresh_token,
      client_id: client_id,
      grant_type: "refresh_token",
    });
  };
  const logout = async () => {
    await removeDataMulty([ACCESS_TOKEN, REFRESH_TOKEN, TOKEN_EXPIRY]);
    axios.defaults.headers.Authorization = "";
    setIsAuthenticated(false);
    router.replace("auth");
  };

  const handleToken = async () => {
    setLoading(true);
    const access_token = await getData(ACCESS_TOKEN);
    const refresh_token = await getData(REFRESH_TOKEN);
    const expires_in = (await getData(TOKEN_EXPIRY)) ?? `0`;
    if (access_token && refresh_token) {
      const exp = parseInt(expires_in) / 3600;
      const exp_date = moment().add(exp, "hours");
      if (exp_date < moment()) {
        handleRefreshToken(refresh_token);
      } else {
        handleAxios(access_token);
        authenticate();
      }
    } else {
      setLoading(false);
      logout();
    }
  };

  useEffect(() => {
    handleToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isRefreshTokenPending: refreshTokenMutation.isPending,
        isSocialLoginPending: socialLoginMutation.isPending,
        googleSignIn: handleGoogleSignIn,
        refreshToken: handleRefreshToken,
        isAuthenticated,
        logout,
        authenticate,
        loading: loading || meLoading,
        me,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
