import '../styles/globals.css';
import { UserProvider } from '../lib/UserContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    // Handle unhandled promise rejections (like failed API calls)
    const handleUnhandledRejection = (event) => {
      // Check if it's a network error or similar recoverable error
      if (event.reason?.message?.includes('Network') || 
          event.reason?.message?.includes('Failed to fetch') ||
          event.reason?.message?.includes('timeout') ||
          event.reason?.message?.includes('ECONNREFUSED') ||
          event.reason?.message?.includes('ECONNRESET') ||
          event.reason?.message?.includes('socket hang up')) {
        console.log('Recoverable error detected, refreshing page...');
        setErrorCount(prev => prev + 1);
        if (errorCount < 3) { // Only refresh up to 3 times
          router.reload();
        } else {
          console.log('Too many errors, not refreshing again');
        }
      }
    };

    // Handle runtime errors
    const handleError = (event) => {
      // Check if it's a recoverable error
      if (event.error?.message?.includes('Network') || 
          event.error?.message?.includes('Failed to fetch') ||
          event.error?.message?.includes('timeout') ||
          event.error?.message?.includes('ECONNREFUSED') ||
          event.error?.message?.includes('ECONNRESET') ||
          event.error?.message?.includes('socket hang up') ||
          event.error?.message?.includes('TypeError') ||
          event.error?.message?.includes('ReferenceError')) {
        console.log('Recoverable error detected, refreshing page...');
        setErrorCount(prev => prev + 1);
        if (errorCount < 3) { // Only refresh up to 3 times
          router.reload();
        } else {
          console.log('Too many errors, not refreshing again');
        }
      }
    };

    // Handle component errors
    const handleComponentError = (error, errorInfo) => {
      console.log('Component error detected:', error);
      setErrorCount(prev => prev + 1);
      if (errorCount < 3) {
        router.reload();
      } else {
        console.log('Too many errors, not refreshing again');
      }
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);
    window.addEventListener('componentError', handleComponentError);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
      window.removeEventListener('componentError', handleComponentError);
    };
  }, [router, errorCount]);

  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
