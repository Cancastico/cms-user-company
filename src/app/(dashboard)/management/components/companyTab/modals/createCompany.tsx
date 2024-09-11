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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cepMask } from "@/lib/masks/cep";
import { cnpjMask } from "@/lib/masks/cnpj";
import { phoneMask } from "@/lib/masks/phone";
import { getCep } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";


const formSchema = z.object({
  razao_social_empresa: z.string().min(2, "Razão social deve ter no mínimo 2 caracteres."),
  nome_fantasia_empresa: z.string().min(2, "Nome fantasia deve ter no mínimo 2 caracteres."),
  cnpj_empresa: z.string().length(18, "CNPJ deve conter 14 dígitos."),
  email_empresa: z.string().email("Email inválido."),
  telefone_empresa: z.string().min(10, "Telefone deve conter pelo menos 10 dígitos."),
  cep_empresa: z.string().length(9, "CEP deve conter 8 dígitos."),
  codigo_municipal_empresa: z.string().length(7, "Código municipal deve conter 7 dígitos."),
  inscricao_estadual_empresa: z.string().min(8, "Inscrição estadual deve conter 8 dígitos no mínimo.").max(14, 'Inscrição estadual deve conter 14 digitos no máximo'),
  uf_empresa: z.string().min(2, "UF deve conter 2 caracteres."),
  bairro_empresa: z.string().min(2, "Bairro inválido."),
  municipio_empresa: z.string().min(2, "Município inválido."),
  logradouro_empresa: z.string().min(2, "Logradouro inválido."),
  numero_empresa: z.string().min(1, "Número inválido."),
  complemento_empresa: z.string().max(60, "Tamanho maximo do completo é 60").optional(),
});

export type CreateCompanyFormData = z.infer<typeof formSchema>

type Props = {
  onCreate: (data: CreateCompanyFormData) => Promise<void>
}

export default function CreateCompanyModal({ onCreate }: Props) {
  const [submiting, setSubminting] = useState<boolean>(false);
  const [open, setOpen] = useState(false)
  const [searched, setSearched] = useState(false)

  const form = useForm<CreateCompanyFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      razao_social_empresa: "",
      nome_fantasia_empresa: "",
      cnpj_empresa: "",
      email_empresa: "",
      telefone_empresa: "",
      cep_empresa: "",
      codigo_municipal_empresa: "",
      inscricao_estadual_empresa: "",
      uf_empresa: "",
      bairro_empresa: "",
      municipio_empresa: "",
      logradouro_empresa: "",
      complemento_empresa: "",
    },
  })

  async function handleCEP() {
    const cep = form.getValues("cep_empresa")

    if (!cep) {
      toast.error("CEP precisa conter ao menos 8 dígitos.")
      return
    }

    await getCep(cep).then((response) => {
      setSearched(true)
      form.setValue("logradouro_empresa", response.logradouro)
      form.setValue("uf_empresa", response.uf)
      form.setValue("municipio_empresa", response.localidade)
      form.setValue("bairro_empresa", response.bairro)
      form.setValue("codigo_municipal_empresa", response.ibge)
    }).catch(() => {
      toast.error('Não foi possivel encontrar o cep, insira as informações manualmente')
      setSearched(false)
    });
  }

  async function onSubmit(values: CreateCompanyFormData) {
    setSubminting(true)
    await onCreate(values).then(()=>{
      setOpen(false)
    }).finally(()=>{
      setSubminting(false)
    })
    // setOpen(false)
  }

  useEffect(() => {
    form.reset()
  }, [open])

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Criar Empresa</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[850px] max-h-[100dvh] bg-zinc-800">
        <DialogHeader>
          <DialogTitle>Criar empresa</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 grid grid-cols-3 gap-2 overflow-y-auto max-h-[90dvh]">
            <FormField
              control={form.control}
              name="razao_social_empresa"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-end col-span-full md:col-span-1">
                  <FormLabel>Razão Social</FormLabel>
                  <FormControl>
                    <Input className="relative" placeholder="Insira a razão social" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nome_fantasia_empresa"
              render={({ field }) => (
                <FormItem className="col-span-full md:col-span-1">
                  <FormLabel>Nome Fantasia</FormLabel>
                  <FormControl>
                    <Input placeholder="Insira o nome fantasia" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cnpj_empresa"
              render={({ field }) => (
                <FormItem className="col-span-full md:col-span-1">
                  <FormLabel>CNPJ</FormLabel>
                  <FormControl>
                    <Input placeholder="Insira o CNPJ" {...field}
                      value={cnpjMask(field.value)}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(cnpjMask(e.target.value.slice(0, 18)))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email_empresa"
              render={({ field }) => (
                <FormItem className="col-span-full md:col-span-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Insira o email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefone_empresa"
              render={({ field }) => (
                <FormItem className="col-span-full md:col-span-1">
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="Insira o telefone" {...field}
                      value={phoneMask(field.value)}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(phoneMask(e.target.value.slice(0, 15)))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="inscricao_estadual_empresa"
              render={({ field }) => (
                <FormItem className="col-span-full md:col-span-1">
                  <FormLabel>Inscrição Estadual</FormLabel>
                  <FormControl>
                    <Input placeholder="Insira a inscrição estadual" {...field}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(e.target.value.slice(0, 14))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cep_empresa"
              render={({ field }) => (
                <FormItem className="col-span-full md:col-span-1">
                  <FormLabel>CEP</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input placeholder="Insira o CEP" {...field}
                        value={cepMask(field.value)}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(cepMask(e.target.value.slice(0, 9)))}
                      />
                    </FormControl>
                    <Button color="primary" size="default" type="button" onClick={handleCEP} disabled={field.value.length !== 9}>
                      Buscar
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="codigo_municipal_empresa"
              render={({ field }) => (
                <FormItem className="col-span-full md:col-span-1">
                  <FormLabel>Código Municipal</FormLabel>
                  <FormControl>
                    <Input placeholder="Insira o código municipal" {...field} disabled={searched}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(e.target.value.slice(0, 7))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="uf_empresa"
              render={({ field }) => (
                <FormItem className="col-span-full md:col-span-1">
                  <FormLabel>UF</FormLabel>
                  <FormControl>
                    <Input placeholder="UF" {...field} disabled={searched}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(e.target.value.slice(0, 2))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bairro_empresa"
              render={({ field }) => (
                <FormItem className="col-span-full md:col-span-1">
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input placeholder="Insira o bairro" {...field} disabled={searched} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="municipio_empresa"
              render={({ field }) => (
                <FormItem className="col-span-full md:col-span-1">
                  <FormLabel>Município</FormLabel>
                  <FormControl>
                    <Input placeholder="Insira o município" {...field} disabled={searched} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logradouro_empresa"
              render={({ field }) => (
                <FormItem className="col-span-full md:col-span-1">
                  <FormLabel>Logradouro</FormLabel>
                  <FormControl>
                    <Input placeholder="Insira o logradouro" {...field} disabled={searched} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numero_empresa"
              render={({ field }) => (
                <FormItem className="col-span-full md:col-span-1">
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input placeholder="Insira o número" {...field}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(e.target.value.slice(0, 7))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="complemento_empresa"
              render={({ field }) => (
                <FormItem className="col-span-full md:col-span-1">
                  <FormLabel>Complemento</FormLabel>
                  <FormControl>
                    <Input placeholder="Insira o complemento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-end justify-end space-x-4 pt-4 col-span-1">
              <Button type="button" variant="secondary" onClick={() => { form.clearErrors(); setOpen(false) }}>
                Cancelar
              </Button>
              <Button disabled={submiting} type="submit">Criar</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
