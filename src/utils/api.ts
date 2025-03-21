
import { SearchResponse, Competitor } from '../types';

const API_BASE_URL = 'https://productfinder.techrealm.online';

export async function searchCompetitors(query: string, location: string, num: number = 5): Promise<SearchResponse> {
  try {
    const searchUrl = `${API_BASE_URL}/search?query=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}&limit=${num}`;
    console.log('Fetching from URL:', searchUrl);
    
    const response = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API response:', data);
    
    return {
      query: data.query,
      results: data.results || [],
      total_results: data.total_results,
      limited_results: data.limited_results
    };
  } catch (error) {
    console.error('Error searching competitors:', error);
    throw error;
  }
}

export const CATEGORIES: { id: string; name: string; icon: string; description: string }[] = [
  {
    id: 'toys',
    name: 'Toys & Games',
    icon: '🧸',
    description: 'Children\'s toys, board games, puzzles, and educational toys',
  },
  {
    id: 'fashion',
    name: 'Fashion & Apparel',
    icon: '👔',
    description: 'Clothing, shoes, accessories, and fashion items',
  },
  {
    id: 'electronics',
    name: 'Electronics',
    icon: '🔌',
    description: 'Gadgets, computers, phones, and electronic accessories',
  },
  {
    id: 'home',
    name: 'Home & Kitchen',
    icon: '🏠',
    description: 'Furniture, kitchen appliances, and home decor',
  },
  {
    id: 'other',
    name: 'Other',
    icon: '✨',
    description: 'Custom category not listed above',
  },
];

export const LOCATIONS: { name: string; code: string; flag: string }[] = [
  { name: 'United States', code: 'us', flag: '🇺🇸' },
  { name: 'United Kingdom', code: 'uk', flag: '🇬🇧' },
  { name: 'Canada', code: 'ca', flag: '🇨🇦' },
  { name: 'Australia', code: 'au', flag: '🇦🇺' },
  { name: 'Germany', code: 'de', flag: '🇩🇪' },
  { name: 'France', code: 'fr', flag: '🇫🇷' },
  { name: 'Japan', code: 'jp', flag: '🇯🇵' },
  { name: 'India', code: 'in', flag: '🇮🇳' },
  { name: 'Pakistan', code: 'pk', flag: '🇵🇰' },
  { name: 'Brazil', code: 'br', flag: '🇧🇷' },
  { name: 'Netherlands', code: 'nl', flag: '🇳🇱' },
  { name: 'Italy', code: 'it', flag: '🇮🇹' },
  { name: 'Spain', code: 'es', flag: '🇪🇸' },
  { name: 'Sweden', code: 'se', flag: '🇸🇪' },
  { name: 'New Zealand', code: 'nz', flag: '🇳🇿' },
  { name: 'Singapore', code: 'sg', flag: '🇸🇬' },
  { name: 'South Korea', code: 'kr', flag: '🇰🇷' },
  { name: 'Mexico', code: 'mx', flag: '🇲🇽' },
  { name: 'Norway', code: 'no', flag: '🇳🇴' },
  { name: 'Switzerland', code: 'ch', flag: '🇨🇭' },
];
