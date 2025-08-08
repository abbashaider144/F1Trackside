
import Layout from '../components/Layout';
import { apiClient } from '../lib/api-client';
import { F1_COLORS } from '../constants/constants';

export default function Analytics() {
  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-4xl font-f1-bold text-amber-600 mb-4">Analytics</h1>
      </div>
    </Layout>
  );
}