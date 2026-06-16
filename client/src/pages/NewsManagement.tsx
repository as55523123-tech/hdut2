import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit2, Trash2, Loader2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "wouter";

export default function NewsManagement() {
  const { user, isAuthenticated } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "其他" as const,
    imageUrl: "",
    status: "draft" as const,
  });

  // Queries
  const newsQuery = trpc.news.listAll.useQuery({
    limit: 50,
    offset: 0,
  });

  // Mutations
  const createMutation = trpc.news.create.useMutation();
  const updateMutation = trpc.news.update.useMutation();
  const deleteMutation = trpc.news.delete.useMutation();

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

  const handleOpenDialog = (newsItem?: any) => {
    if (newsItem) {
      setEditingId(newsItem.id);
      setFormData({
        title: newsItem.title,
        content: newsItem.content,
        excerpt: newsItem.excerpt || "",
        category: newsItem.category,
        imageUrl: newsItem.imageUrl || "",
        status: newsItem.status,
      });
    } else {
      setEditingId(null);
      setFormData({
        title: "",
        content: "",
        excerpt: "",
        category: "其他",
        imageUrl: "",
        status: "draft",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.content) {
      toast.error("標題和內容為必填項");
      return;
    }

    try {
      if (editingId) {
        await updateMutation.mutateAsync({
          id: editingId,
          ...formData,
        });
        toast.success("新聞已更新");
      } else {
        await createMutation.mutateAsync(formData);
        toast.success("新聞已建立");
      }
      newsQuery.refetch();
      setIsDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || "操作失敗");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("確定要刪除此新聞嗎？")) {
      try {
        await deleteMutation.mutateAsync({ id });
        toast.success("新聞已刪除");
        newsQuery.refetch();
      } catch (error: any) {
        toast.error(error.message || "刪除失敗");
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">已發布</span>;
      case "draft":
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-semibold">草稿</span>;
      case "archived":
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-semibold">已封存</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#1B4F72] mb-2">最新消息管理</h1>
            <p className="text-gray-600">發布和管理校園公告與消息</p>
          </div>
          <Link href="/admin">
            <Button variant="outline">返回儀表板</Button>
          </Link>
        </div>

        {/* New News Button */}
        <div className="mb-6">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-[#E8734A] hover:bg-[#d4623a]"
                onClick={() => handleOpenDialog()}
              >
                <Plus size={16} className="mr-2" />
                新增消息
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "編輯消息" : "新增消息"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>標題 *</Label>
                  <Input
                    placeholder="消息標題"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>內容 *</Label>
                  <Textarea
                    placeholder="消息詳細內容"
                    rows={6}
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>摘要</Label>
                  <Textarea
                    placeholder="消息摘要（用於列表顯示）"
                    rows={2}
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>分類</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value: any) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="校園">校園</SelectItem>
                        <SelectItem value="課程">課程</SelectItem>
                        <SelectItem value="活動">活動</SelectItem>
                        <SelectItem value="公告">公告</SelectItem>
                        <SelectItem value="其他">其他</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>狀態</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: any) =>
                        setFormData({ ...formData, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">草稿</SelectItem>
                        <SelectItem value="published">已發布</SelectItem>
                        <SelectItem value="archived">已封存</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>圖片 URL</Label>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                  />
                </div>
                <Button
                  className="w-full bg-[#E8734A] hover:bg-[#d4623a]"
                  onClick={handleSave}
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {createMutation.isPending || updateMutation.isPending ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      保存中...
                    </>
                  ) : (
                    "保存"
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* News List */}
        {newsQuery.isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="animate-spin text-[#1B4F72]" />
          </div>
        ) : (
          <div className="grid gap-4">
            {newsQuery.data && newsQuery.data.length > 0 ? (
              newsQuery.data.map((newsItem) => (
                <Card key={newsItem.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <CardTitle className="text-[#1B4F72]">
                            {newsItem.title}
                          </CardTitle>
                          {getStatusBadge(newsItem.status)}
                        </div>
                        <p className="text-sm text-gray-600">
                          {newsItem.createdAt &&
                            new Date(newsItem.createdAt).toLocaleDateString("zh-TW")}
                          {" • "}
                          {newsItem.category}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenDialog(newsItem)}
                        >
                          <Edit2 size={14} />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(newsItem.id!)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {newsItem.imageUrl && (
                        <img
                          src={newsItem.imageUrl}
                          alt={newsItem.title}
                          className="w-full h-40 object-cover rounded"
                        />
                      )}
                      <p className="text-gray-600 line-clamp-2">
                        {newsItem.excerpt || newsItem.content}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        {newsItem.status === "published" ? (
                          <>
                            <Eye size={14} />
                            <span>已發布</span>
                          </>
                        ) : (
                          <>
                            <EyeOff size={14} />
                            <span>未發布</span>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-8 text-center text-gray-600">
                  還沒有任何消息。點擊「新增消息」開始建立。
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
