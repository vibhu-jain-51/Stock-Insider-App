import apiClientService from "..";

async function getInstruments() {
  try {
    const response = await apiClientService.get("/instruments");
    if (response) {
      return response.data;
    } else {
      throw new Error(`Failed to fetch user profile: ${response}`);
    }
  } catch (error) {
    console.log(error);
  }
}

async function getQuotes(command) {
  try {
    const response = await apiClientService.get(`/quotes/${command}`);
    if (response) {
      return response.data;
    } else {
      throw new Error(`Failed to fetch user profile: ${response}`);
    }
  } catch (error) {
    console.log(error);
  }
}

const allApiServices = {
  getInstruments,
  getQuotes,
};

export default allApiServices;
