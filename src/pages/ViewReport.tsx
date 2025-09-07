import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowLeft, Download, Printer, Plus, FileText, Calculator } from "lucide-react";
import jsPDF from "jspdf";

interface Investment {
  id: string;
  type: string;
  amount: number;
  financialYear: string;
  date: string;
}

const investmentTypes = [
  { value: "ppf", label: "PPF (Public Provident Fund)", section: "80C", limit: 150000 },
  { value: "elss", label: "ELSS Mutual Funds", section: "80C", limit: 150000 },
  { value: "epf", label: "EPF (Employee Provident Fund)", section: "80C", limit: 150000 },
  { value: "tax-saving-fd", label: "Tax-Saving Fixed Deposit", section: "80C", limit: 150000 },
  { value: "life-insurance", label: "Life Insurance Premium", section: "80C", limit: 150000 },
  { value: "tuition-fees", label: "Tuition Fees", section: "80C", limit: 150000 },
  { value: "nps-employer", label: "NPS (Employer Contribution)", section: "80CCD(1)", limit: 150000 },
  { value: "nps-additional", label: "NPS (Additional)", section: "80CCD(1B)", limit: 50000 },
  { value: "health-insurance", label: "Health Insurance Premium", section: "80D", limit: 25000 },
  { value: "health-insurance-parents", label: "Parents Health Insurance", section: "80D", limit: 50000 },
];

