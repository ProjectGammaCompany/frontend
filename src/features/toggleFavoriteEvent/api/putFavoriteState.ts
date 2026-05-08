import { axiosInstance } from "@/shared/api/axios";

export const putFavoriteState = (eventId: string, isFavorite: boolean) => {
  return axiosInstance.put(`events/personal/favorites`, {
    isFavorite,
    eventId,
  });
};
