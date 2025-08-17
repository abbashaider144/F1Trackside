"use client"
import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { apiClient } from "../lib/api-client"
import { Tab } from "@headlessui/react"
import { Calendar, Cpu, Zap } from "lucide-react"

// Custom color theme for AI page per season
const seasonThemes = {
  "2025": {
    primary: "bg-gray-800 text-white",
    accent: "text-white",
    badge: "bg-gray-700 text-white",
    icon: "text-white",
  },
  "2024": {
    primary: "bg-gray-600 text-red-600",
    accent: "text-red-600",
    badge: "bg-gray-500 text-red-400",
    icon: "text-red-600",
  },
  "2023": {
    primary: "bg-black text-amber-400",
    accent: "text-amber-400",
    badge: "bg-gray-700 text-amber-400",
    icon: "text-amber-400",
  },
}

// Mock data structure (fallback if API fails)
const mockRaceResults = {
  "2025": { MRData: { RaceTable: { season: "2025", Races: [{ raceName: "Monaco GP", winner: "Max Verstappen", constructor: "Red Bull Racing", laps: "78", time: "1:31:12" }] } } },
  "2024": { MRData: { RaceTable: { season: "2024", Races: [{ raceName: "Silverstone GP", winner: "Lando Norris", constructor: "McLaren", laps: "52", time: "1:28:45" }] } } },
  "2023": { MRData: { RaceTable: { season: "2023", Races: [{ raceName: "Spa GP", winner: "Charles Leclerc", constructor: "Ferrari", laps: "44", time: "1:34:55" }] } } },
}

export default function AIAnalysis() {
  const [raceData, setRaceData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedSeason, setSelectedSeason] = useState("2025")
  const [usingMockData, setUsingMockData] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)
        const data = await apiClient.getF1RaceResults()
        if (data?.MRData?.RaceTable?.Races) {
          setRaceData(data)
          setSelectedSeason(data.MRData.RaceTable.season)
          setUsingMockData(false)
        } else {
          throw new Error("Invalid API data")
        }
      } catch (err) {
        console.warn("API failed, using mock data:", err)
        setRaceData(mockRaceResults[selectedSeason])
        setUsingMockData(true)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const races = raceData?.MRData?.RaceTable?.Races || []

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading AI Race Analysis...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-amber-600">AI Analysis Dashboard</h1>
          {usingMockData && (
            <span className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 font-semibold text-sm">
              Demo Data
            </span>
          )}
        </div>

        {/* Season Tabs */}
        <Tab.Group defaultIndex={2}>
          <Tab.List className="flex justify-center gap-2 mb-4">
            {["2023", "2024", "2025"].map((year) => (
              <Tab
                key={year}
                className={({ selected }) =>
                  `px-4 py-2 rounded-lg font-bold transition ${
                    selected
                      ? "bg-gray-800 text-amber-400"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`
                }
                onClick={() => setSelectedSeason(year)}
              >
                {year}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels>
            {["2023", "2024", "2025"].map((year) => {
              const theme = seasonThemes[year]
              const seasonRaces = mockRaceResults[year]?.MRData?.RaceTable?.Races || []

              return (
                <Tab.Panel key={year} className="space-y-4">
                  <div className={`${theme.primary} border-2 rounded-lg shadow-lg p-6`}>
                    <div className="mb-4">
                      <h2 className={`text-2xl flex items-center gap-2 font-bold ${theme.accent}`}>
                        <Cpu className={`w-6 h-6 ${theme.icon}`} />
                        AI Predictions & Race Analysis {year}
                      </h2>
                      <p className="text-sm text-gray-300">Latest AI insights on winners, laps, and constructors</p>
                    </div>
                    <div className="grid gap-4">
                      {seasonRaces.map((race, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-lg border-2 bg-white hover:shadow-lg transition flex justify-between items-center"
                        >
                          <div>
                            <h3 className="font-bold text-lg">{race.raceName}</h3>
                            <p className="text-sm text-gray-600">
                              Winner: <span className="font-semibold">{race.winner}</span> ({race.constructor})
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{race.laps} laps</p>
                            <p className="text-sm text-gray-600">{race.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Tab.Panel>
              )
            })}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </Layout>
  )
}
