import mongoose from "mongoose";
import { Schema } from "mongoose";

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
  private url: string;

  constructor() {
    const mongoHost = process.env.MONGO_HOST;
    const mongoPort = process.env.MONGO_PORT || 27017;
    const dbName = process.env.DB_NAME;
    const url = `mongodb://${mongoHost}:${mongoPort}/${dbName}`;
    this.url = url;
    this.defineModel();
  }
  async connect() {
    await mongoose.connect(this.url);
  }
  async disconnect() {
    await mongoose.disconnect();
  }
  protected async defineModel() {
    return mongoose.model("Vacancy", vacancyScheme);
  }
  async addVacancy(vacancy: Partial<Omit<Vacancy, "id">>) {
    const VacancyModel = mongoose.model("Vacancy", vacancyScheme);
    const res = await VacancyModel.create(vacancy);
    return res;
  }
  async updateVacancy(vacancy: Vacancy) {
    const VacancyModel = mongoose.model("Vacancy", vacancyScheme);
    await VacancyModel.findByIdAndUpdate(vacancy._id, vacancy);
    return await VacancyModel.findById(vacancy._id);
  }
  async deleteVacancy(id: string) {
    const VacancyModel = mongoose.model("Vacancy", vacancyScheme);
    await VacancyModel.findByIdAndDelete(id);
  }
  async getVacancies() {
    const VacancyModel = mongoose.model("Vacancy", vacancyScheme);
    const vacancies = await VacancyModel.find();
    console.log(vacancies);
    return vacancies;
  }
}
