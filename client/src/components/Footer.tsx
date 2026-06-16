/*
 * Footer Component
 * Design: Contemporary Taiwanese Academic
 * - Deep navy background matching header
 * - Organized link columns with coral accent
 */

import { Link } from "wouter";
import { MapPin, Phone, Mail, Facebook, Youtube, ExternalLink } from "lucide-react";

const HDUT_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663395072106/gFiXLmJAPZ8PqC6x79Srmf/hdut-logo_b96abc3a.png";

export default function Footer() {
  return (
    <footer className="bg-[#1B4F72] text-white">
      {/* Main Footer */}
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img src={HDUT_LOGO} alt="宏國德霖科技大學" className="h-12 w-auto object-contain" />
              <div>
                <div className="font-bold text-sm leading-tight" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                  宏國德霖科技大學
                </div>
                <div className="text-white/60 text-xs leading-tight mt-0.5">
                  華語文中心
                </div>
              </div>
            </div>
            <p className="text-white/65 text-sm leading-relaxed mb-5" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
              致力於推廣華語文教育，提供優質的語言學習環境，歡迎來自世界各地的學生來台學習中文。
            </p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/hdut.edu.tw" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#E8734A] transition-colors">
                <Facebook size={16} />
              </a>
              <a href="https://www.youtube.com/@hdut" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#E8734A] transition-colors">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm mb-5 text-white/90 tracking-wider uppercase" style={{ fontFamily: "'Noto Serif TC', serif" }}>
              快速連結
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "中心簡介", href: "/about" },
                { label: "課程介紹", href: "/courses" },
                { label: "招生資訊", href: "/admissions" },
                { label: "教學公告", href: "/announcements" },
                { label: "聯絡我們", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href}
                    className="text-white/65 text-sm hover:text-[#E8734A] transition-colors flex items-center gap-1.5"
                    style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                    <span className="text-[#E8734A] text-xs">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Course Links */}
          <div>
            <h4 className="font-bold text-sm mb-5 text-white/90 tracking-wider uppercase" style={{ fontFamily: "'Noto Serif TC', serif" }}>
              課程分類
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "初級華語課程", href: "/courses#beginner" },
                { label: "中級華語課程", href: "/courses#intermediate" },
                { label: "高級華語課程", href: "/courses#advanced" },
                { label: "商業華語", href: "/courses#business" },
                { label: "文化體驗課程", href: "/courses#culture" },
                { label: "TOCFL備考課程", href: "/courses#tocfl" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href}
                    className="text-white/65 text-sm hover:text-[#E8734A] transition-colors flex items-center gap-1.5"
                    style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                    <span className="text-[#E8734A] text-xs">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-sm mb-5 text-white/90 tracking-wider uppercase" style={{ fontFamily: "'Noto Serif TC', serif" }}>
              聯絡資訊
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-white/65" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                <MapPin size={16} className="text-[#E8734A] flex-shrink-0 mt-0.5" />
                <span>23671 新北市土城區青雲路380號<br />國際事務處 華語文中心</span>
              </li>
              <li className="flex gap-3 text-sm text-white/65" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                <Phone size={16} className="text-[#E8734A] flex-shrink-0 mt-0.5" />
                <span>(02) 2270-0898</span>
              </li>
              <li className="flex gap-3 text-sm text-white/65" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                <Mail size={16} className="text-[#E8734A] flex-shrink-0 mt-0.5" />
                <span>clc@hdut.edu.tw</span>
              </li>
              <li>
                <a href="https://www.hdut.edu.tw" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#E8734A] hover:text-white transition-colors"
                  style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                  <ExternalLink size={14} />
                  學校官方網站
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/45 text-xs" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
            © 2024 宏國德霖科技大學華語文中心 版權所有
          </p>
          <p className="text-white/45 text-xs" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
            Hungkuo Delin University of Technology — Chinese Language Center
          </p>
        </div>
      </div>
    </footer>
  );
}
