import { axiosInstance } from "@/src/shared/api";

export const putFavoriteState = (id: string, value: boolean) => {
  return axiosInstance.put(`favoriteState/${id}`, {
    favorite: value,
  });
};
