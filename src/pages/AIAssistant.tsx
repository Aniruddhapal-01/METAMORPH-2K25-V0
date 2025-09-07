
// import { useState } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Send, Bot, User, Sparkles, MessageSquare, Calculator, TrendingUp } from "lucide-react";
// import { AppSidebar } from "@/components/AppSidebar";
// import { SidebarTrigger } from "@/components/ui/sidebar";

// interface Message {
//   id: string;
//   type: 'user' | 'bot';
//   content: string;
//   timestamp: Date;
// }

// const AIAssistant = () => {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: '1',
//       type: 'bot',
//       content: "Hello! I'm your AI Tax Assistant. I can help you with tax planning, regime comparisons, deduction strategies, and investment advice. What would you like to know?",
//       timestamp: new Date()
//     }
//   ]);
//   const [inputMessage, setInputMessage] = useState("");
//   const [isTyping, setIsTyping] = useState(false);

//   const quickQuestions = [
//     "Which regime saves me more money?",
//     "How much STCG tax do I owe?",
//     "What deductions am I missing?",
//     "When is my next tax payment due?",
//     "How to invest in NPS for tax savings?",
//     "Calculate my advance tax liability"
//   ];

//   const handleSendMessage = async () => {
//     if (!inputMessage.trim()) return;

//     const userMessage: Message = {
//       id: Date.now().toString(),
//       type: 'user',
//       content: inputMessage,
//       timestamp: new Date()
//     };

//     setMessages(prev => [...prev, userMessage]);
//     setInputMessage("");
//     setIsTyping(true);

//     // Simulate AI response
//     setTimeout(() => {
//       const botResponse = generateBotResponse(inputMessage);
//       const botMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         type: 'bot',
//         content: botResponse,
//         timestamp: new Date()
//       };
      
//       setMessages(prev => [...prev, botMessage]);
//       setIsTyping(false);
//     }, 1500);
//   };

//   const generateBotResponse = (question: string): string => {
//     const lowerQuestion = question.toLowerCase();
    
//     if (lowerQuestion.includes('regime') && lowerQuestion.includes('save')) {
//       return `Based on your income of ₹12L and current deductions, the **New Tax Regime** would save you approximately **₹15,600** more compared to the old regime.

// **New Regime Benefits:**
// • Lower tax rates: 5%, 10%, 15%, 20%, 30%
// • Higher standard deduction: ₹75,000
// • Total tax liability: ₹78,000

// **Old Regime:**
// • With your ₹2.25L deductions
// • Total tax liability: ₹92,500

// **Recommendation:** Switch to the new regime for better savings!`;
//     }
    
//     if (lowerQuestion.includes('stcg') || lowerQuestion.includes('short term')) {
//       return `Based on your investment portfolio analysis:

// **Your STCG Details:**
// • Short-term capital gains: ₹25,000
// • Tax rate: 15% (for equity)
// • **Tax liability: ₹3,750**

// **Breakdown:**
// • Equity sales within 1 year: ₹25,000 gains
// • Applied rate: 15% as per current tax laws
// • Amount due: ₹3,750

// **Tip:** Consider holding investments for >1 year to benefit from LTCG rates (10% above ₹1L exemption).`;
//     }
    
//     if (lowerQuestion.includes('deduction') && lowerQuestion.includes('missing')) {
//       return `I've identified several deduction opportunities you're missing:

// **💰 Immediate Opportunities:**
// • **Section 80D**: ₹10,000 more health insurance = ₹3,100 tax savings
// • **Section 80CCD(1B)**: ₹50,000 NPS investment = ₹15,500 tax savings
// • **Section 80G**: Charitable donations = Variable savings

// **📊 Current Status:**
// ✅ Section 80C: Fully utilized (₹1.5L)
// ⚠️ Section 80D: Only ₹15K used of ₹25K limit
// ❌ NPS 80CCD(1B): Not utilized

// **Total Potential Additional Savings: ₹54,100**`;
//     }
    
//     if (lowerQuestion.includes('advance tax') || lowerQuestion.includes('payment due')) {
//       return `Your upcoming tax payment schedule:

// **🚨 Next Payment Due:**
// • **Q3 Advance Tax**: 15th December 2024 (45 days)
// • Amount due: ₹23,125 (25% of annual liability)

// **📅 Remaining Schedule:**
// • Q4 Advance Tax: 15th March 2025 - ₹23,125
// • Final payment with ITR: 31st July 2025

