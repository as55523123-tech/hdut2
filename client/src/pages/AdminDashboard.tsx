import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit2, Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "wouter";

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<"courses" | "announcements" | "users" | "news">("courses");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Courses
  const coursesQuery = trpc.courses.list.useQuery();
  const createCourseMutation = trpc.courses.create.useMutation();
  const updateCourseMutation = trpc.courses.update.useMutation();
  const deleteCourseMutation = trpc.courses.delete.useMutation();

  // Announcements
  const announcementsQuery = trpc.announcements.list.useQuery();
  const createAnnouncementMutation = trpc.announcements.create.useMutation();
  const updateAnnouncementMutation = trpc.announcements.update.useMutation();
  const deleteAnnouncementMutation = trpc.announcements.delete.useMutation();

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

  const handleDeleteCourse = async (id: string) => {
    if (confirm("確定要刪除此課程嗎？")) {
      await deleteCourseMutation.mutateAsync({ id });
      coursesQuery.refetch();
      toast.success("課程已刪除");
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    if (confirm("確定要刪除此公告嗎？")) {
      await deleteAnnouncementMutation.mutateAsync({ id });
      announcementsQuery.refetch();
      toast.success("公告已刪除");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1B4F72] mb-2">管理儀表板</h1>
          <p className="text-gray-600">歡迎，{user?.name}！</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b overflow-x-auto">
          <button
            onClick={() => setActiveTab("courses")}
            className={`px-4 py-2 font-semibold transition-colors whitespace-nowrap ${
              activeTab === "courses"
                ? "text-[#E8734A] border-b-2 border-[#E8734A]"
                : "text-gray-600 hover:text-[#1B4F72]"
            }`}
          >
            課程管理
          </button>
          <button
            onClick={() => setActiveTab("announcements")}
            className={`px-4 py-2 font-semibold transition-colors whitespace-nowrap ${
              activeTab === "announcements"
                ? "text-[#E8734A] border-b-2 border-[#E8734A]"
                : "text-gray-600 hover:text-[#1B4F72]"
            }`}
          >
            公告管理
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-2 font-semibold transition-colors whitespace-nowrap ${
              activeTab === "users"
                ? "text-[#E8734A] border-b-2 border-[#E8734A]"
                : "text-gray-600 hover:text-[#1B4F72]"
            }`}
          >
            使用者管理
          </button>
          <button
            onClick={() => setActiveTab("news")}
            className={`px-4 py-2 font-semibold transition-colors whitespace-nowrap ${
              activeTab === "news"
                ? "text-[#E8734A] border-b-2 border-[#E8734A]"
                : "text-gray-600 hover:text-[#1B4F72]"
            }`}
          >
            最新消息
          </button>
        </div>

        {/* Courses Tab */}
        {activeTab === "courses" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#1B4F72]">課程列表</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#E8734A] hover:bg-[#d4623a]">
                    <Plus size={16} className="mr-2" />
                    新增課程
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>新增課程</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>課程等級</Label>
                      <Input placeholder="例：初級" />
                    </div>
                    <div>
                      <Label>課程代碼</Label>
                      <Input placeholder="例：A1-A2" />
                    </div>
                    <div>
                      <Label>課程名稱</Label>
                      <Input placeholder="例：基礎華語課程" />
                    </div>
                    <div>
                      <Label>課程描述</Label>
                      <Textarea placeholder="課程詳細描述" />
                    </div>
                    <div>
                      <Label>授課教師</Label>
                      <Input placeholder="教師名稱" />
                    </div>
                    <div>
                      <Label>上課時間</Label>
                      <Input placeholder="例：週一、三、五 09:00-11:00" />
                    </div>
                    <div>
                      <Label>課程人數</Label>
                      <Input type="number" placeholder="20" />
                    </div>
                    <Button className="w-full bg-[#E8734A] hover:bg-[#d4623a]">
                      建立課程
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {coursesQuery.isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="animate-spin text-[#1B4F72]" />
              </div>
            ) : (
              <div className="grid gap-4">
                {coursesQuery.data?.map((course) => (
                  <Card key={course.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-[#1B4F72]">{course.title}</CardTitle>
                          <p className="text-sm text-gray-600 mt-1">
                            {course.level} ({course.code})
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit2 size={14} />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteCourse(course.id!)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">授課教師</p>
                          <p className="font-semibold">{course.instructor}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">上課時間</p>
                          <p className="font-semibold">{course.schedule}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">課程人數</p>
                          <p className="font-semibold">{course.capacity} 人</p>
                        </div>
                        <div>
                          <p className="text-gray-600">狀態</p>
                          <p className="font-semibold text-[#4CAF82]">{course.status}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Announcements Tab */}
        {activeTab === "announcements" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#1B4F72]">公告列表</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-[#E8734A] hover:bg-[#d4623a]">
                    <Plus size={16} className="mr-2" />
                    新增公告
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>新增公告</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>公告類型</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="選擇類型" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="招生">招生</SelectItem>
                          <SelectItem value="活動">活動</SelectItem>
                          <SelectItem value="公告">公告</SelectItem>
                          <SelectItem value="學術">學術</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>公告標題</Label>
                      <Input placeholder="公告標題" />
                    </div>
                    <div>
                      <Label>公告摘要</Label>
                      <Textarea placeholder="公告摘要" />
                    </div>
                    <div>
                      <Label>詳細內容</Label>
                      <Textarea placeholder="詳細內容" rows={5} />
                    </div>
                    <Button className="w-full bg-[#E8734A] hover:bg-[#d4623a]">
                      發布公告
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {announcementsQuery.isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="animate-spin text-[#1B4F72]" />
              </div>
            ) : (
              <div className="grid gap-4">
                {announcementsQuery.data?.map((announcement) => (
                  <Card key={announcement.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-[#1B4F72]">{announcement.title}</CardTitle>
                          <p className="text-sm text-gray-600 mt-1">
                            {announcement.date.toLocaleDateString("zh-TW")} • {announcement.type}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit2 size={14} />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteAnnouncement(announcement.id!)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{announcement.excerpt}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#1B4F72]">使用者管理</h2>
              <p className="text-gray-600 mt-1">管理系統使用者和權限</p>
            </div>
            <Link href="/admin/users">
              <Button className="bg-[#E8734A] hover:bg-[#d4623a]">
                前往使用者管理頁面
              </Button>
            </Link>
          </div>
        )}

        {/* News Tab */}
        {activeTab === "news" && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#1B4F72]">最新消息管理</h2>
              <p className="text-gray-600 mt-1">發布和管理校園公告與消息</p>
            </div>
            <Link href="/admin/news">
              <Button className="bg-[#E8734A] hover:bg-[#d4623a]">
                前往最新消息管理
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
