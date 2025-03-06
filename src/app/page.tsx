'use client';

import { useState, useRef } from 'react';

export default function Home() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileProcessing, setFileProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setExtractedText('');
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setFileProcessing(true);
    setError('');

    try {
      // Upload the file directly
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      const data = await res.json();

      if (data.success) {
        setExtractedText(data.extractedText);
      } else {
        setError(data.error || 'Failed to process file');
      }
    } catch (err) {
      setError('Failed to upload file');
      console.error(err);
    } finally {
      setFileProcessing(false);
    }
  };

  const handleTestOpenAI = async () => {
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          extractedText: extractedText || undefined,
        }),
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

  const resetForm = () => {
    setFile(null);
    setExtractedText('');
    setResponse('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-2">Ecodify</h1>
      <p className="text-gray-600 mb-8">Climate Literacy Platform</p>
      
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 mb-6">
        <h2 className="text-xl font-semibold mb-4">Upload Curriculum File</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select PDF or DOCX file
          </label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.docx,.doc"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={handleFileUpload}
            disabled={!file || fileProcessing}
            className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed flex-1"
          >
            {fileProcessing ? 'Processing...' : 'Process File'}
          </button>
          
          <button
            onClick={resetForm}
            className="py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
        
        {extractedText && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md dark:bg-gray-700">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Text extracted successfully!
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {file?.name} ({Math.round((file?.size || 0) / 1024)} KB)
            </p>
          </div>
        )}
      </div>
      
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <button
          onClick={handleTestOpenAI}
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed mb-4"
        >
          {loading ? 'Loading...' : extractedText ? 'Analyze with AI' : 'Test OpenAI API'}
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
        This is a prototype for the Ecodify climate literacy platform.
      </p>
    </div>
  );
}