// **💡 Calculation:**
// • Annual tax liability: ₹92,500
// • Already paid (Q1+Q2): ₹46,250
// • Remaining: ₹46,250 in two installments

// **Tip:** Pay on time to avoid 1% monthly penalty!`;
//     }
    
//     if (lowerQuestion.includes('nps') && (lowerQuestion.includes('invest') || lowerQuestion.includes('tax'))) {
//       return `**NPS Investment for Tax Savings:**

// **🎯 Tax Benefits:**
// • Section 80C: Up to ₹1.5L (already maxed out)
// • **Section 80CCD(1B): Extra ₹50,000 deduction**
// • Tax saving: ₹15,500 (at 31% tax rate)

// **📈 Investment Details:**
// • Minimum: ₹500
// • Maximum 80CCD(1B): ₹50,000
// • Lock-in: Until retirement (60 years)
// • Partial withdrawal: After 3 years

// **🏛️ How to Invest:**
// 1. Visit any bank/online platform
// 2. Complete KYC with Aadhaar + PAN
// 3. Choose investment mix (equity/debt)
// 4. Set up SIP for regular investments

// **Recommended allocation: ₹4,167/month for full benefit**`;
//     }
    
//     if (lowerQuestion.includes('calculate') && lowerQuestion.includes('advance')) {
//       return `**Advance Tax Calculation for FY 2024-25:**

// **📊 Your Tax Computation:**
// • Gross Income: ₹12,50,000
// • Less: Deductions: ₹2,25,000
// • Taxable Income: ₹10,25,000
// • **Total Tax Liability: ₹92,500**

// **💰 Advance Tax Schedule:**
// • Q1 (Jun 15): ₹9,250 (10%)
// • Q2 (Sep 15): ₹18,500 (20%) 
// • **Q3 (Dec 15): ₹23,125 (25%) - Due in 45 days**
// • Q4 (Mar 15): ₹23,125 (25%)
// • Remaining with ITR: ₹18,500 (20%)

// **Status:** You need to pay ₹23,125 by December 15th to avoid penalties.`;
//     }
    
//     // Default response
//     return `I understand you're asking about "${question}". 

// As your AI Tax Assistant, I can help you with:

// • **Tax Planning**: Regime comparisons, optimization strategies
// • **Investment Advice**: Tax-saving instruments, portfolio analysis  
// • **Compliance**: Filing deadlines, advance tax calculations
// • **Deductions**: Section 80C, 80D, 80G and other savings
// • **Capital Gains**: STCG/LTCG calculations and planning

// Could you please be more specific about what aspect you'd like help with? You can also try one of the quick questions below!`;
//   };

//   const handleQuickQuestion = (question: string) => {
//     setInputMessage(question);
//   };

//   return (
//     <div className="flex min-h-screen w-full bg-background">
//       <AppSidebar />
//       <div className="flex-1 flex flex-col">
//         <header className="h-16 border-b bg-white flex items-center px-6 sticky top-0 z-10">
//           <SidebarTrigger className="mr-4" />
//           <div className="flex-1">
//             <h1 className="text-2xl font-bold text-fintech-slate flex items-center gap-2">
//               <MessageSquare className="h-6 w-6 text-primary" />
//               AI Tax Assistant
//             </h1>
//             <p className="text-sm text-muted-foreground">Get instant answers to your tax questions</p>
//           </div>
//           <Badge className="bg-fintech-success/10 text-fintech-success border-fintech-success/20">
//             <Bot className="mr-1 h-3 w-3" />
//             Online
//           </Badge>
//         </header>

//         <div className="flex-1 flex">
//           {/* Chat Area */}
//           <div className="flex-1 flex flex-col">
//             <ScrollArea className="flex-1 p-6">
//               <div className="space-y-4 max-w-4xl mx-auto">
//                 {messages.map((message) => (
//                   <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
//                     <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
//                       <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
//                         message.type === 'user' 
//                           ? 'bg-primary text-primary-foreground' 
//                           : 'bg-fintech-emerald text-white'
//                       }`}>
//                         {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
//                       </div>
//                       <div className={`p-4 rounded-lg ${
//                         message.type === 'user' 
//                           ? 'bg-primary text-primary-foreground' 
//                           : 'bg-white border shadow-sm'
//                       }`}>
//                         <div className="prose prose-sm max-w-none">
//                           {message.content.split('\n').map((line, index) => {
//                             if (line.startsWith('**') && line.endsWith('**')) {
//                               return <p key={index} className="font-semibold mb-2">{line.slice(2, -2)}</p>;
//                             }
//                             if (line.startsWith('•')) {
//                               return <li key={index} className="ml-4 list-disc">{line.slice(1).trim()}</li>;
//                             }
//                             if (line.trim() === '') {
//                               return <br key={index} />;
//                             }
//                             return <p key={index} className="mb-2">{line}</p>;
//                           })}
//                         </div>
//                         <div className="text-xs opacity-70 mt-2">
//                           {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
                
