import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Search, Edit2, Trash2, Loader2, Shield, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function UserManagement() {
  const { user, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newRole, setNewRole] = useState<"user" | "admin">("user");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);

  // Queries and Mutations
  const usersQuery = trpc.users.list.useQuery();
  const searchUsersQuery = trpc.users.search.useQuery(
    { query: searchQuery },
    { enabled: searchQuery.length > 0 }
  );
  const updateRoleMutation = trpc.users.updateRole.useMutation();
  const deleteUserMutation = trpc.users.delete.useMutation();

  // Check if user is admin
  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>存取被拒</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">您沒有權限訪問此頁面。僅管理員可以訪問。</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const displayUsers = searchQuery.length > 0 ? searchUsersQuery.data : usersQuery.data;
  const isLoading = searchQuery.length > 0 ? searchUsersQuery.isLoading : usersQuery.isLoading;

  const handleUpdateRole = async () => {
    if (!selectedUser) return;

    try {
      await updateRoleMutation.mutateAsync({
        id: selectedUser.id,
        role: newRole,
      });
      toast.success("使用者角色已更新");
      usersQuery.refetch();
      setSelectedUser(null);
    } catch (error: any) {
      toast.error(error.message || "更新失敗");
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      await deleteUserMutation.mutateAsync({ id: userToDelete.id });
      toast.success("使用者已刪除");
      usersQuery.refetch();
      setUserToDelete(null);
      setIsDeleteDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || "刪除失敗");
    }
  };

  const getRoleBadge = (role: string) => {
    if (role === "admin") {
      return (
        <Badge className="bg-[#E8734A] text-white flex items-center gap-1">
          <Shield size={12} />
          管理員
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="flex items-center gap-1">
        <User size={12} />
        編輯者
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1B4F72] mb-2">使用者管理</h1>
          <p className="text-gray-600">管理系統使用者和權限</p>
        </div>

        {/* Search Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <Input
                  placeholder="搜尋使用者名稱、郵件或帳號..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              {searchQuery && (
                <Button
                  variant="outline"
                  onClick={() => setSearchQuery("")}
                >
                  清除
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#1B4F72]">
              使用者列表 ({displayUsers?.length || 0})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="animate-spin text-[#1B4F72]" />
              </div>
            ) : displayUsers && displayUsers.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>名稱</TableHead>
                      <TableHead>郵件</TableHead>
                      <TableHead>帳號</TableHead>
                      <TableHead>角色</TableHead>
                      <TableHead>加入日期</TableHead>
                      <TableHead>最後登入</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayUsers.map((u: any) => (
                      <TableRow key={u.id}>
                        <TableCell className="font-semibold">{u.name || "未設定"}</TableCell>
                        <TableCell>{u.email || "未設定"}</TableCell>
                        <TableCell className="text-sm text-gray-600">{u.openId}</TableCell>
                        <TableCell>{getRoleBadge(u.role)}</TableCell>
                        <TableCell className="text-sm">
                          {new Date(u.createdAt).toLocaleDateString("zh-TW")}
                        </TableCell>
                        <TableCell className="text-sm">
                          {new Date(u.lastSignedIn).toLocaleDateString("zh-TW")}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedUser(u);
                                    setNewRole(u.role);
                                  }}
                                >
                                  <Edit2 size={14} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>編輯使用者角色</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label className="text-base font-semibold">
                                      {selectedUser?.name || selectedUser?.email}
                                    </Label>
                                    <p className="text-sm text-gray-600 mt-1">
                                      {selectedUser?.openId}
                                    </p>
                                  </div>
                                  <div>
                                    <Label htmlFor="role">選擇角色</Label>
                                    <Select value={newRole} onValueChange={(value: any) => setNewRole(value)}>
                                      <SelectTrigger id="role">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="user">
                                          <div className="flex items-center gap-2">
                                            <User size={14} />
                                            編輯者
                                          </div>
                                        </SelectItem>
                                        <SelectItem value="admin">
                                          <div className="flex items-center gap-2">
                                            <Shield size={14} />
                                            管理員
                                          </div>
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-700">
                                    💡 編輯者可以在後台管理課程和公告。管理員可以管理所有功能和使用者。
                                  </div>
                                  <div className="flex gap-2 justify-end">
                                    <Button variant="outline">取消</Button>
                                    <Button
                                      className="bg-[#E8734A] hover:bg-[#d4623a]"
                                      onClick={handleUpdateRole}
                                      disabled={updateRoleMutation.isPending}
                                    >
                                      {updateRoleMutation.isPending ? (
                                        <>
                                          <Loader2 size={14} className="mr-2 animate-spin" />
                                          更新中...
                                        </>
                                      ) : (
                                        "更新角色"
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>

                            {u.id !== user?.id && (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                  setUserToDelete(u);
                                  setIsDeleteDialogOpen(true);
                                }}
                              >
                                <Trash2 size={14} />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                {searchQuery ? "未找到符合條件的使用者" : "暫無使用者"}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>確認刪除使用者？</AlertDialogTitle>
              <AlertDialogDescription>
                您即將刪除使用者 <strong>{userToDelete?.name || userToDelete?.email}</strong>。此操作無法撤銷。
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex gap-2 justify-end">
              <AlertDialogCancel>取消</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700"
                onClick={handleDeleteUser}
                disabled={deleteUserMutation.isPending}
              >
                {deleteUserMutation.isPending ? (
                  <>
                    <Loader2 size={14} className="mr-2 animate-spin" />
                    刪除中...
                  </>
                ) : (
                  "確認刪除"
                )}
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
