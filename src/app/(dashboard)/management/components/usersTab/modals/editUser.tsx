import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { phoneMask } from "@/lib/masks/phone"
import { User } from '@/services/fetchs/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const userSchema = z.object({
  id_user: z.number(),
  plan: z.number(),
  nm_user: z.string().min(1, "Nome é obrigatório"),
  last_nm_user: z.string().min(1, "Último nome é obrigatório"),
  email_user: z.string().email("Email inválido"),
  phone_user: z.string().min(10, "Telefone deve conter pelo menos 10 dígitos.")
})

type UserSchema = z.infer<typeof userSchema>

export default function UserEditModal({ user, onSave, disabled }: {
  user: User | undefined,
  disabled: boolean,
  onSave: (user: UserSchema) => void
}) {
  const [open, setOpen] = useState(false)
  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
  })
  function onClose() {
    setOpen(false)
  }
  const onSubmit = (data: UserSchema) => {
    onSave(data)
    onClose()
  }

  useEffect(() => {
    if (user) {

      form.setValue('id_user', user!.id_usuario!)
      form.setValue('email_user', user!.email_usuario!)
      form.setValue('nm_user', user!.nm_usuario!)
      form.setValue('last_nm_user', user!.ultimo_nome_usuario!)
      form.setValue('phone_user', user!.celular_usuario!)
      form.setValue('plan', user!.id_plano_usuario as number)
    }
  }, [user])


  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={disabled} variant="outline">Editar Usuario</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-800">
        <DialogHeader>
          <DialogTitle>Editar usuário</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col gap-2">
            <FormField
              control={form.control}
              name="plan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plano</FormLabel>
                  <Select onValueChange={(e) => field.onChange(parseInt(e))} defaultValue={(field.value).toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um plano" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">COMUM</SelectItem>
                      <SelectItem value="2">ADMINISTRADOR</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nm_user"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primeiro nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_nm_user"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ultimo nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o ultimo nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email_user"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_user"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Celular</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o celular" {...field}
                      {...field} value={phoneMask(field.value)}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(phoneMask(e.target.value.slice(0, 15)))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-4 pt-4">
              <Button type="button" variant="secondary" onClick={() => { form.clearErrors(); setOpen(false) }}>
                Cancelar
              </Button>
              <Button type="submit">Salvar Usuario</Button>
            </div>
          </form>
        </Form>

      </DialogContent>
    </Dialog>
  )
}