/*
 * About Page - 關於中心
 * Design: Contemporary Taiwanese Academic
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Target, Eye, Users, BookOpen, Globe, Award, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CHINESE_LEARNING = "https://d2xsxph8kpxj0f.cloudfront.net/310519663395072106/gFiXLmJAPZ8PqC6x79Srmf/chinese-learning-A2hShc2MTUsfoHTPb3LvLB.webp";
const CAMPUS_LIFE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663395072106/gFiXLmJAPZ8PqC6x79Srmf/campus-life-H2Xs5zLqn3rbqpSoGzrsDZ.webp";

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

const faculty = [
  { name: "王明華 教授", title: "中心主任", specialty: "對外華語教學、語言習得理論", education: "國立台灣師範大學 華語文教學研究所 博士" },
  { name: "李雅婷 副教授", title: "資深教師", specialty: "初中級華語教學、教材編寫", education: "國立政治大學 中國文學系 碩士" },
  { name: "陳建志 講師", title: "文化課程教師", specialty: "台灣文化、書法藝術", education: "國立台灣藝術大學 書畫藝術系 碩士" },
  { name: "林美玲 講師", title: "高級課程教師", specialty: "商業華語、學術寫作", education: "國立成功大學 中國文學系 碩士" },
];

const duties = [
  { icon: BookOpen, title: "課程規劃與教學", desc: "規劃並執行本校華語文課程及教學，提供從初級到高級的完整學習路徑。" },
  { icon: Award, title: "能力測驗輔導", desc: "辦理華語文能力檢測（TOCFL）之教學規劃與輔導，協助學生取得國際認可證書。" },
  { icon: Globe, title: "文化傳授與交流", desc: "推動對外華語教學及文化之傳授和交流，舉辦各項文化研習與學術交流活動。" },
  { icon: Users, title: "教材研發", desc: "編撰、研發與推動各類華語文教材與華語教學相關研究，持續提升教學品質。" },
];

export default function About() {
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
            <span>關於中心</span>
          </div>
          <h1 className="text-white font-bold text-4xl mb-3" style={{ fontFamily: "'Noto Serif TC', serif" }}>
            關於華語文中心
          </h1>
          <p className="text-white/70 text-lg" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
            About Chinese Language Center
          </p>
        </div>
      </div>

      {/* Introduction */}
      <section className="py-20 bg-[#FAFAF8]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 text-[#E8734A] text-sm font-semibold mb-3 tracking-wider uppercase" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                <div className="w-8 h-px bg-[#E8734A]" />
                Introduction
              </div>
              <h2 className="text-[#1B4F72] font-bold mb-5 text-3xl" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                中心簡介
              </h2>
              <div className="section-divider mb-6" />
              <p className="text-gray-600 leading-relaxed mb-5" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                宏國德霖科技大學華語文中心隸屬於國際事務處，依本校組織規程第十九條設立，旨在因應國際文化交流需求，積極推廣華語文教育。
              </p>
              <p className="text-gray-600 leading-relaxed mb-5" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                本中心提供完整的華語文課程體系，從基礎入門到高級精通，涵蓋聽說讀寫各項能力訓練，並特別注重文化融入教學，讓學生在語言學習的同時，深入了解台灣與中華文化。
              </p>
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                本中心已獲教育部認可，具備境外招生資格，歡迎來自世界各地的學生申請就讀，共同在台灣展開精彩的語言文化學習旅程。
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src={CHINESE_LEARNING} alt="華語文教學" className="w-full h-[420px] object-cover" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-[#1B4F72] font-bold text-3xl mb-3" style={{ fontFamily: "'Noto Serif TC', serif" }}>
              使命與願景
            </h2>
            <div className="section-divider mx-auto" />
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="bg-[#1B4F72] text-white rounded-2xl p-8 h-full">
                <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center mb-5">
                  <Target size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-xl mb-4" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                  中心使命
                </h3>
                <p className="text-white/80 leading-relaxed" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                  推廣華語文教育，促進國際文化交流，提供高品質的語言學習環境，協助外籍學生掌握中文能力，融入台灣社會，並將中華文化傳播至世界各地。
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="bg-[#E8734A] text-white rounded-2xl p-8 h-full">
                <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center mb-5">
                  <Eye size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-xl mb-4" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                  發展願景
                </h3>
                <p className="text-white/90 leading-relaxed" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                  成為台灣北部地區最具特色的華語文教學中心，以創新的教學方法、豐富的文化體驗課程，吸引更多國際學生來台學習，成為連結台灣與世界的語言文化橋樑。
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Duties */}
      <section className="py-20 bg-[#FAFAF8]">
        <div className="container">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-[#1B4F72] font-bold text-3xl mb-3" style={{ fontFamily: "'Noto Serif TC', serif" }}>
              中心職掌
            </h2>
            <div className="section-divider mx-auto" />
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {duties.map((duty, i) => (
              <AnimatedSection key={i}>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1 h-full">
                  <div className="w-12 h-12 bg-[#1B4F72]/10 rounded-xl flex items-center justify-center mb-4">
                    <duty.icon size={22} className="text-[#1B4F72]" />
                  </div>
                  <h3 className="font-bold text-[#1B4F72] mb-3" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                    {duty.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                    {duty.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section id="faculty" className="py-20 bg-white">
        <div className="container">
          <AnimatedSection className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-[#E8734A] text-sm font-semibold mb-3 tracking-wider uppercase" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              <div className="w-8 h-px bg-[#E8734A]" />
              Our Faculty
              <div className="w-8 h-px bg-[#E8734A]" />
            </div>
            <h2 className="text-[#1B4F72] font-bold text-3xl mb-3" style={{ fontFamily: "'Noto Serif TC', serif" }}>
              師資介紹
            </h2>
            <p className="text-gray-500" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
              本中心師資均具備碩士以上學歷及華語文教學資格
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {faculty.map((member, i) => (
              <AnimatedSection key={i}>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="h-2 bg-gradient-to-r from-[#1B4F72] to-[#E8734A]" />
                  <div className="p-6">
                    <div className="w-16 h-16 bg-[#1B4F72]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users size={28} className="text-[#1B4F72]" />
                    </div>
                    <h3 className="font-bold text-[#1B4F72] text-center mb-1" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                      {member.name}
                    </h3>
                    <p className="text-[#E8734A] text-xs text-center font-medium mb-3" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                      {member.title}
                    </p>
                    <div className="border-t border-gray-100 pt-3 space-y-2">
                      <div>
                        <span className="text-xs font-semibold text-gray-400 block mb-0.5" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>專長領域</span>
                        <p className="text-xs text-gray-600" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>{member.specialty}</p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-gray-400 block mb-0.5" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>學歷</span>
                        <p className="text-xs text-gray-600" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>{member.education}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1B4F72]">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="text-white font-bold text-2xl mb-4" style={{ fontFamily: "'Noto Serif TC', serif" }}>
              有任何問題嗎？
            </h2>
            <p className="text-white/70 mb-8" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
              歡迎與我們聯繫，我們將竭誠為您服務
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-[#E8734A] text-white px-8 py-3 rounded font-semibold hover:bg-[#d4623a] transition-all" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                聯絡我們 <ArrowRight size={16} />
              </Link>
              <Link href="/admissions" className="inline-flex items-center gap-2 bg-white/15 border border-white/30 text-white px-8 py-3 rounded font-semibold hover:bg-white/25 transition-all" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                招生資訊
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
