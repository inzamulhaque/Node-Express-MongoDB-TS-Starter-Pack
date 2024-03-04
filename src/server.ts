import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";
const port = process.env.PORT || 7000;

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.dbURI as string);

    server = app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on("unhandledRejection", () => {
  console.log("unhandledRejection");

  if (server) {
    server.close(() => process.exit(1));
  }

  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log("uncaughtException");

  process.exit(1);
});
