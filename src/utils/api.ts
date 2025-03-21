import { SearchResponse, Competitor } from '../types';

const API_BASE_URL = 'https://competitor.techrealm.online';

export async function searchCompetitors(query: string, location: string, num: number = 5): Promise<SearchResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}&num=${num}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Process each competitor to get final URLs after redirects
    const processedResults = await Promise.all(
      data.results.map(async (competitor: Competitor) => {
        try {
          // Check for redirect on the URL
          const finalUrl = await getFinalUrl(competitor.link);
          return { ...competitor, link: finalUrl };
        } catch (error) {
          console.warn(`Could not resolve final URL for ${competitor.link}:`, error);
          return competitor;
        }
      })
    );
    
    return {
      query: data.query,
      results: processedResults
    };
  } catch (error) {
    console.error('Error searching competitors:', error);
    throw error;
  }
}

// Helper function to resolve the final URL after all redirects
export async function getFinalUrl(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
    });
    
    // Return the final URL after redirects
    return response.url;
  } catch (error) {
    console.error(`Error resolving final URL for ${url}:`, error);
    return url; // Return original URL if there's an error
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
