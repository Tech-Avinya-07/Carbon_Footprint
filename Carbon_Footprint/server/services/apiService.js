const fetch = require("node-fetch");
const FormData = require("form-data");

const getService = async (data) => {
  console.log(data);

  if (data.country_name) {
    path = "electricity_estimate";
  } else if (data.iata_airport_from) {
    path = "flight_estimate";
  }
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  try {
    const response = await fetch(
      `https://carbonsutra1.p.rapidapi.com/${path}`,
      {
        method: "POST",
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
          "x-rapidapi-host": process.env.RAPIDAPI_HOST,
          Authorization: process.env.EMISSION_API_KEY,
          ...formData.getHeaders(),
        },
        body: formData,
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching emission data:", error);
    throw error;
  }
};

module.exports = {
  getService,
};
