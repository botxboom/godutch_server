const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    option: "*",
  })
);

require("dotenv").config({ path: "./.env" });
const port = process.env.PORT || 5000;

app.use(express.json());

const con = require("./db/connection.js");

app.use("/api", require("./routes/route"));

con
  .then((db) => {
    if (!db) return process.exit(1);

    // listen to the http server
    app.listen(port, () => {
      console.log(`Server is running on port: http://localhost:${port}`);
    });

    app.on("error", (err) =>
      console.log(`Failed To Connect with HTTP Server : ${err}`)
    );
    // error in mondb connection
  })
  .catch((error) => {
    console.log(`Connection Failed...! ${error}`);
  });
