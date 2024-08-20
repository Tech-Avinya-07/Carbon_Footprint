import { useState } from "react";

const DATA_FIELDS = {
  iata_airport_from: "",
  iata_airport_to: "",
  flight_class: "",
  round_trip: "",
  number_of_passengers: "",
};

function FlightEmission() {
  const [flightData, setFlightData] = useState(DATA_FIELDS);
  const [getFlightData, setGetFlightData] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    setFlightData({ ...flightData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/emission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(flightData),
      });

      const res_data = await response.json();

      if (!response.ok) {
        console.log("someting went wrong with flight response", res_data);
      } else {
        setGetFlightData(res_data);
        setFlightData(DATA_FIELDS);
      }
    } catch (error) {
      console.log("Flight emission Error : " + error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label htmlFor="iata_airport_from">From : </label>
          <input
            type="text"
            placeholder="e.g., New York"
            name="iata_airport_from"
            id="iata_airport_from"
            value={flightData.iata_airport_from}
            onChange={handleInput}
          />
        </div>
        <br />
        <br />
        <div>
          <label htmlFor="iata_airport_to">To : </label>
          <input
            type="text"
            placeholder="Enter your password"
            name="iata_airport_to"
            id="iata_airport_to"
            value={flightData.iata_airport_to}
            onChange={handleInput}
          />
        </div>
        <br />
        <br />
        <div>
          <label htmlFor="flight_class">Flight Class : </label>
          <input
            type="text"
            placeholder="Enter your password"
            name="flight_class"
            id="flight_class"
            value={flightData.flight_class}
            onChange={handleInput}
          />
        </div>
        <br />
        <br />
        <div>
          <label htmlFor="round_trip">Round Trip : </label>
          <input
            type="text"
            placeholder="Enter your password"
            name="round_trip"
            id="round_trip"
            value={flightData.round_trip}
            onChange={handleInput}
          />
        </div>
        <br />
        <br />
        <div>
          <label htmlFor="number_of_passengers">Passengers : </label>
          <input
            type="text"
            placeholder="Enter your password"
            name="number_of_passengers"
            id="number_of_passengers"
            value={flightData.number_of_passengers}
            onChange={handleInput}
          />
        </div>
        <br />
        <br />
        <button>done</button>
      </form>
      <div>
        {getFlightData ? (
          <p>CO2 Emissions: {getFlightData.data.co2e_kg}</p>
        ) : null}
      </div>
    </div>
  );
}

export default FlightEmission;
