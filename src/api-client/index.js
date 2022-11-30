import axios from "axios";

const apiClientService = axios.create({
  baseURL: "https://prototype.sbulltech.com/api/v2",
});

export default apiClientService;