//                 {isTyping && (
//                   <div className="flex gap-3 justify-start">
//                     <div className="w-8 h-8 rounded-full bg-fintech-emerald text-white flex items-center justify-center">
//                       <Bot className="h-4 w-4" />
//                     </div>
//                     <div className="bg-white border shadow-sm p-4 rounded-lg">
//                       <div className="flex gap-1">
//                         <div className="w-2 h-2 bg-fintech-emerald rounded-full animate-bounce"></div>
//                         <div className="w-2 h-2 bg-fintech-emerald rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
//                         <div className="w-2 h-2 bg-fintech-emerald rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </ScrollArea>

//             {/* Input Area */}
//             <div className="border-t bg-white p-6">
//               <div className="max-w-4xl mx-auto space-y-4">
//                 {/* Quick Questions */}
//                 <div className="flex flex-wrap gap-2">
//                   {quickQuestions.map((question, index) => (
//                     <Button
//                       key={index}
//                       variant="outline"
//                       size="sm"
//                       onClick={() => handleQuickQuestion(question)}
//                       className="text-xs"
//                     >
//                       {question}
//                     </Button>
//                   ))}
//                 </div>

//                 {/* Message Input */}
//                 <div className="flex gap-3">
//                   <Input
//                     value={inputMessage}
//                     onChange={(e) => setInputMessage(e.target.value)}
//                     placeholder="Ask me anything about taxes, investments, or financial planning..."
//                     onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                     className="flex-1"
//                   />
//                   <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping} className="btn-hero">
//                     <Send className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Sidebar with Quick Stats */}
//           <div className="w-80 border-l bg-muted/5 p-6 space-y-6">
//             <div>
//               <h3 className="font-semibold mb-4 flex items-center gap-2">
//                 <Sparkles className="h-4 w-4 text-fintech-warning" />
//                 Quick Stats
//               </h3>
//               <div className="space-y-3">
//                 <Card className="p-3">
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm">Tax Liability</span>
//                     <span className="font-semibold text-fintech-danger">₹92,500</span>
//                   </div>
//                 </Card>
//                 <Card className="p-3">
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm">Potential Savings</span>
//                     <span className="font-semibold text-fintech-success">₹54,100</span>
//                   </div>
//                 </Card>
//                 <Card className="p-3">
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm">Next Payment</span>
//                     <span className="font-semibold text-fintech-warning">45 days</span>
//                   </div>
//                 </Card>
//               </div>
//             </div>

//             <div>
//               <h3 className="font-semibold mb-4 flex items-center gap-2">
//                 <Calculator className="h-4 w-4 text-primary" />
//                 Popular Topics
//               </h3>
//               <div className="space-y-2 text-sm">
//                 <div className="p-2 hover:bg-muted rounded cursor-pointer">Tax regime comparison</div>
//                 <div className="p-2 hover:bg-muted rounded cursor-pointer">Section 80C investments</div>
//                 <div className="p-2 hover:bg-muted rounded cursor-pointer">Capital gains tax</div>
//                 <div className="p-2 hover:bg-muted rounded cursor-pointer">Advance tax calculation</div>
//                 <div className="p-2 hover:bg-muted rounded cursor-pointer">HRA exemption</div>
//                 <div className="p-2 hover:bg-muted rounded cursor-pointer">NPS tax benefits</div>
//               </div>
//             </div>

//             <div>
//               <h3 className="font-semibold mb-4 flex items-center gap-2">
//                 <TrendingUp className="h-4 w-4 text-fintech-success" />
//                 Recent Updates
//               </h3>
//               <div className="space-y-3 text-sm">
//                 <div className="p-3 bg-fintech-success/10 rounded-lg">
//                   <p className="font-medium text-fintech-success">New regime rates updated</p>
//                   <p className="text-xs text-muted-foreground">Tax slabs for FY 2024-25</p>
//                 </div>
//                 <div className="p-3 bg-fintech-warning/10 rounded-lg">
//                   <p className="font-medium text-fintech-warning">Advance tax due soon</p>
//                   <p className="text-xs text-muted-foreground">Q3 payment deadline approaching</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AIAssistant;







