import { create } from "zustand";
import api from "../components/Api";

type MyStoreType = {
  user: string | null;
  accessToken: string;
  logout: () => void;
};

const useMyStore = create<MyStoreType>((set) => {
  const ls_string = localStorage.getItem("yangi_login");

  const ls = ls_string ? JSON.parse(ls_string) : undefined;
  if (ls?.token) {
    api.defaults.headers.Authorization = `Bearer ${ls.accessToken}`;
  }

  return {
    user: ls?.user || null,
    accessToken: ls?.accessToken || "",
    logout: () => {
      localStorage.removeItem("yangi_login");
      set({
        accessToken: "",
        user: null,
      });
    },
  };
});

export default useMyStore;
