
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Upload, TrendingUp, TrendingDown, ArrowUpRight, BarChart3 } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const Investments = () => {
  const mutualFunds = [
    { name: "SBI Blue Chip Fund", amount: 150000, units: 2500, nav: 60, returns: 12.5, type: "Equity" },
    { name: "HDFC Corporate Bond Fund", amount: 80000, units: 800, nav: 100, returns: 8.2, type: "Debt" },
    { name: "Axis Long Term Equity Fund", amount: 120000, units: 1200, nav: 100, returns: 15.8, type: "ELSS" },
    { name: "ICICI Prudential Balanced Advantage Fund", amount: 100000, units: 1000, nav: 100, returns: 11.3, type: "Hybrid" },
  ];

  const stocks = [
    { name: "Reliance Industries", quantity: 50, buyPrice: 2400, currentPrice: 2650, investment: 120000, currentValue: 132500 },
    { name: "TCS", quantity: 30, buyPrice: 3200, currentPrice: 3450, investment: 96000, currentValue: 103500 },
    { name: "HDFC Bank", quantity: 40, buyPrice: 1500, currentPrice: 1680, investment: 60000, currentValue: 67200 },
    { name: "Infosys", quantity: 25, buyPrice: 1400, currentPrice: 1520, investment: 35000, currentValue: 38000 },
  ];

  const capitalGains = [
    { type: "STCG", amount: 25000, tax: 3750, description: "Short-term gains from equity sales" },
    { type: "LTCG", amount: 180000, tax: 8000, description: "Long-term gains exceeding ₹1L limit" },
    { type: "Dividend", amount: 45000, tax: 0, description: "Dividend income from mutual funds" },
  ];

  const monthlyData = [
    { month: 'Apr', investment: 50000, value: 52000 },
    { month: 'May', investment: 100000, value: 105000 },
    { month: 'Jun', investment: 150000, value: 158000 },
    { month: 'Jul', investment: 200000, value: 212000 },
    { month: 'Aug', investment: 250000, value: 268000 },
    { month: 'Sep', investment: 300000, value: 324000 },
    { month: 'Oct', investment: 350000, value: 378000 },
    { month: 'Nov', investment: 400000, value: 432000 },
    { month: 'Dec', investment: 450000, value: 486000 },
    { month: 'Jan', investment: 500000, value: 540000 },
    { month: 'Feb', investment: 550000, value: 594000 },
    { month: 'Mar', investment: 600000, value: 648000 },
  ];

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex-1">
        <header className="h-16 border-b bg-white flex items-center px-6 sticky top-0 z-10">
          <SidebarTrigger className="mr-4" />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-fintech-slate">Investments</h1>
            <p className="text-sm text-muted-foreground">Track and manage all your investment portfolios</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Import Data
            </Button>
            <Button size="sm" className="btn-hero">
              <Plus className="mr-2 h-4 w-4" />
              Add Investment
            </Button>
          </div>
        </header>

        <main className="p-6 space-y-6">
          {/* Portfolio Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="metric-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Total Investment</span>
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <div className="text-2xl font-bold text-fintech-slate">₹9.5L</div>
                <div className="flex items-center text-xs text-fintech-success">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  12.5% growth
                </div>
              </CardContent>
            </Card>

            <Card className="metric-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Current Value</span>
                  <BarChart3 className="h-4 w-4 text-fintech-success" />
                </div>
                <div className="text-2xl font-bold text-fintech-slate">₹10.8L</div>
                <div className="flex items-center text-xs text-fintech-success">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  ₹1.3L gains
                </div>
              </CardContent>
            </Card>

            <Card className="metric-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">STCG Tax</span>
                  <TrendingDown className="h-4 w-4 text-fintech-warning" />
                </div>
                <div className="text-2xl font-bold text-fintech-slate">₹3,750</div>
                <div className="flex items-center text-xs text-fintech-warning">
                  15% on ₹25K gains
                </div>
              </CardContent>
            </Card>

            <Card className="metric-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">LTCG Tax</span>
                  <TrendingDown className="h-4 w-4 text-fintech-danger" />
                </div>
                <div className="text-2xl font-bold text-fintech-slate">₹8,000</div>
                <div className="flex items-center text-xs text-fintech-danger">
                  10% on excess ₹80K
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Connection Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="card-fintech">
              <CardHeader>
                <CardTitle className="text-lg">CAMS Integration</CardTitle>
                <CardDescription>Connect your mutual fund portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input placeholder="Enter CAMS login ID" />
                  <Button className="w-full btn-hero">
                    <Upload className="mr-2 h-4 w-4" />
                    Connect CAMS
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="card-fintech">
              <CardHeader>
                <CardTitle className="text-lg">KFinTech Integration</CardTitle>
                <CardDescription>Import KFinTech mutual funds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input placeholder="Enter KFinTech user ID" />
                  <Button className="w-full btn-hero">
                    <Upload className="mr-2 h-4 w-4" />
                    Connect KFinTech
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="card-fintech">
              <CardHeader>
                <CardTitle className="text-lg">Broker Integration</CardTitle>
                <CardDescription>Connect Zerodha, Upstox & more</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input placeholder="Enter broker user ID" />
                  <Button className="w-full btn-hero">
                    <Upload className="mr-2 h-4 w-4" />
                    Connect Broker
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="mutual-funds" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="mutual-funds">Mutual Funds</TabsTrigger>
              <TabsTrigger value="stocks">Stocks</TabsTrigger>
              <TabsTrigger value="capital-gains">Capital Gains</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="mutual-funds" className="space-y-6">
              <Card className="card-fintech">
                <CardHeader>
                  <CardTitle>Mutual Fund Portfolio</CardTitle>
                  <CardDescription>Your current mutual fund holdings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mutualFunds.map((fund, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold">{fund.name}</h3>
                            <Badge variant="secondary">{fund.type}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {fund.units} units × ₹{fund.nav} NAV
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{fund.amount.toLocaleString()}</p>
                          <p className={`text-sm ${fund.returns > 0 ? 'text-fintech-success' : 'text-fintech-danger'}`}>
                            {fund.returns > 0 ? '+' : ''}{fund.returns}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stocks" className="space-y-6">
              <Card className="card-fintech">
                <CardHeader>
                  <CardTitle>Stock Portfolio</CardTitle>
                  <CardDescription>Your current stock holdings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stocks.map((stock, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-semibold">{stock.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {stock.quantity} shares • Avg: ₹{stock.buyPrice} • CMP: ₹{stock.currentPrice}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{stock.currentValue.toLocaleString()}</p>
                          <p className={`text-sm ${stock.currentValue > stock.investment ? 'text-fintech-success' : 'text-fintech-danger'}`}>
                            {stock.currentValue > stock.investment ? '+' : ''}₹{(stock.currentValue - stock.investment).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="capital-gains" className="space-y-6">
              <Card className="card-fintech">
                <CardHeader>
                  <CardTitle>Capital Gains & Tax Impact</CardTitle>
                  <CardDescription>Your realized gains and tax implications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {capitalGains.map((gain, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold">{gain.type}</h3>
                            <Badge 
                              variant={gain.type === 'STCG' ? 'destructive' : gain.type === 'LTCG' ? 'default' : 'secondary'}
                            >
                              {gain.type === 'STCG' ? '15% Tax' : gain.type === 'LTCG' ? '10% Tax' : 'Tax Free'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{gain.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{gain.amount.toLocaleString()}</p>
                          <p className="text-sm text-fintech-danger">Tax: ₹{gain.tax.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <Card className="card-fintech">
                <CardHeader>
                  <CardTitle>Investment Performance</CardTitle>
                  <CardDescription>Track your investment growth over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                        <Line 
                          type="monotone" 
                          dataKey="investment" 
                          stroke="#6b7280" 
                          strokeWidth={2}
                          name="Investment"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#10b981" 
                          strokeWidth={2}
                          name="Current Value"
                        />
                      </LineChart>
                    </ResponsiveContainer>
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

export default Investments;