// import { useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Send, Bot, User, Sparkles, MessageSquare, Calculator, TrendingUp } from "lucide-react";
// import { AppSidebar } from "@/components/AppSidebar";
// import { SidebarTrigger } from "@/components/ui/sidebar";

// interface Message {
//   id: string;
//   type: "user" | "bot";
//   content: string;
//   timestamp: Date;
// }

// const AIAssistant = () => {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: "1",
//       type: "bot",
//       content:
//         "Hello! I'm your AI Tax Assistant. I can help you with tax planning, regime comparisons, deduction strategies, and investment advice. What would you like to know?",
//       timestamp: new Date(),
//     },
//   ]);
//   const [inputMessage, setInputMessage] = useState("");
//   const [isTyping, setIsTyping] = useState(false);

//   const quickQuestions = [
//     "Which regime saves me more money?",
//     "How much STCG tax do I owe?",
//     "What deductions am I missing?",
//     "When is my next tax payment due?",
//     "How to invest in NPS for tax savings?",
//     "Calculate my advance tax liability",
//   ];

//   const handleSendMessage = async () => {
//     if (!inputMessage.trim()) return;

//     const userMessage: Message = {
//       id: Date.now().toString(),
//       type: "user",
//       content: inputMessage,
//       timestamp: new Date(),
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setInputMessage("");
//     setIsTyping(true);

//     try {
//       const res = await fetch("http://localhost:3031/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: inputMessage }),
//       });

//       const data = await res.json();

//       const botMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         type: "bot",
//         content: data.reply || "Sorry, I couldn't generate a response.",
//         timestamp: new Date(),
//       };

//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       console.error("Error fetching AI response:", error);

//       const errorMessage: Message = {
//         id: (Date.now() + 2).toString(),
//         type: "bot",
//         content: "⚠️ Something went wrong. Please try again later.",
//         timestamp: new Date(),
//       };

//       setMessages((prev) => [...prev, errorMessage]);
//     } finally {
//       setIsTyping(false);
//     }
//   };

//   const handleQuickQuestion = (question: string) => {
//     setInputMessage(question);
//   };

//   return (
//     <div className="flex min-h-screen w-full bg-background">
//       <AppSidebar />
//       <div className="flex-1 flex flex-col">
//         <header className="h-16 border-b bg-white flex items-center px-6 sticky top-0 z-10">
//           <SidebarTrigger className="mr-4" />
//           <div className="flex-1">
//             <h1 className="text-2xl font-bold text-fintech-slate flex items-center gap-2">
//               <MessageSquare className="h-6 w-6 text-primary" />
//               AI Tax Assistant
//             </h1>
//             <p className="text-sm text-muted-foreground">
//               Get instant answers to your tax questions
//             </p>
//           </div>
//           <Badge className="bg-fintech-success/10 text-fintech-success border-fintech-success/20">
//             <Bot className="mr-1 h-3 w-3" />
//             Online
//           </Badge>
//         </header>

//         <div className="flex-1 flex">
//           {/* Chat Area */}
//           <div className="flex-1 flex flex-col">
//             <ScrollArea className="flex-1 p-6">
//               <div className="space-y-4 max-w-4xl mx-auto">
//                 {messages.map((message) => (
//                   <div
//                     key={message.id}
//                     className={`flex gap-3 ${
//                       message.type === "user"
//                         ? "justify-end"
//                         : "justify-start"
//                     }`}
//                   >
//                     <div
//                       className={`flex gap-3 max-w-[80%] ${
//                         message.type === "user"
//                           ? "flex-row-reverse"
//                           : "flex-row"
//                       }`}
//                     >
//                       <div
//                         className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
//                           message.type === "user"
//                             ? "bg-primary text-primary-foreground"
//                             : "bg-fintech-emerald text-white"
//                         }`}
//                       >
//                         {message.type === "user" ? (
//                           <User className="h-4 w-4" />
//                         ) : (
//                           <Bot className="h-4 w-4" />
//                         )}
//                       </div>
//                       <div
//                         className={`p-4 rounded-lg ${
//                           message.type === "user"
//                             ? "bg-primary text-primary-foreground"
//                             : "bg-white border shadow-sm"
//                         }`}
//                       >
//                         <div className="prose prose-sm max-w-none">
//                           {message.content.split("\n").map((line, index) => {
//                             if (
//                               line.startsWith("**") &&
//                               line.endsWith("**")
//                             ) {
//                               return (
//                                 <p
//                                   key={index}
//                                   className="font-semibold mb-2"
//                                 >
//                                   {line.slice(2, -2)}
//                                 </p>
//                               );
//                             }
//                             if (line.startsWith("•")) {
//                               return (
//                                 <li
//                                   key={index}
//                                   className="ml-4 list-disc"
//                                 >
//                                   {line.slice(1).trim()}
//                                 </li>
//                               );
//                             }
//                             if (line.trim() === "") {
//                               return <br key={index} />;
//                             }
//                             return (
//                               <p key={index} className="mb-2">
//                                 {line}
//                               </p>
//                             );
//                           })}
//                         </div>
//                         <div className="text-xs opacity-70 mt-2">
//                           {message.timestamp.toLocaleTimeString([], {
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           })}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}

