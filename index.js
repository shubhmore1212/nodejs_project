import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import dotenv from "dotenv";
import corsOptions from "./config/corsOptions.js";
import { initDB } from "./utils/dbInitialize.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8001;

//'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

//for json
app.use(express.json());

app.use(cors(corsOptions));

app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use(errorHandler);

initDB()
  .then((res) => {
    console.log(res);
    app.listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
