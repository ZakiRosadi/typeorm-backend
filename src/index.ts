import { AppDataSource } from "./data-source";
import * as express from "express";
import { Request, Response } from "express";
import PemiluRouter from "./routes/PemiluRoutes";
import paslonRouter from "./routes/PaslonRouter";
import PartaiRouter from "./routes/PartaiRouter";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const PORT = 5000;
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/api/v1", PemiluRouter);
    app.use("/api/v1", paslonRouter);
    app.use("/api/v1", PartaiRouter);

    app.get("/home", (req: Request, res: Response): Response => {
      return res.status(200).json({ message: "hello world" });
    });

    app.listen(PORT, () => {
      console.log("server is running");
    });
  })
  .catch((error) => console.log(error));
