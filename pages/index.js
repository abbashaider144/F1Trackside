"use client"

import { useEffect, useState } from "react"
import { Tab } from "@headlessui/react"
import Layout from "../components/Layout"
import { apiClient } from "../lib/api-client"

export default function Analytics() {
  const [standings, setStandings] = useState({})
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
        const data = await apiClient.getF1Standings() // or use your mock data
        // convert into { season: [standings] }
        const grouped = data.reduce((acc, standing) => {
          if (!acc[standing.season]) acc[standing.season] = []
          acc[standing.season].push(standing)
          return acc
        }, {})
        setStandings(grouped)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const seasons = ["2025", "2024", "2023"] // only the years you have

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading standings...</p>

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-[#C91A1A] mb-6 text-center">F1 Analytics Dashboard</h1>

        <Tab.Group defaultIndex={0}>
          <Tab.List className="flex space-x-2 justify-center mb-4">
            {seasons.map((season) => (
              <Tab
                key={season}
                className={({ selected }) =>
                  `px-4 py-2 font-semibold rounded-xl transition ${
                    selected
                      ? `bg-[${seasonColors[season]}] text-white shadow-lg`
                      : "bg-[#2B2D33] text-white hover:bg-[#4B4E57]"
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
                        <th className="px-4 py-2 border">Pos</th>
                        <th className="px-4 py-2 border">Driver</th>
                        <th className="px-4 py-2 border">Constructor</th>
                        <th className="px-4 py-2 border">Points</th>
                        <th className="px-4 py-2 border">Wins</th>
                      </tr>
                    </thead>
                    <tbody>
                      {standings[season]?.map((s) => (
                        <tr key={s.id} className="hover:bg-[#2B2D33]">
                          <td className="border px-4 py-2">{s.position}</td>
                          <td className="border px-4 py-2">{s.driver}</td>
                          <td className="border px-4 py-2">{s.constructor}</td>
                          <td className="border px-4 py-2">{s.points}</td>
                          <td className="border px-4 py-2">{s.wins}</td>
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
