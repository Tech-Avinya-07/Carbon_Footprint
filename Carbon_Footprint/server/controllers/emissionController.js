const apiService = require("../services/apiService");

const flightsTravelEmission = async (req, res) => {
  console.log(req.body);

  if (req.body == null) {
    return res.status(400).json({ message: "all fields are required" });
  }
  try {
    const result = await apiService.getService(req.body);
    res.status(200).json(result);
    console.log(result);
  } catch (error) {
    console.error("Error fetching flight emission data:", error);
    res.status(500).json({ message: "Failed to get data" });
  }
};

module.exports = {
  flightsTravelEmission,
};