//                 {isTyping && (
//                   <div className="flex gap-3 justify-start">
//                     <div className="w-8 h-8 rounded-full bg-fintech-emerald text-white flex items-center justify-center">
//                       <Bot className="h-4 w-4" />
//                     </div>
//                     <div className="bg-white border shadow-sm p-4 rounded-lg">
//                       <div className="flex gap-1">
//                         <div className="w-2 h-2 bg-fintech-emerald rounded-full animate-bounce"></div>
//                         <div
//                           className="w-2 h-2 bg-fintech-emerald rounded-full animate-bounce"
//                           style={{ animationDelay: "0.1s" }}
//                         ></div>
//                         <div
//                           className="w-2 h-2 bg-fintech-emerald rounded-full animate-bounce"
//                           style={{ animationDelay: "0.2s" }}
//                         ></div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </ScrollArea>

//             {/* Input Area */}
//             <div className="border-t bg-white p-6">
//               <div className="max-w-4xl mx-auto space-y-4">
//                 {/* Quick Questions */}
//                 <div className="flex flex-wrap gap-2">
//                   {quickQuestions.map((question, index) => (
//                     <Button
//                       key={index}
//                       variant="outline"
//                       size="sm"
//                       onClick={() => handleQuickQuestion(question)}
//                       className="text-xs"
//                     >
//                       {question}
//                     </Button>
//                   ))}
//                 </div>

//                 {/* Message Input */}
//                 <div className="flex gap-3">
//                   <Input
//                     value={inputMessage}
//                     onChange={(e) => setInputMessage(e.target.value)}
//                     placeholder="Ask me anything about taxes, investments, or financial planning..."
//                     onKeyPress={(e) =>
//                       e.key === "Enter" && handleSendMessage()
//                     }
//                     className="flex-1"
//                   />
//                   <Button
//                     onClick={handleSendMessage}
//                     disabled={!inputMessage.trim() || isTyping}
//                     className="btn-hero"
//                   >
//                     <Send className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Sidebar with Quick Stats */}
//           <div className="w-80 border-l bg-muted/5 p-6 space-y-6">
//             <div>
//               <h3 className="font-semibold mb-4 flex items-center gap-2">
//                 <Sparkles className="h-4 w-4 text-fintech-warning" />
//                 Quick Stats
//               </h3>
//               <div className="space-y-3">
//                 <Card className="p-3">
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm">Tax Liability</span>
//                     <span className="font-semibold text-fintech-danger">
//                       ₹92,500
//                     </span>
//                   </div>
//                 </Card>
//                 <Card className="p-3">
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm">Potential Savings</span>
//                     <span className="font-semibold text-fintech-success">
//                       ₹54,100
//                     </span>
//                   </div>
//                 </Card>
//                 <Card className="p-3">
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm">Next Payment</span>
//                     <span className="font-semibold text-fintech-warning">
//                       45 days
//                     </span>
//                   </div>
//                 </Card>
//               </div>
//             </div>

