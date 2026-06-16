/*
 * Contact Page - 聯絡我們
 * Design: Contemporary Taiwanese Academic
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

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

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  alert("handleSubmit 有執行");

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzelxB6ec8jWhb8fiNC4ZYzQNtEj4MXlxqhK03UkNLw0hic-Eqb_pBS2qbkn-uGRlmv/exec",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      throw new Error("送出失敗");
    }

    setSubmitted(true);

    toast.success("訊息已成功送出！我們將在3個工作天內回覆您。");
  } catch (error) {
    console.error(error);
    toast.error("送出失敗，請稍後再試。");
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Page Header */}
      <div className="relative pt-32 pb-16 bg-[#1B4F72]">
        <div className="container relative z-10">
          <div className="text-white/60 text-sm mb-3 flex items-center gap-2" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
            <Link href="/" className="hover:text-white transition-colors">首頁</Link>
            <span>›</span>
            <span>聯絡我們</span>
          </div>
          <h1 className="text-white font-bold text-4xl mb-3" style={{ fontFamily: "'Noto Serif TC', serif" }}>
            聯絡我們
          </h1>
          <p className="text-white/70 text-lg" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
            Contact Us — We're Here to Help
          </p>
        </div>
      </div>

      {/* Contact Info + Form */}
      <section className="py-20 bg-[#FAFAF8]">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <h2 className="text-[#1B4F72] font-bold text-2xl mb-6" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                  聯絡資訊
                </h2>

                <div className="space-y-5 mb-8">
                  {[
                    {
                      icon: MapPin,
                      title: "地址",
                      content: "23671 新北市土城區青雲路380號\n宏國德霖科技大學 國際事務處 華語文中心",
                    },
                    {
                      icon: Phone,
                      title: "電話",
                      content: "(02) 2270-0898\n分機：XXXX",
                    },
                    {
                      icon: Mail,
                      title: "電子郵件",
                      content: "clc@hdut.edu.tw",
                    },
                    {
                      icon: Clock,
                      title: "辦公時間",
                      content: "週一至週五：08:00 – 17:00\n週六、日及國定假日休息",
                    },
                  ].map((info, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 bg-[#1B4F72]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <info.icon size={18} className="text-[#1B4F72]" />
                      </div>
                      <div>
                        <div className="font-semibold text-[#1B4F72] text-sm mb-1" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                          {info.title}
                        </div>
                        <p className="text-gray-600 text-sm whitespace-pre-line" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                          {info.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map placeholder */}
                <div className="bg-[#1B4F72]/8 rounded-xl overflow-hidden h-52 flex items-center justify-center border border-[#1B4F72]/15">
                  <div className="text-center">
                    <MapPin size={32} className="text-[#1B4F72]/40 mx-auto mb-2" />
                    <p className="text-sm text-[#1B4F72]/60" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                      新北市土城區青雲路380號
                    </p>
                    <a
                      href="https://maps.google.com/?q=宏國德霖科技大學"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#E8734A] hover:underline mt-1 block"
                      style={{ fontFamily: "'Noto Sans TC', sans-serif" }}
                    >
                      在 Google Maps 中查看
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <AnimatedSection>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                  <h2 className="text-[#1B4F72] font-bold text-2xl mb-2" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                    發送訊息
                  </h2>
                  <p className="text-gray-500 text-sm mb-6" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                    請填寫以下表單，我們將在3個工作天內回覆您
                  </p>

                  {submitted ? (
                    <div className="text-center py-12">
                      <CheckCircle size={56} className="text-[#4CAF82] mx-auto mb-4" />
                      <h3 className="font-bold text-[#1B4F72] text-xl mb-2" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                        訊息已送出！
                      </h3>
                      <p className="text-gray-500" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                        感謝您的來信，我們將盡快回覆您。
                      </p>
                      <button
                        onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", country: "", subject: "", message: "" }); }}
                        className="mt-6 text-sm text-[#E8734A] hover:underline"
                        style={{ fontFamily: "'Noto Serif TC', serif" }}
                      >
                        再次發送訊息
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-[#1B4F72] mb-1.5" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                            姓名 <span className="text-[#E8734A]">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="請輸入您的姓名"
                            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#1B4F72] transition-colors"
                            style={{ fontFamily: "'Noto Sans TC', sans-serif" }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-[#1B4F72] mb-1.5" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                            電子郵件 <span className="text-[#E8734A]">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#1B4F72] transition-colors"
                            style={{ fontFamily: "'Noto Sans TC', sans-serif" }}
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-[#1B4F72] mb-1.5" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                            電話
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+886 ..."
                            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#1B4F72] transition-colors"
                            style={{ fontFamily: "'Noto Sans TC', sans-serif" }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-[#1B4F72] mb-1.5" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                            國籍
                          </label>
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#1B4F72] transition-colors bg-white"
                            style={{ fontFamily: "'Noto Sans TC', sans-serif" }}
                          >
                            <option value="">請選擇國籍</option>
                            <option value="VN">越南</option>
                            <option value="ID">印尼</option>
                            <option value="MY">馬來西亞</option>
                            <option value="TH">泰國</option>
                            <option value="JP">日本</option>
                            <option value="KR">韓國</option>
                            <option value="PH">菲律賓</option>
                            <option value="US">美國</option>
                            <option value="OTHER">其他</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#1B4F72] mb-1.5" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                          詢問主題 <span className="text-[#E8734A]">*</span>
                        </label>
                        <select
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#1B4F72] transition-colors bg-white"
                          style={{ fontFamily: "'Noto Sans TC', sans-serif" }}
                        >
                          <option value="">請選擇詢問主題</option>
                          <option value="admission">招生與報名</option>
                          <option value="course">課程相關問題</option>
                          <option value="tuition">學費與獎學金</option>
                          <option value="visa">簽證協助</option>
                          <option value="accommodation">住宿資訊</option>
                          <option value="other">其他問題</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#1B4F72] mb-1.5" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                          訊息內容 <span className="text-[#E8734A]">*</span>
                        </label>
                        <textarea
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          placeholder="請詳細描述您的問題或需求..."
                          className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#1B4F72] transition-colors resize-none"
                          style={{ fontFamily: "'Noto Sans TC', sans-serif" }}
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-[#1B4F72] text-white py-3.5 rounded-lg font-semibold text-sm hover:bg-[#153d5a] transition-all hover:-translate-y-0.5 hover:shadow-lg"
                        style={{ fontFamily: "'Noto Serif TC', serif" }}
                      >
                        <Send size={16} />
                        送出訊息
                      </button>
                    </form>
                  )}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container max-w-3xl">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-[#1B4F72] font-bold text-3xl mb-3" style={{ fontFamily: "'Noto Serif TC', serif" }}>
              常見問題
            </h2>
            <div className="section-divider mx-auto" />
          </AnimatedSection>

          <AnimatedSection>
            <div className="space-y-4">
              {[
                {
                  q: "我需要具備任何中文基礎才能申請嗎？",
                  a: "不需要！本中心提供完全零基礎的初級課程（A1），歡迎完全沒有中文基礎的學生申請。我們會在入學前進行程度測試，將您安排在最適合的班級。",
                },
                {
                  q: "課程是否提供英文授課？",
                  a: "初級課程（A1-A2）可提供英文輔助說明，以幫助學生理解。中級以上課程則以中文授課為主，以確保最佳的語言學習效果。",
                },
                {
                  q: "本中心是否協助辦理學生簽證？",
                  a: "是的，本中心可提供所需的入學文件，協助學生辦理學生簽證（居留簽證）。具體簽證申請流程請洽本中心招生人員。",
                },
                {
                  q: "是否提供住宿安排？",
                  a: "本中心可協助介紹校外租屋資訊，但不直接提供住宿。學校附近有多種住宿選擇，包含套房、分租等，月租約NT$5,000-12,000不等。",
                },
                {
                  q: "課程結束後是否頒發結業證書？",
                  a: "是的，完成課程並達到出席率要求（80%以上）的學生將獲頒本校華語文中心結業證書，並可申請TOCFL測驗以取得國際認可的語言能力證明。",
                },
              ].map((faq, i) => (
                <details key={i} className="group bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                    <span className="font-semibold text-[#1B4F72] text-sm pr-4" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                      {faq.q}
                    </span>
                    <span className="text-[#E8734A] flex-shrink-0 group-open:rotate-45 transition-transform text-xl">+</span>
                  </summary>
                  <div className="px-5 pb-5 border-t border-gray-50">
                    <p className="text-gray-600 text-sm leading-relaxed pt-4" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                      {faq.a}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
