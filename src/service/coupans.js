import * as axiosService from "./axiosService";

export const getCoupons = async (payload) => {
  try {
    const response = await axiosService.Get(
      `/coupons/active-for-me`
    );
    return response.data;
  } catch (error) {
    console.error("getAddresses error:", error);
    throw error;
  }
};
