import { AxiosAuth } from "@/services/axios";

export default class ModulesFetch{
  async getAll(){
    return AxiosAuth.get('')
  }
}