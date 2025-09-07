
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Target, Lightbulb, Calculator, Calendar } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { useState } from "react";

const TaxInsights = () => {
  const [selectedRegime, setSelectedRegime] = useState("compare");

  const savingsOpportunities = [
    { category: "Section 80C", current: 150000, limit: 150000, saved: 46500, potential: 0 },
    { category: "Section 80D", current: 15000, limit: 25000, saved: 4650, potential: 3100 },
    { category: "Section 80G", current: 0, limit: 50000, saved: 0, potential: 15500 },
    { category: "Section 80E", current: 0, limit: "No Limit", saved: 0, potential: 20000 },
    { category: "NPS (80CCD1B)", current: 0, limit: 50000, saved: 0, potential: 15500 },
  ];

  const monthlyTaxData = [
    { month: 'Apr', oldRegime: 15500, newRegime: 12800 },
    { month: 'May', oldRegime: 16200, newRegime: 13400 },
    { month: 'Jun', oldRegime: 15800, newRegime: 13100 },
    { month: 'Jul', oldRegime: 16500, newRegime: 13700 },
    { month: 'Aug', oldRegime: 15300, newRegime: 12600 },
    { month: 'Sep', oldRegime: 17000, newRegime: 14100 },
    { month: 'Oct', oldRegime: 16800, newRegime: 13900 },
    { month: 'Nov', oldRegime: 16000, newRegime: 13200 },
    { month: 'Dec', oldRegime: 17200, newRegime: 14300 },
    { month: 'Jan', oldRegime: 17500, newRegime: 14500 },
    { month: 'Feb', oldRegime: 16700, newRegime: 13800 },
    { month: 'Mar', oldRegime: 18000, newRegime: 14900 },
  ];

  const regimeComparison = [
    { income: "5L", oldTax: 0, newTax: 0 },
    { income: "7L", oldTax: 20800, newTax: 15000 },
    { income: "10L", oldTax: 62400, newTax: 45000 },
    { income: "12L", oldTax: 93600, newTax: 78000 },
    { income: "15L", oldTax: 156000, newTax: 117000 },
    { income: "20L", oldTax: 312000, newTax: 195000 },
  ];

  const deductionBreakdown = [
    { name: 'Section 80C', value: 150000, color: '#10b981' },
    { name: 'Section 80D', value: 15000, color: '#3b82f6' },
    { name: 'HRA', value: 180000, color: '#f59e0b' },
    { name: 'Standard Deduction', value: 50000, color: '#8b5cf6' },
  ];

  const insights = [
    {
      type: "opportunity",
      title: "Maximize 80D Benefits",
      description: "You can save ₹3,100 more by investing ₹10,000 in health insurance premium",
      impact: "₹3,100 tax savings",
      action: "Increase health insurance coverage"
    },
    {
      type: "warning",
      title: "Missing NPS Benefits",
      description: "₹50,000 investment in NPS can save ₹15,500 in taxes under 80CCD(1B)",
      impact: "₹15,500 potential savings",
      action: "Open NPS account"
    },
    {
      type: "success",
      title: "80C Limit Maximized",
      description: "You've utilized the full ₹1.5L limit under Section 80C. Great job!",
      impact: "₹46,500 tax saved",
      action: "Maintain current investments"
    },
    {
      type: "opportunity",
      title: "Consider Charitable Donations",
      description: "Donations under 80G can provide 50-100% deduction with no upper limit",
      impact: "Variable tax savings",
      action: "Plan charitable giving"
    }
  ];

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex-1">
        <header className="h-16 border-b bg-white flex items-center px-6 sticky top-0 z-10">
          <SidebarTrigger className="mr-4" />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-fintech-slate">Tax Insights</h1>
            <p className="text-sm text-muted-foreground">Personalized tax planning recommendations and analysis</p>
          </div>
          <Badge className="bg-fintech-warning/10 text-fintech-warning border-fintech-warning/20">
            💡 AI Insights
          </Badge>
        </header>

        <main className="p-6 space-y-6">
          {/* Tax Savings Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="metric-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Current Tax Saved</span>
                  <TrendingDown className="h-4 w-4 text-fintech-success" />
                </div>
                <div className="text-2xl font-bold text-fintech-slate">₹51,150</div>
                <div className="flex items-center text-xs text-fintech-success">
                  Through deductions
                </div>
              </CardContent>
            </Card>

            <Card className="metric-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Potential Savings</span>
                  <Target className="h-4 w-4 text-fintech-warning" />
                </div>
                <div className="text-2xl font-bold text-fintech-slate">₹54,100</div>
                <div className="flex items-center text-xs text-fintech-warning">
                  Additional opportunities
                </div>
              </CardContent>
            </Card>

            <Card className="metric-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Regime Difference</span>
                  <Calculator className="h-4 w-4 text-primary" />
                </div>
                <div className="text-2xl font-bold text-fintech-slate">₹15,600</div>
                <div className="flex items-center text-xs text-fintech-success">
                  New regime saves more
                </div>
              </CardContent>
            </Card>

            <Card className="metric-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Next Tax Date</span>
                  <Calendar className="h-4 w-4 text-fintech-danger" />
                </div>
                <div className="text-2xl font-bold text-fintech-slate">45 days</div>
                <div className="flex items-center text-xs text-fintech-danger">
                  Q3 advance tax due
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Insights */}
          <Card className="card-fintech">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-fintech-warning" />
                Personalized Tax Insights
              </CardTitle>
              <CardDescription>AI-powered recommendations to optimize your tax planning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {insights.map((insight, index) => (
                  <div key={index} className={`p-4 rounded-lg border-l-4 ${
                    insight.type === 'opportunity' ? 'border-l-fintech-warning bg-fintech-warning/5' :
                    insight.type === 'warning' ? 'border-l-fintech-danger bg-fintech-danger/5' :
                    'border-l-fintech-success bg-fintech-success/5'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{insight.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                        <div className="flex items-center gap-4">
                          <Badge variant="secondary" className="text-xs">
                            {insight.impact}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{insight.action}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Act Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="savings-opportunities" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="savings-opportunities">Savings</TabsTrigger>
              <TabsTrigger value="regime-comparison">Regime</TabsTrigger>
              <TabsTrigger value="deduction-analysis">Deductions</TabsTrigger>
              <TabsTrigger value="tax-planning">Planning</TabsTrigger>
            </TabsList>

            <TabsContent value="savings-opportunities" className="space-y-6">
              <Card className="card-fintech">
                <CardHeader>
                  <CardTitle>Tax Savings Opportunities</CardTitle>
                  <CardDescription>Maximize your deductions and save more on taxes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {savingsOpportunities.map((item, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">{item.category}</h4>
                            <p className="text-sm text-muted-foreground">
                              Used: ₹{item.current.toLocaleString()} / 
                              Limit: {typeof item.limit === 'number' ? `₹${item.limit.toLocaleString()}` : item.limit}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-fintech-success">₹{item.saved.toLocaleString()} saved</p>
                            {item.potential > 0 && (
                              <p className="text-sm text-fintech-warning">+₹{item.potential.toLocaleString()} potential</p>
                            )}
                          </div>
                        </div>
                        <Progress 
                          value={typeof item.limit === 'number' ? (item.current / item.limit) * 100 : 0} 
                          className="h-2" 
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="regime-comparison" className="space-y-6">
              <Card className="card-fintech">
                <CardHeader>
                  <CardTitle>Old vs New Tax Regime Comparison</CardTitle>
                  <CardDescription>Compare tax liability across different income levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={regimeComparison}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="income" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                        <Bar dataKey="oldTax" fill="#ef4444" name="Old Regime" />
                        <Bar dataKey="newTax" fill="#10b981" name="New Regime" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Old Tax Regime</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Higher deduction limits (80C, 80D, etc.)</li>
                        <li>• Standard deduction: ₹50,000</li>
                        <li>• Multiple investment-linked deductions</li>
                        <li>• Better for high deduction users</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">New Tax Regime</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Lower tax rates across slabs</li>
                        <li>• Standard deduction: ₹75,000</li>
                        <li>• Limited deductions available</li>
                        <li>• Better for most taxpayers</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="deduction-analysis" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="card-fintech">
                  <CardHeader>
                    <CardTitle>Deduction Breakdown</CardTitle>
                    <CardDescription>Your current deduction utilization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center">
                      <div className="w-1/2">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                            <Pie 
                              data={deductionBreakdown} 
                              cx="50%" 
                              cy="50%" 
                              outerRadius={80}
                              dataKey="value"
                            >
                              {deductionBreakdown.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="w-1/2 space-y-3">
                        {deductionBreakdown.map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: item.color }}
                              ></div>
                              <span className="text-sm font-medium">{item.name}</span>
                            </div>
                            <span className="text-sm font-semibold">₹{(item.value/1000).toFixed(0)}K</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-fintech">
                  <CardHeader>
                    <CardTitle>Monthly Tax Impact</CardTitle>
                    <CardDescription>Compare regime impact month by month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyTaxData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                          <Line 
                            type="monotone" 
                            dataKey="oldRegime" 
                            stroke="#ef4444" 
                            strokeWidth={2}
                            name="Old Regime"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="newRegime" 
                            stroke="#10b981" 
                            strokeWidth={2}
                            name="New Regime"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="tax-planning" className="space-y-6">
              <Card className="card-fintech">
                <CardHeader>
                  <CardTitle>Tax Planning Calendar</CardTitle>
                  <CardDescription>Important dates and recommended actions for the tax year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-fintech-danger">Upcoming Deadlines</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">Q3 Advance Tax</p>
                              <p className="text-sm text-muted-foreground">15th December 2024</p>
                            </div>
                            <Badge variant="destructive">45 days</Badge>
                          </div>
                          <div className="flex justify-between items-center p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">Q4 Advance Tax</p>
                              <p className="text-sm text-muted-foreground">15th March 2025</p>
                            </div>
                            <Badge variant="secondary">135 days</Badge>
                          </div>
                          <div className="flex justify-between items-center p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">ITR Filing</p>
                              <p className="text-sm text-muted-foreground">31st July 2025</p>
                            </div>
                            <Badge variant="secondary">273 days</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-fintech-success">Recommended Actions</h4>
                        <div className="space-y-3">
                          <div className="p-3 border rounded-lg">
                            <p className="font-medium">Increase Health Insurance</p>
                            <p className="text-sm text-muted-foreground">Save ₹3,100 more in taxes</p>
                          </div>
                          <div className="p-3 border rounded-lg">
                            <p className="font-medium">Start NPS Investment</p>
                            <p className="text-sm text-muted-foreground">Additional ₹15,500 tax benefit</p>
                          </div>
                          <div className="p-3 border rounded-lg">
                            <p className="font-medium">Plan Charitable Donations</p>
                            <p className="text-sm text-muted-foreground">100% deduction under 80G</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default TaxInsights;
