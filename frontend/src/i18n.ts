import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        projects: 'Projects',
        skills: 'Skills',
        achievements: 'Achievements',
        projectsDesc: 'My selected works',
        skillsDesc: 'Technologies & tools',
        achievementsDesc: 'Certificates & awards',
      },
      // Sections
      about: {
        title: 'About Me',
        info: 'Info',
        socials: 'Socials',
        yearsOld: 'Years Old',
      },
      experience: {
        title: 'Experience',
        present: 'Present',
      },
      projects: {
        title: 'Projects',
        demo: 'Demo',
        github: 'GitHub',
      },
      skills: {
        title: 'Skills',
        level: 'Level',
      },
      achievements: {
        title: 'Achievements',
        viewCredential: 'View Credential',
      },
      // Common
      common: {
        loading: 'Loading...',
        noData: 'No data available',
        error: 'Something went wrong',
        close: 'Close',
      },
    },
  },
  id: {
    translation: {
      nav: {
        projects: 'Proyek',
        skills: 'Keahlian',
        achievements: 'Pencapaian',
        projectsDesc: 'Karya pilihan saya',
        skillsDesc: 'Teknologi & perangkat',
        achievementsDesc: 'Sertifikat & penghargaan',
      },
      about: {
        title: 'Tentang Saya',
        info: 'Info',
        socials: 'Sosial Media',
        yearsOld: 'Tahun',
      },
      experience: {
        title: 'Pengalaman',
        present: 'Sekarang',
      },
      projects: {
        title: 'Proyek',
        demo: 'Demo',
        github: 'GitHub',
      },
      skills: {
        title: 'Keahlian',
        level: 'Level',
      },
      achievements: {
        title: 'Pencapaian',
        viewCredential: 'Lihat Kredensial',
      },
      common: {
        loading: 'Memuat...',
        noData: 'Data tidak tersedia',
        error: 'Terjadi kesalahan',
        close: 'Tutup',
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'id'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
