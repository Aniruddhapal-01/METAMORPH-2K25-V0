import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Calculator, Download, Save, Info, ArrowLeft, BarChart3, PieChart, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from "recharts";

interface TaxCalculation {
  regime: string;
  grossIncome: number;
  deductions: number;
  taxableIncome: number;
  tax: number;
  cess: number;
  totalTax: number;
  netPayable: number;
}

interface TaxSuggestion {
  id: string;
  title: string;
  description: string;
  potentialSaving: number;
  category: string;
  enabled: boolean;
  documentsNeeded: string[];
}

const TaxPlanning = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [compareMode, setCompareMode] = useState(true);
  const [maximizeSavings, setMaximizeSavings] = useState(true);

  // Form inputs
  const [formData, setFormData] = useState({
    financialYear: "2024-25",
    grossIncome: 1200000,
    basicSalary: 800000,
    hra: 200000,
    lta: 50000,
    otherAllowances: 150000,
    employerPF: 96000,
    professionalTax: 2400,
    capitalGains: 0,
    otherIncome: 25000,
    rentPaid: 180000,
    homeLoanInterest: 200000,
    homeLoanPrincipal: 100000,
    investments80C: 120000,
    medicalInsurance: 25000,
    npsContribution: 50000,
    donations: 10000,
    filingStatus: "individual",
    dependents: 2
  });

  // Tax slabs and calculations
  const oldRegimeSlabs = [
    { min: 0, max: 250000, rate: 0 },
    { min: 250000, max: 500000, rate: 5 },
    { min: 500000, max: 1000000, rate: 20 },
    { min: 1000000, max: Infinity, rate: 30 }
  ];

  const newRegimeSlabs = [
    { min: 0, max: 300000, rate: 0 },
    { min: 300000, max: 600000, rate: 5 },
    { min: 600000, max: 900000, rate: 10 },
    { min: 900000, max: 1200000, rate: 15 },
    { min: 1200000, max: 1500000, rate: 20 },
    { min: 1500000, max: Infinity, rate: 30 }
  ];

  const calculateTax = (taxableIncome: number, slabs: typeof oldRegimeSlabs) => {
    let tax = 0;
    for (const slab of slabs) {
      if (taxableIncome > slab.min) {
        const taxableInThisSlab = Math.min(taxableIncome - slab.min, slab.max - slab.min);
        tax += (taxableInThisSlab * slab.rate) / 100;
      }
    }
    return tax;
  };

  const calculateOldRegime = (): TaxCalculation => {
    const { grossIncome, investments80C, medicalInsurance, npsContribution, homeLoanInterest, donations } = formData;
    
    const standardDeduction = 50000;
    const section80C = Math.min(investments80C + Math.min(formData.homeLoanPrincipal, 150000 - investments80C), 150000);
    const section80D = Math.min(medicalInsurance, 25000);
    const section80CCD1B = Math.min(npsContribution, 50000);
    const section24B = Math.min(homeLoanInterest, 200000);
    const section80G = Math.min(donations, 10000);
    
    const totalDeductions = standardDeduction + section80C + section80D + section80CCD1B + section24B + section80G;
    const taxableIncome = Math.max(grossIncome - totalDeductions, 0);
    const tax = calculateTax(taxableIncome, oldRegimeSlabs);
    const cess = tax * 0.04;
    const totalTax = tax + cess;

    return {
      regime: "Old Regime",
      grossIncome,
      deductions: totalDeductions,
      taxableIncome,
      tax,
      cess,
      totalTax,
      netPayable: totalTax
    };
  };

  const calculateNewRegime = (): TaxCalculation => {
    const { grossIncome } = formData;
    
    const standardDeduction = 75000;
    const totalDeductions = standardDeduction;
    const taxableIncome = Math.max(grossIncome - totalDeductions, 0);
    const tax = calculateTax(taxableIncome, newRegimeSlabs);
    const cess = tax * 0.04;
    const totalTax = tax + cess;

    return {
      regime: "New Regime",
      grossIncome,
      deductions: totalDeductions,
      taxableIncome,
      tax,
      cess,
      totalTax,
      netPayable: totalTax
    };
  };

  const oldRegimeCalc = calculateOldRegime();
  const newRegimeCalc = calculateNewRegime();
  const bestRegime = oldRegimeCalc.netPayable < newRegimeCalc.netPayable ? oldRegimeCalc : newRegimeCalc;
  const savings = Math.abs(oldRegimeCalc.netPayable - newRegimeCalc.netPayable);

  const suggestions: TaxSuggestion[] = [
    {
      id: "80c-elss",
      title: "Invest in ELSS Mutual Funds",
      description: "Equity Linked Savings Scheme with 3-year lock-in and potential high returns",
      potentialSaving: Math.min(150000 - formData.investments80C, 30000) * 0.3,
      category: "80C",
      enabled: true,
      documentsNeeded: ["ELSS investment receipt", "Form 16"]
    },
    {
      id: "80d-health",
      title: "Health Insurance Premium",
      description: "Medical insurance for self, spouse, children and parents",
      potentialSaving: Math.min(25000 - formData.medicalInsurance, 15000) * 0.3,
      category: "80D",
      enabled: true,
      documentsNeeded: ["Insurance premium receipt", "Policy document"]
    },
    {
      id: "nps-80ccd1b",
      title: "Additional NPS Contribution",
      description: "Extra NPS investment over and above 80C limit",
      potentialSaving: Math.min(50000 - formData.npsContribution, 25000) * 0.3,
      category: "80CCD(1B)",
      enabled: true,
      documentsNeeded: ["NPS contribution receipt", "Tier-I account statement"]
    },
    {
      id: "hra-benefit",
      title: "House Rent Allowance",
      description: "Claim HRA exemption if you're paying rent",
      potentialSaving: Math.min(formData.rentPaid * 0.5, formData.hra * 0.8) * 0.3,
      category: "HRA",
      enabled: true,
      documentsNeeded: ["Rent receipts", "Rent agreement", "Landlord PAN"]
    }
  ].filter(s => s.potentialSaving > 1000);

  const [enabledSuggestions, setEnabledSuggestions] = useState<Record<string, boolean>>(
    suggestions.reduce((acc, s) => ({ ...acc, [s.id]: s.enabled }), {})
  );

  const chartData = [
    { name: "Old Regime", tax: oldRegimeCalc.netPayable, savings: 0 },
    { name: "New Regime", tax: newRegimeCalc.netPayable, savings: 0 },
    { name: "With Suggestions", tax: bestRegime.netPayable - suggestions.filter(s => enabledSuggestions[s.id]).reduce((sum, s) => sum + s.potentialSaving, 0), savings: suggestions.filter(s => enabledSuggestions[s.id]).reduce((sum, s) => sum + s.potentialSaving, 0) }
  ];

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    toast({
      title: "Scenario Saved",
      description: "Your tax planning scenario has been saved successfully.",
    });
  };

  const handleExport = () => {
    toast({
      title: "PDF Export",
      description: "Your tax planning report is being generated and will download shortly.",
    });
  };

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
            Back
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-fintech-slate">Tax Planning & Savings</h1>
            <p className="text-sm text-muted-foreground">Plan your taxes and maximize your savings legally</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Scenario
            </Button>
            <Button onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </header>

        <main className="p-6 space-y-6">
          {/* Disclaimer */}
          <Alert className="border-fintech-warning/20 bg-fintech-warning/5">
            <Info className="h-4 w-4" />
            <AlertDescription className="text-sm">
              <strong>Disclaimer:</strong> This tool provides estimates and legal tax-planning ideas only. 
              Consult a qualified tax professional for personalised advice. Tax calculations are based on 
              current Income Tax Department rules for FY 2024-25.
            </AlertDescription>
          </Alert>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Input Form */}
            <Card className="card-fintech">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Tax Information</CardTitle>
                    <CardDescription>Enter your financial details for accurate calculations</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="maximize-savings">Maximize Savings</Label>
                    <Switch
                      id="maximize-savings"
                      checked={maximizeSavings}
                      onCheckedChange={setMaximizeSavings}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="financial-year">Financial Year</Label>
                    <Select value={formData.financialYear} onValueChange={(value) => handleInputChange('financialYear', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024-25">2024-25</SelectItem>
                        <SelectItem value="2023-24">2023-24</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="filing-status">Filing Status</Label>
                    <Select value={formData.filingStatus} onValueChange={(value) => handleInputChange('filingStatus', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="huf">HUF</SelectItem>
                        <SelectItem value="senior">Senior Citizen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="gross-income">Annual Gross Income (₹)</Label>
                  <Input
                    id="gross-income"
                    type="number"
                    value={formData.grossIncome}
                    onChange={(e) => handleInputChange('grossIncome', parseInt(e.target.value) || 0)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="basic-salary">Basic Salary (₹)</Label>
                    <Input
                      id="basic-salary"
                      type="number"
                      value={formData.basicSalary}
                      onChange={(e) => handleInputChange('basicSalary', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hra">HRA Received (₹)</Label>
                    <Input
                      id="hra"
                      type="number"
                      value={formData.hra}
                      onChange={(e) => handleInputChange('hra', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rent-paid">Rent Paid (₹)</Label>
                    <Input
                      id="rent-paid"
                      type="number"
                      value={formData.rentPaid}
                      onChange={(e) => handleInputChange('rentPaid', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="home-loan-interest">Home Loan Interest (₹)</Label>
                    <Input
                      id="home-loan-interest"
                      type="number"
                      value={formData.homeLoanInterest}
                      onChange={(e) => handleInputChange('homeLoanInterest', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="investments-80c">80C Investments (₹)</Label>
                    <Input
                      id="investments-80c"
                      type="number"
                      value={formData.investments80C}
                      onChange={(e) => handleInputChange('investments80C', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="medical-insurance">Medical Insurance (₹)</Label>
                    <Input
                      id="medical-insurance"
                      type="number"
                      value={formData.medicalInsurance}
                      onChange={(e) => handleInputChange('medicalInsurance', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nps-contribution">NPS Contribution (₹)</Label>
                    <Input
                      id="nps-contribution"
                      type="number"
                      value={formData.npsContribution}
                      onChange={(e) => handleInputChange('npsContribution', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dependents">Number of Dependents</Label>
                    <Input
                      id="dependents"
                      type="number"
                      value={formData.dependents}
                      onChange={(e) => handleInputChange('dependents', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <Card className="card-fintech">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Tax Calculation Results</CardTitle>
                    <CardDescription>Comparison between tax regimes</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="compare-mode">Compare Regimes</Label>
                    <Switch
                      id="compare-mode"
                      checked={compareMode}
                      onCheckedChange={setCompareMode}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {compareMode ? (
                  <Tabs defaultValue="old" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="old">Old Regime</TabsTrigger>
                      <TabsTrigger value="new">New Regime</TabsTrigger>
                    </TabsList>
                    <TabsContent value="old" className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Gross Income</span>
                          <span className="font-semibold">₹{oldRegimeCalc.grossIncome.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Total Deductions</span>
                          <span className="font-semibold text-fintech-success">-₹{oldRegimeCalc.deductions.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Taxable Income</span>
                          <span className="font-semibold">₹{oldRegimeCalc.taxableIncome.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Income Tax</span>
                          <span className="font-semibold">₹{oldRegimeCalc.tax.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Health & Education Cess (4%)</span>
                          <span className="font-semibold">₹{oldRegimeCalc.cess.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-medium">Total Tax Payable</span>
                          <span className="font-bold text-fintech-danger">₹{oldRegimeCalc.netPayable.toLocaleString()}</span>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="new" className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Gross Income</span>
                          <span className="font-semibold">₹{newRegimeCalc.grossIncome.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Standard Deduction</span>
                          <span className="font-semibold text-fintech-success">-₹{newRegimeCalc.deductions.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Taxable Income</span>
                          <span className="font-semibold">₹{newRegimeCalc.taxableIncome.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Income Tax</span>
                          <span className="font-semibold">₹{newRegimeCalc.tax.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Health & Education Cess (4%)</span>
                          <span className="font-semibold">₹{newRegimeCalc.cess.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-medium">Total Tax Payable</span>
                          <span className="font-bold text-fintech-danger">₹{newRegimeCalc.netPayable.toLocaleString()}</span>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Recommended Regime</span>
                      <Badge className="bg-fintech-success/10 text-fintech-success border-fintech-success/20">
                        {bestRegime.regime}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Tax Payable</span>
                      <span className="font-bold text-fintech-danger">₹{bestRegime.netPayable.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">You Save</span>
                      <span className="font-bold text-fintech-success">₹{savings.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <h4 className="font-medium mb-3">Tax Comparison Chart</h4>
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                        <Bar dataKey="tax" fill="#ef4444" name="Tax" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tax Saving Suggestions */}
          <Card className="card-fintech">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-fintech-success" />
                Tax Saving Suggestions
              </CardTitle>
              <CardDescription>Legal ways to reduce your tax liability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {suggestions.map((suggestion) => (
                  <Card key={suggestion.id} className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{suggestion.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {suggestion.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{suggestion.description}</p>
                        <p className="text-sm font-medium text-fintech-success">
                          Potential Saving: ₹{suggestion.potentialSaving.toLocaleString()}
                        </p>
                      </div>
                      <Switch
                        checked={enabledSuggestions[suggestion.id]}
                        onCheckedChange={(checked) => 
                          setEnabledSuggestions(prev => ({ ...prev, [suggestion.id]: checked }))
                        }
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <strong>Documents needed:</strong> {suggestion.documentsNeeded.join(', ')}
                    </div>
                  </Card>
                ))}
              </div>

              {suggestions.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Calculator className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No additional tax saving suggestions available for your current profile.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Checklist */}
          <Card className="card-fintech">
            <CardHeader>
              <CardTitle>Action Checklist</CardTitle>
              <CardDescription>Steps to implement your tax plan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-fintech-success flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <span className="text-sm">Calculate and compare both tax regimes</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-muted-foreground"></div>
                  <span className="text-sm">Implement selected tax-saving suggestions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-muted-foreground"></div>
                  <span className="text-sm">Collect required documents and receipts</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-muted-foreground"></div>
                  <span className="text-sm">Consult with a tax professional for final review</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-muted-foreground"></div>
                  <span className="text-sm">File your ITR before the deadline</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default TaxPlanning;