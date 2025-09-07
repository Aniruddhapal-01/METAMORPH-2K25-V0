
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, TrendingUp, Shield, Zap, Calculator, MessageSquare, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: <Calculator className="h-8 w-8" />,
      title: "ITR Autofill Magic",
      description: "Auto-populate your ITR from AIS/TIS and Form 26AS data with one click",
      color: "text-fintech-success"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Investment Aggregation",
      description: "Connect all your MF, stocks, and track STCG/LTCG automatically",
      color: "text-fintech-warning"
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "AI Tax Assistant",
      description: "Get instant answers to complex tax queries with our intelligent chatbot",
      color: "text-primary"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Regime Comparison",
      description: "Old vs New tax regime analysis with personalized recommendations",
      color: "text-fintech-danger"
    }
  ];

  const stats = [
    { number: "₹50L+", label: "Tax Saved", icon: "💰" },
    { number: "10K+", label: "Happy Users", icon: "👥" },
    { number: "99.9%", label: "Accuracy Rate", icon: "🎯" },
    { number: "24/7", label: "AI Support", icon: "🤖" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-hero-gradient rounded-lg flex items-center justify-center">
              <Calculator className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-fintech-slate">TaxMantri</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-fintech-slate hover:text-primary transition-colors">Features</a>
            <a href="#pricing" className="text-fintech-slate hover:text-primary transition-colors">Pricing</a>
            <a href="#about" className="text-fintech-slate hover:text-primary transition-colors">About</a>
          </div>
          <Link to="/auth">
            <Button className="btn-hero">
              Login <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-fintech-emerald-light/10 via-background to-fintech-emerald-light/5">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-fintech-emerald-light text-fintech-emerald border-fintech-emerald/20">
            🚀 Powered by AI • Trusted by 10,000+ taxpayers
          </Badge>
          
          <h1 className="text-hero mb-6 animate-fade-in">
            Stop Wrestling with
            <br />
            <span className="relative bg-gradient-to-r from-fintech-emerald to-fintech-slate bg-clip-text text-transparent inline-block -mt-2">
  Tax Filing
  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-hero-gradient rounded-full animate-slide-up"></div>
</span>

          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
            <strong className="text-fintech-danger">Problem:</strong> Filing taxes is confusing, manual, and time-consuming.
            <br />
            <strong className="text-fintech-success">Solution:</strong> TaxMantri auto-fills your ITR, aggregates investments, and guides you with an AI tax assistant.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in">
            <Link to="/auth">
              <Button size="lg" className="btn-hero text-lg px-10">
                <Zap className="mr-2 h-5 w-5" />
                Try Now - Free
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="btn-secondary text-lg px-10">
                <Shield className="mr-2 h-5 w-5" />
                Login with Aadhaar + PAN
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-in">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-fintech-slate">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-fintech-emerald-light text-fintech-emerald border-fintech-emerald/20">
              ✨ Core Features
            </Badge>
            <h2 className="text-4xl font-bold text-fintech-slate mb-4">
              Everything You Need for Smart Tax Filing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From data aggregation to AI-powered insights, we've got your tax journey covered
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className={`card-fintech cursor-pointer transition-all duration-300 ${
                  hoveredFeature === index ? 'scale-105 shadow-lg' : ''
                }`}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className={`${feature.color} mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-fintech-slate mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Problem-Solution Section */}
      <section className="py-20 bg-gradient-to-br from-fintech-emerald-light/5 to-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-fintech-danger/10 text-fintech-danger border-fintech-danger/20">
                😤 The Problem
              </Badge>
              <h2 className="text-3xl font-bold text-fintech-slate mb-6">
                Tax Filing Shouldn't Be This Hard
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-fintech-danger rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Manual data entry across multiple forms and portals</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-fintech-danger rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Confusion between old vs new tax regime</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-fintech-danger rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Scattered investment data across different platforms</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-fintech-danger rounded-full mt-2"></div>
                  <p className="text-muted-foreground">No clear visibility on tax savings opportunities</p>
                </div>
              </div>
            </div>

            <div>
              <Badge className="mb-4 bg-fintech-success/10 text-fintech-success border-fintech-success/20">
                ✅ Our Solution
              </Badge>
              <h2 className="text-3xl font-bold text-fintech-slate mb-6">
                Smart, Automated, AI-Powered
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-fintech-success mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">Auto-fill ITR from AIS/TIS and Form 26AS</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-fintech-success mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">Intelligent regime comparison with personalized recommendations</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-fintech-success mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">Aggregate investments from all major platforms</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-fintech-success mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">AI assistant for instant tax guidance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Tax Experience?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of smart taxpayers who've already simplified their tax filing with TaxMantri
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" variant="secondary" className="text-lg px-10 bg-white text-fintech-emerald hover:bg-white/90">
                  <Star className="mr-2 h-5 w-5" />
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline" className="text-lg px-10 border-white text-black hover:bg-white hover:text-fintech-emerald">
                  <Shield className="mr-2 h-5 w-5" />
                  Secure Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-fintech-slate text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-hero-gradient rounded-lg flex items-center justify-center">
                  <Calculator className="h-5 w-5 text-white" />
                </div>
                <span className="text-2xl font-bold">TaxMantri</span>
              </div>
              <p className="text-white/70 mb-4">
                Making tax filing simple, smart, and stress-free for everyone.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-white/70">
                <p>ITR Autofill</p>
                <p>Investment Tracking</p>
                <p>AI Assistant</p>
                <p>Tax Insights</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-white/70">
                <p>About Us</p>
                <p>Privacy Policy</p>
                <p>Terms of Service</p>
                <p>Contact</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Built by Binary Bandits</h4>
              <div className="space-y-2 text-white/70">
                <p>🚀 Moniratna</p>
                <p>🎯 Chayan</p>
                <p>⚡ Aniruddha</p>
                <p>🛠️ Biki</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>&copy; 2024 TaxMantri by Binary Bandits. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
