/*
 * Announcements Page - 教學公告
 * Design: Contemporary Taiwanese Academic
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Calendar, ChevronRight, Search, Bell, Tag, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function useIntersectionObserver(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
    }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useIntersectionObserver();
  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  );
}

const allAnnouncements = [
  {
    id: 1,
    type: "招生",
    date: "2025-03-01",
    title: "114學年度第二學期華語文課程招生公告",
    content: "本中心開放114學年度第二學期（2025年3月至6月）課程報名。本學期開設初級（A1-A2）、中級（B1-B2）、高級（C1-C2）及文化體驗課程，歡迎外籍學生踴躍申請。報名截止日期為2025年2月28日，額滿為止。",
    important: true,
  },
  {
    id: 2,
    type: "活動",
    date: "2025-02-20",
    title: "2025年台灣文化體驗活動報名開始",
    content: "春節文化體驗活動將於2025年2月28日舉行，活動內容包含包粽子、書法體驗、夜市導覽等精彩活動。本活動開放給所有在籍學生參加，名額有限，先到先得。",
    important: false,
  },
  {
    id: 3,
    type: "公告",
    date: "2025-02-10",
    title: "TOCFL華語文能力測驗報名資訊",
    content: "2025年第一次TOCFL測驗將於2025年5月舉行。本中心提供TOCFL備考課程及代辦報名服務，有意參加測驗的學生請於2025年3月31日前與本中心聯繫。",
    important: false,
  },
  {
    id: 4,
    type: "學術",
    date: "2025-01-28",
    title: "新南向國家獎學金申請說明會",
    content: "本校針對越南、印尼、馬來西亞、泰國等新南向國家學生提供專屬獎學金，最高可減免50%學費。說明會將於2025年2月15日下午2時在國際事務處會議室舉行，歡迎符合資格者出席。",
    important: true,
  },
  {
    id: 5,
    type: "課程",
    date: "2025-01-15",
    title: "114學年度第一學期期末成績公告",
    content: "114學年度第一學期期末成績已公告，請同學登入學生系統查詢個人成績。如有疑問，請於2025年1月31日前向本中心提出申請複查。",
    important: false,
  },
  {
    id: 6,
    type: "公告",
    date: "2025-01-05",
    title: "寒假期間辦公室服務時間調整公告",
    content: "本中心寒假期間（2025年1月20日至2月9日）辦公時間調整為週一至週五上午9時至下午4時，週六、日及國定假日休息。緊急事項請來電或發送電子郵件聯繫。",
    important: false,
  },
  {
    id: 7,
    type: "招生",
    date: "2024-12-20",
    title: "2025年暑期密集班招生公告",
    content: "2025年暑期密集班（7月至8月）即日起開放報名。本次暑期班提供初級至中級課程，每週20小時密集教學，適合希望在短時間內快速提升中文能力的學生。",
    important: false,
  },
  {
    id: 8,
    type: "活動",
    date: "2024-12-10",
    title: "年終成果發表會暨結業典禮",
    content: "114學年度第一學期成果發表會暨結業典禮將於2024年12月27日下午2時在本校國際會議廳舉行。歡迎所有在籍學生及家長出席，共同見證學習成果。",
    important: false,
  },
];

const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  招生: { bg: "bg-[#E8734A]/10", text: "text-[#E8734A]", border: "border-[#E8734A]/20" },
  活動: { bg: "bg-[#4CAF82]/10", text: "text-[#4CAF82]", border: "border-[#4CAF82]/20" },
  公告: { bg: "bg-[#1B4F72]/10", text: "text-[#1B4F72]", border: "border-[#1B4F72]/20" },
  學術: { bg: "bg-[#9B59B6]/10", text: "text-[#9B59B6]", border: "border-[#9B59B6]/20" },
  課程: { bg: "bg-[#E8C84A]/15", text: "text-[#B8860B]", border: "border-[#E8C84A]/30" },
};

export default function Announcements() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("全部");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filters = ["全部", "招生", "課程", "活動", "公告", "學術"];

  const filtered = allAnnouncements.filter((item) => {
    const matchesFilter = activeFilter === "全部" || item.type === activeFilter;
    const matchesSearch = !searchQuery ||
      item.title.includes(searchQuery) ||
      item.content.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Page Header */}
      <div className="relative pt-32 pb-16 bg-[#1B4F72] overflow-hidden">
        <div className="container relative z-10">
          <div className="text-white/60 text-sm mb-3 flex items-center gap-2" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
            <Link href="/" className="hover:text-white transition-colors">首頁</Link>
            <span>›</span>
            <span>教學公告</span>
          </div>
          <h1 className="text-white font-bold text-4xl mb-3" style={{ fontFamily: "'Noto Serif TC', serif" }}>
            教學公告
          </h1>
          <p className="text-white/70 text-lg" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
            Announcements — Stay Updated with Latest News
          </p>
        </div>
      </div>

      {/* Important Announcements Banner */}
      {allAnnouncements.filter(a => a.important).length > 0 && (
        <div className="bg-[#E8734A]/10 border-b border-[#E8734A]/20">
          <div className="container py-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-[#E8734A] font-semibold text-sm flex-shrink-0" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                <Bell size={16} className="animate-pulse" />
                重要公告
              </div>
              <div className="overflow-hidden flex-1">
                <div className="flex gap-6 animate-marquee" style={{ animation: "none" }}>
                  {allAnnouncements.filter(a => a.important).map(a => (
                    <span key={a.id} className="text-sm text-gray-700 whitespace-nowrap" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                      {a.date} — {a.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <section className="py-12 bg-[#FAFAF8] flex-1">
        <div className="container">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AnimatedSection>
                {/* Search */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-5">
                  <h3 className="font-bold text-[#1B4F72] mb-3 text-sm" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                    搜尋公告
                  </h3>
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="輸入關鍵字..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#1B4F72] transition-colors"
                      style={{ fontFamily: "'Noto Sans TC', sans-serif" }}
                    />
                  </div>
                </div>

                {/* Filter */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-5">
                  <h3 className="font-bold text-[#1B4F72] mb-3 text-sm flex items-center gap-2" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                    <Tag size={14} />
                    公告分類
                  </h3>
                  <div className="space-y-1">
                    {filters.map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          activeFilter === filter
                            ? "bg-[#1B4F72] text-white font-semibold"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                        style={{ fontFamily: "'Noto Sans TC', sans-serif" }}
                      >
                        {filter}
                        <span className="float-right text-xs opacity-60">
                          {filter === "全部" ? allAnnouncements.length : allAnnouncements.filter(a => a.type === filter).length}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-[#1B4F72] rounded-xl p-5">
                  <h3 className="font-bold text-white mb-3 text-sm" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                    快速連結
                  </h3>
                  <div className="space-y-2">
                    {[
                      { label: "課程報名", href: "/admissions" },
                      { label: "課程介紹", href: "/courses" },
                      { label: "聯絡我們", href: "/contact" },
                    ].map((link) => (
                      <Link key={link.label} href={link.href}
                        className="flex items-center gap-2 text-white/70 text-sm hover:text-white transition-colors"
                        style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                        <ChevronRight size={14} className="text-[#E8734A]" />
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Announcement List */}
            <div className="lg:col-span-3">
              <AnimatedSection>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-gray-500 text-sm" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                    共 <span className="font-semibold text-[#1B4F72]">{filtered.length}</span> 則公告
                  </p>
                </div>

                {filtered.length === 0 ? (
                  <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
                    <Bell size={40} className="text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-400" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                      沒有符合條件的公告
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filtered.map((item, i) => {
                      const colors = typeColors[item.type] || typeColors["公告"];
                      const isExpanded = expandedId === item.id;
                      return (
                        <div
                          key={item.id}
                          className={`bg-white rounded-xl shadow-sm border transition-all ${
                            item.important ? "border-[#E8734A]/30 ring-1 ring-[#E8734A]/20" : "border-gray-100"
                          } hover:shadow-md`}
                        >
                          <div
                            className="p-5 cursor-pointer"
                            onClick={() => setExpandedId(isExpanded ? null : item.id)}
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-12 h-12 bg-[#1B4F72]/8 rounded-xl flex flex-col items-center justify-center">
                                <Calendar size={14} className="text-[#1B4F72] mb-0.5" />
                                <span className="text-[9px] text-[#1B4F72]/70 font-mono">
                                  {item.date.slice(5).replace("-", "/")}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                  <span className={`announcement-badge ${colors.bg} ${colors.text} border ${colors.border}`}>
                                    {item.type}
                                  </span>
                                  {item.important && (
                                    <span className="announcement-badge bg-red-50 text-red-500 border border-red-100">
                                      重要
                                    </span>
                                  )}
                                  <span className="text-xs text-gray-400" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                                    {item.date}
                                  </span>
                                </div>
                                <h4 className="font-semibold text-[#1B4F72] mb-1" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                                  {item.title}
                                </h4>
                                {!isExpanded && (
                                  <p className="text-gray-500 text-sm line-clamp-2" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                                    {item.content}
                                  </p>
                                )}
                              </div>
                              <ChevronRight
                                size={18}
                                className={`text-gray-300 flex-shrink-0 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                              />
                            </div>
                          </div>

                          {isExpanded && (
                            <div className="px-5 pb-5 border-t border-gray-50">
                              <p className="text-gray-600 text-sm leading-relaxed pt-4" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                                {item.content}
                              </p>
                              <div className="mt-4 flex gap-3">
                                <Link href="/contact"
                                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B4F72] hover:text-[#E8734A] transition-colors"
                                  style={{ fontFamily: "'Noto Serif TC', serif" }}>
                                  了解更多 <ArrowRight size={12} />
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
