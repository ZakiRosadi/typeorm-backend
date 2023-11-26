import { AppDataSource } from "./data-source";
import * as express from "express";
import * as cors from "cors";
import { Request, Response } from "express";
import PemiluRouter from "./routes/PemiluRoutes";
import paslonRouter from "./routes/PaslonRouter";
import PartaiRouter from "./routes/PartaiRouter";
import voterRouter from "./routes/VoterRouter";
import userRouter from "./routes/UserRouter";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const PORT = 5000;

    const corsOption = {
      "origin": "*",
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "preflightContinue": false,
      "optionsSuccessStatus": 204
    }

    // app.use(session({
    //   secret: 'TOKEN',
    //   resave: false,
    //   saveUninitialized: true
    // }))

    app.use(express.json());
    app.use(cors(corsOption));
    app.use("/api/v1", PemiluRouter);
    app.use("/api/v1", paslonRouter);
    app.use("/api/v1", PartaiRouter);
    app.use("/api/v1", voterRouter);
    app.use("/api/v1", userRouter);

    app.get("/home", (req: Request, res: Response): Response => {
      return res.status(200).json({ message: "hello world" });
    });

    app.listen(PORT, () => {
      console.log("server is running");
    });
  })
  .catch((error) => console.log(error));
