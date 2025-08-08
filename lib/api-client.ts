import { CORS_PROXY_URL } from "./constants";


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
 async getStatus(): Promise<any> {
   const response = await fetchWithFallback(`${baseUrl}/status`);
   return handleResponse(response);
 },


 // Check if a user exists by UID
 async getUser(uid: string): Promise<User | null> {
   const response = await fetchWithFallback(`${baseUrl}/api/v1/users/${uid}`);


   if (!response.ok) {
     return null; // Return null if the user is not found or an error occurs
   }


   return handleResponse<User>(response);
 },


 // Get all things
 
 
}

