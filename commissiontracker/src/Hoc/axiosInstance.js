import axios from "axios";

const instance = axios.create({
  baseURL: "https://commissiontracker-65d2e.firebaseio.com/"
});

export default instance;
