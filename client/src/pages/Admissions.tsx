/*
 * Admissions Page - 招生資訊
 * Design: Contemporary Taiwanese Academic
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { CheckCircle, ArrowRight, FileText, CreditCard, Calendar, Globe, DollarSign, Gift, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CAMPUS_LIFE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663395072106/gFiXLmJAPZ8PqC6x79Srmf/hdut_campus_students_44f7085e.webp";

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

const applicationSteps = [
  {
    step: "01",
    title: "確認申請資格",
    desc: "確認您符合申請條件，包含國籍、年齡、學歷等基本要求。",
    icon: CheckCircle,
  },
  {
    step: "02",
    title: "準備申請文件",
    desc: "備齊護照、學歷證明、語言能力證明（如有）等所需文件。",
    icon: FileText,
  },
  {
    step: "03",
    title: "線上提交申請",
    desc: "填寫線上申請表格，上傳所需文件，並支付申請費用。",
    icon: Globe,
  },
  {
    step: "04",
    title: "程度測試",
    desc: "通過線上或到校進行程度測試，確認適合的課程等級。",
    icon: FileText,
  },
  {
    step: "05",
    title: "繳費確認入學",
    desc: "收到錄取通知後，在規定期限內繳納學費，完成入學手續。",
    icon: CreditCard,
  },
  {
    step: "06",
    title: "辦理簽證（如需）",
    desc: "本中心協助提供所需文件，協助辦理學生簽證申請。",
    icon: Calendar,
  },
];

const targetStudents = [
  {
    title: "外籍學生",
    desc: "持有效外國護照，有意在台灣學習華語文的國際學生。",
    icon: "🌍",
    countries: "越南、印尼、馬來西亞、泰國、日本、韓國等",
  },
  {
    title: "海外僑生",
    desc: "具有海外僑居身份，希望回台學習中文的海外華人子弟。",
    icon: "🏠",
    countries: "東南亞、歐美、澳洲等地區僑生",
  },
  {
    title: "短期進修生",
    desc: "計劃短期來台學習中文的學生，可選擇1至6個月的課程。",
    icon: "✈️",
    countries: "適合暑期、學期交換或短期語言進修",
  },
  {
    title: "新南向專班",
    desc: "參與新南向政策產學合作專班的外籍學生，提供專屬華語補強課程。",
    icon: "🤝",
    countries: "越南、印尼、馬來西亞、泰國、菲律賓等",
  },
];

const tuitionInfo = [
  {
    type: "一般課程（每學期）",
    price: "NT$ 18,000",
    duration: "3個月",
    hours: "每週10-15小時",
    includes: ["課程教材", "文化體驗活動（2次）", "學習評量報告"],
  },
  {
    type: "密集課程（每學期）",
    price: "NT$ 28,000",
    duration: "3個月",
    hours: "每週20小時",
    includes: ["課程教材", "文化體驗活動（4次）", "學習評量報告", "個別輔導（2次）"],
    featured: true,
  },
  {
    type: "短期課程（每月）",
    price: "NT$ 8,000",
    duration: "1個月",
    hours: "每週10小時",
    includes: ["課程教材", "文化體驗活動（1次）"],
  },
];

const scholarships = [
  {
    name: "新南向獎學金",
    amount: "學費減免50%",
    target: "越南、印尼、馬來西亞、泰國等新南向國家學生",
    icon: Gift,
  },
  {
    name: "優秀學生獎學金",
    amount: "NT$ 5,000 / 學期",
    target: "學習成績優異，達到TOCFL進步兩個等級以上",
    icon: Gift,
  },
  {
    name: "早鳥優惠",
    amount: "學費9折",
    target: "開課前2個月完成報名並繳費",
    icon: DollarSign,
  },
];

export default function Admissions() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Page Header */}
      <div className="relative pt-32 pb-16 bg-[#1B4F72] overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url(${CAMPUS_LIFE})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="container relative z-10">
          <div className="text-white/60 text-sm mb-3 flex items-center gap-2" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
            <Link href="/" className="hover:text-white transition-colors">首頁</Link>
            <span>›</span>
            <span>招生資訊</span>
          </div>
          <h1 className="text-white font-bold text-4xl mb-3" style={{ fontFamily: "'Noto Serif TC', serif" }}>
            招生資訊
          </h1>
          <p className="text-white/70 text-lg" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
            Admissions Information — Welcome to Apply
          </p>
        </div>
      </div>

      {/* Target Students */}
      <section id="target" className="py-20 bg-[#FAFAF8]">
        <div className="container">
          <AnimatedSection className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-[#E8734A] text-sm font-semibold mb-3 tracking-wider uppercase" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              <div className="w-8 h-px bg-[#E8734A]" />
              Who Can Apply
              <div className="w-8 h-px bg-[#E8734A]" />
            </div>
            <h2 className="text-[#1B4F72] font-bold text-3xl mb-3" style={{ fontFamily: "'Noto Serif TC', serif" }}>
              招生對象
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
              本中心歡迎來自世界各地的學生申請，無論您是外籍學生、海外僑生或短期進修生
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetStudents.map((student, i) => (
              <AnimatedSection key={i}>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1 h-full">
                  <div className="text-4xl mb-4">{student.icon}</div>
                  <h3 className="font-bold text-[#1B4F72] text-lg mb-2" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                    {student.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                    {student.desc}
                  </p>
                  <div className="bg-[#1B4F72]/5 rounded-lg p-3">
                    <p className="text-xs text-[#1B4F72]/70" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                      {student.countries}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section id="process" className="py-20 bg-white">
        <div className="container">
          <AnimatedSection className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-[#E8734A] text-sm font-semibold mb-3 tracking-wider uppercase" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              <div className="w-8 h-px bg-[#E8734A]" />
              How to Apply
              <div className="w-8 h-px bg-[#E8734A]" />
            </div>
            <h2 className="text-[#1B4F72] font-bold text-3xl mb-3" style={{ fontFamily: "'Noto Serif TC', serif" }}>
              申請流程
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applicationSteps.map((step, i) => (
              <AnimatedSection key={i}>
                <div className="relative bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#1B4F72] rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        {step.step}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1B4F72] mb-2" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                        {step.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                  {i < applicationSteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      {(i + 1) % 3 !== 0 && <ArrowRight size={20} className="text-[#E8734A]" />}
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Required Documents */}
          <AnimatedSection className="mt-12">
            <div className="bg-[#1B4F72]/5 rounded-2xl p-8">
              <h3 className="font-bold text-[#1B4F72] text-xl mb-6" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                📋 申請所需文件
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "有效護照影本（效期6個月以上）",
                  "最高學歷證明文件（中文或英文）",
                  "2吋大頭照 2張",
                  "填寫完整之申請表格",
                  "語言能力證明（如有，非必要）",
                  "財力證明文件（申請學生簽證時需要）",
                  "健康檢查報告（部分課程需要）",
                  "申請費 NT$ 1,000",
                ].map((doc, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-[#4CAF82] flex-shrink-0" />
                    <span className="text-sm text-gray-700" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                      {doc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Tuition */}
      <section id="fees" className="py-20 bg-[#FAFAF8]">
        <div className="container">
          <AnimatedSection className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-[#E8734A] text-sm font-semibold mb-3 tracking-wider uppercase" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              <div className="w-8 h-px bg-[#E8734A]" />
              Tuition & Fees
              <div className="w-8 h-px bg-[#E8734A]" />
            </div>
            <h2 className="text-[#1B4F72] font-bold text-3xl mb-3" style={{ fontFamily: "'Noto Serif TC', serif" }}>
              學費資訊
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {tuitionInfo.map((plan, i) => (
              <AnimatedSection key={i}>
                <div className={`rounded-2xl overflow-hidden shadow-sm transition-all hover:-translate-y-1 ${plan.featured ? "shadow-xl ring-2 ring-[#E8734A]" : "border border-gray-100"}`}>
                  {plan.featured && (
                    <div className="bg-[#E8734A] text-white text-center py-2 text-xs font-bold tracking-wider" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                      ★ 最受歡迎
                    </div>
                  )}
                  <div className={`p-6 ${plan.featured ? "bg-white" : "bg-white"}`}>
                    <h3 className="font-bold text-[#1B4F72] mb-3 text-sm" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                      {plan.type}
                    </h3>
                    <div className="mb-4">
                      <span className="text-3xl font-black text-[#1B4F72]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        {plan.price}
                      </span>
                    </div>
                    <div className="space-y-2 mb-5 text-sm text-gray-500" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-[#E8734A]" />
                        {plan.duration}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-[#E8734A]" />
                        {plan.hours}
                      </div>
                    </div>
                    <div className="border-t border-gray-100 pt-4 space-y-2">
                      {plan.includes.map((item, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm text-gray-600" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                          <CheckCircle size={14} className="text-[#4CAF82] flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/contact"
                      className={`mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all ${
                        plan.featured
                          ? "bg-[#E8734A] text-white hover:bg-[#d4623a]"
                          : "border-2 border-[#1B4F72] text-[#1B4F72] hover:bg-[#1B4F72] hover:text-white"
                      }`}
                      style={{ fontFamily: "'Noto Serif TC', serif" }}
                    >
                      立即報名
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarships */}
      <section className="py-20 bg-white">
        <div className="container">
          <AnimatedSection className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-[#E8734A] text-sm font-semibold mb-3 tracking-wider uppercase" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              <div className="w-8 h-px bg-[#E8734A]" />
              Scholarships
              <div className="w-8 h-px bg-[#E8734A]" />
            </div>
            <h2 className="text-[#1B4F72] font-bold text-3xl mb-3" style={{ fontFamily: "'Noto Serif TC', serif" }}>
              獎學金資訊
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {scholarships.map((scholarship, i) => (
              <AnimatedSection key={i}>
                <div className="bg-gradient-to-br from-[#1B4F72] to-[#153d5a] text-white rounded-xl p-6 shadow-lg">
                  <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center mb-4">
                    <scholarship.icon size={20} className="text-[#E8C84A]" />
                  </div>
                  <h3 className="font-bold text-lg mb-2" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                    {scholarship.name}
                  </h3>
                  <div className="text-[#E8C84A] font-bold text-xl mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {scholarship.amount}
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                    {scholarship.target}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-[#1B4F72]">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="text-white font-bold text-2xl mb-4" style={{ fontFamily: "'Noto Serif TC', serif" }}>
              有任何招生問題？
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
              歡迎透過電話、電子郵件或親自到訪，我們的招生人員將為您詳細說明
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-[#E8734A] text-white px-8 py-3.5 rounded font-semibold hover:bg-[#d4623a] transition-all" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                聯絡我們 <ArrowRight size={16} />
              </Link>
              <a href="mailto:clc@hdut.edu.tw" className="inline-flex items-center gap-2 bg-white/15 border border-white/30 text-white px-8 py-3.5 rounded font-semibold hover:bg-white/25 transition-all" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                發送電子郵件
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}


