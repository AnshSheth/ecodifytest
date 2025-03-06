'use client';

import { useState } from 'react';

export default function Home() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTestOpenAI = async () => {
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await res.json();
      
      if (data.success) {
        setResponse(data.message);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to connect to the API');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">OpenAI API Test</h1>
      
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <button
          onClick={handleTestOpenAI}
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed mb-4"
        >
          {loading ? 'Loading...' : 'Test OpenAI API'}
        </button>
        
        {error && (
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-300">
            {error}
          </div>
        )}
        
        <div className="mt-4">
          <label htmlFor="response" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            OpenAI Response:
          </label>
          <textarea
            id="response"
            readOnly
            value={response}
            className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            rows={4}
            placeholder="Response will appear here..."
          />
        </div>
      </div>
      
      <p className="mt-8 text-sm text-gray-500">
        This is a simple test of the OpenAI API through Vercel.
      </p>
    </div>
  );
}
