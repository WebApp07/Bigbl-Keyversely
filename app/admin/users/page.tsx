import Pagination from "@/components/shared/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllUsers, deleteUser } from "@/lib/actions/user.actions";
import { formatId } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import DeleteDialog from "@/components/shared/delete-dialog";
import { Search, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Users",
};

const AdminUserPage = async (props: {
  searchParams: Promise<{ page?: string; query: string }>;
}) => {
  const { page = "1", query: searchText } = await props.searchParams;
  const users = await getAllUsers({ page: Number(page), query: searchText });

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <h1 className="h2-bold">Users</h1>
        {searchText && (
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-1.5">
            <Search className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              Filtered by{" "}
              <span className="font-medium text-gray-900">
                &quot;{searchText}&quot;
              </span>
            </span>
            <Link href="/admin/users">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 rounded-full hover:bg-gray-200"
              >
                <X className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>EMAIL</TableHead>
              <TableHead>ROLE</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{formatId(user.id)}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.role === "user" ? (
                    <Badge variant="secondary">User</Badge>
                  ) : user.role === "admin" ? (
                    <Badge variant="default">Admin</Badge>
                  ) : (
                    "Unknown"
                  )}
                </TableCell>

                <Button asChild variant="outline" size="sm">
                  <Link href={`/admin/users/${user.id}`}>Edit</Link>
                </Button>
                <DeleteDialog id={user.id} action={deleteUser} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {users.totalPages >= 1 && (
          <Pagination page={Number(page) || 1} totalPages={users?.totalPages} />
        )}
      </div>
    </div>
  );
};

export default AdminUserPage;
