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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Company } from "@/services/fetchs/companies";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ModuleCompanyFetch, { ModuleCompanyUpdateSchema } from "../../../../../../services/fetchs/moduleCompany";

type Props = {
  selectedCompany: Company | undefined;
  onSave: (dataUserCompany: ModuleCompanyUpdateSchema) => Promise<AxiosResponse<any, any>>;
  disabled?: boolean
}

export default function ModuleCompanyModal({ selectedCompany, onSave, disabled }: Props) {
  const [open, setOpen] = useState(false);
  const [modules, setModules] = useState<{ [key: string]: boolean }>({});
  const moduleCompanyFetch = new ModuleCompanyFetch();


  async function onSubmit() {
    if (!selectedCompany) {
      toast.error('Selecione uma empresa para associa-lo a um modulo');
      return;
    }
    onSave({ modules: modules, id_empresa: selectedCompany.id_empresa }).then(() => {
      toast.success('Modulos atualizados com sucesso');
      setOpen(false);
    }).catch((error) => {
      toast.error(error.message);
    });
  }

  async function loadingData() {
    if (selectedCompany) {
      moduleCompanyFetch.get(selectedCompany?.id_empresa).then((response) => {
        setModules(response.data);
      })
    }
  }

  useEffect(() => {
    loadingData();
  }, [selectedCompany]);


  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={disabled} variant="outline">Modulos Empresa</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[60dvw] px-0  h-[80dvh] bg-zinc-800">
        <div>
          <DialogHeader className="h-[7dvh] px-6">
            <DialogTitle className="py-4">Ativar modulos, empresa: {selectedCompany?.nome_fantasia_empresa}</DialogTitle>
          </DialogHeader>
          <section className="flex flex-col h-[66dvh] w-full justify-between overflow-y-auto px-6">

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.keys(modules).map((modulo, index) => (
                  <TableRow key={index} className=" !data-[state=selected]:bg-transparent">
                    <TableCell>{modulo}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => { setModules(prevModules => { return { ...prevModules, [modulo]: !modules[modulo] } }) }}
                        className={`${modules[modulo] ?
                          ' bg-green-600 border-[1px] border-green-600 hover:bg-green-400' :
                          'bg-red-600  border-[1px] border-red-600 hover:bg-red-400'} 
                        transition-colors ease-in-out text-white cursor-pointer`} >
                        {modules[modulo] ? 'Ativo' : 'Inativo'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex items-end justify-end px-10 pt-4 gap-2">
              <Button type="button" variant="secondary" onClick={() => { loadingData(); setOpen(false) }}>
                Cancelar
              </Button>
              <Button type="button" onClick={onSubmit}>Salvar Alterações</Button>
            </div>


          </section>
        </div>

      </DialogContent>
    </Dialog>
  )
}