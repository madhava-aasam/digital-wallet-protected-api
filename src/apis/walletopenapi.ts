import axios from "axios";
import config from "../config/config";

const userLogin = async (payload: any) => {
  // console.log("fetchUserInfo input -------------", payload);

  try {
    const url = `${config.openApi.url}/wallet/user/login/`;

    const res = await axios.post(url, payload);
    return res;
  } catch (error) {
    console.error("api error fetchUserInfo----------", error);
    throw error;
  }
};

const fetchUserInfo = async (userId: string) => {
  // console.log("fetchUserInfo input -------------", userId);

  try {
    const url = `${config.openApi.url}/wallet/users/${userId}`;

    const res = await axios.get(url);
    return res;
  } catch (error) {
    console.error("api error fetchUserInfo----------", error);
    throw error;
  }
};

const fetchUserWalletTransactions = async (userId: string) => {
  // console.log("fetchUserWalletTransactions input -------------", userId);

  try {
    const url = `${config.openApi.url}/wallet/transactions/${userId}`;

    const res = await axios.get(url);
    return res;
  } catch (error) {
    console.error("api error fetchUserInfo----------", error);
    throw error;
  }
};

const createWalletTransaction = async (payload: any) => {
  // console.log("createWalletTransaction input -------------", payload);

  try {
    const url = `${config.openApi.url}/wallet/transaction`;
    const res = await axios.post(url, payload);
    return res;
  } catch (error) {
    console.error("api error fetchUserInfo----------", error);
    throw error;
  }
};

export default { userLogin, fetchUserInfo, fetchUserWalletTransactions, createWalletTransaction };
