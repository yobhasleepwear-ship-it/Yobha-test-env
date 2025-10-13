import * as axiosService from "./axiosService"; 

export const getAddresses = async () => {
    try {
        const response = await axiosService.Get("/auth/addresses");
        return response.data;
    } catch (error) {
        console.error("getAddresses error:", error);
        throw error;
    }
};

export const addAddress = async (payload) => {
    try {
        const response = await axiosService.Post("/auth/addresses", payload);
        return response.data;
    } catch (error) {
        console.error("addAddress error:", error);
        throw error;
    }
};

export const deleteAddress = async (addressId) => {
    try {
        const response = await axiosService.Delete(`/auth/addresses/${addressId}`);
        return response.data;
    } catch (error) {
        console.error("deleteAddress error:", error);
        throw error;
    }
};