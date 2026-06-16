/*
 * Navbar Component
 * Design: Contemporary Taiwanese Academic
 * - Deep navy background with coral accent on hover
 * - Sticky top navigation with transparent-to-solid scroll effect
 * - Mobile-responsive hamburger menu
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useI18n } from "@/lib/i18n";

const HDUT_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663395072106/gFiXLmJAPZ8PqC6x79Srmf/hdut-logo_b96abc3a.png";

export default function Navbar() {
  const { t } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [location] = useLocation();

  const navItems = [
    { label: t("home"), href: "/" },
    {
      label: t("about"),
      href: "/about",
      children: [
        { label: t("about"), href: "/about" },
        { label: "師資介紹", href: "/about#faculty" },
        { label: t("contact"), href: "/contact" },
      ],
    },
    {
      label: t("courses"),
      href: "/courses",
      children: [
        { label: t("beginner") + " " + t("courses"), href: "/courses#beginner" },
        { label: t("intermediate") + " " + t("courses"), href: "/courses#intermediate" },
        { label: t("advanced") + " " + t("courses"), href: "/courses#advanced" },
        { label: t("cultureCourse"), href: "/courses#culture" },
        { label: "TOCFL備考課程", href: "/courses#tocfl" },
      ],
    },
    {
      label: t("admissions"),
      href: "/admissions",
      children: [
        { label: t("admissionTarget"), href: "/admissions#target" },
        { label: t("applicationProcess"), href: "/admissions#process" },
        { label: t("tuitionFee") + " & " + t("scholarship"), href: "/admissions#fees" },
      ],
    },
    { label: t("announcements"), href: "/announcements" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setOpenDropdown(null);
  }, [location]);

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileOpen
          ? "bg-[#1B4F72] shadow-lg"
          : "bg-[#1B4F72]/95 backdrop-blur-sm"
      }`}
    >
      {/* Top bar */}
      <div className="bg-[#153d5a] text-white/70 text-xs py-1.5">
        <div className="container flex justify-between items-center">
          <span>宏國德霖科技大學 Hungkuo Delin University of Technology</span>
          <div className="flex items-center gap-4">
            <a href="https://www.hdut.edu.tw" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              <Globe size={12} />
              <span>學校官網</span>
            </a>
            <span>|</span>
            <span>English</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src={HDUT_LOGO}
              alt="宏國德霖科技大學"
              className="h-10 w-auto object-contain"
            />
            <div className="hidden sm:block">
              <div className="text-white font-bold text-sm leading-tight" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                宏國德霖科技大學
              </div>
              <div className="text-white/70 text-xs leading-tight">
                華語文中心 Chinese Language Center
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 ml-auto">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded transition-all duration-200 ${
                    isActive(item.href)
                      ? "text-white bg-white/15"
                      : "text-white/85 hover:text-white hover:bg-white/10"
                  }`}
                  style={{ fontFamily: "'Noto Serif TC', serif" }}
                >
                  {item.label}
                  {item.children && <ChevronDown size={14} className={`transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />}
                </Link>

                {/* Dropdown */}
                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-44 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden animate-fade-in">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#1B4F72]/10 hover:text-[#1B4F72] transition-colors border-b border-gray-50 last:border-0"
                        style={{ fontFamily: "'Noto Sans TC', sans-serif" }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/admissions"
              className="ml-3 px-5 py-2 bg-[#E8734A] text-white text-sm font-semibold rounded transition-all duration-200 hover:bg-[#d4623a] hover:shadow-lg hover:-translate-y-0.5"
              style={{ fontFamily: "'Noto Serif TC', serif" }}
            >
              {t("applyNow")}
            </Link>
            <div className="ml-2 border-l border-white/20 pl-2">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile Language Switcher */}
          <div className="lg:hidden mr-2">
            <LanguageSwitcher />
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-white p-2 rounded hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="開啟選單"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="lg:hidden bg-[#153d5a] border-t border-white/10 animate-fade-in">
          <div className="container py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className={`block px-4 py-3 text-sm font-medium rounded transition-colors ${
                    isActive(item.href)
                      ? "text-white bg-white/15"
                      : "text-white/85 hover:text-white hover:bg-white/10"
                  }`}
                  style={{ fontFamily: "'Noto Serif TC', serif" }}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2 text-xs text-white/60 hover:text-white/90 transition-colors"
                      >
                        › {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-white/10">
              <Link
                href="/admissions"
                className="block text-center px-5 py-3 bg-[#E8734A] text-white text-sm font-semibold rounded transition-all hover:bg-[#d4623a]"
                style={{ fontFamily: "'Noto Serif TC', serif" }}
              >
                立即報名
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
