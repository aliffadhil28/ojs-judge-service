const express = require("express");
const cors = require("cors");
const route = require('./route.js')
const { dbConnect } = require("./config.js");
const cookieSession = require('cookie-session')
const helmet = require('helmet')

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:4173" }));
app.use(express.json());
app.disable("x-powered-by");
app.use(
  cookieSession({
    name: "OJ-session",
    secret: "bismillahLulusGenap2024",
    httpOnly: true,
  })
);
app.use(helmet({
  xFrameOptions: { action: "deny" },
  strictTransportSecurity: {
    maxAge: 86400,
  },
  xPermittedCrossDomainPolicies: {
    permittedPolicies: "none",
  },
}))

app.use("/",route);

const startServer = async () => {
  try {
    await dbConnect.authenticate();
    console.log("Connection has been established successfully.");
    await dbConnect.sync({ alter: false, force: false });
    app.listen(8002, () => {
      console.log("App is running on port 8002");
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

try {
  startServer();
} catch (error) {
  console.error(error);
}
