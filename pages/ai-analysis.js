"use client"
import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { Brain, MessageSquare, Target, Users, Loader2, Send, TrendingUp, BarChart3 } from "lucide-react"
import { apiClient } from "../lib/api-client"


export default function AIAnalysis() {
 const [activeTab, setActiveTab] = useState(0)
 const [loading, setLoading] = useState(false)
 const [error, setError] = useState(null)
  // Ask F1 Question state
 const [question, setQuestion] = useState("")
 const [questionResponse, setQuestionResponse] = useState(null)
  // Predict Driver state
 const [driverName, setDriverName] = useState("")
 const [driverPrediction, setDriverPrediction] = useState(null)
  // Compare Drivers state
 const [driverA, setDriverA] = useState("")
 const [driverB, setDriverB] = useState("")
 const [comparisonResult, setComparisonResult] = useState(null)


 // Sample driver names for dropdowns
 const sampleDrivers = [
   "Max Verstappen", "Lando Norris", "Oscar Piastri", "Charles Leclerc",
   "Carlos Sainz", "Lewis Hamilton", "George Russell", "Fernando Alonso",
   "Lance Stroll", "Sergio Perez", "Daniel Ricciardo", "Yuki Tsunoda"
 ]


 const handleAskQuestion = async () => {
   if (!question.trim()) return
  
   setLoading(true)
   setError(null)
   try {
     const response = await apiClient.askF1Question(question)
     setQuestionResponse(response)
   } catch (error) {
     console.error("Error asking question:", error)
     setError("Failed to get AI response. Please try again.")
   } finally {
     setLoading(false)
   }
 }


 const handlePredictDriver = async () => {
   if (!driverName.trim()) return
  
   setLoading(true)
   setError(null)
   try {
     const response = await apiClient.predictDriverPerformance(driverName)
     setDriverPrediction(response)
   } catch (error) {
     console.error("Error predicting driver:", error)
     setError("Failed to get driver prediction. Please try again.")
   } finally {
     setLoading(false)
   }
 }


 const handleCompareDrivers = async () => {
   if (!driverA.trim() || !driverB.trim()) return
  
   setLoading(true)
   setError(null)
   try {
     const response = await apiClient.compareDrivers(driverA, driverB)
     setComparisonResult(response)
   } catch (error) {
     console.error("Error comparing drivers:", error)
     setError("Failed to compare drivers. Please try again.")
   } finally {
     setLoading(false)
   }
 }


 const tabs = [
   {
     name: "Ask F1 Question",
     icon: MessageSquare,
     description: "Ask general questions about Formula 1 and receive AI-powered answers"
   },
   {
     name: "Predict Driver Performance",
     icon: Target,
     description: "Get AI-powered predictions for a specific driver's future performance"
   },
   {
     name: "Compare Drivers",
     icon: Users,
     description: "Compare two drivers across multiple performance dimensions"
   }
 ]


 return (
   <Layout>
     <div className="max-w-7xl mx-auto p-6 space-y-8">
       <div className="text-center space-y-4">
         <h1 className="text-4xl font-bold text-[#D6A84F]">AI Analysis Dashboard</h1>
         <p className="text-lg text-[#4B4E57]">Advanced machine learning predictions and insights powered by GPT-4</p>
       </div>


       {/* AI Capabilities Overview */}
       <div className="bg-gradient-to-r from-[#C91A1A] to-[#4B4E57] rounded-lg p-6 text-white border border-[#4B4E57] shadow-lg">
         <div className="flex items-center gap-3 mb-4">
           <Brain className="w-8 h-8 text-[#D6A84F]" />
           <h2 className="text-2xl font-bold text-[#D6A84F]">AI Analysis Capabilities</h2>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div className="text-center">
             <MessageSquare className="w-8 h-8 mx-auto mb-2 text-[#D6A84F]" />
             <div className="text-lg font-bold text-white">Ask F1 Questions</div>
             <div className="text-sm opacity-90 text-white">General F1 insights</div>
           </div>
           <div className="text-center">
             <Target className="w-8 h-8 mx-auto mb-2 text-[#D6A84F]" />
             <div className="text-lg font-bold text-white">Driver Predictions</div>
             <div className="text-sm opacity-90 text-white">Performance forecasting</div>
           </div>
           <div className="text-center">
             <Users className="w-8 h-8 mx-auto mb-2 text-[#D6A84F]" />
             <div className="text-lg font-bold text-white">Driver Comparisons</div>
             <div className="text-sm opacity-90 text-white">Head-to-head analysis</div>
           </div>
         </div>
       </div>


       {/* Main Content Tabs */}
       <div className="bg-white border-2 border-gray-200 rounded-lg shadow-lg overflow-hidden">
         {/* Tab Headers */}
         <div className="flex border-b border-gray-200">
           {tabs.map((tab, idx) => {
             const Icon = tab.icon
             return (
               <button
                 key={idx}
                 onClick={() => setActiveTab(idx)}
                 className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-semibold transition ${
                   activeTab === idx
                     ? "bg-gray-800 text-amber-400 border-b-2 border-amber-400"
                     : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                 }`}
               >
                 <Icon className="w-5 h-5" />
                 {tab.name}
               </button>
             )
           })}
         </div>


         {/* Tab Content */}
         <div className="p-6">
           {/* Error Display */}
           {error && (
             <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
               <div className="flex items-center gap-2 text-red-800">
                 <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                 <span className="font-medium">{error}</span>
               </div>
             </div>
           )}
          
           {/* Ask F1 Question Tab */}
           {activeTab === 0 && (
             <div className="space-y-6">
               <div>
                 <h3 className="text-xl font-bold text-gray-800 mb-2">Ask F1 Question</h3>
                 <p className="text-gray-600">{tabs[0].description}</p>
               </div>
              
               <div className="flex gap-3">
                 <input
                   type="text"
                   value={question}
                   onChange={(e) => setQuestion(e.target.value)}
                   placeholder="e.g., Who's most likely to win the 2025 championship?"
                   className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                   onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion()}
                 />
                 <button
                   onClick={handleAskQuestion}
                   disabled={loading || !question.trim()}
                   className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                 >
                   {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                   Ask
                 </button>
               </div>


                                {loading && (
                  <div className="flex items-center justify-center p-8">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>AI is analyzing your question...</span>
                    </div>
                  </div>
                )}
               
                {questionResponse && (
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="mb-3">
                      <h4 className="font-semibold text-gray-800">Question:</h4>
                      <p className="text-gray-600">{questionResponse.question}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Answer:</h4>
                      <p className="text-gray-600">{questionResponse.answer}</p>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Generated at: {new Date(questionResponse.timestamp).toLocaleString()}
                    </div>
                  </div>
                )}
             </div>
           )}


           {/* Predict Driver Performance Tab */}
           {activeTab === 1 && (
             <div className="space-y-6">
               <div>
                 <h3 className="text-xl font-bold text-gray-800 mb-2">Predict Driver Performance</h3>
                 <p className="text-gray-600">{tabs[1].description}</p>
               </div>
              
               <div className="flex gap-3">
                 <select
                   value={driverName}
                   onChange={(e) => setDriverName(e.target.value)}
                   className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                 >
                   <option value="">Select a driver...</option>
                   {sampleDrivers.map((driver) => (
                     <option key={driver} value={driver}>{driver}</option>
                   ))}
                 </select>
                 <button
                   onClick={handlePredictDriver}
                   disabled={loading || !driverName}
                   className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                 >
                   {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Target className="w-4 h-4" />}
                   Predict
                 </button>
               </div>


                                {loading && (
                  <div className="flex items-center justify-center p-8">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>AI is analyzing driver performance...</span>
                    </div>
                  </div>
                )}
               
                {driverPrediction && (
                  <div className="space-y-4">
                    {/* Current Standing */}
                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-4 text-white">
                      <h4 className="font-semibold mb-2">Current Standing</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-amber-400">Position</div>
                          <div className="font-bold">{driverPrediction.currentStanding.position}</div>
                        </div>
                        <div>
                          <div className="text-amber-400">Points</div>
                          <div className="font-bold">{driverPrediction.currentStanding.points}</div>
                        </div>
                        <div>
                          <div className="text-amber-400">Wins</div>
                          <div className="font-bold">{driverPrediction.currentStanding.wins}</div>
                        </div>
                        <div>
                          <div className="text-amber-400">Constructor</div>
                          <div className="font-bold">{driverPrediction.currentStanding.constructor}</div>
                        </div>
                      </div>
                    </div>


                    {/* Prediction */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">AI Prediction</h4>
                      <p className="text-gray-600 mb-3">{driverPrediction.prediction}</p>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <h5 className="font-semibold text-blue-800 mb-1">Predicted Statistics</h5>
                        <p className="text-blue-700 text-sm">{driverPrediction.predictedStats}</p>
                      </div>
                    </div>
                  </div>
                )}
             </div>
           )}


           {/* Compare Drivers Tab */}
           {activeTab === 2 && (
             <div className="space-y-6">
               <div>
                 <h3 className="text-xl font-bold text-gray-800 mb-2">Compare Drivers</h3>
                 <p className="text-gray-600">{tabs[2].description}</p>
               </div>
              
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Driver A</label>
                    <select
                      value={driverA}
                      onChange={(e) => setDriverA(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="">Select first driver...</option>
                      {sampleDrivers.map((driver) => (
                        <option key={driver} value={driver} disabled={driver === driverB}>{driver}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Driver B</label>
                    <select
                      value={driverB}
                      onChange={(e) => setDriverB(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="">Select second driver...</option>
                      {sampleDrivers.map((driver) => (
                        <option key={driver} value={driver} disabled={driver === driverA}>{driver}</option>
                      ))}
                    </select>
                  </div>
                </div>


                                <div className="flex justify-center">
                  <button
                    onClick={handleCompareDrivers}
                    disabled={loading || !driverA || !driverB || driverA === driverB}
                    className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Users className="w-4 h-4" />}
                    Compare
                  </button>
                </div>


                                {loading && (
                  <div className="flex items-center justify-center p-8">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>AI is comparing drivers...</span>
                    </div>
                  </div>
                )}
               
                {comparisonResult && (
                  <div className="space-y-4">
                                          {/* Driver Stats Comparison */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="bg-gradient-to-r from-[#2B2D33] to-[#000000] rounded-lg p-4 text-white border border-[#4B4E57]">
                         <h4 className="font-semibold mb-2 text-[#D6A84F]">{comparisonResult.driverA}</h4>
                         <div className="space-y-1 text-sm">
                           <div>Position: <span className="font-bold">{comparisonResult.driverAData.position}</span></div>
                           <div>Points: <span className="font-bold">{comparisonResult.driverAData.points}</span></div>
                           <div>Wins: <span className="font-bold">{comparisonResult.driverAData.wins}</span></div>
                           <div>Team: <span className="font-bold">{comparisonResult.driverAData.constructor}</span></div>
                         </div>
                       </div>
                       <div className="bg-gradient-to-r from-[#C91A1A] to-[#8B0000] rounded-lg p-4 text-white border border-[#4B4E57]">
                         <h4 className="font-semibold mb-2 text-[#D6A84F]">{comparisonResult.driverB}</h4>
                         <div className="space-y-1 text-sm">
                           <div>Position: <span className="font-bold">{comparisonResult.driverBData.position}</span></div>
                           <div>Points: <span className="font-bold">{comparisonResult.driverBData.points}</span></div>
                           <div>Wins: <span className="font-bold">{comparisonResult.driverBData.wins}</span></div>
                           <div>Team: <span className="font-bold">{comparisonResult.driverBData.constructor}</span></div>
                         </div>
                       </div>
                     </div>


                    {/* Analysis Results */}
                    <div className="space-y-3">
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          Head-to-Head Comparison
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {comparisonResult.headToHeadComparison.split('Advantage:').map((part, index) => {
                            if (index === 0) return part;
                            const [driverName, ...rest] = part.split('.');
                            return (
                              <span key={index}>
                                <span className="font-semibold text-green-700">Advantage: {driverName.trim()}</span>
                                {rest.length > 0 && `.${rest.join('.')}`}
                              </span>
                            );
                          })}
                        </p>
                      </div>
                     
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-blue-600" />
                          Consistency Analysis
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {comparisonResult.consistencyAnalysis.split('Advantage:').map((part, index) => {
                            if (index === 0) return part;
                            const [driverName, ...rest] = part.split('.');
                            return (
                              <span key={index}>
                                <span className="font-semibold text-blue-700">Advantage: {driverName.trim()}</span>
                                {rest.length > 0 && `.${rest.join('.')}`}
                              </span>
                            );
                          })}
                        </p>
                      </div>
                     
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                          <Target className="w-4 h-4 text-red-600" />
                          Safety/Risk Analysis
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {comparisonResult.safetyRiskAnalysis.split('Advantage:').map((part, index) => {
                            if (index === 0) return part;
                            const [driverName, ...rest] = part.split('.');
                            return (
                              <span key={index}>
                                <span className="font-semibold text-red-700">Advantage: {driverName.trim()}</span>
                                {rest.length > 0 && `.${rest.join('.')}`}
                              </span>
                            );
                          })}
                        </p>
                      </div>
                     
                      {/* Overall Score */}
                      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-4 text-white">
                        <h4 className="font-semibold mb-3 text-center">Overall Comparison Score</h4>
                       
                        {/* Category Breakdown */}
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between items-center text-sm">
                            <span>Head-to-Head:</span>
                            <span className={`font-semibold ${comparisonResult.headToHeadComparison.includes(`Advantage: ${comparisonResult.driverA}`) ? 'text-blue-400' : 'text-red-400'}`}>
                              {comparisonResult.headToHeadComparison.includes(`Advantage: ${comparisonResult.driverA}`) ? comparisonResult.driverA : comparisonResult.driverB}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span>Consistency:</span>
                            <span className={`font-semibold ${comparisonResult.consistencyAnalysis.includes(`Advantage: ${comparisonResult.driverA}`) ? 'text-blue-400' : 'text-red-400'}`}>
                              {comparisonResult.consistencyAnalysis.includes(`Advantage: ${comparisonResult.driverA}`) ? comparisonResult.driverA : comparisonResult.driverB}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span>Safety/Risk:</span>
                            <span className={`font-semibold ${comparisonResult.safetyRiskAnalysis.includes(`Advantage: ${comparisonResult.driverA}`) ? 'text-blue-400' : 'text-red-400'}`}>
                              {comparisonResult.safetyRiskAnalysis.includes(`Advantage: ${comparisonResult.driverA}`) ? comparisonResult.driverA : comparisonResult.driverB}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span>Points:</span>
                            <span className={`font-semibold ${comparisonResult.driverAData.points > comparisonResult.driverBData.points ? 'text-blue-400' : 'text-red-400'}`}>
                              {comparisonResult.driverAData.points > comparisonResult.driverBData.points ? comparisonResult.driverA : comparisonResult.driverB}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span>Wins:</span>
                            <span className={`font-semibold ${comparisonResult.driverAData.wins > comparisonResult.driverBData.wins ? 'text-blue-400' : 'text-red-400'}`}>
                              {comparisonResult.driverAData.wins > comparisonResult.driverBData.wins ? comparisonResult.driverA : comparisonResult.driverB}
                            </span>
                          </div>
                        </div>
                       
                        {/* Final Score */}
                        <div className="border-t border-gray-600 pt-4">
                          <div className="text-center mb-4">
                            <h5 className="text-lg font-semibold text-gray-300">FINAL SCORE</h5>
                          </div>
                          <div className="grid grid-cols-2 gap-6 text-center">
                            <div className="bg-gray-700 rounded-lg p-4">
                              <div className="text-xl font-bold text-blue-400 mb-2">{comparisonResult.driverA}</div>
                              <div className="text-4xl font-bold text-white">
                                {(() => {
                                  let score = 0;
                                  if (comparisonResult.headToHeadComparison.includes(`Advantage: ${comparisonResult.driverA}`)) score++;
                                  if (comparisonResult.consistencyAnalysis.includes(`Advantage: ${comparisonResult.driverA}`)) score++;
                                  if (comparisonResult.safetyRiskAnalysis.includes(`Advantage: ${comparisonResult.driverA}`)) score++;
                                  if (comparisonResult.driverAData.points > comparisonResult.driverBData.points) score++;
                                  if (comparisonResult.driverAData.wins > comparisonResult.driverBData.wins) score++;
                                  return score;
                                })()}
                              </div>
                            </div>
                            <div className="bg-gray-700 rounded-lg p-4">
                              <div className="text-xl font-bold text-red-400 mb-2">{comparisonResult.driverB}</div>
                              <div className="text-4xl font-bold text-white">
                                {(() => {
                                  let score = 0;
                                  if (comparisonResult.headToHeadComparison.includes(`Advantage: ${comparisonResult.driverB}`)) score++;
                                  if (comparisonResult.consistencyAnalysis.includes(`Advantage: ${comparisonResult.driverB}`)) score++;
                                  if (comparisonResult.safetyRiskAnalysis.includes(`Advantage: ${comparisonResult.driverB}`)) score++;
                                  if (comparisonResult.driverBData.points > comparisonResult.driverAData.points) score++;
                                  if (comparisonResult.driverBData.wins > comparisonResult.driverAData.wins) score++;
                                  return score;
                                })()}
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 text-center">
                            <div className="text-xl font-bold text-amber-400 bg-gray-700 rounded-lg py-2 px-4 inline-block">
                              🏆 WINNER: {(() => {
                                let scoreA = 0;
                                let scoreB = 0;
                                if (comparisonResult.headToHeadComparison.includes(`Advantage: ${comparisonResult.driverA}`)) scoreA++;
                                if (comparisonResult.consistencyAnalysis.includes(`Advantage: ${comparisonResult.driverA}`)) scoreA++;
                                if (comparisonResult.safetyRiskAnalysis.includes(`Advantage: ${comparisonResult.driverA}`)) scoreA++;
                                if (comparisonResult.driverAData.points > comparisonResult.driverBData.points) scoreA++;
                                if (comparisonResult.driverAData.wins > comparisonResult.driverBData.wins) scoreA++;
                               
                                if (comparisonResult.headToHeadComparison.includes(`Advantage: ${comparisonResult.driverB}`)) scoreB++;
                                if (comparisonResult.consistencyAnalysis.includes(`Advantage: ${comparisonResult.driverB}`)) scoreB++;
                                if (comparisonResult.safetyRiskAnalysis.includes(`Advantage: ${comparisonResult.driverB}`)) scoreB++;
                                if (comparisonResult.driverBData.points > comparisonResult.driverAData.points) scoreB++;
                                if (comparisonResult.driverBData.wins > comparisonResult.driverAData.wins) scoreB++;
                               
                                return scoreA > scoreB ? comparisonResult.driverA : comparisonResult.driverB;
                              })()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
             </div>
           )}
         </div>
       </div>




     </div>
   </Layout>
 )
}



