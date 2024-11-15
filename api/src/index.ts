//external modules
import "dotenv/config";
import express, { Express, Request, Response } from "express";
import { VacancyService } from "./Service/VacancyService";
import { Connection } from "./Service/Connection";

//config envs
const port = process.env.PORT || 8081;

const vacancyService = new VacancyService();

//app
const app: Express = express();
const urlencodedParser = express.urlencoded({ extended: false });
const jsonParser = express.json();

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
app.get("/vacancies", async (req: Request, res: Response) => {
  try {
    const vacancies = await vacancyService.getVacancies();
    res.status(200);
    res.set("Content-Type", "application/json;charset=utf-8");
    res.send(vacancies);
  } catch (e) {
    res.sendStatus(500);
  }
});
//Create
app.post("/vacancies", async (req: Request, res: Response) => {
  try {
    if (!req.body) res.sendStatus(400);
    const newVacancy = await vacancyService.addVacancy(req.body);
    res.status(200);
    res.set("Content-Type", "application/json;charset=utf-8");
    res.send(newVacancy);
  } catch (e) {
    res.sendStatus(500);
  }
});
//Update
app.put("/vacancies", async (req: Request, res: Response) => {
  try {
    if (!req.body || !req.body?._id) res.sendStatus(400);
    const updatedVacancy = await vacancyService.updateVacancy(req.body);
    res.status(200);
    res.set("Content-Type", "application/json;charset=utf-8");
    res.send(updatedVacancy);
  } catch (e) {
    res.sendStatus(500);
  }
});
//Delete
app.delete("/vacancies/:id", async (req: Request, res: Response) => {
  try {
    if (!req.params?.id) res.sendStatus(400);
    await vacancyService.deleteVacancy(req.params.id);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
});
//Start App
const tryConnect = () => {
  Connection
    .connect()
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
