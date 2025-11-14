import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  X, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  Image as ImageIcon
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type VerificationStatus = "pending" | "verified" | "rejected";

interface FilePreview {
  file: File;
  preview: string;
  type: "profile" | "id-front" | "id-back";
}

export function AgentProfileSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    whatsappNumber: "",
    email: "",
    county: "",
    city: "",
    bio: "",
  });

  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>("pending");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [files, setFiles] = useState<FilePreview[]>([]);

  const handleInputChange = (field: string, value: string) => {
    if (isSubmitted && verificationStatus === "pending") {
      toast.error("Cannot edit profile while verification is pending");
      return;
    }
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "profile" | "id-front" | "id-back") => {
    if (isSubmitted && verificationStatus === "pending") {
      toast.error("Cannot upload files while verification is pending");
      return;
    }

    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a JPG, PNG, or PDF file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    // Remove existing file of same type
    setFiles(prev => prev.filter(f => f.type !== type));

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setFiles(prev => [...prev, {
        file,
        preview: reader.result as string,
        type,
      }]);
    };
    reader.readAsDataURL(file);
  };

  const removeFile = (type: "profile" | "id-front" | "id-back") => {
    if (isSubmitted && verificationStatus === "pending") {
      toast.error("Cannot remove files while verification is pending");
      return;
    }
    setFiles(prev => prev.filter(f => f.type !== type));
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.fullName || !formData.phoneNumber || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Check for required files
    const hasProfile = files.some(f => f.type === "profile");
    const hasIdFront = files.some(f => f.type === "id-front");
    const hasIdBack = files.some(f => f.type === "id-back");

    if (!hasProfile || !hasIdFront || !hasIdBack) {
      toast.error("Please upload profile photo and both sides of National ID");
      return;
    }

    setIsSubmitted(true);
    setVerificationStatus("pending");
    toast.success("Profile submitted for verification. You will be notified once reviewed.");
  };

  const getVerificationBadge = () => {
    switch (verificationStatus) {
      case "verified":
        return (
          <Badge className="bg-green-500/10 text-green-500 border-green-500/30">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/30">
            <AlertCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge className="bg-accent/10 text-accent border-accent/30">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
    }
  };

  const isFormLocked = isSubmitted && verificationStatus === "pending";

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Agent Profile</h1>
          <p className="text-muted-foreground">Manage your profile and verification status</p>
        </div>
        {getVerificationBadge()}
      </div>

      {/* Verification Progress */}
      {isSubmitted && (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Verification Status</CardTitle>
            <CardDescription>Your profile is being reviewed by our team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Verification Progress</span>
                <span className="font-semibold">
                  {verificationStatus === "verified" ? "100%" : verificationStatus === "rejected" ? "Rejected" : "In Review"}
                </span>
              </div>
              <Progress 
                value={verificationStatus === "verified" ? 100 : verificationStatus === "rejected" ? 0 : 50} 
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Photo Upload */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-primary" />
              Profile Photo / Logo
            </CardTitle>
            <CardDescription>Upload your profile picture or agency logo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {files.find(f => f.type === "profile") ? (
                <div className="relative">
                  <img
                    src={files.find(f => f.type === "profile")?.preview}
                    alt="Profile"
                    className="w-full h-48 object-cover rounded-lg border border-border"
                  />
                  {!isFormLocked && (
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => removeFile("profile")}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ) : (
                <label
                  className={cn(
                    "flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
                    isFormLocked
                      ? "border-muted bg-muted/50 cursor-not-allowed"
                      : "border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50"
                  )}
                >
                  <input
                    type="file"
                    className="hidden"
                    accept="image/jpeg,image/png,application/pdf"
                    onChange={(e) => handleFileUpload(e, "profile")}
                    disabled={isFormLocked}
                  />
                  <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground text-center px-4">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG or PDF (MAX. 5MB)</p>
                </label>
              )}
            </div>
          </CardContent>
        </Card>

        {/* National ID Uploads */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              National ID Verification
            </CardTitle>
            <CardDescription>Upload both sides of your National ID for verification</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* ID Front */}
              <div>
                <Label className="mb-2 block">Front Side</Label>
                {files.find(f => f.type === "id-front") ? (
                  <div className="relative">
                    <img
                      src={files.find(f => f.type === "id-front")?.preview}
                      alt="ID Front"
                      className="w-full h-32 object-cover rounded-lg border border-border"
                    />
                    {!isFormLocked && (
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => removeFile("id-front")}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ) : (
                  <label
                    className={cn(
                      "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
                      isFormLocked
                        ? "border-muted bg-muted/50 cursor-not-allowed"
                        : "border-primary/30 bg-primary/5 hover:bg-primary/10"
                    )}
                  >
                    <input
                      type="file"
                      className="hidden"
                      accept="image/jpeg,image/png,application/pdf"
                      onChange={(e) => handleFileUpload(e, "id-front")}
                      disabled={isFormLocked}
                    />
                    <Upload className="w-6 h-6 mb-1 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Upload Front</p>
                  </label>
                )}
              </div>

              {/* ID Back */}
              <div>
                <Label className="mb-2 block">Back Side</Label>
                {files.find(f => f.type === "id-back") ? (
                  <div className="relative">
                    <img
                      src={files.find(f => f.type === "id-back")?.preview}
                      alt="ID Back"
                      className="w-full h-32 object-cover rounded-lg border border-border"
                    />
                    {!isFormLocked && (
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => removeFile("id-back")}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ) : (
                  <label
                    className={cn(
                      "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
                      isFormLocked
                        ? "border-muted bg-muted/50 cursor-not-allowed"
                        : "border-primary/30 bg-primary/5 hover:bg-primary/10"
                    )}
                  >
                    <input
                      type="file"
                      className="hidden"
                      accept="image/jpeg,image/png,application/pdf"
                      onChange={(e) => handleFileUpload(e, "id-back")}
                      disabled={isFormLocked}
                    />
                    <Upload className="w-6 h-6 mb-1 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Upload Back</p>
                  </label>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Information Form */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Profile Information
          </CardTitle>
          <CardDescription>Update your personal or agency information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name / Agency Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                disabled={isFormLocked}
                placeholder="Enter your full name or agency name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number *</Label>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  disabled={isFormLocked}
                  placeholder="+254 700 000 000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <Input
                  id="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={(e) => handleInputChange("whatsappNumber", e.target.value)}
                  disabled={isFormLocked}
                  placeholder="+254 700 000 000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={isFormLocked}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="county">County</Label>
              <Select
                value={formData.county}
                onValueChange={(value) => handleInputChange("county", value)}
                disabled={isFormLocked}
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
              <Label htmlFor="city">City / Town</Label>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  disabled={isFormLocked}
                  placeholder="Enter city or town"
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bio">Bio / Description</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                disabled={isFormLocked}
                placeholder="Tell us about yourself or your agency..."
                rows={4}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={isFormLocked}
              className="bg-gradient-hero text-white hover:shadow-lg hover:shadow-primary/50 transition-all"
            >
              {isSubmitted ? "Submitted for Verification" : "Submit for Verification"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

