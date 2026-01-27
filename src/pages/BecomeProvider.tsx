import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload, ArrowLeft, Heart, Home, Stethoscope, Users } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

const BecomeProvider = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    serviceType: '',
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    description: '',
    facilities: [],
    pricing: '',
    experience: '',
    certifications: '',
    availability: ''
  });
  
  const [photos, setPhotos] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      setFormData(prev => ({ 
        ...prev, 
        serviceType: serviceParam
      }));
    }
  }, [searchParams]);

  const serviceTypes = [
    { value: 'health-home', label: 'Health Homes', icon: Heart },
    { value: 'home-conversion', label: 'Home Conversion', icon: Home }
  ];

  const facilityOptions = [
    'ICU Equipment', 'Oxygen Concentrator', 'Hospital Bed', 'Wheelchair', 
    'Physiotherapy Equipment', 'Diagnostic Equipment', 'Emergency Response',
    '24/7 Nursing Care', 'Doctor Visits', 'Medication Management',
    'Nutritionist', 'Yoga/Meditation', 'Swimming Pool', 'Garden Area'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFacilityChange = (facility: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      facilities: checked 
        ? [...prev.facilities, facility]
        : prev.facilities.filter(f => f !== facility)
    }));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setPhotos(prev => [...prev, ...files]);
  };

  const uploadPhotos = async () => {
    const uploadedUrls = [];
    
    for (const photo of photos) {
      const fileName = `${Date.now()}-${photo.name}`;
      const { data, error } = await supabase.storage
        .from('provider-photos')
        .upload(fileName, photo);
        
      if (error) {
        console.error('Upload error:', error);
        throw error;
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('provider-photos')
        .getPublicUrl(fileName);
        
      uploadedUrls.push(publicUrl);
    }
    
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      // Upload photos
      const photoUrls = await uploadPhotos();
      
      // Here you would save the form data to your database
      console.log('Form Data:', { ...formData, photos: photoUrls });
      
      toast({
        title: "Application Submitted Successfully!",
        description: "We'll review your application and get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        serviceType: '', businessName: '', ownerName: '', email: '', phone: '',
        address: '', city: '', state: '', pincode: '', description: '',
        facilities: [], pricing: '', experience: '', certifications: '', availability: ''
      });
      setPhotos([]);
      
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-1.5 sm:space-x-2">
              <div className="bg-primary p-1.5 sm:p-2 rounded-lg">
                <Heart className="h-4 w-4 sm:h-6 sm:w-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg sm:text-2xl font-bold text-primary leading-tight">Cure Cottage</h1>
                <p className="text-[0.6rem] sm:text-xs text-muted-foreground hidden sm:block">Heal faster. Save more. Feel at home.</p>
              </div>
            </Link>
            <Link to="/">
              <Button variant="outline" size="sm" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4">
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Back</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              {formData.serviceType === 'health-homes' ? 'Be the Host' : 'List Your Service'}
            </h1>
            <p className="text-sm sm:text-base md:text-xl text-muted-foreground px-2">
              {formData.serviceType === 'health-homes' 
                ? 'Join our network of health home hosts and help patients recover in comfort in your specialized facility.'
                : formData.serviceType === 'home-conversion'
                ? 'Join our network of medical equipment providers and help families convert their homes into safe medical care environments.'
                : 'Join our network and help provide quality healthcare services across India'
              }
            </p>
          </div>

          <Card>
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="text-lg sm:text-xl">Provider Registration Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Service Type */}
                <div className="space-y-3 sm:space-y-4">
                  <Label className="text-sm sm:text-base">Service Type *</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <Button
                      type="button"
                      variant={formData.serviceType === 'health-homes' ? 'default' : 'outline'}
                      onClick={() => handleInputChange('serviceType', 'health-homes')}
                      className="h-16 sm:h-20 flex flex-col justify-center"
                    >
                      <Heart className="h-5 w-5 sm:h-6 sm:w-6 mb-1 sm:mb-2" />
                      <span className="font-semibold text-sm sm:text-base">Health Home Host</span>
                      <span className="text-[10px] sm:text-xs text-muted-foreground">Offer recovery accommodation</span>
                    </Button>
                    <Button
                      type="button"
                      variant={formData.serviceType === 'home-conversion' ? 'default' : 'outline'}
                      onClick={() => handleInputChange('serviceType', 'home-conversion')}
                      className="h-16 sm:h-20 flex flex-col justify-center"
                    >
                      <Home className="h-5 w-5 sm:h-6 sm:w-6 mb-1 sm:mb-2" />
                      <span className="font-semibold text-sm sm:text-base">Equipment Provider</span>
                      <span className="text-[10px] sm:text-xs text-muted-foreground">Medical equipment & setup</span>
                    </Button>
                  </div>
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="businessName" className="text-sm">
                      {formData.serviceType === 'health-homes' ? 'Health Home Name' : 
                       formData.serviceType === 'home-conversion' ? 'Business Name' : 'Business/Property Name'} *
                    </Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      placeholder={
                        formData.serviceType === 'health-homes' ? 'Enter your health home name' : 
                        formData.serviceType === 'home-conversion' ? 'Enter your business name' : 
                        'Enter your business or property name'
                      }
                      required
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="ownerName" className="text-sm">Owner/Contact Person Name *</Label>
                    <Input
                      id="ownerName"
                      value={formData.ownerName}
                      onChange={(e) => handleInputChange('ownerName', e.target.value)}
                      placeholder="Enter your full name"
                      required
                      className="text-sm"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="email" className="text-sm">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      required
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="phone" className="text-sm">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+91 9876543210"
                      required
                      className="text-sm"
                    />
                  </div>
                </div>

                {/* Address Information */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="address" className="text-sm">Complete Address *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Enter complete address with landmarks"
                      required
                      className="text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="city" className="text-sm">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="City"
                        required
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="state" className="text-sm">State *</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        placeholder="State"
                        required
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="pincode" className="text-sm">Pincode *</Label>
                      <Input
                        id="pincode"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                        placeholder="123456"
                        required
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>

                {formData.serviceType && (
                  <>
                    {/* Health Home Specific Section */}
                    {formData.serviceType === 'health-homes' && (
                      <div className="space-y-6 border-t pt-6">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Heart className="h-5 w-5 text-primary" />
                          Health Home Details
                        </h3>
                        
                        {/* Description */}
                        <div className="space-y-2">
                          <Label htmlFor="description">Health Home Description *</Label>
                          <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            placeholder="Describe your health home facilities, patient capacity, specializations, and care philosophy..."
                            rows={4}
                            required
                          />
                        </div>

                        {/* Medical Facilities & Services */}
                        <div className="space-y-2 sm:space-y-3">
                          <Label className="text-sm">Medical Facilities & Services Available</Label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5 sm:gap-2">
                            {['ICU Equipment', 'Oxygen Concentrator', 'Hospital Bed', 'Wheelchair', 
                              'Physiotherapy Equipment', 'Diagnostic Equipment', 'Emergency Response',
                              '24/7 Nursing Care', 'Doctor Visits', 'Medication Management',
                              'Nutritionist', 'Yoga/Meditation', 'Swimming Pool', 'Garden Area'].map((facility) => (
                              <div key={facility} className="flex items-center space-x-1.5 sm:space-x-2">
                                <Checkbox
                                  id={facility}
                                  checked={formData.facilities.includes(facility)}
                                  onCheckedChange={(checked) => handleFacilityChange(facility, !!checked)}
                                />
                                <Label htmlFor={facility} className="text-xs sm:text-sm">{facility}</Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Health Home Specific Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="experience">Medical Experience & Team *</Label>
                            <Textarea
                              id="experience"
                              value={formData.experience}
                              onChange={(e) => handleInputChange('experience', e.target.value)}
                              placeholder="Medical team qualifications, years of experience, specializations..."
                              rows={3}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="certifications">Medical Licenses & Certifications *</Label>
                            <Textarea
                              id="certifications"
                              value={formData.certifications}
                              onChange={(e) => handleInputChange('certifications', e.target.value)}
                              placeholder="Medical licenses, healthcare registrations, accreditations..."
                              rows={3}
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="pricing">Pricing & Packages *</Label>
                            <Textarea
                              id="pricing"
                              value={formData.pricing}
                              onChange={(e) => handleInputChange('pricing', e.target.value)}
                              placeholder="Daily rates, package deals, insurance accepted..."
                              rows={3}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="availability">Availability & Capacity</Label>
                            <Textarea
                              id="availability"
                              value={formData.availability}
                              onChange={(e) => handleInputChange('availability', e.target.value)}
                              placeholder="Total capacity, current availability, admission process..."
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Home Conversion Specific Section */}
                    {formData.serviceType === 'home-conversion' && (
                      <div className="space-y-6 border-t pt-6">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Home className="h-5 w-5 text-primary" />
                          Home Conversion Services
                        </h3>
                        
                        {/* Description */}
                        <div className="space-y-2">
                          <Label htmlFor="description">Service Description *</Label>
                          <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            placeholder="Describe your home conversion services, equipment rental, setup process, and support provided..."
                            rows={4}
                            required
                          />
                        </div>

                        {/* Equipment & Services */}
                        <div className="space-y-3">
                          <Label>Equipment & Conversion Services Available</Label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {['Hospital Bed Setup', 'Oxygen Concentrator', 'Patient Monitoring Equipment', 'Wheelchair & Mobility Aids', 
                              'IV Stands & Medical Supplies', 'Room Sanitization', 'Nursing Equipment Setup',
                              'Emergency Response System', 'Medication Storage Setup', 'Patient Lift Equipment',
                              'Bathroom Safety Modifications', 'Air Purification Systems'].map((service) => (
                              <div key={service} className="flex items-center space-x-2">
                                <Checkbox
                                  id={service}
                                  checked={formData.facilities.includes(service)}
                                  onCheckedChange={(checked) => handleFacilityChange(service, !!checked)}
                                />
                                <Label htmlFor={service} className="text-sm">{service}</Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Home Conversion Specific Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="experience">Technical Experience & Team *</Label>
                            <Textarea
                              id="experience"
                              value={formData.experience}
                              onChange={(e) => handleInputChange('experience', e.target.value)}
                              placeholder="Years in home healthcare setup, technical team, installation experience..."
                              rows={3}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="certifications">Certifications & Partnerships</Label>
                            <Textarea
                              id="certifications"
                              value={formData.certifications}
                              onChange={(e) => handleInputChange('certifications', e.target.value)}
                              placeholder="Equipment certifications, medical equipment partnerships, service licenses..."
                              rows={3}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="pricing">Pricing & Rental Rates *</Label>
                            <Textarea
                              id="pricing"
                              value={formData.pricing}
                              onChange={(e) => handleInputChange('pricing', e.target.value)}
                              placeholder="Equipment rental rates, setup charges, maintenance costs..."
                              rows={3}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="availability">Service Areas & Response Time</Label>
                            <Textarea
                              id="availability"
                              value={formData.availability}
                              onChange={(e) => handleInputChange('availability', e.target.value)}
                              placeholder="Service coverage areas, installation timeline, emergency response..."
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Photo Upload */}
                <div className="space-y-3">
                  <Label htmlFor="photos">Upload Photos (Property, Equipment, Facilities)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      Click to upload or drag and drop photos of your facility, equipment, and services
                    </p>
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <Label htmlFor="photo-upload">
                      <Button type="button" variant="outline" className="cursor-pointer">
                        Choose Files
                      </Button>
                    </Label>
                    {photos.length > 0 && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {photos.length} file(s) selected
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={uploading || !formData.serviceType || !formData.businessName || !formData.ownerName || !formData.email || !formData.phone}
                  >
                    {uploading ? 'Submitting Application...' : 'Submit Application'}
                  </Button>
                  <p className="text-sm text-muted-foreground text-center mt-2">
                    We'll review your application and contact you within 24 hours
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BecomeProvider;