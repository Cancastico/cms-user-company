/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Pagination, { PagePaginationProps } from "@/components/ui/pagination/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CompaniesFetch from "@/services/fetchs/companies";
import { User } from "@/services/fetchs/user";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  user: User | undefined;
  onAssociate: (dataUserCompany: { id_user: number, id_company: number }) => Promise<AxiosResponse<any, any>>;
  disabled?: boolean
}

export default function UserCompanyModal({ user, onAssociate, disabled }: Props) {
  const companiesFetch = new CompaniesFetch();
  const [pages, setPages] = useState<PagePaginationProps>({ currentPage: 1, maxPages: 5 });
  const [open, setOpen] = useState(false);
  const [companies, setCompanies] = useState<any[]>([]);
  const companiesPerPage = 8

  async function associationToggle(idCompany: number) {
    if (!user) {
      toast.error('Selecione um Usuario para associa-lo a uma empresa')
      return;
    }
    onAssociate({ id_user: user?.id_usuario!, id_company: idCompany }).then(() => {
      loadingData()
    }).catch((error) => {
      toast.error(error.message);
    });
  }

  function isUserInCompany(idCompany: number) {
    if (!user) {
      return []
    }
    return user!.usuario_empresa?.some(userCompany => userCompany.id_empresa_ue === idCompany)
  }

  async function loadingData() {
    companiesFetch.getAll().then((response) => {
      setCompanies(response.data);
      setPages({ ...pages, maxPages: Math.ceil(response.data.length / companiesPerPage) });
    })
  }

  useEffect(() => {
    console.log('Atualizei')
    loadingData();
  }, [user])


  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={disabled} variant="outline">Associar Usuario</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[60dvw]  h-[80dvh] bg-zinc-800">
        <div>
          <DialogHeader className="h-[7dvh]">
            <DialogTitle className="py-4">Associar Usuario: {user?.nm_usuario}</DialogTitle>
          </DialogHeader>
          <section className="flex flex-col h-[66dvh] w-full justify-between ">

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Fantasia</TableHead>
                  <TableHead>CNPJ</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies.slice((pages.currentPage - 1) * companiesPerPage, pages.currentPage * companiesPerPage)
                  .map((company) => (
                    <TableRow key={company.id_empresa}>
                      <TableCell>{company.id_empresa}</TableCell>
                      <TableCell>{company.nome_fantasia_empresa}</TableCell>
                      <TableCell>{company.cnpj_empresa}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => associationToggle(company.id_empresa)}
                          className={`${isUserInCompany(company.id_empresa) ? 'bg-green-500 hover:bg-green-700' : 'bg-red-500 hover:bg-red-700'}`}
                          size="sm"
                        >
                          {isUserInCompany(company.id_empresa) ? "Associado" : "Não associado"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <Pagination
              currentPage={pages.currentPage}
              maxPages={pages.maxPages}
              onPageChange={(e) => { setPages(prevPage => ({ ...prevPage, currentPage: e })) }}
            />

          </section>
        </div>

      </DialogContent>
    </Dialog>
  )
}