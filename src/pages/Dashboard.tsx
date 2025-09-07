
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Calculator, PieChart, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from "recharts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isNewRegime, setIsNewRegime] = useState(false);
  const navigate = useNavigate();

  const monthlyData = [
    { month: 'Apr', income: 85000, tax: 12750 },
    { month: 'May', income: 90000, tax: 13500 },
    { month: 'Jun', income: 88000, tax: 13200 },
    { month: 'Jul', income: 92000, tax: 13800 },
    { month: 'Aug', income: 87000, tax: 13050 },
    { month: 'Sep', income: 95000, tax: 14250 },
    { month: 'Oct', income: 91000, tax: 13650 },
    { month: 'Nov', income: 89000, tax: 13350 },
    { month: 'Dec', income: 93000, tax: 13950 },
    { month: 'Jan', income: 96000, tax: 14400 },
    { month: 'Feb', income: 94000, tax: 14100 },
    { month: 'Mar', income: 98000, tax: 14700 },
  ];

  const portfolioData = [
    { name: 'Equity MF', value: 450000, color: '#10b981' },
    { name: 'Debt MF', value: 200000, color: '#3b82f6' },
    { name: 'Stocks', value: 180000, color: '#f59e0b' },
    { name: 'ELSS', value: 120000, color: '#8b5cf6' },
  ];

  const oldRegimeData = {
    grossIncome: 1200000,
    standardDeduction: 50000,
    section80C: 150000,
    otherDeductions: 75000,
    taxableIncome: 925000,
    taxLiability: 92500,
  };

  const newRegimeData = {
    grossIncome: 1200000,
    standardDeduction: 75000,
    section80C: 0,
    otherDeductions: 0,
    taxableIncome: 1125000,
    taxLiability: 78000,
  };

  const currentData = isNewRegime ? newRegimeData : oldRegimeData;

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex-1">
        <header className="h-16 border-b bg-white flex items-center px-6 sticky top-0 z-10">
          <SidebarTrigger className="mr-4" />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-fintech-slate">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back! Here's your tax overview for FY 2024-25</p>
          </div>
          <Badge className="bg-fintech-success/10 text-fintech-success border-fintech-success/20">
            🎯 On Track
          </Badge>
        </header>

        <main className="p-6 space-y-6">
          {/* Tax Regime Toggle */}
          <Card className="card-fintech">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-primary" />
                    Tax Regime Selection
                  </CardTitle>
                  <CardDescription>
                    Compare and choose the best tax regime for your income
                  </CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-medium ${!isNewRegime ? 'text-primary' : 'text-muted-foreground'}`}>
                    Old Regime
                  </span>
                  <Switch
                    checked={isNewRegime}
                    onCheckedChange={setIsNewRegime}
                  />
                  <span className={`text-sm font-medium ${isNewRegime ? 'text-primary' : 'text-muted-foreground'}`}>
                    New Regime
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Gross Income</span>
                    <span className="font-semibold">₹{currentData.grossIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Standard Deduction</span>
                    <span className="font-semibold text-fintech-success">-₹{currentData.standardDeduction.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Section 80C</span>
                    <span className="font-semibold text-fintech-success">-₹{currentData.section80C.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Other Deductions</span>
                    <span className="font-semibold text-fintech-success">-₹{currentData.otherDeductions.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Taxable Income</span>
                    <span className="font-semibold">₹{currentData.taxableIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Tax Liability</span>
                    <span className="font-bold text-fintech-danger">₹{currentData.taxLiability.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-fintech-emerald-light/10 p-4 rounded-lg">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      {isNewRegime ? 'New Regime Savings' : 'Old Regime Benefits'}
                    </p>
                    <p className="text-2xl font-bold text-fintech-success">
                      ₹{Math.abs(oldRegimeData.taxLiability - newRegimeData.taxLiability).toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {newRegimeData.taxLiability < oldRegimeData.taxLiability ? 'New regime saves more' : 'Old regime saves more'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="metric-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Total Income</span>
                  <TrendingUp className="h-4 w-4 text-fintech-success" />
                </div>
                <div className="text-2xl font-bold text-fintech-slate">₹12.0L</div>
                <div className="flex items-center text-xs text-fintech-success">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  8.2% from last year
                </div>
              </CardContent>
            </Card>

            <Card className="metric-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Total Deductions</span>
                  <Calculator className="h-4 w-4 text-primary" />
                </div>
                <div className="text-2xl font-bold text-fintech-slate">₹{(currentData.grossIncome - currentData.taxableIncome).toLocaleString()}</div>
                <div className="flex items-center text-xs text-primary">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  {isNewRegime ? 'New regime' : 'Old regime'}
                </div>
              </CardContent>
            </Card>

            <Card className="metric-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Tax Liability</span>
                  <TrendingDown className="h-4 w-4 text-fintech-danger" />
                </div>
                <div className="text-2xl font-bold text-fintech-slate">₹{currentData.taxLiability.toLocaleString()}</div>
                <div className="flex items-center text-xs text-fintech-success">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  12% optimized
                </div>
              </CardContent>
            </Card>

            <Card className="metric-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Investment Portfolio</span>
                  <PieChart className="h-4 w-4 text-fintech-warning" />
                </div>
                <div className="text-2xl font-bold text-fintech-slate">₹9.5L</div>
                <div className="flex items-center text-xs text-fintech-success">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  15.6% returns YTD
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Income vs Tax Chart */}
            <Card className="card-fintech">
              <CardHeader>
                <CardTitle>Monthly Income vs Tax</CardTitle>
                <CardDescription>Track your income and tax liability throughout the year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                      <Area 
                        type="monotone" 
                        dataKey="income" 
                        stackId="1" 
                        stroke="#10b981" 
                        fill="#10b981" 
                        fillOpacity={0.6}
                        name="Income"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="tax" 
                        stackId="2" 
                        stroke="#ef4444" 
                        fill="#ef4444" 
                        fillOpacity={0.6}
                        name="Tax"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Distribution */}
            <Card className="card-fintech">
              <CardHeader>
                <CardTitle>Investment Portfolio</CardTitle>
                <CardDescription>Distribution of your investment portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center">
                  <div className="w-1/2">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                        <RechartsPieChart data={portfolioData} cx="50%" cy="50%" outerRadius={80}>
                          {portfolioData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </RechartsPieChart>
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="w-1/2 space-y-4">
                    {portfolioData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                        <span className="text-sm font-semibold">₹{(item.value/100000).toFixed(1)}L</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tax Savings Progress */}
          <Card className="card-fintech">
            <CardHeader>
              <CardTitle>Tax Savings Progress (Section 80C)</CardTitle>
              <CardDescription>Track your progress toward maximum tax savings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Invested: ₹1,50,000</span>
                  <span>Limit: ₹1,50,000</span>
                </div>
                <Progress value={100} className="h-2" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-fintech-success">₹80K</p>
                    <p className="text-xs text-muted-foreground">ELSS Funds</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-fintech-success">₹50K</p>
                    <p className="text-xs text-muted-foreground">PPF</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-fintech-success">₹20K</p>
                    <p className="text-xs text-muted-foreground">Life Insurance</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-fintech-success">₹0</p>
                    <p className="text-xs text-muted-foreground">Available</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="card-fintech">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks to manage your taxes efficiently</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="btn-hero h-20 flex-col">
                  <Calculator className="h-6 w-6 mb-2" />
                  Generate ITR
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col"
                  onClick={() => navigate('/dashboard/add-investment')}
                >
                  <TrendingUp className="h-6 w-6 mb-2" />
                  Add Investment
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col"
                  onClick={() => navigate('/dashboard/view-report')}
                >
                  <PieChart className="h-6 w-6 mb-2" />
                  View Reports
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col"
                  onClick={() => navigate('/dashboard/tax-planning')}
                >
                  <ArrowUpRight className="h-6 w-6 mb-2" />
                  Tax Planning
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
