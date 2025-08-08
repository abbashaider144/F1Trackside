import { useState, useEffect } from 'react';
import { apiClient } from '../lib/api-client';

export default function StatusDisplay() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const data = await apiClient.getStatus();
        setStatus(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Server Status</h1>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Timestamp:</span>
            <span className="text-gray-800">{status?.timestamp}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Environment:</span>
            <span className="text-gray-800">{status?.environment}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Server Time:</span>
            <span className="text-gray-800">{status?.serverTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">API Version:</span>
            <span className="text-gray-800">{status?.apiVersion}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 