//             <div>
//               <h3 className="font-semibold mb-4 flex items-center gap-2">
//                 <Calculator className="h-4 w-4 text-primary" />
//                 Popular Topics
//               </h3>
//               <div className="space-y-2 text-sm">
//                 <div className="p-2 hover:bg-muted rounded cursor-pointer">
//                   Tax regime comparison
//                 </div>
//                 <div className="p-2 hover:bg-muted rounded cursor-pointer">
//                   Section 80C investments
//                 </div>
//                 <div className="p-2 hover:bg-muted rounded cursor-pointer">
//                   Capital gains tax
//                 </div>
//                 <div className="p-2 hover:bg-muted rounded cursor-pointer">
//                   Advance tax calculation
//                 </div>
//                 <div className="p-2 hover:bg-muted rounded cursor-pointer">
//                   HRA exemption
//                 </div>
//                 <div className="p-2 hover:bg-muted rounded cursor-pointer">
//                   NPS tax benefits
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h3 className="font-semibold mb-4 flex items-center gap-2">
//                 <TrendingUp className="h-4 w-4 text-fintech-success" />
//                 Recent Updates
//               </h3>
//               <div className="space-y-3 text-sm">
//                 <div className="p-3 bg-fintech-success/10 rounded-lg">
//                   <p className="font-medium text-fintech-success">
//                     New regime rates updated
//                   </p>
//                   <p className="text-xs text-muted-foreground">
//                     Tax slabs for FY 2024-25
//                   </p>
//                 </div>
//                 <div className="p-3 bg-fintech-warning/10 rounded-lg">
//                   <p className="font-medium text-fintech-warning">
//                     Advance tax due soon
//                   </p>
//                   <p className="text-xs text-muted-foreground">
//                     Q3 payment deadline approaching
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AIAssistant;



import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Sparkles, MessageSquare, Calculator, TrendingUp } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm your AI Tax Assistant. I can help you with tax planning, regime comparisons, deduction strategies, and investment advice. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    "Which regime saves me more money?",
    "How much STCG tax do I owe?",
    "What deductions am I missing?",
    "When is my next tax payment due?",
    "How to invest in NPS for tax savings?",
    "Calculate my advance tax liability",
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:3031/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: inputMessage }),
});

      if (!res.ok) throw new Error("Network response not OK");

      const data = await res.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: data.reply || "Sorry, I couldn't generate a response.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);

      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: "bot",
        content: "⚠️ Something went wrong. Please try again later.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b bg-white flex items-center px-6 sticky top-0 z-10">
          <SidebarTrigger className="mr-4" />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-fintech-slate flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              AI Tax Assistant
            </h1>
            <p className="text-sm text-muted-foreground">
              Get instant answers to your tax questions
            </p>
          </div>
          <Badge className="bg-fintech-success/10 text-fintech-success border-fintech-success/20">
            <Bot className="mr-1 h-3 w-3" />
            Online
          </Badge>
        </header>

        <div className="flex-1 flex">
          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4 max-w-4xl mx-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex gap-3 max-w-[80%] ${
                        message.type === "user" ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.type === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-fintech-emerald text-white"
                        }`}
                      >
                        {message.type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>
                      <div
                        className={`p-4 rounded-lg ${
                          message.type === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-white border shadow-sm"
                        }`}
                      >
                        <div className="prose prose-sm max-w-none">
                          {message.content.split("\n").map((line, index) => {
                            if (line.startsWith("**") && line.endsWith("**")) {
                              return (
                                <p key={index} className="font-semibold mb-2">
                                  {line.slice(2, -2)}
                                </p>
                              );
                            }
                            if (line.startsWith("•")) {
                              return (
                                <li key={index} className="ml-4 list-disc">
                                  {line.slice(1).trim()}
                                </li>
                              );
                            }
                            if (line.trim() === "") return <br key={index} />;
                            return <p key={index} className="mb-2">{line}</p>;
                          })}
                        </div>
                        <div className="text-xs opacity-70 mt-2">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-fintech-emerald text-white flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-white border shadow-sm p-4 rounded-lg">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-fintech-emerald rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-fintech-emerald rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-fintech-emerald rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t bg-white p-6">
              <div className="max-w-4xl mx-auto space-y-4">
                {/* Quick Questions */}
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <Button key={index} variant="outline" size="sm" onClick={() => handleQuickQuestion(question)} className="text-xs">
                      {question}
                    </Button>
                  ))}
                </div>

                {/* Message Input */}
                <div className="flex gap-3">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask me anything about taxes, investments, or financial planning..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping} className="btn-hero">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar (Quick Stats & Topics) */}
          {/* ... You can keep your previous sidebar code here unchanged ... */}
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
