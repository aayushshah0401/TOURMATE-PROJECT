import React, { useState } from 'react';
import { QrCode, Sparkles, Volume2, Landmark, CheckCircle2, X, RefreshCw, Smartphone } from 'lucide-react';
import { fetchQRInfo } from '../../services/api';

export const KioskQRScanner: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selectedQR, setSelectedQR] = useState<string | null>(null);
  const [qrData, setQrData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const sampleQRTags = [
    { code: 'QR-SABARMATI-001', name: 'Sabarmati Ashram (Gandhinagar Rd)' },
    { code: 'QR-SOU-004', name: 'Statue of Unity (182m Monument)' },
    { code: 'QR-ADALAJ-002', name: 'Adalaj Stepwell (5-Story Vav)' },
    { code: 'QR-LAXMI-005', name: 'Laxmi Vilas Palace Vadodara' }
  ];

  const handleScanSample = async (code: string, name: string) => {
    setSelectedQR(code);
    setLoading(true);
    try {
      const data = await fetchQRInfo(code, name);
      setQrData(data);
    } catch (err) {
      /* ignore */
    } finally {
      setLoading(false);
    }
  };

  const speakAudioGuide = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (isSpeaking) {
        setIsSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative space-y-6">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 bg-slate-800 hover:bg-slate-700 text-slate-300 p-2 rounded-xl transition"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="bg-amber-500 text-slate-950 p-3 rounded-2xl">
            <QrCode className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Smart Kiosk QR Scanner</h2>
            <p className="text-xs text-slate-400">Scan any monument tag or touch a sample QR code below</p>
          </div>
        </div>

        {/* Sample QR Tags Selection */}
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Tap Sample Monument Tag:</p>
          <div className="grid grid-cols-2 gap-3">
            {sampleQRTags.map((tag) => (
              <button
                key={tag.code}
                onClick={() => handleScanSample(tag.code, tag.name)}
                className={`p-3 rounded-2xl text-left border text-xs font-bold transition flex items-center gap-2 ${
                  selectedQR === tag.code
                    ? 'bg-amber-500 text-slate-950 border-amber-400'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                }`}
              >
                <Landmark className="w-4 h-4 flex-shrink-0" />
                <span className="line-clamp-1">{tag.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Container */}
        {loading ? (
          <div className="text-center py-12 space-y-3">
            <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
            <p className="text-xs font-bold text-slate-400">AI Kiosk Engine Explaining Monument...</p>
          </div>
        ) : qrData ? (
          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-amber-400">{qrData.title}</h3>
              <button
                onClick={() => speakAudioGuide(qrData.audioGuideTranscript || qrData.historySummary)}
                className="flex items-center gap-1.5 bg-amber-500 text-slate-950 px-3 py-1.5 rounded-xl font-bold hover:bg-amber-400 transition"
              >
                <Volume2 className="w-4 h-4" />
                <span>{isSpeaking ? 'Pause Audio' : 'Listen Audio Guide'}</span>
              </button>
            </div>

            <p className="text-slate-300 leading-relaxed font-normal">{qrData.historySummary}</p>

            {qrData.architecturalHighlights && (
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Architectural Highlights:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {qrData.architecturalHighlights.map((h: string, i: number) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-slate-400">
              <span className="font-semibold">{qrData.ticketAndTimings}</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Smartphone className="w-4 h-4" /> Sync to Phone
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500 text-xs">
            Point kiosk camera or tap any monument tag above to trigger AI audio guide.
          </div>
        )}
      </div>
    </div>
  );
};
