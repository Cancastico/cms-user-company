/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Badge } from "@/components/ui/badge"
import Pagination, { PagePaginationProps } from "@/components/ui/pagination/pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import CompaniesFetch, { Company } from "@/services/fetchs/companies"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import ModuleCompanyFetch, { ModuleCompanyUpdateSchema } from "../../../../../services/fetchs/moduleCompany"
import CompanyCreationModal, { CreateCompanyFormData } from "./modals/createCompany"
import CompanyEditModal, { companySchema } from "./modals/editCompany"
import ModuleCompanyModal from "./modals/moduleCompany"
import { cnpjMask } from "@/lib/masks/cnpj"

export default function CompanyTab() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pages, setPages] = useState<PagePaginationProps>({ currentPage: 1, maxPages: 1 });
  const [companies, setCompanies] = useState<any[]>([]);
  const [companySelected, setCompanySelected] = useState<Company | undefined>(undefined);
  const companiesPerPage = 8;
  const companiesFetch = new CompaniesFetch();
  const moduleCompanyFetch = new ModuleCompanyFetch();

  async function handleGetAll() {
    return await companiesFetch.getAll().then((response) => {
      console.log(response.data)
      setCompanies(response.data);
      setPages({ ...pages, maxPages: Math.ceil(response.data.length / companiesPerPage) });
    })
  }

  async function handleUpdate(companyData: companySchema) {
    await companiesFetch.update(companyData).then(() => {
      toast.success('Empresa atualizada com sucesso')
      handleGetAll()
    }).catch((error: any) => {
      console.error(error)
      toast.error('Erro ao atualizar empresa')
    })

  }
  async function handleCreate(newCompanyData: CreateCompanyFormData) {
    return await companiesFetch.create({
      bairro_empresa: newCompanyData.bairro_empresa,
      cnpj_empresa: newCompanyData.cnpj_empresa,
      email_empresa: newCompanyData.email_empresa,
      razao_social_empresa: newCompanyData.razao_social_empresa,
      nome_fantasia_empresa: newCompanyData.nome_fantasia_empresa,
      telefone_empresa: newCompanyData.telefone_empresa,
      cep_empresa: newCompanyData.cep_empresa,
      codigo_municipal_empresa: newCompanyData.codigo_municipal_empresa,
      inscricao_estadual_empresa: newCompanyData.inscricao_estadual_empresa,
      uf_empresa: newCompanyData.uf_empresa,
      municipio_empresa: newCompanyData.municipio_empresa,
      logradouro_empresa: newCompanyData.logradouro_empresa,
      numero_empresa: newCompanyData.numero_empresa,
      complemento_empresa: newCompanyData.complemento_empresa ?? ''
    }).then(() => {
      toast.success('Empresa criada com sucesso');
      handleGetAll();
    }).catch((error: any) => {
      console.error(error)
      toast.error('Erro ao criar empresa')
    })
  }

  async function handleAssociateModuleCompany(data: ModuleCompanyUpdateSchema) {
    return await moduleCompanyFetch.update(data);
  }


  useEffect(() => {
    handleGetAll();
  }, [])

  return (
    <div className="border-border border-[1px] h-[85dvh] flex flex-col justify-between rounded-xl p-6">
      <div className="rounded-lg shadow mt-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Empresas</h2>
          <div className="space-x-2">
            <CompanyCreationModal onCreate={handleCreate} />
            <CompanyEditModal company={companySelected} disabled={!companySelected} onSave={handleUpdate} />
            <ModuleCompanyModal disabled={!companySelected} onSave={handleAssociateModuleCompany} selectedCompany={companySelected} />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-inherit">
              <TableHead className="text-lg font-semibold text-primary">ID</TableHead>
              <TableHead className="text-lg font-semibold text-primary">Razão social</TableHead>
              <TableHead className="text-lg font-semibold text-primary">Email</TableHead>
              <TableHead className="text-lg font-semibold text-primary">CNPJ</TableHead>
              <TableHead className="text-lg font-semibold text-primary">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies
              .slice((pages.currentPage - 1) * companiesPerPage, pages.currentPage * companiesPerPage)
              .map((company) => {
                const hasSelected = company == companySelected;
                return (
                  <TableRow
                    key={company.id_empresa}
                    className={`hover:bg-blue-700 ${hasSelected && 'bg-blue-700'}`}
                    onClick={() => { setCompanySelected(company) }}
                  >
                    <TableCell >{company.id_empresa}</TableCell>
                    <TableCell >{company.nome_fantasia_empresa}</TableCell>
                    <TableCell >{company.email_empresa}</TableCell>
                    <TableCell >{cnpjMask(company.cnpj_empresa)}</TableCell>
                    <TableCell >
                      <Badge className={`${company.status_empresa == 'A' ? 'bg-green-500 hover:bg-green-700' : 'bg-red-500 hover:bg-red-700'}`}>{company.status_empresa == 'A' ? 'Ativo' : 'Inativa'}</Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </div>

      <Pagination
        currentPage={pages.currentPage}
        maxPages={pages.maxPages}
        onPageChange={(e) => { setPages(prevPage => ({ ...prevPage, currentPage: e })) }}
      />
    </div>
  )
}