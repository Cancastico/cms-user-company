import { AxiosAuth } from "../axios";

export default class UserCompanyFetch {
  async post(dataUserCompany: { id_user: number, id_company: number }) {
    return AxiosAuth.post('/user/associateUserAdmin',dataUserCompany);
  }
}