import React, { useState } from 'react';
import { RadarComponent } from './components/RadarComponent';

export default function App() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{ role: string; radarData: { subject: string; A: number }[] } | null>(null);

  const calculateRole = (scores: Record<string, number>) =>
    Object.entries(scores).map(([subject, A]) => ({ subject, A }));

  const onStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (username) setStep(2);
  };

  const onUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      // Real calculation placeholder
      const fakeScores = { Sepuh: 4, Pemula: 2, Rasis: 3 };
      const radarData = calculateRole(fakeScores);
      setResult({ role: 'Sepuh', radarData });
      setStep(3);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden">
        {step === 1 && (
          <div className="p-8">
            <h1 className="text-2xl font-bold text-center text-purple-700 mb-6">Apa Role Kamu?</h1>
            <form onSubmit={onStart} className="space-y-4">
              <input
                type="text"
                placeholder="Masukkan nama"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-300"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button
                type="submit"
                className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Mulai
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="p-8">
            <h2 className="text-xl font-semibold text-center mb-4 text-gray-700">Upload Foto Kamu</h2>
            <form onSubmit={onUpload} className="space-y-4">
              <input
                type="file"
                accept="image/*"
                className="w-full"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <button
                type="submit"
                className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Hitung Role
              </button>
            </form>
          </div>
        )}

        {step === 3 && result && (
          <div className="p-6 text-center">
            <h1 className="text-2xl font-bold text-purple-700 mb-2">Halo, {username}!</h1>
            <p className="text-lg mb-4">
              Role-mu adalah <span className="text-purple-600">{result.role}</span>
            </p>
            <div className="w-full h-64 p-4">
              <RadarComponent data={result.radarData} />
            </div>
            <button
              onClick={() => {
                setStep(1);
                setFile(null);
                setResult(null);
              }}
              className="mt-4 w-full py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Coba Lagi
            </button>
          </div>
        )}
      </div>
    </main>
  );
}