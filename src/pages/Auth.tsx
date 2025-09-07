import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Shield, Check, FileText, Calculator, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [formData, setFormData] = useState({
    aadhaar: "",
    pan: "",
    name: "",
    email: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [consentStep, setConsentStep] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ------------------- LOGIN -------------------
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          aadhaar: formData.aadhaar,
          pan: formData.pan,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      toast({
        title: "Login Successful! 🎉",
        description: `Welcome back, ${data.user?.name || "User"}`,
      });

      navigate("/dashboard");
    } catch (err: any) {
      toast({
        title: "Login Failed ❌",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ------------------- SIGNUP -------------------
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:3001/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      toast({
        title: "Account Created Successfully! 🎉",
        description: "Please grant DigiLocker consent to continue.",
      });

      setConsentStep(true);
    } catch (err: any) {
      toast({
        title: "Signup Failed ❌",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------- DIGILOCKER CONSENT ----------------
  const handleDigiLockerConsent = () => {
    setIsLoading(true);

    setTimeout(() => {
      toast({
        title: "Account Created Successfully! 🎉",
        description: "DigiLocker integration completed. Redirecting to dashboard...",
      });
      navigate("/dashboard");
      setIsLoading(false);
    }, 2000);
  };

  // ---------------- CONSENT PAGE ----------------
  if (consentStep) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-fintech-emerald-light/10 via-background to-fintech-emerald-light/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-hero-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">DigiLocker Integration</CardTitle>
            <CardDescription>
              We need your consent to fetch documents from DigiLocker for auto-filling your tax information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-fintech-emerald-light/10 rounded-lg">
                <Check className="h-5 w-5 text-fintech-success" />
                <span className="text-sm">Access PAN details for verification</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-fintech-emerald-light/10 rounded-lg">
                <Check className="h-5 w-5 text-fintech-success" />
                <span className="text-sm">Fetch Aadhaar information securely</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-fintech-emerald-light/10 rounded-lg">
                <Check className="h-5 w-5 text-fintech-success" />
                <span className="text-sm">Auto-populate tax forms</span>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>Note:</strong> This is a mock integration for demo purposes. 
                Your data is completely secure and never stored.
              </p>
            </div>

            <div className="flex gap-4">
              <Button 
                variant="outline" 
                onClick={() => setConsentStep(false)}
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                onClick={handleDigiLockerConsent}
                disabled={isLoading}
                className="btn-hero flex-1"
              >
                {isLoading ? "Connecting..." : "Grant Access"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ---------------- MAIN LOGIN/SIGNUP UI ----------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-fintech-emerald-light/10 via-background to-fintech-emerald-light/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6 text-fintech-slate hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-hero-gradient rounded-xl flex items-center justify-center">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-fintech-slate">TaxMantri</span>
          </div>
          <Badge className="bg-fintech-emerald-light text-fintech-emerald border-fintech-emerald/20">
            🔐 Secure Authentication
          </Badge>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* LOGIN TAB */}
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>
                  Login with your Aadhaar and PAN to access your tax dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-aadhaar">Aadhaar Number</Label>
                    <Input
                      id="login-aadhaar"
                      type="text"
                      placeholder="Enter 12-digit Aadhaar"
                      value={formData.aadhaar}
                      onChange={(e) => handleInputChange("aadhaar", e.target.value)}
                      maxLength={12}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-pan">PAN Number</Label>
                    <Input
                      id="login-pan"
                      type="text"
                      placeholder="Enter 10-character PAN"
                      value={formData.pan}
                      onChange={(e) => handleInputChange("pan", e.target.value.toUpperCase())}
                      maxLength={10}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full btn-hero"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing In..." : "Login Securely"}
                    <Shield className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SIGNUP TAB */}
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>
                  Join thousands of smart taxpayers using TaxMantri
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email Address</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">Phone Number</Label>
                    <Input
                      id="signup-phone"
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      maxLength={10}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-aadhaar">Aadhaar Number</Label>
                    <Input
                      id="signup-aadhaar"
                      type="text"
                      placeholder="Enter 12-digit Aadhaar"
                      value={formData.aadhaar}
                      onChange={(e) => handleInputChange("aadhaar", e.target.value)}
                      maxLength={12}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-pan">PAN Number</Label>
                    <Input
                      id="signup-pan"
                      type="text"
                      placeholder="Enter 10-character PAN"
                      value={formData.pan}
                      onChange={(e) => handleInputChange("pan", e.target.value.toUpperCase())}
                      maxLength={10}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full btn-hero" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Account"}
                    <FileText className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>🔒 Your data is encrypted and secure</p>
          <p>✅ Compliant with IT Act & Privacy Laws</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
