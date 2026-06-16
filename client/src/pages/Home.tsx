/*
 * Home Page
 * Design: Contemporary Taiwanese Academic
 * Sections: Hero, Stats, About, Courses Preview, Admissions CTA, Announcements, Culture
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Users, Award, Globe, ChevronRight, Calendar, Bell, Star } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useI18n } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663395072106/gFiXLmJAPZ8PqC6x79Srmf/hero-bg-h47HEc8aDFJGFWBNA8kUhG.webp";
const CHINESE_LEARNING = "https://d2xsxph8kpxj0f.cloudfront.net/310519663395072106/gFiXLmJAPZ8PqC6x79Srmf/chinese-learning-A2hShc2MTUsfoHTPb3LvLB.webp";
const CALLIGRAPHY = "https://d2xsxph8kpxj0f.cloudfront.net/310519663395072106/gFiXLmJAPZ8PqC6x79Srmf/calligraphy-art-ABQ5LVyYzkqfDhBUUPcKdY.webp";
const TAIWAN_CULTURE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663395072106/gFiXLmJAPZ8PqC6x79Srmf/taiwan-culture-6UpJbyFSahi5K6Bqpt5hGr.webp";
const CAMPUS_LIFE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663395072106/gFiXLmJAPZ8PqC6x79Srmf/hdut_campus_students_44f7085e.webp";

export default function Home() {
  const { t } = useI18n();
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stats = [
    { number: "500+", label: t("students"), sublabel: t("fromCountries") },
    { number: "15+", label: t("teachers"), sublabel: t("doctorateDegree") },
    { number: "6", label: t("courseLevel"), sublabel: t("aToC") },
    { number: "54", label: t("yearsHistory"), sublabel: t("foundedYear") },
  ];

  const courses = [
    {
      level: t("beginner"),
      code: "A1–A2",
      title: t("basicCourse"),
      desc: t("basicDesc"),
      color: "#4CAF82",
      icon: "🌱",
    },
    {
      level: t("intermediate"),
      code: "B1–B2",
      title: t("advancedCourse"),
      desc: t("advancedDesc"),
      color: "#1B4F72",
      icon: "📚",
    },
    {
      level: t("advanced"),
      code: "C1–C2",
      title: t("masteryCourse"),
      desc: t("masteryDesc"),
      color: "#E8734A",
      icon: "🎓",
    },
    {
      level: t("special"),
      code: "文化",
      title: t("cultureCourse"),
      desc: t("cultureDesc"),
      color: "#9B59B6",
      icon: "🎋",
    },
  ];

  const announcements = [
    {
      id: 1,
      type: t("recruitment"),
      date: "2025-03-01",
      title: "114學年度第二學期華語文課程招生公告",
      excerpt: "本中心開放114學年度第二學期（2025年3月至6月）課程報名，歡迎外籍學生踴躍申請。",
    },
    {
      id: 2,
      type: t("activity"),
      date: "2025-02-20",
      title: "2025年台灣文化體驗活動報名開始",
      excerpt: "春節文化體驗活動，包含包粽子、書法體驗、夜市導覽等精彩活動，名額有限。",
    },
    {
      id: 3,
      type: t("notice"),
      date: "2025-02-10",
      title: "線上課程平台使用說明",
      excerpt: "為提升教學效率，本中心已建置線上課程平台。請所有學生登入帳號並完成個人資訊設定。",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-20"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: "'Noto Serif TC', serif" }}>
            {t("heroTitle")}
          </h1>
          <p className="text-2xl md:text-3xl mb-8 text-yellow-300" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {t("heroSubtitle")}
          </p>
          <p className="text-lg md:text-xl mb-10 leading-relaxed">
            {t("heroDescription")}
          </p>
          <Link href="/courses">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#E8734A] hover:bg-[#d4623a] text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
              {t("exploreButton")}
              <ArrowRight size={20} />
            </button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-[#1B4F72]/5 to-[#E8734A]/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#E8734A] mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-[#1B4F72] mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#1B4F72] mb-6" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                {t("aboutTitle")}
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {t("aboutDescription")}
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-[#1B4F72] mb-2">
                    {t("mission")}
                  </h3>
                  <p className="text-gray-600">
                    {t("missionText")}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1B4F72] mb-2">
                    {t("vision")}
                  </h3>
                  <p className="text-gray-600">
                    {t("visionText")}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src={CHINESE_LEARNING}
                alt="華語文學習"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Courses Preview */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#1B4F72] mb-16" style={{ fontFamily: "'Noto Serif TC', serif" }}>
            {t("coursesTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border-l-4"
                style={{ borderLeftColor: course.color }}
              >
                <div className="p-6">
                  <div className="text-4xl mb-3">{course.icon}</div>
                  <div className="text-sm font-semibold text-gray-600 mb-1">
                    {course.level} ({course.code})
                  </div>
                  <h3 className="text-xl font-bold text-[#1B4F72] mb-3">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {course.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/courses">
              <button className="inline-flex items-center gap-2 px-8 py-3 bg-[#1B4F72] hover:bg-[#153d5a] text-white font-semibold rounded-lg transition-all duration-200">
                {t("exploreButton")}
                <ChevronRight size={18} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#1B4F72] mb-16" style={{ fontFamily: "'Noto Serif TC', serif" }}>
            {t("announcementsTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border-t-4 border-[#E8734A]"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block px-3 py-1 bg-[#E8734A]/10 text-[#E8734A] text-xs font-semibold rounded-full">
                    {announcement.type}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(announcement.date).toLocaleDateString("zh-TW")}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#1B4F72] mb-2 line-clamp-2">
                  {announcement.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {announcement.excerpt}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/announcements">
              <button className="inline-flex items-center gap-2 px-8 py-3 bg-[#E8734A] hover:bg-[#d4623a] text-white font-semibold rounded-lg transition-all duration-200">
                {t("announcementsTitle")}
                <ChevronRight size={18} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#1B4F72] to-[#153d5a] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "'Noto Serif TC', serif" }}>
            {t("applyNow")}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            {t("admissionTargetDesc")}
          </p>
          <Link href="/admissions">
            <button className="inline-flex items-center gap-2 px-10 py-4 bg-[#E8734A] hover:bg-[#d4623a] text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
              {t("applyNow")}
              <ArrowRight size={20} />
            </button>
          </Link>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#1B4F72] mb-16" style={{ fontFamily: "'Noto Serif TC', serif" }}>
            台灣文化體驗
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <img src={CALLIGRAPHY} alt="書法體驗" className="rounded-lg shadow-lg h-80 object-cover" />
            <img src={TAIWAN_CULTURE} alt="台灣文化" className="rounded-lg shadow-lg h-80 object-cover" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
