//external modules
import "dotenv/config";
import express, { Express, Request, Response } from "express";
import { VacancyService } from "./Service/VacancyService";
import { Connection } from "./Service/Connection";
import { VacancyController } from "./Controller/VacancyController";

//config envs
const port = process.env.PORT || 8081;
//Controllers
const vacancyController = new VacancyController();
//app
const app: Express = express();
const urlencodedParser = express.urlencoded({ extended: false });
const jsonParser = express.json();
//Middleware
app.use(urlencodedParser);
app.use(jsonParser);
//Cors disabling
function setHeadersForCORS(response: Response) {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Methods", "GET, POST");
  response.set("Access-Control-Allow-Headers", "X-Requested-With");
  response.set("Access-Control-Allow-Headers", "Content-Type");
}
app.use(function (request, response, next) {
  setHeadersForCORS(response);
  next();
});

//static
const staticResourcePath = __dirname.slice(0, -8) + "web/build";
app.use(express.static(staticResourcePath));
//Entry route
app.get("/", (req: Request, res: Response) => {
  res.status(200);
  res.set("Content-Type", "text/html;charset=utf-8");
  res.sendFile(staticResourcePath + "/index.html");
});

//Routes
//Vacancies
//Get list
app.get("/vacancies", vacancyController.get);
//Create
app.post("/vacancies", vacancyController.post);
//Update
app.put("/vacancies", vacancyController.put);
//Delete
app.delete("/vacancies/:id", vacancyController.delete);
//Start App
const tryConnect = () => {
  Connection.connect()
    .then(() => console.log("DB connected!"))
    .catch((e) => {
      console.error("Error: While connecting DB!", e);
      tryConnect();
    });
};
tryConnect();
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
