import axios from 'axios';
import type { MGNREGAMetrics, StateInfo, DistrictInfo } from '@shared/schema';

const API_KEY = process.env.DATA_GOV_API_KEY;
const BASE_URL = 'https://api.data.gov.in/resource';

// Indian states data
export const STATES: StateInfo[] = [
  { code: 'AN', name: 'Andaman and Nicobar Islands', nameHindi: 'अंडमान और निकोबार द्वीप समूह', nameMarathi: 'अंदमान आणि निकोबार बेटे' },
  { code: 'AP', name: 'Andhra Pradesh', nameHindi: 'आंध्र प्रदेश', nameMarathi: 'आंध्र प्रदेश' },
  { code: 'AR', name: 'Arunachal Pradesh', nameHindi: 'अरुणाचल प्रदेश', nameMarathi: 'अरुणाचल प्रदेश' },
  { code: 'AS', name: 'Assam', nameHindi: 'असम', nameMarathi: 'आसाम' },
  { code: 'BR', name: 'Bihar', nameHindi: 'बिहार', nameMarathi: 'बिहार' },
  { code: 'CH', name: 'Chandigarh', nameHindi: 'चंडीगढ़', nameMarathi: 'चंदिगड' },
  { code: 'CT', name: 'Chhattisgarh', nameHindi: 'छत्तीसगढ़', nameMarathi: 'छत्तीसगड' },
  { code: 'DN', name: 'Dadra and Nagar Haveli', nameHindi: 'दादरा और नगर हवेली', nameMarathi: 'दादरा आणि नगर हवेली' },
  { code: 'DD', name: 'Daman and Diu', nameHindi: 'दमन और दीव', nameMarathi: 'दमण आणि दीव' },
  { code: 'DL', name: 'Delhi', nameHindi: 'दिल्ली', nameMarathi: 'दिल्ली' },
  { code: 'GA', name: 'Goa', nameHindi: 'गोवा', nameMarathi: 'गोवा' },
  { code: 'GJ', name: 'Gujarat', nameHindi: 'गुजरात', nameMarathi: 'गुजरात' },
  { code: 'HR', name: 'Haryana', nameHindi: 'हरियाणा', nameMarathi: 'हरियाणा' },
  { code: 'HP', name: 'Himachal Pradesh', nameHindi: 'हिमाचल प्रदेश', nameMarathi: 'हिमाचल प्रदेश' },
  { code: 'JK', name: 'Jammu and Kashmir', nameHindi: 'जम्मू और कश्मीर', nameMarathi: 'जम्मू आणि काश्मीर' },
  { code: 'JH', name: 'Jharkhand', nameHindi: 'झारखंड', nameMarathi: 'झारखंड' },
  { code: 'KA', name: 'Karnataka', nameHindi: 'कर्नाटक', nameMarathi: 'कर्नाटक' },
  { code: 'KL', name: 'Kerala', nameHindi: 'केरल', nameMarathi: 'केरळ' },
  { code: 'LA', name: 'Ladakh', nameHindi: 'लद्दाख', nameMarathi: 'लडाख' },
  { code: 'LD', name: 'Lakshadweep', nameHindi: 'लक्षद्वीप', nameMarathi: 'लक्षद्वीप' },
  { code: 'MP', name: 'Madhya Pradesh', nameHindi: 'मध्य प्रदेश', nameMarathi: 'मध्य प्रदेश' },
  { code: 'MH', name: 'Maharashtra', nameHindi: 'महाराष्ट्र', nameMarathi: 'महाराष्ट्र' },
  { code: 'MN', name: 'Manipur', nameHindi: 'मणिपुर', nameMarathi: 'मणिपूर' },
  { code: 'ML', name: 'Meghalaya', nameHindi: 'मेघालय', nameMarathi: 'मेघालय' },
  { code: 'MZ', name: 'Mizoram', nameHindi: 'मिजोरम', nameMarathi: 'मिझोरम' },
  { code: 'NL', name: 'Nagaland', nameHindi: 'नागालैंड', nameMarathi: 'नागालँड' },
  { code: 'OR', name: 'Odisha', nameHindi: 'ओडिशा', nameMarathi: 'ओडिशा' },
  { code: 'PY', name: 'Puducherry', nameHindi: 'पुदुचेरी', nameMarathi: 'पुदुचेरी' },
  { code: 'PB', name: 'Punjab', nameHindi: 'पंजाब', nameMarathi: 'पंजाब' },
  { code: 'RJ', name: 'Rajasthan', nameHindi: 'राजस्थान', nameMarathi: 'राजस्थान' },
  { code: 'SK', name: 'Sikkim', nameHindi: 'सिक्किम', nameMarathi: 'सिक्कीम' },
  { code: 'TN', name: 'Tamil Nadu', nameHindi: 'तमिलनाडु', nameMarathi: 'तामिळनाडू' },
  { code: 'TG', name: 'Telangana', nameHindi: 'तेलंगाना', nameMarathi: 'तेलंगणा' },
  { code: 'TR', name: 'Tripura', nameHindi: 'त्रिपुरा', nameMarathi: 'त्रिपुरा' },
  { code: 'UP', name: 'Uttar Pradesh', nameHindi: 'उत्तर प्रदेश', nameMarathi: 'उत्तर प्रदेश' },
  { code: 'UT', name: 'Uttarakhand', nameHindi: 'उत्तराखंड', nameMarathi: 'उत्तराखंड' },
  { code: 'WB', name: 'West Bengal', nameHindi: 'पश्चिम बंगाल', nameMarathi: 'पश्चिम बंगाल' },
];

