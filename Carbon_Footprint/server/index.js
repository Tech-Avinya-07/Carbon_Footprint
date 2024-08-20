require("dotenv").config();
const express = require("express");
var cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const emissionRoutes = require("./routes/emissionRoutes");
const mongoDB = require("./config/database");
const errorMiddleware = require("./middlewares/errorHandler");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "PUT", "PATCH", "DELETE", "HEAD"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/emission", emissionRoutes);

app.use(errorMiddleware);

PORT = process.env.PORT || 3000;

mongoDB()
  .then(() => {
    app.listen(PORT, (req, res) => {
      console.log(`Listening on port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("not connected" + err);
  });
