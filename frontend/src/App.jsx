import { useEffect, useState } from 'react';
import axios from 'axios';
import { ShoppingBag, CheckCircle, XCircle, Loader } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

function App() {
  const [backendStatus, setBackendStatus] = useState('checking');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/api/health`)
      .then(res => {
        if (res.data.status === 'ok') {
          setBackendStatus('connected');
        } else {
          setBackendStatus('error');
          setErrorMessage('Unexpected response from backend');
        }
      })
      .catch(err => {
        setBackendStatus('error');
        setErrorMessage(err.message);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-600 p-4 rounded-2xl">
            <ShoppingBag className="w-12 h-12 text-white" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-slate-800 mb-2">SnapMart</h1>
        <p className="text-slate-500 mb-8">E-commerce platform</p>

        <div className="bg-slate-50 rounded-xl p-6">
          <p className="text-sm text-slate-500 mb-3 uppercase tracking-wide font-semibold">
            Backend Connection
          </p>

          {backendStatus === 'checking' && (
            <div className="flex items-center justify-center gap-2 text-slate-600">
              <Loader className="w-5 h-5 animate-spin" />
              <span>Connecting to server...</span>
            </div>
          )}

          {backendStatus === 'connected' && (
            <div className="flex items-center justify-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">Connected</span>
            </div>
          )}

          {backendStatus === 'error' && (
            <div className="text-red-600">
              <div className="flex items-center justify-center gap-2 mb-2">
                <XCircle className="w-5 h-5" />
                <span className="font-semibold">Connection failed</span>
              </div>
              <p className="text-xs text-red-500">{errorMessage}</p>
            </div>
          )}
        </div>

        <p className="text-xs text-slate-400 mt-6">
          API: {API_URL}
        </p>
      </div>
    </div>
  );
}

export default App;