const ViewReport = () => {
  const navigate = useNavigate();
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [selectedYear, setSelectedYear] = useState("2024-25");

  useEffect(() => {
    const savedInvestments = localStorage.getItem('tax-investments');
    if (savedInvestments) {
      setInvestments(JSON.parse(savedInvestments));
    }
  }, []);

  const getInvestmentTypeData = (type: string) => {
    return investmentTypes.find(t => t.value === type) || { label: type, section: "Unknown", limit: 0 };
  };

  const filteredInvestments = investments.filter(inv => inv.financialYear === selectedYear);

  const groupedInvestments = filteredInvestments.reduce((acc, inv) => {
    const typeData = getInvestmentTypeData(inv.type);
    const section = typeData.section;
    
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(inv);
    return acc;
  }, {} as Record<string, Investment[]>);

  const calculateSectionTotal = (section: string) => {
    return (groupedInvestments[section] || []).reduce((sum, inv) => sum + inv.amount, 0);
  };

  const getSectionLimit = (section: string) => {
    switch (section) {
      case "80C": return 150000;
      case "80CCD(1B)": return 50000;
      case "80D": return 25000;
      default: return 0;
    }
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    
    // Header
    pdf.setFontSize(20);
    pdf.text("Tax Investment Report", pageWidth / 2, 20, { align: "center" });
    
    pdf.setFontSize(12);
    pdf.text(`Financial Year: ${selectedYear}`, pageWidth / 2, 30, { align: "center" });
    pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, 37, { align: "center" });
    
    let yPosition = 50;
    
    // Section 1: Investments Summary
    pdf.setFontSize(16);
    pdf.text("1. Investment Summary", 20, yPosition);
    yPosition += 15;
    
    Object.entries(groupedInvestments).forEach(([section, sectionInvestments]) => {
      pdf.setFontSize(14);
      pdf.text(`Section ${section}`, 25, yPosition);
      yPosition += 10;
      
      sectionInvestments.forEach(inv => {
        const typeData = getInvestmentTypeData(inv.type);
        pdf.setFontSize(11);
        pdf.text(`• ${typeData.label}: ₹${inv.amount.toLocaleString()}`, 30, yPosition);
        yPosition += 7;
      });
      
      const total = calculateSectionTotal(section);
      pdf.setFontSize(12);
      pdf.text(`Total ${section}: ₹${total.toLocaleString()}`, 30, yPosition);
      yPosition += 15;
    });
    
    // Section 2: Deduction Limits
    pdf.setFontSize(16);
    pdf.text("2. Deduction Limits & Usage", 20, yPosition);
    yPosition += 15;
    
    Object.keys(groupedInvestments).forEach(section => {
      const total = calculateSectionTotal(section);
      const limit = getSectionLimit(section);
      const remaining = limit - total;
      
      pdf.setFontSize(12);
      pdf.text(`Section ${section}:`, 25, yPosition);
      pdf.text(`Used: ₹${total.toLocaleString()} / ₹${limit.toLocaleString()}`, 30, yPosition + 7);
      pdf.text(`Remaining: ₹${Math.max(0, remaining).toLocaleString()}`, 30, yPosition + 14);
      yPosition += 25;
    });
    
    // Section 3: Recommendations
    pdf.setFontSize(16);
    pdf.text("3. Investment Opportunities", 20, yPosition);
    yPosition += 15;
    
    const section80CTotal = calculateSectionTotal("80C");
    const npsTotal = calculateSectionTotal("80CCD(1B)");
    
    if (section80CTotal < 150000) {
      pdf.setFontSize(11);
      pdf.text(`• You can still invest ₹${(150000 - section80CTotal).toLocaleString()} under Section 80C`, 25, yPosition);
      yPosition += 7;
    }
    
    if (npsTotal < 50000) {
      pdf.text(`• Additional NPS investment of ₹${(50000 - npsTotal).toLocaleString()} available under 80CCD(1B)`, 25, yPosition);
      yPosition += 7;
    }
    
    // Disclaimer
    yPosition += 20;
    pdf.setFontSize(10);
    pdf.text("Disclaimer: This tool provides estimates only and is not professional tax advice.", 20, yPosition);
    pdf.text("Consult a qualified tax professional for personalized guidance.", 20, yPosition + 7);
    
    pdf.save(`Tax-Investment-Report-${selectedYear}.pdf`);
  };

  const handlePrint = () => {
    window.print();
  };

  const totalInvestments = filteredInvestments.reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex-1">
        <header className="h-16 border-b bg-white flex items-center px-6 sticky top-0 z-10">
          <SidebarTrigger className="mr-4" />
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/dashboard')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-fintech-slate">Tax Investment Report</h1>
            <p className="text-sm text-muted-foreground">
              Comprehensive overview of your tax-saving investments for FY {selectedYear}
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={generatePDF} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button onClick={handlePrint} variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </header>

        <main className="p-6 space-y-6">
          {filteredInvestments.length === 0 ? (
            <Card className="card-fintech text-center">
              <CardContent className="p-8">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Investments Found</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't added any investments for FY {selectedYear} yet.
                </p>
                <Button onClick={() => navigate('/dashboard/add-investment')} className="btn-hero">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Investment
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="metric-card">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-fintech-slate mb-2">
                        ₹{totalInvestments.toLocaleString()}
                      </div>
                      <p className="text-sm text-muted-foreground">Total Investments</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="metric-card">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-fintech-success mb-2">
                        ₹{Math.min(calculateSectionTotal("80C"), 150000).toLocaleString()}
                      </div>
                      <p className="text-sm text-muted-foreground">Section 80C Eligible</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="metric-card">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-fintech-warning mb-2">
                        ₹{(
                          Math.max(0, 150000 - calculateSectionTotal("80C")) +
                          Math.max(0, 50000 - calculateSectionTotal("80CCD(1B)"))
                        ).toLocaleString()}
                      </div>
                      <p className="text-sm text-muted-foreground">Remaining Capacity</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Section 1: Investment Summary */}
              <Card className="card-fintech">
                <CardHeader>
                  <CardTitle>Section 1: Your Investments</CardTitle>
                  <CardDescription>Breakdown of all your tax-saving investments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3">Investment Type</th>
                          <th className="text-left p-3">Section</th>
                          <th className="text-right p-3">Amount</th>
                          <th className="text-left p-3">Date Added</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredInvestments.map(investment => {
                          const typeData = getInvestmentTypeData(investment.type);
                          return (
                            <tr key={investment.id} className="border-b">
                              <td className="p-3">{typeData.label}</td>
                              <td className="p-3">
                                <Badge variant="secondary">{typeData.section}</Badge>
                              </td>
                              <td className="text-right p-3 font-semibold">
                                ₹{investment.amount.toLocaleString()}
                              </td>
                              <td className="p-3">{new Date(investment.date).toLocaleDateString()}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Section 2: Deduction Summary */}
              <Card className="card-fintech">
                <CardHeader>
                  <CardTitle>Section 2: Eligible Deductions</CardTitle>
                  <CardDescription>Tax deductions you can claim based on your investments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {Object.entries(groupedInvestments).map(([section, sectionInvestments]) => {
                      const total = calculateSectionTotal(section);
                      const limit = getSectionLimit(section);
                      const eligible = Math.min(total, limit);
                      
                      return (
                        <div key={section} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold">Section {section}</h4>
                            <Badge>{sectionInvestments.length} investment(s)</Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Total Invested</p>
                              <p className="font-semibold">₹{total.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Eligible for Deduction</p>
                              <p className="font-semibold text-fintech-success">₹{eligible.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Remaining Capacity</p>
                              <p className="font-semibold text-fintech-warning">₹{Math.max(0, limit - total).toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Section 3: Investment Opportunities */}
              <Card className="card-fintech">
                <CardHeader>
                  <CardTitle>Section 3: Additional Investment Opportunities</CardTitle>
                  <CardDescription>Ways to maximize your tax savings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {calculateSectionTotal("80C") < 150000 && (
                      <div className="p-4 bg-fintech-emerald-light/10 rounded-lg">
                        <h4 className="font-semibold text-fintech-success mb-2">Section 80C Opportunity</h4>
                        <p className="text-sm text-muted-foreground">
                          You can still invest ₹{(150000 - calculateSectionTotal("80C")).toLocaleString()} 
                          under Section 80C to save approximately ₹
                          {Math.round((150000 - calculateSectionTotal("80C")) * 0.3).toLocaleString()} in taxes.
                        </p>
                      </div>
                    )}
                    
                    {calculateSectionTotal("80CCD(1B)") < 50000 && (
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-600 mb-2">NPS Additional Investment (80CCD(1B))</h4>
                        <p className="text-sm text-muted-foreground">
                          Additional NPS investment of ₹{(50000 - calculateSectionTotal("80CCD(1B)")).toLocaleString()} 
                          is available, which can save you approximately ₹
                          {Math.round((50000 - calculateSectionTotal("80CCD(1B)")) * 0.3).toLocaleString()} in taxes.
                        </p>
                      </div>
                    )}

                    {calculateSectionTotal("80C") >= 150000 && calculateSectionTotal("80CCD(1B)") >= 50000 && (
                      <div className="p-4 bg-fintech-success/10 rounded-lg">
                        <h4 className="font-semibold text-fintech-success mb-2">Excellent Tax Planning!</h4>
                        <p className="text-sm text-muted-foreground">
                          You've maximized your tax-saving investments under both Section 80C and 80CCD(1B). 
                          Consider exploring other sections like 80D for health insurance premiums.
                        </p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button onClick={() => navigate('/dashboard/add-investment')} className="btn-hero">
                        <Plus className="h-4 w-4 mr-2" />
                        Add More Investments
                      </Button>
                      <Button onClick={() => navigate('/dashboard/tax-planning')} variant="outline">
                        <Calculator className="h-4 w-4 mr-2" />
                        Tax Planning Calculator
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Disclaimer */}
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-4">
              <p className="text-sm text-amber-800">
                <strong>Disclaimer:</strong> This tool provides estimates only and is not professional tax advice. 
                The tax calculations are based on general rules and may not account for all individual circumstances. 
                Consult a qualified tax professional for personalized guidance on your investments and tax planning.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default ViewReport;