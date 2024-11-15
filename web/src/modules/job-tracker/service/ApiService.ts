import axios from 'axios'

import { VacancyType } from '../types'

export abstract class JobTrackerApiService {
  private static route = '/vacancies'
  public static async getVacancies(): Promise<VacancyType[]> {
    const response = await axios.get<VacancyType[]>(this.route)
    return response.data
  }
  public static async createVacancy(data: Omit<VacancyType, '_id'>): Promise<VacancyType> {
    const response = await axios.post<VacancyType>(this.route, data)
    return response.data
  }
  public static async updateVacancy(data: VacancyType): Promise<VacancyType> {
    const response = await axios.put<VacancyType>(this.route, data)
    return response.data
  }
  public static async deleteVacancy(id: string): Promise<void> {
    await axios.delete<VacancyType[]>(this.route + `/${id}`)
  }
}
