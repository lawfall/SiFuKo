
import React, { useState, useRef, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import { PhotoConfig, Gender, PhotoSize, Expression, Lighting, ClothingType, HeadAccessory, HairStyleMale } from './types';
import { generatePassportPhoto } from './services/geminiService';

const INITIAL_CONFIG: PhotoConfig = {
  gender: Gender.MALE,
  size: PhotoSize.SIZE_3X4,
  hasHijab: false,
  hijabColor: '#000000',
  backgroundColor: '#ff0000', // Default red for many ID photos
  clothingType: ClothingType.SUIT,
  customClothingPrompt: '',
  negativePrompt: '',
  suitColor: '#000000',
  tieColor: '#ff0000',
  shirtColor: '#ffffff',
  lighting: Lighting.NATURAL,
  expression: Expression.NEUTRAL,
  showNameTag: false,
  nameTagName: '',
  showPin: false,
  pinReferenceImage: undefined,
  batikPatternImage: undefined,
  faceAccuracy: 90,
  zoomOut: 1,
  headAccessory: HeadAccessory.NONE,
  headAccessoryReferenceImage: undefined,
  hasGlasses: false,
  hairStyle: HairStyleMale.ORIGINAL
};

const App: React.FC = () => {
  const [config, setConfig] = useState<PhotoConfig>(INITIAL_CONFIG);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        setUploadedImage(readerEvent.target?.result as string);
        setResultImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!uploadedImage) {
      setError("Silakan unggah foto terlebih dahulu.");
      return;
    }

    setIsLoading(true);
    setLoadingStep("Mendeteksi wajah & membersihkan objek...");
    setError(null);
    
    // Simulate steps for UI feedback
    const steps = [
      "Mendeteksi wajah & membersihkan objek...",
      "Memperbaiki posisi kepala & bahu...",
      "Menyesuaikan pakaian & latar belakang...",
      "Menyempurnakan pencahayaan studio..."
    ];
    
    let stepIdx = 0;
    const interval = setInterval(() => {
      stepIdx = (stepIdx + 1) % steps.length;
      setLoadingStep(steps[stepIdx]);
    }, 2000);

    try {
      const result = await generatePassportPhoto(uploadedImage, config);
      setResultImage(result);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat memproses gambar.");
    } finally {
      setIsLoading(false);
      clearInterval(interval);
    }
  };

  const handleDownload = () => {
    if (resultImage) {
      const link = document.createElement('a');
      link.href = resultImage;
      link.download = `pas-foto-${config.size.replace(' ', '-')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#0a0a0a]">
      {/* Configuration Sidebar */}
      <Sidebar 
        config={config} 
        setConfig={setConfig} 
        onGenerate={handleGenerate} 
        isLoading={isLoading} 
      />

      {/* Main Preview Area */}
      <main className="flex-1 p-6 lg:p-12 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl flex flex-col gap-8">
          
          <div className="flex flex-col md:flex-row gap-12 items-start justify-center">
            {/* Upload Section */}
            <div className="flex-1 w-full space-y-4">
              <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-widest text-center">Foto Asli</h3>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`relative aspect-[3/4] max-w-[300px] mx-auto rounded-2xl border-2 border-dashed transition-all flex items-center justify-center cursor-pointer group ${
                  uploadedImage ? 'border-neutral-800' : 'border-neutral-700 hover:border-blue-500 bg-neutral-900/40'
                }`}
              >
                {uploadedImage ? (
                  <img src={uploadedImage} alt="Original" className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <div className="flex flex-col items-center gap-3 text-neutral-500 group-hover:text-blue-400 transition-colors">
                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm font-medium">Klik untuk Unggah</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                  <span className="text-white text-xs font-semibold px-3 py-1 bg-white/10 rounded-full backdrop-blur-md">Ubah Foto</span>
                </div>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                className="hidden" 
                accept="image/*" 
              />
            </div>

            {/* Results Section */}
            <div className="flex-1 w-full space-y-4">
              <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-widest text-center">Hasil Pas Foto</h3>
              <div className="relative flex flex-col items-center gap-4">
                <div className="relative aspect-[3/4] w-full max-w-[300px] rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center overflow-hidden shadow-2xl">
                  {resultImage ? (
                    <img src={resultImage} alt="Result" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-8">
                      {isLoading ? (
                        <div className="flex flex-col items-center gap-4">
                          <div className="relative w-16 h-16">
                            <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                          </div>
                          <p className="text-sm text-neutral-400 font-medium animate-pulse">{loadingStep}</p>
                          <p className="text-[10px] text-neutral-600 uppercase tracking-tight">Mohon tunggu, AI sedang memperbaiki kualitas wajah Anda</p>
                        </div>
                      ) : (
                        <div className="text-neutral-700">
                          <svg className="w-16 h-16 mx-auto mb-3 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                          </svg>
                          <p className="text-sm">Klik 'Generate' untuk melihat hasil</p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {resultImage && (
                    <button 
                      onClick={handleDownload}
                      className="absolute bottom-4 right-4 p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95"
                      title="Download Photo"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  )}
                </div>

                {resultImage && !isLoading && (
                  <button 
                    onClick={handleGenerate}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-neutral-700 text-neutral-400 text-xs font-semibold hover:bg-neutral-800 hover:text-white transition-all active:scale-95"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Generate Ulang (Hasil Kurang Pas?)
                  </button>
                )}
              </div>
            </div>
          </div>

          {error && (
            <div className="mx-auto max-w-lg p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {/* Tips Section */}
          <div className="max-w-2xl mx-auto glass-panel rounded-2xl p-6 mt-4">
             <h4 className="text-sm font-semibold mb-4 text-neutral-300">Teknologi AI Studio:</h4>
             <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-neutral-500">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  Otomatis mendeteksi dan meluruskan posisi kepala (Auto-Alignment).
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  Menghapus teks, watermark, dan gangguan latar belakang.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  Rekonstruksi Batik Korpri akurat sesuai standar ASN 2023.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  Penyempurnaan tekstur kulit untuk standar paspor/KTP.
                </li>
             </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
