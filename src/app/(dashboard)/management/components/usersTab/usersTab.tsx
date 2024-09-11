/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Badge } from "@/components/ui/badge"
import Pagination, { PagePaginationProps } from "@/components/ui/pagination/pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import UserFetch, { User } from "@/services/fetchs/user"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import UserCompanyModal from "./modals/associateUser"
import UserCreationModal from "./modals/createUser"
import UserEditModal from "./modals/editUser"
import UserCompanyFetch from "@/services/fetchs/userCompany"

export default function UserTab() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pages, setPages] = useState<PagePaginationProps>({ currentPage: 1, maxPages: 1 });
  const [users, setUsers] = useState<User[]>([]);
  const [userSelected, setUserSelected] = useState<User | undefined>(undefined);
  const userPerPage = 8;

  const userFetch = new UserFetch();

  const userCompanyFetch = new UserCompanyFetch();

  async function handleCreate(userData: {
    plan: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }) {
    await userFetch.post(userData).then(() => {
      toast.success('Usuario criado com sucesso');
      handleGet();
    }).catch((error) => {
      toast.error(error.message);
    })
  }

  async function handleUpdate(userData: {
    plan: number;
    id_user: number;
    nm_user: string;
    last_nm_user: string;
    email_user: string;
    phone_user: string;
  }) {
    await userFetch.put(userData).then(() => {
      toast.success('Usuario atualizado com sucesso');
      handleGet();
    }).catch((error) => {
      toast.error(error.message);
    });
  }

  async function handleGet() {
    return await userFetch.getAll().then((response) => {
      setUsers(response.data);
      if (userSelected) {
        setUserSelected(response.data.find((users) => { return users.id_usuario == userSelected.id_usuario }))
      }
      setPages({ ...pages, maxPages: Math.ceil(response.data.length / userPerPage) })
    })
  }
  useEffect(() => {
    handleGet();
  }, [])

  return (
    <div className="border-border border-[1px] h-[85dvh] flex flex-col justify-between rounded-xl p-6">
      <div className=" rounded-lg shadow mt-4">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Usuários</h2>
          <div className="space-x-2 flex flex-wrap">
            <UserCreationModal onCreate={(newUser) => handleCreate(newUser)} />
            <UserEditModal disabled={userSelected == undefined} user={userSelected} onSave={(editedUser) => { handleUpdate(editedUser) }} />
            <UserCompanyModal disabled={userSelected == undefined} onAssociate={(updateAssociation) => { return userCompanyFetch.post(updateAssociation).finally(() => { handleGet() }); }} user={userSelected} />
          </div>
        </div>

        <Table className="h-full">
          <TableHeader>
            <TableRow className="hover:bg-inherit">
              <TableHead className="text-lg font-semibold text-primary">Nome</TableHead>
              <TableHead className="text-lg font-semibold text-primary">Email</TableHead>
              <TableHead className="text-lg font-semibold text-primary">Plano</TableHead>
              <TableHead className="text-lg font-semibold text-primary">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users
              .slice((pages.currentPage - 1) * userPerPage, pages.currentPage * userPerPage)
              .map((userSliced, index) => {
                const hasSelected = userSliced == userSelected;
                return (
                  <TableRow
                    className={`hover:bg-blue-700 ${hasSelected && 'bg-blue-700'}`}
                    key={index}
                    onClick={() => { setUserSelected(userSliced) }}
                  >
                    <TableCell>{userSliced.nm_usuario}</TableCell>
                    <TableCell>{userSliced.email_usuario}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{userSliced.plano}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={userSliced.status_usuario === "A" ? "bg-green-500 hover:bg-green-700" : "bg-red-500 hover:bg-red-700"}>
                        {userSliced.status_usuario == "A" ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })
            }
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