import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { cepMask } from "@/lib/masks/cep"
import { phoneMask } from "@/lib/masks/phone"
import { Company } from "@/services/fetchs/companies"
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const companySchema = z.object({
  id_empresa: z.number(),
  razao_social_empresa: z.string().min(1, "Razão Social é obrigatório"),
  nm_fantasia_empresa: z.string().min(1, "Nome Fantasia é obrigatório"),
  email_empresa: z.string().email("Email inválido"),
  celular_empresa: z.string().min(10, "Telefone deve conter pelo menos 10 dígitos."),
  inscricao_estadual_empresa: z.string().min(1, "Incrição municipal é obrigatorio"),
  cep_empresa: z.string().min(1, "CEP é obrigatorio"),
  cod_mun_empresa: z.string().min(7, "Codigo Municipal Inválido"),
  uf_empresa: z.string().min(2, "Estado obrigatorio"),
  logradouro_empresa: z.string().min(1, "Logradouro é obrigatorio"),
  municipio_empresa: z.string().min(1, "Municipio é obrigatorio").max(60, 'Maximo de caracteres é 60'),
  bairro_empresa: z.string().min(1, "Bairro é obrigatorio").max(60, 'Maximo de caracteres é 60'),
  numero_empresa: z.string().min(1, "Numero é obrigatorio").max(60, 'Maximo de caracteres é 60'),
  complemento_empresa: z.string().max(60, 'Maximo de caracteres é 60'),
})

export type companySchema = z.infer<typeof companySchema>

export default function CompanyEditModal({ company, onSave, disabled }: {
  company: Company | undefined,
  disabled: boolean,
  onSave: (user: companySchema) => void
}) {

  const [open, setOpen] = useState(false)
  const form = useForm<companySchema>({ resolver: zodResolver(companySchema) })
  function onClose() {
    setOpen(false)
  }

  const onSubmit = (data: companySchema) => {
    onSave(data)
    onClose()
  }

  useEffect(() => {
    if (company) {

      form.setValue('id_empresa', company!.id_empresa!)
      form.setValue('razao_social_empresa', company!.razao_social_empresa),
        form.setValue('nm_fantasia_empresa', company!.nome_fantasia_empresa),
        form.setValue('email_empresa', company!.email_empresa!),
        form.setValue('celular_empresa', company?.telefone_empresa),
        form.setValue('inscricao_estadual_empresa', company!.inscricao_estadual_empresa)
      form.setValue('cep_empresa', company!.cep_empresa),
        form.setValue('cod_mun_empresa', company!.codigo_municipal_empresa),
        form.setValue('uf_empresa', company!.uf_empresa),
        form.setValue('logradouro_empresa', company!.logradouro_empresa),
        form.setValue('municipio_empresa', company!.municipio_empresa),
        form.setValue('bairro_empresa', company!.bairro_empresa),
        form.setValue('numero_empresa', company!.numero_empresa),
        form.setValue('complemento_empresa', company!.complemento_empresa)
    }
  }, [company])


  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={disabled} variant="outline">Editar Empresa</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[850px] bg-zinc-800">
        <DialogHeader>
          <DialogTitle>Editar Empresa</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 grid grid-cols-3 gap-2 overflow-y-auto max-h-[90dvh]">
            <FormField

              control={form.control}
              name="razao_social_empresa"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-end col-span-full md:col-span-1">
                  <FormLabel>Razao Social</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nm_fantasia_empresa"
              render={({ field }) => (
                <FormItem className="col-span-full md:col-span-1">
                  <FormLabel>Nome Fantasia</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter first name" {...field} />
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
                    <Input placeholder="Enter first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="celular_empresa"
              render={({ field }) => (
                <FormItem className="col-span-full md:col-span-1">
                  <FormLabel>Celular</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter first name" {...field}
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
              name="cod_mun_empresa"
              render={({ field }) => (
                <FormItem className="col-span-full md:col-span-1">
                  <FormLabel>Codigo Municipal</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter first name" {...field}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(e.target.value.slice(0, 7))}
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
                  <FormLabel>Inscricao Estadual</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter last name" {...field} />
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
                  <FormControl>
                    <Input placeholder="Enter first name" {...field}
                      value={cepMask(field.value)}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(cepMask(e.target.value.slice(0, 9)))}
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
                    <Input placeholder="Enter UF" {...field}
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
                    <Input placeholder="Digite o bairro" {...field} />
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
                  <FormLabel>Municipio</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter first name" {...field} />
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
                    <Input placeholder="Enter first name" {...field} />
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
                  <FormLabel>Numero</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter first name" {...field}
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
                    <Input placeholder="Enter first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-end justify-end space-x-4 pt-4 col-span-2">
              <Button type="button" variant="secondary" onClick={() => { form.clearErrors(); setOpen(false) }}>
                Cancelar
              </Button>
              <Button type="submit">Salvar Alterações</Button>
            </div>
          </form>
        </Form>

      </DialogContent>
    </Dialog>
  )
}