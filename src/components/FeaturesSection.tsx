
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database, Globe, LineChart, Search, Shield, Zap } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">Powerful Features</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            CompetitorFinder provides a comprehensive set of tools to help you understand your competition.
          </p>
        </div>

        <Tabs defaultValue="search" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-12">
            <TabsTrigger value="search">Intelligent Search</TabsTrigger>
            <TabsTrigger value="insights">Market Insights</TabsTrigger>
            <TabsTrigger value="global">Global Coverage</TabsTrigger>
          </TabsList>
          
          <TabsContent value="search" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 mr-4">
                    <Search size={24} />
                  </div>
                  <h3 className="text-2xl font-semibold">Intelligent Search</h3>
                </div>
                <p className="text-neutral-700 mb-6">
                  Our powerful AI-driven search algorithm identifies competitors by analyzing market positioning, product offerings, and customer segments.
                </p>
                <ul className="space-y-3">
                  {[
                    'Find hidden competitors you might have missed',
                    'Categorize competition by relevance and threat level',
                    'Discover emerging players before they become a threat',
                    'Get results in seconds, not days or weeks'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 mr-3">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-neutral-100 rounded-lg p-8 flex items-center justify-center shadow-inner">
                <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-lg transform rotate-1">
                  <div className="w-full h-8 bg-neutral-200 rounded mb-4"></div>
                  <div className="w-3/4 h-4 bg-neutral-200 rounded mb-3"></div>
                  <div className="w-5/6 h-4 bg-neutral-200 rounded mb-3"></div>
                  <div className="w-2/3 h-4 bg-neutral-200 rounded mb-5"></div>
                  <div className="flex space-x-2 mb-4">
                    <div className="w-1/2 h-8 bg-brand-200 rounded"></div>
                    <div className="w-1/2 h-8 bg-neutral-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="insights" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 mr-4">
                    <LineChart size={24} />
                  </div>
                  <h3 className="text-2xl font-semibold">Market Insights</h3>
                </div>
                <p className="text-neutral-700 mb-6">
                  Go beyond simple competitor lists to gain deep insights into your market landscape.
                </p>
                <ul className="space-y-3">
                  {[
                    'Analyze competitor messaging and positioning',
                    'Compare product offerings and unique selling points',
                    'Identify gaps in the market to exploit',
                    'Track changes in competitor strategy over time'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 mr-3">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-neutral-100 rounded-lg p-8 flex items-center justify-center shadow-inner">
                <div className="w-full h-48 bg-white rounded-lg shadow-lg p-4">
                  <div className="w-full h-full bg-neutral-50 rounded flex items-center justify-center">
                    <LineChart size={48} className="text-brand-300" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="global" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 mr-4">
                    <Globe size={24} />
                  </div>
                  <h3 className="text-2xl font-semibold">Global Coverage</h3>
                </div>
                <p className="text-neutral-700 mb-6">
                  Analyze competition anywhere in the world with our comprehensive global database.
                </p>
                <ul className="space-y-3">
                  {[
                    'Search in over 190 countries and regions',
                    'Localized results for accurate market analysis',
                    'Identify international expansion opportunities',
                    'Compare competitors across different regions'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 mr-3">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-neutral-100 rounded-lg p-8 flex items-center justify-center shadow-inner">
                <div className="w-full h-48 bg-white rounded-lg shadow-lg flex items-center justify-center">
                  <Globe size={64} className="text-brand-300" />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default FeaturesSection;
