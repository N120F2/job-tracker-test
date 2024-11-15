import mongoose from "mongoose";
import { Schema } from "mongoose";
import { Connection } from "./Connection";

const vacancyScheme = new Schema({
  company: String,
  name: String,
  salary: Number,
  status: {
    type: String,
    enum: ["active", "disabled"],
  },
  notes: String,
});
interface Vacancy {
  _id: string;
  company: string;
  name: string;
  salary: number;
  status: "active" | "disabled";
  notes: string;
}

export class VacancyService {
  private checkConnection() {
    if (!Connection.connected) throw new Error("Error: No DB connection!");
  }
  async addVacancy(vacancy: Partial<Omit<Vacancy, "id">>) {
    this.checkConnection();
    const VacancyModel = mongoose.model("Vacancy", vacancyScheme);
    const res = await VacancyModel.create(vacancy);
    return res;
  }
  async updateVacancy(vacancy: Vacancy) {
    this.checkConnection();
    const VacancyModel = mongoose.model("Vacancy", vacancyScheme);
    await VacancyModel.findByIdAndUpdate(vacancy._id, vacancy);
    return await VacancyModel.findById(vacancy._id);
  }
  async deleteVacancy(id: string) {
    this.checkConnection();
    const VacancyModel = mongoose.model("Vacancy", vacancyScheme);
    await VacancyModel.findByIdAndDelete(id);
  }
  async getVacancies() {
    this.checkConnection();
    const VacancyModel = mongoose.model("Vacancy", vacancyScheme);
    const vacancies = await VacancyModel.find();
    return vacancies;
  }
}
