
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { LocationOption } from '../types';
import { LOCATIONS } from '../utils/api';
import { Search } from 'lucide-react';

interface LocationSelectorProps {
  selectedLocation: string;
  customLocation: string;
  onSelectLocation: (location: string) => void;
  onCustomLocationChange: (value: string) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  selectedLocation,
  customLocation,
  onSelectLocation,
  onCustomLocationChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredLocations = searchTerm
    ? LOCATIONS.filter(location => 
        location.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : LOCATIONS;

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-semibold text-center mb-2">Where are your competitors?</h2>
      <p className="text-neutral-500 text-center mb-8">Select a location to find competitors in that market</p>
      
      <div className="relative mx-auto max-w-md mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-neutral-400" />
        </div>
        <Input
          type="text"
          placeholder="Search countries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="glass-input pl-10 py-4 w-full rounded-lg transition-all focus:ring-2 focus:ring-brand-500"
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8 max-h-[400px] overflow-y-auto pr-2">
        {filteredLocations.map((location: LocationOption) => (
          <div
            key={location.code}
            onClick={() => onSelectLocation(location.code)}
            className={`glass-card rounded-xl p-4 flex items-center transition-all duration-300 cursor-pointer hover:shadow-glow ${
              selectedLocation === location.code 
                ? 'ring-2 ring-brand-500 shadow-glow' 
                : 'hover:scale-[1.02]'
            }`}
          >
            <span className="text-2xl mr-3">{location.flag}</span>
            <span className="font-medium">{location.name}</span>
          </div>
        ))}
      </div>
      
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-4">
          <span className="px-4 py-2 rounded-full bg-neutral-100 text-neutral-600 text-sm">
            Don't see your country? Enter below
          </span>
        </div>
        
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          Custom location (will use best match)
        </label>
        <Input
          type="text"
          value={customLocation}
          onChange={(e) => onCustomLocationChange(e.target.value)}
          placeholder="Enter country name"
          className="glass-input w-full p-4 rounded-lg transition-all focus:ring-2 focus:ring-brand-500"
        />
      </div>
    </div>
  );
};

export default LocationSelector;
