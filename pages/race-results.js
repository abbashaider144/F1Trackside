"use client"
import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { apiClient } from "../lib/api-client"
import { Tab } from "@headlessui/react"
import { Calendar, Trophy, Clock, MapPin, Flag } from "lucide-react"
import { SEASON_THEMES, AVAILABLE_SEASONS } from "../constants/constants"


export default function RaceResults() {
 const [raceData, setRaceData] = useState({})
 const [loading, setLoading] = useState(true)


 const seasonColors = {
   "2025": "#C91A1A", // Ferrari Red
   "2024": "#D6A84F", // Warm Gold
   "2023": "#4B4E57", // Gunmetal Gray
 }


 useEffect(() => {
   async function fetchData() {
     try {
       setLoading(true)
       const data = await apiClient.getF1RaceResults()
       console.log("data", data)
      
       // Group data by season - exactly like standings page
       const grouped = data.reduce((acc, result) => {
         if (!acc[result.season]) acc[result.season] = []
         acc[result.season].push(result)
         return acc
       }, {})
       setRaceData(grouped)
     } catch (err) {
       console.error("Failed to fetch race data:", err)
     } finally {
       setLoading(false)
     }
   }
   fetchData()
 }, [])


 const seasons = ["2025", "2024", "2023"] // only the years you have


 if (loading) return <p className="text-center text-gray-500 mt-10">Loading race results...</p>


 return (
   <Layout>
     <div className="max-w-6xl mx-auto p-6">
       <h1 className="text-4xl font-bold text-[#C91A1A] mb-6 text-center">F1 Race Results</h1>


       <Tab.Group defaultIndex={0}>
         <Tab.List className="flex space-x-2 justify-center mb-4">
           {seasons.map((season) => (
             <Tab
               key={season}
               className={({ selected }) =>
                 `px-4 py-2 font-semibold rounded-xl transition ${
                   selected
                     ? "bg-black text-red-500 shadow-xl border-4 border-amber-400 transform scale-110"
                     : "bg-black text-amber-400 hover:bg-gray-800 border-2 border-gray-600"
                 }`
               }
             >
               {season}
             </Tab>
           ))}
         </Tab.List>


         <Tab.Panels>
           {seasons.map((season) => (
             <Tab.Panel key={season} className="bg-[#000000] p-4 rounded-xl shadow-lg text-white">
               <div className="overflow-x-auto">
                 <table className="min-w-full border border-[#4B4E57] text-left">
                   <thead style={{ backgroundColor: seasonColors[season] }}>
                     <tr>
                       <th className="px-4 py-2 border">Round</th>
                       <th className="px-4 py-2 border">Circuit</th>
                       <th className="px-4 py-2 border">Driver</th>
                       <th className="px-4 py-2 border">Result</th>
                       <th className="px-4 py-2 border">Grid</th>
                       <th className="px-4 py-2 border">Fastest Lap</th>
                     </tr>
                   </thead>
                   <tbody>
                     {raceData[season]?.map((r) => (
                       <tr key={r.id} className="hover:bg-[#2B2D33]">
                         <td className="border px-4 py-2">{r.round}</td>
                         <td className="border px-4 py-2">{r.circuit_Name}</td>
                         <td className="border px-4 py-2">{r.driver_Name}</td>
                         <td className="border px-4 py-2">{r.result}</td>
                         <td className="border px-4 py-2">{r.grid}</td>
                         <td className="border px-4 py-2">{r.fastest_Lap_Time}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </Tab.Panel>
           ))}
         </Tab.Panels>
       </Tab.Group>
     </div>
   </Layout>
 )
}



