import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowLeft, Plus, Pencil, Trash2, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

const AddInvestment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [formData, setFormData] = useState({
    type: "",
    amount: "",
    financialYear: "2024-25"
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const savedInvestments = localStorage.getItem('tax-investments');
    if (savedInvestments) {
      setInvestments(JSON.parse(savedInvestments));
    }
  }, []);

  const saveInvestments = (newInvestments: Investment[]) => {
    localStorage.setItem('tax-investments', JSON.stringify(newInvestments));
    setInvestments(newInvestments);
  };

  const validateInvestment = (type: string, amount: number): string | null => {
    const investmentType = investmentTypes.find(t => t.value === type);
    if (!investmentType) return "Invalid investment type";

    const existingAmount = investments
      .filter(inv => inv.type === type && inv.financialYear === formData.financialYear && inv.id !== editingId)
      .reduce((sum, inv) => sum + inv.amount, 0);

    const totalAmount = existingAmount + amount;

    if (investmentType.section === "80C") {
      const total80C = investments
        .filter(inv => {
          const invType = investmentTypes.find(t => t.value === inv.type);
          return invType?.section === "80C" && inv.financialYear === formData.financialYear && inv.id !== editingId;
        })
        .reduce((sum, inv) => sum + inv.amount, 0) + amount;

      if (total80C > 150000) {
        return `Total 80C investments cannot exceed ₹1,50,000. Current total would be ₹${total80C.toLocaleString()}`;
      }
    }

    if (totalAmount > investmentType.limit) {
      return `${investmentType.label} cannot exceed ₹${investmentType.limit.toLocaleString()}`;
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid positive amount",
        variant: "destructive"
      });
      return;
    }

    if (!formData.type) {
      toast({
        title: "Investment Type Required",
        description: "Please select an investment type",
        variant: "destructive"
      });
      return;
    }

    const validationError = validateInvestment(formData.type, amount);
    if (validationError) {
      toast({
        title: "Investment Limit Exceeded",
        description: validationError,
        variant: "destructive"
      });
      return;
    }

    if (editingId) {
      // Update existing investment
      const updatedInvestments = investments.map(inv => 
        inv.id === editingId 
          ? { ...inv, type: formData.type, amount, financialYear: formData.financialYear }
          : inv
      );
      saveInvestments(updatedInvestments);
      setEditingId(null);
      toast({
        title: "Investment Updated",
        description: "Your investment has been updated successfully"
      });
    } else {
      // Add new investment
      const newInvestment: Investment = {
        id: Date.now().toString(),
        type: formData.type,
        amount,
        financialYear: formData.financialYear,
        date: new Date().toISOString().split('T')[0]
      };

      const updatedInvestments = [...investments, newInvestment];
      saveInvestments(updatedInvestments);
      toast({
        title: "Investment Added",
        description: "Your investment has been added successfully"
      });
    }

    setFormData({ type: "", amount: "", financialYear: "2024-25" });
  };

  const handleEdit = (investment: Investment) => {
    setFormData({
      type: investment.type,
      amount: investment.amount.toString(),
      financialYear: investment.financialYear
    });
    setEditingId(investment.id);
  };

  const handleDelete = (id: string) => {
    const updatedInvestments = investments.filter(inv => inv.id !== id);
    saveInvestments(updatedInvestments);
    toast({
      title: "Investment Deleted",
      description: "Investment has been removed successfully"
    });
  };

  const getInvestmentTypeLabel = (type: string) => {
    return investmentTypes.find(t => t.value === type)?.label || type;
  };

  const calculate80CTotal = () => {
    return investments
      .filter(inv => {
        const invType = investmentTypes.find(t => t.value === inv.type);
        return invType?.section === "80C" && inv.financialYear === formData.financialYear;
      })
      .reduce((sum, inv) => sum + inv.amount, 0);
  };

  const calculateNPSTotal = () => {
    return investments
      .filter(inv => inv.type === "nps-additional" && inv.financialYear === formData.financialYear)
      .reduce((sum, inv) => sum + inv.amount, 0);
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
            Back to Dashboard
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-fintech-slate">Add Your Investments</h1>
            <p className="text-sm text-muted-foreground">Manage your tax-saving investments and track deduction limits</p>
          </div>
        </header>

        <main className="p-6 space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Investment Form */}
            <Card className="card-fintech">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-primary" />
                  {editingId ? "Edit Investment" : "Add New Investment"}
                </CardTitle>
                <CardDescription>
                  Enter your investment details to track tax deductions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="financial-year">Financial Year</Label>
                    <Select value={formData.financialYear} onValueChange={(value) => setFormData({...formData, financialYear: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024-25">2024-25</SelectItem>
                        <SelectItem value="2023-24">2023-24</SelectItem>
                        <SelectItem value="2022-23">2022-23</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="investment-type">Investment Type</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select investment type" />
                      </SelectTrigger>
                      <SelectContent>
                        {investmentTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label} ({type.section})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (₹)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter investment amount"
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                      min="1"
                      step="1"
                    />
                  </div>

                  <Button type="submit" className="w-full btn-hero">
                    {editingId ? "Update Investment" : "Add Investment"}
                  </Button>
                  
                  {editingId && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setEditingId(null);
                        setFormData({ type: "", amount: "", financialYear: "2024-25" });
                      }}
                    >
                      Cancel Edit
                    </Button>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Investment Limits */}
            <Card className="card-fintech">
              <CardHeader>
                <CardTitle>Deduction Limits & Usage</CardTitle>
                <CardDescription>Track your progress toward maximum deductions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-fintech-emerald-light/10 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Section 80C</span>
                    <span className="text-sm text-muted-foreground">₹1,50,000 limit</span>
                  </div>
                  <div className="text-2xl font-bold text-fintech-success">
                    ₹{calculate80CTotal().toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Remaining: ₹{(150000 - calculate80CTotal()).toLocaleString()}
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">NPS Additional (80CCD(1B))</span>
                    <span className="text-sm text-muted-foreground">₹50,000 limit</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    ₹{calculateNPSTotal().toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Remaining: ₹{(50000 - calculateNPSTotal()).toLocaleString()}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button 
                    onClick={() => navigate('/dashboard/view-report')}
                    variant="outline"
                    className="w-full"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Go to View Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Investments List */}
          {investments.length > 0 && (
            <Card className="card-fintech">
              <CardHeader>
                <CardTitle>Your Investments</CardTitle>
                <CardDescription>Manage your saved investment entries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {investments.map((investment) => (
                    <div key={investment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{getInvestmentTypeLabel(investment.type)}</div>
                        <div className="text-sm text-muted-foreground">
                          FY {investment.financialYear} • Added on {new Date(investment.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-lg font-semibold">₹{investment.amount.toLocaleString()}</div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEdit(investment)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDelete(investment.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Disclaimer */}
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-4">
              <p className="text-sm text-amber-800">
                <strong>Disclaimer:</strong> This tool provides estimates only and is not professional tax advice. 
                Consult a qualified tax professional for personalized guidance on your investments and tax planning.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AddInvestment;