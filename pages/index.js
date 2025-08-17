import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { apiClient } from '../lib/api-client';

export default function Analytics() {
  const [groupedStandings, setGroupedStandings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStandings() {
      try {
        const data = await apiClient.getF1Standings();
        console.log("RAW DATA:", data);

        // ✅ group standings by season
        const grouped = data.reduce((acc, standing) => {
          if (!acc[standing.season]) {
            acc[standing.season] = [];
          }
          acc[standing.season].push(standing);
          return acc;
        }, {});

        setGroupedStandings(grouped);
      } catch (error) {
        console.error('Error fetching F1 standings:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStandings();
  }, []);

  return (
    <Layout>
      <div className="text-center mb-6">
        <h1 className="text-4xl font-f1-bold text-amber-600 mb-4">Analytics</h1>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading standings...</p>
      ) : Object.keys(groupedStandings).length > 0 ? (
        <div className="space-y-10 max-w-5xl mx-auto">
          {Object.keys(groupedStandings)
            .sort((a, b) => b - a) // ✅ show latest season first
            .map((season) => (
              <div key={season}>
                <h2 className="text-2xl font-bold mb-4">
                  Driver Standings ({season})
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300 text-sm text-left">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-4 py-2">Pos</th>
                        <th className="border px-4 py-2">Driver</th>
                        <th className="border px-4 py-2">Constructor</th>
                        <th className="border px-4 py-2">Points</th>
                        <th className="border px-4 py-2">Wins</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedStandings[season].map((standing) => (
                        <tr key={standing.id}>
                          <td className="border px-4 py-2">{standing.position}</td>
                          <td className="border px-4 py-2">{standing.driver}</td>
                          <td className="border px-4 py-2">{standing.constructor}</td>
                          <td className="border px-4 py-2">{standing.points}</td>
                          <td className="border px-4 py-2">{standing.wins}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No standings data found.</p>
      )}
    </Layout>
  );
}
