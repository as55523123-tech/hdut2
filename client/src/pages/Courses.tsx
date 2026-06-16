/*
 * Courses Page - 課程介紹
 * Design: Contemporary Taiwanese Academic
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Clock, Users, BookOpen, CheckCircle, ArrowRight, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CHINESE_LEARNING = "https://d2xsxph8kpxj0f.cloudfront.net/310519663395072106/gFiXLmJAPZ8PqC6x79Srmf/chinese-learning-A2hShc2MTUsfoHTPb3LvLB.webp";
const TAIWAN_CULTURE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663395072106/gFiXLmJAPZ8PqC6x79Srmf/taiwan-culture-6UpJbyFSahi5K6Bqpt5hGr.webp";

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

const courseCategories = [
  {
    id: "beginner",
    level: "初級",
    code: "A1–A2",
    title: "基礎華語課程",
    subtitle: "Chinese for Beginners",
    color: "#4CAF82",
    bgColor: "#4CAF82/10",
    icon: "🌱",
    hours: "每週 10 小時",
    classSize: "最多 12 人",
    duration: "3個月 / 學期",
    description: "專為零基礎學習者設計，從拼音系統（注音/漢語拼音）開始，循序漸進學習基本日常會話、常用詞彙及基礎漢字書寫。",
    objectives: [
      "掌握漢語拼音/注音符號系統",
      "學習300個基礎詞彙",
      "能進行基本日常對話",
      "認識並書寫100個常用漢字",
      "了解基本語法結構",
    ],
    topics: ["自我介紹", "數字與時間", "購物與飲食", "交通與方向", "家庭與朋友"],
  },
  {
    id: "intermediate",
    level: "中級",
    code: "B1–B2",
    title: "進階華語課程",
    subtitle: "Intermediate Chinese",
    color: "#1B4F72",
    bgColor: "#1B4F72/10",
    icon: "📚",
    hours: "每週 12 小時",
    classSize: "最多 10 人",
    duration: "3個月 / 學期",
    description: "在基礎之上深化語言能力，學習複雜句型與語法結構，強化閱讀理解與書面表達能力，為職場或學術環境做準備。",
    objectives: [
      "掌握1500個詞彙",
      "能閱讀報紙及簡單文章",
      "能撰寫正式書信與報告",
      "理解複雜語法結構",
      "具備TOCFL B1-B2程度",
    ],
    topics: ["時事討論", "職場溝通", "文化習俗", "閱讀理解", "書面表達"],
  },
  {
    id: "advanced",
    level: "高級",
    code: "C1–C2",
    title: "精通華語課程",
    subtitle: "Advanced Chinese",
    color: "#E8734A",
    bgColor: "#E8734A/10",
    icon: "🎓",
    hours: "每週 15 小時",
    classSize: "最多 8 人",
    duration: "3個月 / 學期",
    description: "達到接近母語水平，精通正式書面語與口語表達，能閱讀文學作品、撰寫學術論文，適合需要高水平中文能力的專業人士。",
    objectives: [
      "掌握3000個以上詞彙",
      "能閱讀古典文學與學術文章",
      "能撰寫學術論文與正式報告",
      "具備流利的口語表達能力",
      "達到TOCFL C1-C2程度",
    ],
    topics: ["學術寫作", "文學賞析", "辯論與演講", "媒體語言", "古典文學"],
  },
  {
    id: "business",
    level: "商務",
    code: "商業",
    title: "商業華語課程",
    subtitle: "Business Chinese",
    color: "#9B59B6",
    bgColor: "#9B59B6/10",
    icon: "💼",
    hours: "每週 10 小時",
    classSize: "最多 10 人",
    duration: "3個月 / 學期",
    description: "專為商務人士設計，聚焦於職場溝通、商業談判、書信往來等實用商業中文技能，幫助學生在職場環境中有效使用中文。",
    objectives: [
      "掌握商業專業詞彙",
      "能進行商業談判與簡報",
      "撰寫商業書信與合約",
      "理解台灣商業文化",
      "具備職場溝通能力",
    ],
    topics: ["商業談判", "職場禮儀", "財務報告", "市場行銷", "合約閱讀"],
  },
  {
    id: "culture",
    level: "文化",
    code: "體驗",
    title: "文化體驗課程",
    subtitle: "Cultural Experience",
    color: "#E8C84A",
    bgColor: "#E8C84A/10",
    icon: "🎋",
    hours: "每週 6 小時",
    classSize: "最多 15 人",
    duration: "彈性安排",
    description: "結合語言學習與台灣文化體驗，通過書法、茶道、料理、傳統節慶等活動，讓學生在實際文化情境中學習中文，加深對中華文化的理解。",
    objectives: [
      "了解台灣傳統文化習俗",
      "體驗書法、茶道等傳統藝術",
      "學習節慶相關詞彙與表達",
      "培養跨文化溝通能力",
      "建立對中華文化的深度認識",
    ],
    topics: ["書法藝術", "茶道文化", "傳統料理", "節慶習俗", "民俗藝術"],
  },
  {
    id: "tocfl",
    level: "備考",
    code: "TOCFL",
    title: "TOCFL備考課程",
    subtitle: "TOCFL Preparation",
    color: "#E74C3C",
    bgColor: "#E74C3C/10",
    icon: "📝",
    hours: "每週 12 小時",
    classSize: "最多 12 人",
    duration: "2個月 / 考前衝刺",
    description: "針對「華語文能力測驗（TOCFL）」設計的備考課程，系統性訓練聽力、閱讀、寫作各項能力，提供模擬測驗練習，幫助學生取得理想成績。",
    objectives: [
      "熟悉TOCFL考試題型",
      "強化聽力理解能力",
      "提升閱讀速度與理解力",
      "精進寫作表達技巧",
      "完成多次模擬測驗練習",
    ],
    topics: ["聽力訓練", "閱讀技巧", "寫作練習", "模擬測驗", "考試策略"],
  },
];

export default function Courses() {
  const [activeTab, setActiveTab] = useState("beginner");

  const activeCourse = courseCategories.find(c => c.id === activeTab) || courseCategories[0];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Page Header */}
      <div className="relative pt-32 pb-16 bg-[#1B4F72] overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url(${CHINESE_LEARNING})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="container relative z-10">
          <div className="text-white/60 text-sm mb-3 flex items-center gap-2" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
            <Link href="/" className="hover:text-white transition-colors">首頁</Link>
            <span>›</span>
            <span>課程介紹</span>
          </div>
          <h1 className="text-white font-bold text-4xl mb-3" style={{ fontFamily: "'Noto Serif TC', serif" }}>
            課程介紹
          </h1>
          <p className="text-white/70 text-lg" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
            Course Introduction — A1 to C2 Complete Learning Path
          </p>
        </div>
      </div>

      {/* Course Overview */}
      <section className="py-16 bg-[#FAFAF8]">
        <div className="container">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-[#1B4F72] font-bold text-3xl mb-3" style={{ fontFamily: "'Noto Serif TC', serif" }}>
              完整課程體系
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
              本中心提供從初級到高級的完整華語文學習路徑，另有商業華語、文化體驗及TOCFL備考等特色課程
            </p>
          </AnimatedSection>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {courseCategories.map((course) => (
              <button
                key={course.id}
                onClick={() => setActiveTab(course.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeTab === course.id
                    ? "text-white shadow-md scale-105"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
                style={{
                  backgroundColor: activeTab === course.id ? course.color : undefined,
                  fontFamily: "'Noto Serif TC', serif",
                }}
              >
                {course.icon} {course.level}
              </button>
            ))}
          </div>

          {/* Course Detail */}
          <AnimatedSection key={activeTab}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="h-2" style={{ backgroundColor: activeCourse.color }} />
              <div className="p-8 lg:p-10">
                <div className="grid lg:grid-cols-3 gap-10">
                  {/* Main Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">{activeCourse.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="text-xs font-bold px-2.5 py-1 rounded text-white"
                            style={{ backgroundColor: activeCourse.color }}
                          >
                            {activeCourse.level}
                          </span>
                          <span className="text-xs text-gray-400 font-mono bg-gray-100 px-2 py-0.5 rounded">
                            {activeCourse.code}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-[#1B4F72] mt-1" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                          {activeCourse.title}
                        </h3>
                        <p className="text-gray-400 text-sm" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                          {activeCourse.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-6" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                      {activeCourse.description}
                    </p>

                    {/* Course Info Cards */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {[
                        { icon: Clock, label: "課時", value: activeCourse.hours },
                        { icon: Users, label: "班級人數", value: activeCourse.classSize },
                        { icon: BookOpen, label: "課程長度", value: activeCourse.duration },
                      ].map((info, i) => (
                        <div key={i} className="bg-gray-50 rounded-xl p-4 text-center">
                          <info.icon size={20} className="mx-auto mb-2" style={{ color: activeCourse.color }} />
                          <div className="text-xs text-gray-400 mb-1" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                            {info.label}
                          </div>
                          <div className="text-sm font-semibold text-[#1B4F72]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                            {info.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Topics */}
                    <div>
                      <h4 className="font-bold text-[#1B4F72] mb-3" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                        主要課程主題
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeCourse.topics.map((topic, i) => (
                          <span
                            key={i}
                            className="text-sm px-3 py-1.5 rounded-full border font-medium"
                            style={{
                              borderColor: activeCourse.color,
                              color: activeCourse.color,
                              backgroundColor: `${activeCourse.color}10`,
                              fontFamily: "'Noto Sans TC', sans-serif",
                            }}
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Objectives */}
                  <div>
                    <div
                      className="rounded-xl p-6"
                      style={{ backgroundColor: `${activeCourse.color}10`, border: `1px solid ${activeCourse.color}25` }}
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <Star size={18} style={{ color: activeCourse.color }} />
                        <h4 className="font-bold text-[#1B4F72]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                          學習目標
                        </h4>
                      </div>
                      <ul className="space-y-3">
                        {activeCourse.objectives.map((obj, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: activeCourse.color }} />
                            <span className="text-sm text-gray-600" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                              {obj}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6">
                      <Link
                        href="/admissions"
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg text-white font-semibold text-sm transition-all hover:opacity-90 hover:-translate-y-0.5"
                        style={{ backgroundColor: activeCourse.color, fontFamily: "'Noto Serif TC', serif" }}
                      >
                        報名此課程
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img src={TAIWAN_CULTURE} alt="文化體驗" className="w-full h-[380px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B4F72]/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-bold text-lg" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                    語言 × 文化 × 生活
                  </p>
                  <p className="text-white/80 text-sm mt-1" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                    在台灣體驗最真實的中華文化
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="inline-flex items-center gap-2 text-[#E8734A] text-sm font-semibold mb-3 tracking-wider uppercase" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                <div className="w-8 h-px bg-[#E8734A]" />
                Special Features
              </div>
              <h2 className="text-[#1B4F72] font-bold text-3xl mb-5" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                課程特色
              </h2>
              <div className="section-divider mb-6" />

              <div className="space-y-5">
                {[
                  {
                    title: "小班制精緻教學",
                    desc: "每班最多12人，確保每位學生都能獲得充分的個人指導與練習機會。",
                    icon: "👥",
                  },
                  {
                    title: "文化融入教學法",
                    desc: "將台灣文化元素融入語言課程，透過真實文化情境學習，加深記憶與理解。",
                    icon: "🎋",
                  },
                  {
                    title: "彈性學習時程",
                    desc: "提供密集班與一般班兩種選擇，配合不同學習需求與時間安排。",
                    icon: "📅",
                  },
                  {
                    title: "多媒體教學資源",
                    desc: "提供豐富的線上學習資源、教材與練習，支援課外自主學習。",
                    icon: "💻",
                  },
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 bg-[#1B4F72]/10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1B4F72] mb-1" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                        {feature.title}
                      </h4>
                      <p className="text-gray-500 text-sm" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1B4F72]">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="text-white font-bold text-2xl mb-4" style={{ fontFamily: "'Noto Serif TC', serif" }}>
              準備好開始學習了嗎？
            </h2>
            <p className="text-white/70 mb-8" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
              立即申請，開啟您的華語文學習旅程
            </p>
            <Link href="/admissions" className="inline-flex items-center gap-2 bg-[#E8734A] text-white px-10 py-4 rounded font-semibold hover:bg-[#d4623a] transition-all hover:-translate-y-1" style={{ fontFamily: "'Noto Serif TC', serif" }}>
              立即報名 <ArrowRight size={18} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
