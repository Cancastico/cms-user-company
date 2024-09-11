import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2Icon, UserIcon } from "lucide-react"
import CompanyTab from "./components/companyTab/companyTab"
import UserTab from "./components/usersTab/usersTab"

export default async function Component() {
  return (
    <section className="w-full h-[100dvh] px-8 py-4">
      <div className="w-full">
        <Tabs activationMode={"automatic"} defaultValue="users" className="w-full">
          <TabsList className="text-blue-500 bg-transparent border-border- border-[1px]">
            <TabsTrigger value="users" className="flex items-center  data-[state=active]:bg-zinc-300 data-[state=active]:text-blue-600">
              <UserIcon className="mr-2 h-4 w-4" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="companies" className="flex items-center data-[state=active]:bg-zinc-300 data-[state=active]:text-blue-600">
              <Building2Icon className="mr-2 h-4 w-4" />
              Empresas
            </TabsTrigger>
          </TabsList>
          <TabsContent value="users">
            <UserTab />
          </TabsContent>
          <TabsContent value="companies">
            <CompanyTab />
          </TabsContent>
        </Tabs>
      </div >
    </section>
  )
}