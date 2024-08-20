import { useState } from "react";

const DATA_FIELDS = {
  country_name: "",
  electricity_value: "",
  electricity_unit: "kWh",
};

function ElectricityEmission() {
  const [electricityData, setElectricityData] = useState(DATA_FIELDS);
  const [getElectricityData, setGetElectricityData] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    setElectricityData({ ...electricityData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/emission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(electricityData),
      });

      const res_data = await response.json();

      if (!response.ok) {
        console.log("someting went wrong with electricity response", res_data);
      } else {
        setGetElectricityData(res_data);
        setElectricityData(DATA_FIELDS);
      }
    } catch (error) {
      console.log("Electricity emission Error : " + error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label htmlFor="country_name">Country name : </label>
          <input
            type="text"
            placeholder="e.g., New York"
            name="country_name"
            id="country_name"
            value={electricityData.country_name}
            onChange={handleInput}
          />
        </div>
        <br />
        <br />
        <div>
          <label htmlFor="electricity_value">Electricity Unit used : </label>
          <input
            type="text"
            placeholder="Enter your password"
            name="electricity_value"
            id="electricity_value"
            value={electricityData.electricity_value}
            onChange={handleInput}
          />
        </div>
        <br />
        <br />
        <button>done</button>
      </form>
      <div>
        {getElectricityData ? (
          <p>CO2 Emissions: {getElectricityData.data.co2e_kg}</p>
        ) : null}
      </div>
    </div>
  );
}

export default ElectricityEmission;
