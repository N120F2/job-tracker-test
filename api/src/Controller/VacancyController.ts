import { Request, Response } from "express";

import { VacancyService } from "../Service/VacancyService";

export class VacancyController {
  protected service: VacancyService;
  constructor() {
    this.service = new VacancyService();
  }
  get = async (req: Request, res: Response) => {
    try {
      const vacancies = await this.service.getVacancies();
      res.status(200);
      res.set("Content-Type", "application/json;charset=utf-8");
      res.send(vacancies);
    } catch (e) {
      res.sendStatus(500);
    }
  };
  post = async (req: Request, res: Response) => {
    try {
      if (!req.body) res.sendStatus(400);
      const newVacancy = await this.service.addVacancy(req.body);
      res.status(200);
      res.set("Content-Type", "application/json;charset=utf-8");
      res.send(newVacancy);
    } catch (e) {
      res.sendStatus(500);
    }
  };
  put = async (req: Request, res: Response) => {
    try {
      if (!req.body || !req.body?._id) res.sendStatus(400);
      const updatedVacancy = await this.service.updateVacancy(req.body);
      res.status(200);
      res.set("Content-Type", "application/json;charset=utf-8");
      res.send(updatedVacancy);
    } catch (e) {
      res.sendStatus(500);
    }
  };
  delete = async (req: Request, res: Response) => {
    try {
      if (!req.params?.id) res.sendStatus(400);
      await this.service.deleteVacancy(req.params.id);
      res.sendStatus(200);
    } catch (e) {
      res.sendStatus(500);
    }
  };
}
