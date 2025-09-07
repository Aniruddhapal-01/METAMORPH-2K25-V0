import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Download, FileText, CheckCircle, Clock, AlertCircle, Zap } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ITRAutofill = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);
  const { toast } = useToast();

  const handleGenerateITR = async () => {
    setIsGenerating(true);

    try {
      // API call to backend
      const res = await fetch("http://localhost:3031/api/itr/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: "demoUser" }),
      });

      const data = await res.json();
      console.log("Backend Response:", data);

      // Simulate delay for UX
      setTimeout(() => {
        setIsGenerating(false);
        setGenerationComplete(true);
        toast({
          title: "ITR Generated Successfully! 🎉",
          description: data.message,
        });
      }, 5000);
    } catch (error) {
      console.error("Error generating ITR:", error);
      setIsGenerating(false);
      toast({
        title: "Error",
        description: "Failed to generate ITR",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const mockITRData = {
      assessmentYear: "2024-25",
      financialYear: "2023-24",
      personalInfo: {
        name: "Sample Taxpayer",
        pan: "ABCDE1234F",
        aadhaar: "1234-5678-9012",
      },
      income: {
        salary: 1200000,
        houseProperty: 0,
        capitalGains: 205000,
        otherSources: 45000,
      },
      deductions: {
        section80C: 150000,
        section80D: 25000,
        standardDeduction: 50000,
      },
      taxLiability: 92500,
      forms: {
        form26AS: "Fetched and validated",
        AIS: "Auto-populated",
        TIS: "Reconciled",
      },
    };

    const dataStr = JSON.stringify(mockITRData, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = "ITR_2024-25_Generated.json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();

    toast({
      title: "Download Started",
      description: "ITR JSON file is being downloaded",
    });
  };

  const dataSources = [
    { name: "Form 26AS", status: "completed", description: "Tax deducted at source", amount: "₹1,85,000" },
    { name: "AIS (Annual Information Statement)", status: "completed", description: "Comprehensive income details", amount: "₹12,50,000" },
    { name: "TIS (Tax Information Summary)", status: "completed", description: "Pre-filled tax information", amount: "₹2,05,000" },
    { name: "Investment Portfolio", status: "completed", description: "Capital gains and dividends", amount: "₹2,50,000" },
  ];

  const itrSections = [
    { section: "Personal Information", status: "completed", items: 8 },
    { section: "Income from Salary", status: "completed", items: 12 },
    { section: "Income from House Property", status: "completed", items: 0 },
    { section: "Capital Gains", status: "completed", items: 6 },
    { section: "Income from Other Sources", status: "completed", items: 3 },
    { section: "Deductions", status: "completed", items: 15 },
    { section: "Tax Computation", status: "completed", items: 8 },
    { section: "Tax Payments", status: "completed", items: 4 },
  ];

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex-1">
        <header className="h-16 border-b bg-white flex items-center px-6 sticky top-0 z-10">
          <SidebarTrigger className="mr-4" />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-fintech-slate">ITR Autofill</h1>
            <p className="text-sm text-muted-foreground">
              Generate your Income Tax Return with AI-powered automation
            </p>
          </div>
          <Badge className="bg-fintech-success/10 text-fintech-success border-fintech-success/20">
            🤖 AI Powered
          </Badge>
        </header>

        <main className="p-6 space-y-6">
          {/* Generation Status */}
          <Card className="card-gradient">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    ITR Auto-Generation
                  </CardTitle>
                  <CardDescription>
                    Automatically generate your ITR from aggregated tax data
                  </CardDescription>
                </div>
                {!isGenerating && !generationComplete && (
                  <Button onClick={handleGenerateITR} className="btn-hero">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate ITR JSON
                  </Button>
                )}
                {generationComplete && (
                  <Button onClick={handleDownload} className="btn-hero">
                    <Download className="mr-2 h-4 w-4" />
                    Download ITR JSON
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isGenerating && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary animate-spin" />
                    <span className="font-medium">Generating your ITR...</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Processing data sources and auto-filling forms...
                  </p>
                </div>
              )}
              {generationComplete && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-fintech-success" />
                    <span className="font-medium text-fintech-success">
                      ITR Generated Successfully!
                    </span>
                  </div>
                  <div className="bg-fintech-success/10 p-4 rounded-lg">
                    <p className="text-sm text-fintech-success font-medium">
                      ✅ All sections auto-filled • ✅ Data validated • ✅ Ready for e-filing
                    </p>
                  </div>
                </div>
              )}
              {!isGenerating && !generationComplete && (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Click "Generate ITR JSON" to auto-create your tax return
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Data Sources */}
            <Card className="card-fintech">
              <CardHeader>
                <CardTitle>Data Sources Integrated</CardTitle>
                <CardDescription>Automatically fetched and validated tax information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dataSources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-fintech-success" />
                        <div>
                          <p className="font-medium">{source.name}</p>
                          <p className="text-sm text-muted-foreground">{source.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{source.amount}</p>
                        <Badge variant="secondary" className="text-xs">
                          Verified
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* ITR Sections */}
            <Card className="card-fintech">
              <CardHeader>
                <CardTitle>ITR Form Sections</CardTitle>
                <CardDescription>Auto-populated sections in your income tax return</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {itrSections.map((section, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-fintech-success" />
                        <div>
                          <p className="font-medium">{section.section}</p>
                          <p className="text-sm text-muted-foreground">{section.items} items populated</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        Complete
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Card */}
          <Card className="card-fintech">
            <CardHeader>
              <CardTitle>ITR Summary</CardTitle>
              <CardDescription>Overview of your auto-generated income tax return</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center space-y-2">
                  <p className="text-2xl font-bold text-fintech-slate">₹12.5L</p>
                  <p className="text-sm text-muted-foreground">Gross Total Income</p>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-2xl font-bold text-fintech-success">₹2.25L</p>
                  <p className="text-sm text-muted-foreground">Total Deductions</p>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-2xl font-bold text-fintech-slate">₹10.25L</p>
                  <p className="text-sm text-muted-foreground">Taxable Income</p>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-2xl font-bold text-fintech-danger">₹92,500</p>
                  <p className="text-sm text-muted-foreground">Tax Liability</p>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h4 className="font-semibold">Pre-filled Information includes:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-fintech-success" />
                      <span>Salary details from Form 16</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-fintech-success" />
                      <span>TDS details from Form 26AS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-fintech-success" />
                      <span>Bank interest from AIS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-fintech-success" />
                      <span>Dividend income</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-fintech-success" />
                      <span>Capital gains from trades</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-fintech-success" />
                      <span>Investment proofs (80C, 80D)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-fintech-success" />
                      <span>House rent details</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-fintech-success" />
                      <span>Advance tax payments</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-800">Important Note</p>
                    <p className="text-sm text-amber-700 mt-1">
                      Please review the generated ITR carefully before e-filing. Verify all auto-filled data matches your records.
                      This is a mock generated file for demonstration purposes.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default ITRAutofill;
