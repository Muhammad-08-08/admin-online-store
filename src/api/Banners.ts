import api from "./Api";

const BannersApi = {
  getAll: (params: { order: string }) => {
    return api.get("/api/banners", {
      params: params,
    });
  },
};
export default BannersApi;
