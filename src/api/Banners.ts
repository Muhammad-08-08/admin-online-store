import api from "./Api";

const BannersApi = {
  getAll: (params: { order: string }) => {
    return api.get("/api/banners", {
      params: params,
    });
  },

  delete: (id: { id: number }) => {
    return api.delete(`/api/banners${id}`);
  },

  postAll: () => {
    return api.patch("/api/banners");
  },
};
export default BannersApi;
