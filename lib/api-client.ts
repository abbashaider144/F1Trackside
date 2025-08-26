import { CORS_PROXY_URL } from "./constants";
import {
F1Status,
F1Ping,
F1RaceResultsResponse,
F1StandingsResponse,
F1RaceResult,
F1Standing
} from "../types/api";




// objects and such
interface User {
uid: string;
email: string;
}




interface Thing {
id: number;
name: string;
description?: string;
createdAt?: string;
updatedAt?: string;
}




// load env variables
const isMockData = process.env.NEXT_PUBLIC_MOCK_DATA === "true";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;




export class ApiError extends Error {
constructor(public status: number, message: string) {
  super(`Error ${status}: ${message}`);
  this.name = "ApiError";
}
}




async function handleResponse<T>(response: Response): Promise<T> {
if (!response.ok) {
  throw new ApiError(response.status, `API Error: ${response.statusText}`);
}
if (response.status === 204) {
  return null as T;
}
return response.json();
}




// Create a wrapper function for fetch that uses the CORS proxy when needed
async function fetchWithFallback(url: string, options: RequestInit = {}) {
try {
  // First try direct fetch
  console.log(`Attempting direct fetch to: ${url}`);
  const response = await fetch(url, options);
   if (!response.ok) {
    throw new Error(`Direct fetch failed with status: ${response.status}`);
  }
   return response;
} catch (error: unknown) {
  console.warn('Direct fetch failed, trying CORS proxy:', error);
   // If direct fetch fails, try with CORS proxy
  const proxyUrl = `${CORS_PROXY_URL}?url=${encodeURIComponent(url)}`;
  console.log(`Attempting proxy fetch to: ${proxyUrl}`);
   // Create a new options object for the proxy request
  // The proxy will handle credentials internally
  const proxyOptions: RequestInit = {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
   try {
    const proxyResponse = await fetch(proxyUrl, proxyOptions);
  
    if (!proxyResponse.ok) {
      throw new Error(`Proxy fetch failed with status: ${proxyResponse.status}`);
    }
  
    return proxyResponse;
  } catch (proxyError: unknown) {
    console.error('Proxy fetch also failed:', proxyError);
    const errorMessage = error instanceof Error ? error.message : String(error);
    const proxyErrorMessage = proxyError instanceof Error ? proxyError.message : String(proxyError);
    throw new Error(`Both direct and proxy fetches failed: ${errorMessage}, ${proxyErrorMessage}`);
  }
}
}




export const apiClient = {
// Get the status of the API
async getStatus(): Promise<F1Status> {
  const response = await fetchWithFallback(`${baseUrl}/status`);
  return handleResponse<F1Status>(response);
},




// Simple ping test
async ping(): Promise<F1Ping> {
  const response = await fetchWithFallback(`${baseUrl}/status/ping`);
  return handleResponse<F1Ping>(response);
},




// Get all F1 race results (returns array of F1RaceResult)
async getF1RaceResults(): Promise<F1RaceResult[]> {
  const response = await fetchWithFallback(`${baseUrl}/api/v1/f1-race-results`);
  return handleResponse<F1RaceResult[]>(response);
},




// Get all F1 standings (returns array of F1Standing)
async getF1Standings(): Promise<F1Standing[]> {
  const response = await fetchWithFallback(`${baseUrl}/api/v1/f1-standings`);
  return handleResponse<F1Standing[]>(response);
},


// AI Analysis Endpoints


// Ask F1 Question
async askF1Question(question: string): Promise<{
  question: string;
  answer: string;
  timestamp: string;
}> {
  const response = await fetchWithFallback(`${baseUrl}/api/v1/ai-analysis/ask-f1`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question })
  });
  return handleResponse(response);
},


// Predict Driver Performance
async predictDriverPerformance(driverName: string): Promise<{
  driverName: string;
  currentStanding: {
    id: number;
    season: number;
    round: number;
    position: number;
    driver: string;
    nationality: string;
    constructor: string;
    points: number;
    wins: number;
  };
  prediction: string;
  predictedStats: string;
  timestamp: string;
}> {
  const response = await fetchWithFallback(`${baseUrl}/api/v1/ai-analysis/predict-driver/${encodeURIComponent(driverName)}`);
  return handleResponse(response);
},


// Compare Drivers
async compareDrivers(driverA: string, driverB: string): Promise<{
  driverA: string;
  driverB: string;
  headToHeadComparison: string;
  consistencyAnalysis: string;
  safetyRiskAnalysis: string;
  driverAData: {
    id: number;
    season: number;
    round: number;
    position: number;
    driver: string;
    nationality: string;
    constructor: string;
    points: number;
    wins: number;
  };
  driverBData: {
    id: number;
    season: number;
    round: number;
    position: number;
    driver: string;
    nationality: string;
    constructor: string;
    points: number;
    wins: number;
  };
  timestamp: string;
}> {
  const response = await fetchWithFallback(`${baseUrl}/api/v1/ai-analysis/compare-drivers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ driverA, driverB })
  });
  return handleResponse(response);
}
}









