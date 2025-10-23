import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Banner
      title: "Our Voice, Our Rights",
      subtitle: "MGNREGA District Performance Dashboard",
      
      // Navigation
      selectState: "Select State",
      selectDistrict: "Select District",
      autoDetect: "Auto-Detect Location",
      detecting: "Detecting...",
      
      // Language
      language: "Language",
      
      // Metrics
      totalEmployed: "Total People Employed",
      totalWages: "Total Wages Paid",
      personDays: "Person-Days Generated",
      workCompleted: "Work Progress",
      totalExpenditure: "Total Expenditure",
      
      // Units
      people: "people",
      rupees: "₹",
      days: "days",
      percent: "%",
      crore: "Cr",
      lakh: "L",
      
      // Status
      loading: "Loading district data...",
      loadingStates: "Loading states...",
      loadingDistricts: "Loading districts...",
      error: "Error loading data",
      noData: "No data available for this district",
      selectDistrictPrompt: "Please select a state and district to view MGNREGA performance data",
      
      // Charts
      employmentTrend: "Employment Trend",
      expenditureBreakdown: "Expenditure Breakdown",
      monthlyData: "Monthly Data",
      
      // Footer
      lastUpdated: "Last Updated",
      dataSource: "Data Source: Government of India Open Data Portal",
      
      // Errors
      locationError: "Unable to detect location. Please select manually.",
      locationDenied: "Location access denied. Please enable location services.",
      apiError: "Failed to fetch data. Please try again later.",
    }
  },
  hi: {
    translation: {
      // Banner
      title: "हमारी आवाज़, हमारे अधिकार",
      subtitle: "मनरेगा जिला प्रदर्शन डैशबोर्ड",
      
      // Navigation
      selectState: "राज्य चुनें",
      selectDistrict: "जिला चुनें",
      autoDetect: "स्थान स्वतः पहचानें",
      detecting: "पहचान रहा है...",
      
      // Language
      language: "भाषा",
      
      // Metrics
      totalEmployed: "कुल नियोजित लोग",
      totalWages: "कुल मजदूरी भुगतान",
      personDays: "व्यक्ति-दिवस उत्पन्न",
      workCompleted: "कार्य प्रगति",
      totalExpenditure: "कुल व्यय",
      
      // Units
      people: "लोग",
      rupees: "₹",
      days: "दिन",
      percent: "%",
      crore: "करोड़",
      lakh: "लाख",
      
      // Status
      loading: "जिला डेटा लोड हो रहा है...",
      loadingStates: "राज्य लोड हो रहे हैं...",
      loadingDistricts: "जिले लोड हो रहे हैं...",
      error: "डेटा लोड करने में त्रुटि",
      noData: "इस जिले के लिए कोई डेटा उपलब्ध नहीं है",
      selectDistrictPrompt: "कृपया मनरेगा प्रदर्शन डेटा देखने के लिए एक राज्य और जिला चुनें",
      
      // Charts
      employmentTrend: "रोजगार रुझान",
      expenditureBreakdown: "व्यय विवरण",
      monthlyData: "मासिक डेटा",
      
      // Footer
      lastUpdated: "अंतिम अपडेट",
      dataSource: "डेटा स्रोत: भारत सरकार ओपन डेटा पोर्टल",
      
      // Errors
      locationError: "स्थान का पता लगाने में असमर्थ। कृपया मैन्युअल रूप से चुनें।",
      locationDenied: "स्थान पहुंच अस्वीकृत। कृपया स्थान सेवाएं सक्षम करें।",
      apiError: "डेटा प्राप्त करने में विफल। कृपया बाद में पुनः प्रयास करें।",
    }
  },
  mr: {
    translation: {
      // Banner
      title: "आमचा आवाज, आमचे अधिकार",
      subtitle: "मनरेगा जिल्हा कामगिरी डॅशबोर्ड",
      
      // Navigation
      selectState: "राज्य निवडा",
      selectDistrict: "जिल्हा निवडा",
      autoDetect: "स्थान स्वयं शोधा",
      detecting: "शोधत आहे...",
      
      // Language
      language: "भाषा",
      
      // Metrics
      totalEmployed: "एकूण रोजगार मिळालेले लोक",
      totalWages: "एकूण वेतन भरले",
      personDays: "व्यक्ती-दिवस निर्माण",
      workCompleted: "कामाची प्रगती",
      totalExpenditure: "एकूण खर्च",
      
      // Units
      people: "लोक",
      rupees: "₹",
      days: "दिवस",
      percent: "%",
      crore: "कोटी",
      lakh: "लाख",
      
      // Status
      loading: "जिल्हा डेटा लोड होत आहे...",
      loadingStates: "राज्ये लोड होत आहेत...",
      loadingDistricts: "जिल्हे लोड होत आहेत...",
      error: "डेटा लोड करताना त्रुटी",
      noData: "या जिल्ह्यासाठी डेटा उपलब्ध नाही",
      selectDistrictPrompt: "कृपया मनरेगा कामगिरी डेटा पाहण्यासाठी राज्य आणि जिल्हा निवडा",
      
      // Charts
      employmentTrend: "रोजगार ट्रेंड",
      expenditureBreakdown: "खर्चाचे विभाजन",
      monthlyData: "मासिक डेटा",
      
      // Footer
      lastUpdated: "शेवटचे अपडेट",
      dataSource: "डेटा स्रोत: भारत सरकार ओपन डेटा पोर्टल",
      
      // Errors
      locationError: "स्थान शोधण्यात अक्षम. कृपया मॅन्युअली निवडा.",
      locationDenied: "स्थान प्रवेश नाकारला. कृपया स्थान सेवा सक्षम करा.",
      apiError: "डेटा आणण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
