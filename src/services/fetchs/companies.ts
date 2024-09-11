/* eslint-disable @typescript-eslint/no-explicit-any */
import { companySchema } from "@/app/(dashboard)/management/components/companyTab/modals/editCompany";
import { AxiosAuth, AxiosVersion } from "../axios";

export type Company = {
  id_empresa: number;
  cnpj_empresa: string;
  razao_social_empresa: string;
  nome_fantasia_empresa: string;
  logradouro_empresa: string;
  numero_empresa: string;
  complemento_empresa: string;
  bairro_empresa: string;
  codigo_municipal_empresa: string;
  municipio_empresa: string;
  uf_empresa: string;
  cep_empresa: string;
  telefone_empresa: string;
  inscricao_estadual_empresa: string;
  certificado_empresa: string;
  banco_empresa: string;
  status_empresa: string;
  email_empresa: string;
  versao_banco_empresa: number;
  token_empresa: string;
  id_model: number;
  id_rt_empresa: number;
  certificado?: {
    type: string;
    data: number[];
  };
  senha_certificado_empresa: string;
  nfceIdCsc: string | null;
  nfceCsc: string | null;
  nfceHomSeriePadrao: string | null;
  nfceHomIdCsc: string | null;
  nfceHomCsc: string | null;
  nfceSeriePadrao: string | null;
  usaAmbienteTeste: boolean;
  usuario_empresa?: any[]; // Definir a tipagem conforme os dados do usuário
}


export type CreateCompanySchema = {
  cnpj_empresa: string,
  email_empresa: string,
  razao_social_empresa: string,
  nome_fantasia_empresa: string,
  telefone_empresa: string,
  cep_empresa: string,
  codigo_municipal_empresa: string,
  inscricao_estadual_empresa: string,
  uf_empresa: string,
  bairro_empresa: string,
  municipio_empresa: string,
  logradouro_empresa: string,
  numero_empresa: string,
  complemento_empresa: string
}

export default class CompaniesFetch {

  async create(company:CreateCompanySchema){
    return AxiosVersion.post<Company>('/company/create', company);
  };

  async getAll() {
    return AxiosAuth.get<Company[]>('/company/companyAll');
  }

  async update(company: companySchema) {
    return AxiosAuth.put<Company>('/company/adminCompanyUpdate', { 
        id_empresa: company.id_empresa,
        bairro_empresa: company.bairro_empresa,
        cep_empresa: company.cep_empresa,
        codigo_municipal_empresa: company.cod_mun_empresa,
        complemento_empresa: company.complemento_empresa,
        email_empresa: company.email_empresa,
        inscricao_estadual_empresa: company.inscricao_estadual_empresa,
        logradouro_empresa: company.logradouro_empresa,
        nome_fantasia_empresa: company.nm_fantasia_empresa,
        numero_empresa: company.numero_empresa,
        municipio_empresa: company.municipio_empresa,
        razao_social_empresa: company.razao_social_empresa,
        telefone_empresa: company.celular_empresa,
        uf_empresa: company.uf_empresa,
     })
  }
}