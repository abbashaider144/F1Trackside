
import Layout from '../components/Layout';
import { apiClient } from '../lib/api-client';
import Dexter from '../assets/dexter.jpg';
import constants from '../constants/constants';

export default function AIAnalysis() {
  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-4xl font-f1-bold text-amber-600 mb-4">AI Analysis</h1>
      </div>
    </Layout>
  );
} 