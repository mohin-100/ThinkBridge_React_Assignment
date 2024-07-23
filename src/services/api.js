import axios from "axios";
import { keys } from "../shared/constants";

//used third party (mock api) for sample APIs.
const API_URL = `https://${keys.mock_api}.mockapi.io/foodieDelight`

export const getRestaurants = async () => {
  return await axios.get(`${API_URL}/restaurants`);
};

export const addRestaurant = async (restaurant) => {
  return await axios.post(`${API_URL}/restaurants`, restaurant);
};

export const updateRestaurant = async (id, restaurant) => {
  return await axios.put(`${API_URL}/restaurants/${id}`, restaurant);
};

export const deleteRestaurant = async (id) => {
  return await axios.delete(`${API_URL}/restaurants/${id}`);
};
