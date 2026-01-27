import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SearchBarProps {
  onSearch?: (location: string, checkIn: string, checkOut: string, guests: number) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps = {}) => {
  const [location, setLocation] = useState('Bangalore');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  return (
    <div className="bg-card rounded-2xl shadow-xl p-2 border border-border/50 backdrop-blur-sm">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        {/* Mobile compact layout */}
        <div className="md:hidden grid grid-cols-2 gap-2">
          <div className="flex flex-col p-2 rounded-xl hover:bg-accent/50 transition-colors">
            <label className="text-xs font-medium text-foreground mb-1">Location</label>
            <div className="flex items-center">
              <MapPin className="h-3 w-3 text-muted-foreground mr-1" />
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="border-none p-0 h-auto text-xs focus:ring-0 focus-visible:ring-0">
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bangalore">Bangalore</SelectItem>
                  <SelectItem value="Chennai">Chennai</SelectItem>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                  <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex flex-col p-2 rounded-xl hover:bg-accent/50 transition-colors">
            <label className="text-xs font-medium text-foreground mb-1">Guests</label>
            <div className="flex items-center">
              <Users className="h-3 w-3 text-muted-foreground mr-1" />
              <Input
                type="number"
                min="1"
                placeholder="1"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                className="border-none p-0 h-auto text-xs placeholder:text-muted-foreground focus-visible:ring-0"
              />
            </div>
          </div>
          
          <div className="flex flex-col p-2 rounded-xl hover:bg-accent/50 transition-colors">
            <label className="text-xs font-medium text-foreground mb-1">Check-in</label>
            <div className="flex items-center">
              <Calendar className="h-3 w-3 text-muted-foreground mr-1" />
              <Input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="border-none p-0 h-auto text-xs focus-visible:ring-0"
              />
            </div>
          </div>
          
          <div className="flex flex-col p-2 rounded-xl hover:bg-accent/50 transition-colors">
            <label className="text-xs font-medium text-foreground mb-1">Check-out</label>
            <div className="flex items-center">
              <Calendar className="h-3 w-3 text-muted-foreground mr-1" />
              <Input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="border-none p-0 h-auto text-xs focus-visible:ring-0"
              />
            </div>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:contents">
          <div className="flex flex-col p-4 rounded-xl hover:bg-accent/50 transition-colors">
            <label className="text-sm font-medium text-foreground mb-1">Location</label>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="border-none p-0 h-auto text-sm focus:ring-0 focus-visible:ring-0">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bangalore">Bangalore</SelectItem>
                  <SelectItem value="Chennai">Chennai</SelectItem>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                  <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex flex-col p-4 rounded-xl hover:bg-accent/50 transition-colors">
            <label className="text-sm font-medium text-foreground mb-1">Check-in</label>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
              <Input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="border-none p-0 h-auto text-sm focus-visible:ring-0"
              />
            </div>
          </div>
          
          <div className="flex flex-col p-4 rounded-xl hover:bg-accent/50 transition-colors">
            <label className="text-sm font-medium text-foreground mb-1">Check-out</label>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
              <Input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="border-none p-0 h-auto text-sm focus-visible:ring-0"
              />
            </div>
          </div>
          
          <div className="flex flex-col p-4 rounded-xl hover:bg-accent/50 transition-colors">
            <label className="text-sm font-medium text-foreground mb-1">Guests</label>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-muted-foreground mr-2" />
              <Input
                type="number"
                min="1"
                placeholder="Guests"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                className="border-none p-0 h-auto text-sm placeholder:text-muted-foreground focus-visible:ring-0"
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center p-2 col-span-full md:col-span-1">
          <Button 
            size={window.innerWidth < 768 ? "sm" : "lg"}
            className="w-full h-8 md:h-12 rounded-xl bg-primary hover:bg-primary/90"
            onClick={() => onSearch?.(location, checkIn, checkOut, guests)}
          >
            <Search className="h-3 w-3 md:h-5 md:w-5 mr-1 md:mr-2" />
            <span className="text-xs md:text-sm">Search</span>
          </Button>
        </div>
      </div>
    </div>
  );
};