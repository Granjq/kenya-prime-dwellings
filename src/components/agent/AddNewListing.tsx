import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  X, 
  Home, 
  DollarSign, 
  Image as ImageIcon, 
  Star,
  MapPin,
  CheckCircle,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface FilePreview {
  file: File;
  preview: string;
}

interface ListingFormData {
  // Basic Info
  title: string;
  description: string;
  propertyType: string;
  category: string;
  
  // Pricing
  price: string;
  currency: string;
  priceType: string;
  
  // Location
  county: string;
  city: string;
  address: string;
  
  // Amenities
  bedrooms: string;
  bathrooms: string;
  squareMeters: string;
  parking: boolean;
  furnished: boolean;
  garden: boolean;
  pool: boolean;
  security: boolean;
  wifi: boolean;
}

interface AddNewListingProps {
  onComplete: () => void;
}

export function AddNewListing({ onComplete }: AddNewListingProps) {
  const [activeTab, setActiveTab] = useState("basic");
  const [images, setImages] = useState<FilePreview[]>([]);
  const [formData, setFormData] = useState<ListingFormData>({
    title: "",
    description: "",
    propertyType: "",
    category: "",
    price: "",
    currency: "KSh",
    priceType: "sale",
    county: "",
    city: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    squareMeters: "",
    parking: false,
    furnished: false,
    garden: false,
    pool: false,
    security: false,
    wifi: false,
  });

  const tabs = [
    { id: "basic", label: "Basic Info", icon: Home },
    { id: "pricing", label: "Pricing", icon: DollarSign },
    { id: "photos", label: "Photos", icon: ImageIcon },
    { id: "amenities", label: "Amenities", icon: Star },
    { id: "location", label: "Location", icon: MapPin },
  ];

  const handleInputChange = (field: keyof ListingFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload image files only");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, { file, preview: reader.result as string }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const validateTab = (tabId: string): boolean => {
    switch (tabId) {
      case "basic":
        if (!formData.title || !formData.description || !formData.propertyType || !formData.category) {
          toast.error("Please fill in all basic information fields");
          return false;
        }
        return true;
      case "pricing":
        if (!formData.price || !formData.priceType) {
          toast.error("Please fill in pricing information");
          return false;
        }
        return true;
      case "photos":
        if (images.length === 0) {
          toast.error("Please upload at least one photo");
          return false;
        }
        return true;
      case "amenities":
        return true; // Amenities are optional
      case "location":
        if (!formData.county || !formData.city || !formData.address) {
          toast.error("Please fill in all location fields");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    const currentIndex = tabs.findIndex(t => t.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      if (validateTab(activeTab)) {
        setActiveTab(tabs[currentIndex + 1].id);
      }
    }
  };

  const handlePrevious = () => {
    const currentIndex = tabs.findIndex(t => t.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  const handlePublish = () => {
    if (!validateTab("location")) return;
    
    // Here you would submit to API
    toast.success("Listing submitted for review!");
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  const currentTabIndex = tabs.findIndex(t => t.id === activeTab);
  const progress = ((currentTabIndex + 1) / tabs.length) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Add New Listing</h1>
        <p className="text-muted-foreground">Create a new property listing step by step</p>
      </div>

      {/* Progress Bar */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              Step {currentTabIndex + 1} of {tabs.length}
            </span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-gradient-hero h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Listing Details</CardTitle>
          <CardDescription>Fill in all the required information</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* Basic Info Tab */}
            <TabsContent value="basic" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Property Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="e.g., Modern 3-Bedroom House in Westlands"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe the property in detail..."
                  rows={6}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type *</Label>
                  <Select
                    value={formData.propertyType}
                    onValueChange={(value) => handleInputChange("propertyType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="bungalow">Bungalow</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleInputChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            {/* Pricing Tab */}
            <TabsContent value="pricing" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priceType">Price Type *</Label>
                  <Select
                    value={formData.priceType}
                    onValueChange={(value) => handleInputChange("priceType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">For Sale</SelectItem>
                      <SelectItem value="rent">For Rent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={formData.currency}
                    onValueChange={(value) => handleInputChange("currency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="KSh">KSh (Kenyan Shilling)</SelectItem>
                      <SelectItem value="USD">USD (US Dollar)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="Enter price"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Photos Tab */}
            <TabsContent value="photos" className="space-y-6">
              <div className="space-y-4">
                <Label>Property Photos *</Label>
                <p className="text-sm text-muted-foreground">Upload at least one photo (max 10 images, 5MB each)</p>
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-primary/30 rounded-lg cursor-pointer bg-primary/5 hover:bg-primary/10 transition-colors">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                  <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                </label>
                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image.preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-border"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Amenities Tab */}
            <TabsContent value="amenities" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => handleInputChange("bedrooms", e.target.value)}
                    placeholder="Number of bedrooms"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => handleInputChange("bathrooms", e.target.value)}
                    placeholder="Number of bathrooms"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="squareMeters">Square Meters</Label>
                  <Input
                    id="squareMeters"
                    type="number"
                    value={formData.squareMeters}
                    onChange={(e) => handleInputChange("squareMeters", e.target.value)}
                    placeholder="Property size in sqm"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <Label>Additional Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { key: "parking", label: "Parking" },
                    { key: "furnished", label: "Furnished" },
                    { key: "garden", label: "Garden" },
                    { key: "pool", label: "Swimming Pool" },
                    { key: "security", label: "Security" },
                    { key: "wifi", label: "WiFi" },
                  ].map((amenity) => (
                    <div key={amenity.key} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={amenity.key}
                        checked={formData[amenity.key as keyof ListingFormData] as boolean}
                        onChange={(e) => handleInputChange(amenity.key as keyof ListingFormData, e.target.checked)}
                        className="w-4 h-4 rounded border-border"
                      />
                      <Label htmlFor={amenity.key} className="cursor-pointer">
                        {amenity.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Location Tab */}
            <TabsContent value="location" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="county">County *</Label>
                  <Select
                    value={formData.county}
                    onValueChange={(value) => handleInputChange("county", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select county" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nairobi">Nairobi</SelectItem>
                      <SelectItem value="mombasa">Mombasa</SelectItem>
                      <SelectItem value="kisumu">Kisumu</SelectItem>
                      <SelectItem value="nakuru">Nakuru</SelectItem>
                      <SelectItem value="eldoret">Eldoret</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City / Town *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="Enter city or town"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Full Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter full address"
                  rows={3}
                />
              </div>
            </TabsContent>
          </Tabs>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentTabIndex === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            {currentTabIndex < tabs.length - 1 ? (
              <Button
                onClick={handleNext}
                className="bg-gradient-hero text-white hover:shadow-lg hover:shadow-primary/50"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handlePublish}
                className="bg-gradient-hero text-white hover:shadow-lg hover:shadow-primary/50"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Publish Listing
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

