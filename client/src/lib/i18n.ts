import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'zh' | 'en' | 'vi';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  zh: {
    home: '首頁',
    about: '關於中心',
    courses: '課程介紹',
    admissions: '招生資訊',
    announcements: '教學公告',
    contact: '聯絡我們',
    english: 'English',
    vietnamese: 'Tiếng Việt',
    chinese: '中文',
    heroTitle: '探索中文之美',
    heroSubtitle: '從台灣出發',
    heroDescription: '宏國德霖科技大學華語文中心，提供專業華語文教學課程，歡迎來自世界各地的學生體驗文化。',
    exploreButton: '探索課程',
    students: '在籍學生',
    fromCountries: '來自20+國家',
    teachers: '專業師資',
    doctorateDegree: '碩博士學歷',
    courseLevel: '課程等級',
    aToC: 'A1 至 C2',
    yearsHistory: '年辦學歷史',
    foundedYear: '1971年創校',
    aboutTitle: '關於華語文中心',
    aboutDescription: '宏國德霖科技大學華語文中心致力於提供高質量的華語文教學，幫助全球學生掌握中文語言和文化。',
    mission: '使命',
    missionText: '培養具有國際競爭力的華語文人才，推廣台灣文化。',
    vision: '願景',
    visionText: '成為亞洲頂尖的華語文教學中心。',
    coursesTitle: '課程介紹',
    beginner: '初級',
    intermediate: '中級',
    advanced: '高級',
    special: '特色',
    basicCourse: '基礎華語課程',
    basicDesc: '從零開始學習中文，掌握基本日常會話、拼音系統與基礎漢字書寫。',
    advancedCourse: '進階華語課程',
    advancedDesc: '深化語言能力，學習複雜句型、閱讀理解與書面表達，為職場或學術做準備。',
    masteryCourse: '精通華語課程',
    masteryDesc: '達到母語接近水平，精通正式書面語、文學閱讀與學術寫作。',
    cultureCourse: '文化體驗課程',
    cultureDesc: '結合語言學習與台灣文化體驗，包含書法、茶道、傳統節慶等文化活動。',
    admissionsTitle: '招生資訊',
    admissionTarget: '招生對象',
    admissionTargetDesc: '對華語文感興趣的全球學生，無需華語基礎。',
    applicationProcess: '申請流程',
    tuitionFee: '學費方案',
    scholarship: '獎學金資訊',
    applyNow: '立即報名',
    announcementsTitle: '教學公告',
    searchPlaceholder: '搜尋公告...',
    allCategories: '所有分類',
    recruitment: '招生',
    activity: '活動',
    notice: '公告',
    academic: '學術',
    contactTitle: '聯絡我們',
    address: '地址',
    phone: '電話',
    email: '郵件',
    officeHours: '辦公時間',
    faq: '常見問題',
    quickLinks: '快速連結',
    followUs: '追蹤我們',
    copyright: '版權所有',
    admin: '管理',
    dashboard: '儀表板',
    logout: '登出',
    login: '登入',
  },
  en: {
    home: 'Home',
    about: 'About',
    courses: 'Courses',
    admissions: 'Admissions',
    announcements: 'Announcements',
    contact: 'Contact Us',
    english: 'English',
    vietnamese: 'Tiếng Việt',
    chinese: '中文',
    heroTitle: 'Discover the Beauty of Chinese',
    heroSubtitle: 'Starting from Taiwan',
    heroDescription: 'Hungkuo Delin University of Science and Technology Chinese Language Center offers professional Chinese language teaching courses. Welcome students from around the world to experience culture.',
    exploreButton: 'Explore Courses',
    students: 'Students',
    fromCountries: 'From 20+ Countries',
    teachers: 'Professional Teachers',
    doctorateDegree: "Master's and Doctoral Degrees",
    courseLevel: 'Course Levels',
    aToC: 'A1 to C2',
    yearsHistory: 'Years of History',
    foundedYear: 'Founded in 1971',
    aboutTitle: 'About the Center',
    aboutDescription: 'The Chinese Language Center at Hungkuo Delin University is committed to providing high-quality Chinese language teaching to help students worldwide master the Chinese language and culture.',
    mission: 'Mission',
    missionText: 'Cultivate internationally competitive Chinese language talents and promote Taiwanese culture.',
    vision: 'Vision',
    visionText: 'Become the leading Chinese language teaching center in Asia.',
    coursesTitle: 'Courses',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    special: 'Special',
    basicCourse: 'Basic Chinese Course',
    basicDesc: 'Learn Chinese from scratch, master basic daily conversations, pinyin system, and basic Chinese character writing.',
    advancedCourse: 'Intermediate Chinese Course',
    advancedDesc: 'Deepen language skills, learn complex sentence patterns, reading comprehension, and written expression for workplace or academic preparation.',
    masteryCourse: 'Advanced Chinese Course',
    masteryDesc: 'Reach near-native proficiency, master formal written language, literary reading, and academic writing.',
    cultureCourse: 'Cultural Experience Course',
    cultureDesc: 'Combine language learning with Taiwanese cultural experiences, including calligraphy, tea ceremony, and traditional festivals.',
    admissionsTitle: 'Admissions',
    admissionTarget: 'Target Students',
    admissionTargetDesc: 'Global students interested in Chinese language, no prior Chinese background required.',
    applicationProcess: 'Application Process',
    tuitionFee: 'Tuition Plans',
    scholarship: 'Scholarship Information',
    applyNow: 'Apply Now',
    announcementsTitle: 'Announcements',
    searchPlaceholder: 'Search announcements...',
    allCategories: 'All Categories',
    recruitment: 'Recruitment',
    activity: 'Activity',
    notice: 'Notice',
    academic: 'Academic',
    contactTitle: 'Contact Us',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    officeHours: 'Office Hours',
    faq: 'FAQ',
    quickLinks: 'Quick Links',
    followUs: 'Follow Us',
    copyright: 'All Rights Reserved',
    admin: 'Admin',
    dashboard: 'Dashboard',
    logout: 'Logout',
    login: 'Login',
  },
  vi: {
    home: 'Trang chủ',
    about: 'Về chúng tôi',
    courses: 'Khóa học',
    admissions: 'Tuyển sinh',
    announcements: 'Thông báo',
    contact: 'Liên hệ',
    english: 'English',
    vietnamese: 'Tiếng Việt',
    chinese: '中文',
    heroTitle: 'Khám phá vẻ đẹp của tiếng Trung',
    heroSubtitle: 'Bắt đầu từ Đài Loan',
    heroDescription: 'Trung tâm Ngôn ngữ Trung Quốc của Đại học Khoa học và Công nghệ Hungkuo Delin cung cấp các khóa học giảng dạy tiếng Trung chuyên nghiệp. Chào đón sinh viên từ khắp nơi trên thế giới để trải nghiệm văn hóa.',
    exploreButton: 'Khám phá khóa học',
    students: 'Sinh viên',
    fromCountries: 'Từ 20+ quốc gia',
    teachers: 'Giáo viên chuyên nghiệp',
    doctorateDegree: 'Bằng Thạc sĩ và Tiến sĩ',
    courseLevel: 'Cấp độ khóa học',
    aToC: 'A1 đến C2',
    yearsHistory: 'Năm lịch sử',
    foundedYear: 'Thành lập năm 1971',
    aboutTitle: 'Về Trung tâm',
    aboutDescription: 'Trung tâm Ngôn ngữ Trung Quốc tại Đại học Hungkuo Delin cam kết cung cấp giáo dục tiếng Trung chất lượng cao để giúp sinh viên trên toàn thế giới nắm vững tiếng Trung và văn hóa.',
    mission: 'Sứ mệnh',
    missionText: 'Đào tạo những tài năng tiếng Trung có sức cạnh tranh quốc tế và quảng bá văn hóa Đài Loan.',
    vision: 'Tầm nhìn',
    visionText: 'Trở thành trung tâm giảng dạy tiếng Trung hàng đầu ở châu Á.',
    coursesTitle: 'Khóa học',
    beginner: 'Sơ cấp',
    intermediate: 'Trung cấp',
    advanced: 'Cao cấp',
    special: 'Đặc biệt',
    basicCourse: 'Khóa học tiếng Trung cơ bản',
    basicDesc: 'Học tiếng Trung từ đầu, nắm vững các cuộc trò chuyện hàng ngày cơ bản, hệ thống pinyin và viết ký tự Trung Quốc cơ bản.',
    advancedCourse: 'Khóa học tiếng Trung trung cấp',
    advancedDesc: 'Nâng cao kỹ năng ngôn ngữ, học các cấu trúc câu phức tạp, hiểu biết đọc và kỹ năng viết để chuẩn bị cho công việc hoặc học tập.',
    masteryCourse: 'Khóa học tiếng Trung cao cấp',
    masteryDesc: 'Đạt được mức độ gần như bản xứ, thành thạo tiếng viết chính thức, đọc văn học và viết học thuật.',
    cultureCourse: 'Khóa học trải nghiệm văn hóa',
    cultureDesc: 'Kết hợp học tiếng Trung với trải nghiệm văn hóa Đài Loan, bao gồm thư pháp, nghi thức trà và các lễ hội truyền thống.',
    admissionsTitle: 'Tuyển sinh',
    admissionTarget: 'Đối tượng tuyển sinh',
    admissionTargetDesc: 'Sinh viên toàn cầu quan tâm đến tiếng Trung, không cần nền tảng tiếng Trung trước đó.',
    applicationProcess: 'Quy trình đăng ký',
    tuitionFee: 'Các gói học phí',
    scholarship: 'Thông tin học bổng',
    applyNow: 'Đăng ký ngay',
    announcementsTitle: 'Thông báo',
    searchPlaceholder: 'Tìm kiếm thông báo...',
    allCategories: 'Tất cả danh mục',
    recruitment: 'Tuyển dụng',
    activity: 'Hoạt động',
    notice: 'Thông báo',
    academic: 'Học tập',
    contactTitle: 'Liên hệ với chúng tôi',
    address: 'Địa chỉ',
    phone: 'Điện thoại',
    email: 'Email',
    officeHours: 'Giờ làm việc',
    faq: 'Câu hỏi thường gặp',
    quickLinks: 'Liên kết nhanh',
    followUs: 'Theo dõi chúng tôi',
    copyright: 'Bản quyền được bảo lưu',
    admin: 'Quản trị',
    dashboard: 'Bảng điều khiển',
    logout: 'Đăng xuất',
    login: 'Đăng nhập',
  },
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language | null;
    return saved || 'zh';
  });

  const t = (key: string): string => {
    const value = translations[language][key];
    return value || key;
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    React.createElement(
      I18nContext.Provider,
      { value: { language, setLanguage: handleSetLanguage, t } },
      children
    )
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
