import "server-only";
import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    mongoose
      .connect(process.env.DB_REMOTE)
      .then((conn) => {
        console.log("Successfully connected to the database hosted in : ");
        console.log(conn.connection.host);
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("error connecting to the database");
    console.log(error);
  }
};
export default dbConnection;
