"use client";

import { getUserApi, signupApi, singinApi } from "@/services/authService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { createContext, useReducer, useContext, useEffect } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAthenticated: false,
  isLoading: true,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "signin":
      return {
        user: action.payload,
        isAthenticated: true,
      };
    case "signup":
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    case "user/loaded":
      return {
        user: action.payload,
        isAuthenticated: true,
      };
  }
};

export default function AuthProvider({ children }) {
  const router = useRouter();
  const [{ user, isAthenticated, isLoading, error }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  async function signin(values) {
    dispatch({ type: "loading" });
    try {
      const {
        data: { message, user },
      } = await singinApi(values);
      dispatch({ type: "signin", payload: user });
      toast.success(message);
      router.push("/profile");
    } catch (err) {
      const error = err?.response?.data?.message;
      dispatch({ type: "rejected", payload: error });
      toast.error(error);
    }
  }

  async function signup(values) {
    dispatch({ type: "loading" });
    try {
      const {
        data: { message, user },
      } = await signupApi(values);
      dispatch({ type: "signup", payload: user });
      toast.success(message);
      router.push("/profile");
    } catch (err) {
      const error = err?.response?.data?.message;
      dispatch({ type: "rejected", payload: error });
      toast.error(error);
    }
  }

  async function getUser() {
    dispatch({ type: "loading" });
    try {
      const {
        data: { user },
      } = await getUserApi();
      dispatch({ type: "user/loaded", payload: user });
    } catch (err) {
      const error = err?.response?.data?.message;
      dispatch({ type: "rejected", payload: error });
    }
  }

  useEffect(() => {
    async function fetchData() {
      await getUser();
    }
    fetchData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAthenticated, isLoading, signin, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("not found Auth Context");
  return context;
}