// District data (sample - would be more comprehensive in production)
export const DISTRICTS: { [key: string]: DistrictInfo[] } = {
  'MH': [
    { code: 'MH-MUM', name: 'Mumbai', state: 'MH', nameHindi: 'मुंबई', nameMarathi: 'मुंबई' },
    { code: 'MH-PUN', name: 'Pune', state: 'MH', nameHindi: 'पुणे', nameMarathi: 'पुणे' },
    { code: 'MH-NAG', name: 'Nagpur', state: 'MH', nameHindi: 'नागपुर', nameMarathi: 'नागपूर' },
    { code: 'MH-THA', name: 'Thane', state: 'MH', nameHindi: 'ठाणे', nameMarathi: 'ठाणे' },
    { code: 'MH-NAS', name: 'Nashik', state: 'MH', nameHindi: 'नासिक', nameMarathi: 'नाशिक' },
  ],
  'DL': [
    { code: 'DL-CEN', name: 'Central Delhi', state: 'DL', nameHindi: 'केंद्रीय दिल्ली', nameMarathi: 'मध्य दिल्ली' },
    { code: 'DL-NOR', name: 'North Delhi', state: 'DL', nameHindi: 'उत्तर दिल्ली', nameMarathi: 'उत्तर दिल्ली' },
    { code: 'DL-SOU', name: 'South Delhi', state: 'DL', nameHindi: 'दक्षिण दिल्ली', nameMarathi: 'दक्षिण दिल्ली' },
  ],
  'KA': [
    { code: 'KA-BLR', name: 'Bangalore Urban', state: 'KA', nameHindi: 'बैंगलोर शहरी', nameMarathi: 'बेंगळुरू शहर' },
    { code: 'KA-MYS', name: 'Mysore', state: 'KA', nameHindi: 'मैसूर', nameMarathi: 'मैसूर' },
    { code: 'KA-MAN', name: 'Mangalore', state: 'KA', nameHindi: 'मैंगलोर', nameMarathi: 'मंगळूर' },
  ],
  'UP': [
    { code: 'UP-LKO', name: 'Lucknow', state: 'UP', nameHindi: 'लखनऊ', nameMarathi: 'लखनौ' },
    { code: 'UP-KAN', name: 'Kanpur', state: 'UP', nameHindi: 'कानपुर', nameMarathi: 'कानपूर' },
    { code: 'UP-AGR', name: 'Agra', state: 'UP', nameHindi: 'आगरा', nameMarathi: 'आग्रा' },
  ],
  'RJ': [
    { code: 'RJ-JAI', name: 'Jaipur', state: 'RJ', nameHindi: 'जयपुर', nameMarathi: 'जयपूर' },
    { code: 'RJ-JOD', name: 'Jodhpur', state: 'RJ', nameHindi: 'जोधपुर', nameMarathi: 'जोधपूर' },
    { code: 'RJ-UDA', name: 'Udaipur', state: 'RJ', nameHindi: 'उदयपुर', nameMarathi: 'उदयपूर' },
  ],
};

// Generate mock MGNREGA data (in production, this would call the actual API)
export function generateMockMGNREGAData(districtCode: string): MGNREGAMetrics {
  // Find district and state names
  let districtName = 'Unknown District';
  let stateName = 'Unknown State';
  
  for (const [stateCode, districts] of Object.entries(DISTRICTS)) {
    const district = districts.find(d => d.code === districtCode);
    if (district) {
      districtName = district.name;
      const state = STATES.find(s => s.code === stateCode);
      stateName = state?.name || stateCode;
      break;
    }
  }
  
  // Generate realistic mock data
  const baseEmployed = Math.floor(Math.random() * 500000) + 100000;
  const avgWagePerPerson = 250;
  const avgDaysPerPerson = 80;
  
  return {
    totalEmployed: baseEmployed,
    totalWagesPaid: Math.floor(baseEmployed * avgWagePerPerson * avgDaysPerPerson),
    personDaysGenerated: Math.floor(baseEmployed * avgDaysPerPerson),
    workCompleted: Math.floor(Math.random() * 30) + 65,
    totalExpenditure: Math.floor(baseEmployed * avgWagePerPerson * avgDaysPerPerson * 1.15),
    districtName,
    stateName,
    lastUpdated: new Date().toISOString(),
  };
}

// In production, this would call the actual data.gov.in API
export async function fetchMGNREGAData(districtCode: string): Promise<MGNREGAMetrics> {
  // For now, return mock data
  // In production: const response = await axios.get(`${BASE_URL}/...`, { params: { 'api-key': API_KEY } });
  return generateMockMGNREGAData(districtCode);
}
