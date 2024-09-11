"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { phoneMask } from "@/lib/masks/phone"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  plan: z.number(),
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})

type Form = z.infer<typeof formSchema>

type Props = {
  onCreate: (data: Form) => Promise<void>
}

export default function UserCreationModal({ onCreate }: Props) {
  const [submiting, setSubmiting] = useState<boolean>(false);
  const [open, setOpen] = useState(false)

  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plan: 1,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    },
  })


  async function onSubmit(values: Form) {
    setSubmiting(true)
    await onCreate(values).then(() => {
      setOpen(false)
    }).finally(() => {
      setSubmiting(false);
    });
  }


  useEffect(() => {
    form.reset()
  }, [open])

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Criar usuário</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[100dvh] bg-zinc-800">
        <DialogHeader>
          <DialogTitle>Criar usuário</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col gap-2">
            <FormField
              control={form.control}
              name="plan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plano</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={(field.value).toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a plan" />
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
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ultimo Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o ultimo nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Celular</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o celular"
                      {...field} value={phoneMask(field.value)}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(phoneMask(e.target.value.slice(0, 15)))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Digite a senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-4 pt-4">
              <Button type="button" variant="secondary" onClick={() => { form.clearErrors(); setOpen(false) }}>
                Cancelar
              </Button>
              <Button type="submit" disabled={submiting}>Criar Usuario</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}