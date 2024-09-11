import { AxiosAuth } from "@/services/axios";

export type ModuleCompanyUpdateSchema = { modules: { [key: string]: boolean }, id_empresa: number }
export default class ModuleCompanyFetch {
  async get(idCompany: number) {
    return AxiosAuth.get<{ [key: string]: boolean }>(`/modulo_empresa/${idCompany}`);
  }
  async update(data: ModuleCompanyUpdateSchema) {
    return AxiosAuth.put(`/modulo_empresa/${data.id_empresa}`, { modulos: data.modules });
  }
}