
import React, { useRef } from 'react';
import { Gender, PhotoSize, Expression, Lighting, PhotoConfig, ClothingType, HeadAccessory, HairStyleMale, HairStyleFemale } from '../types';

interface SidebarProps {
  config: PhotoConfig;
  setConfig: React.Dispatch<React.SetStateAction<PhotoConfig>>;
  onGenerate: () => void;
  isLoading: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ config, setConfig, onGenerate, isLoading }) => {
  const clothingInputRef = useRef<HTMLInputElement>(null);
  const batikInputRef = useRef<HTMLInputElement>(null);
  const pinInputRef = useRef<HTMLInputElement>(null);
  const headAccessoryInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (key: keyof PhotoConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleClothingUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        handleChange('clothingReferenceImage', readerEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBatikUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        handleChange('batikPatternImage', readerEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePinUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        handleChange('pinReferenceImage', readerEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeadAccessoryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        handleChange('headAccessoryReferenceImage', readerEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const ColorInput = ({ label, value, onChange }: { 
    label: string, 
    value: string, 
    onChange: (v: string) => void
  }) => (
    <div className="flex flex-col gap-2 mb-4 group">
      <div className="flex justify-between items-center">
        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{label}</label>
        <span className="text-[9px] font-mono text-neutral-600 uppercase tracking-tighter">{value}</span>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="relative w-full h-11 rounded-xl overflow-hidden border border-neutral-800 hover:border-blue-500/50 transition-all shadow-lg group/swatch">
          <input 
            type="color" 
            value={value} 
            onChange={(e) => onChange(e.target.value)}
            className="absolute -inset-2 w-[150%] h-[150%] cursor-pointer bg-transparent border-none"
          />
          <div 
            className="absolute inset-0 pointer-events-none flex items-center justify-center" 
            style={{ backgroundColor: value }}
          >
             <div className="opacity-0 group-hover/swatch:opacity-100 transition-opacity bg-black/20 backdrop-blur-sm px-2 py-1 rounded text-[9px] text-white font-bold uppercase">
               Ubah Warna
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full lg:w-80 glass-panel h-screen overflow-y-auto custom-scrollbar p-6 flex flex-col gap-6 select-none">
      {/* Branding Section */}
      <div className="flex items-start gap-3.5">
        <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-xl shadow-blue-900/30">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <circle cx="12" cy="13" r="3" strokeWidth={2} />
          </svg>
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-white tracking-tight leading-none mb-1">SiFuKo Ai Studio</h1>
          <p className="text-[11px] text-neutral-400 font-semibold tracking-wide leading-tight">Semakin Menjadi Jadi</p>
          <p className="text-[9px] text-neutral-600 font-medium leading-normal mt-1">Powered by BaNaNa • Created by RifaldyP</p>
        </div>
      </div>

      <div className="flex-1 space-y-8">
        {/* Core Settings */}
        <section className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">JENIS KELAMIN</label>
              <div className="relative">
                <select 
                  value={config.gender}
                  onChange={(e) => {
                    const newGender = e.target.value as Gender;
                    handleChange('gender', newGender);
                    // Reset hair style when gender changes
                    handleChange('hairStyle', newGender === Gender.MALE ? HairStyleMale.ORIGINAL : HairStyleFemale.ORIGINAL);
                  }}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-xs text-neutral-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer appearance-none"
                >
                  {Object.values(Gender).map(g => <option key={g} value={g}>{g}</option>)}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-600">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">UKURAN</label>
              <div className="relative">
                <select 
                  value={config.size}
                  onChange={(e) => handleChange('size', e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-xs text-neutral-300 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                >
                  {Object.values(PhotoSize).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-600">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>
          </div>

          {/* Gaya Rambut */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">GAYA RAMBUT</label>
            <div className="relative">
              <select 
                value={config.hairStyle}
                onChange={(e) => handleChange('hairStyle', e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-xs text-neutral-300 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
              >
                {config.gender === Gender.MALE 
                  ? Object.values(HairStyleMale).map(h => <option key={h} value={h}>{h}</option>)
                  : Object.values(HairStyleFemale).map(h => <option key={h} value={h}>{h}</option>)
                }
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-600">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">JENIS PAKAIAN</label>
            <div className="relative">
              <select 
                value={config.clothingType}
                onChange={(e) => handleChange('clothingType', e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-xs text-neutral-300 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
              >
                {Object.values(ClothingType).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-600">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          {/* Prompt Jenis Pakaian */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">PROMPT JENIS PAKAIAN</label>
            <textarea 
              value={config.customClothingPrompt}
              onChange={(e) => handleChange('customClothingPrompt', e.target.value)}
              placeholder="Berikan detail tambahan untuk pakaian (contoh: jas bertekstur, kemeja kerah tinggi...)"
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-xs text-neutral-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-neutral-700 resize-none h-20"
            />
          </div>

          {/* Upload Model Pakaian */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">UNGGAH MODEL PAKAIAN</label>
            <div 
              onClick={() => clothingInputRef.current?.click()}
              className={`relative h-20 w-full rounded-xl border-2 border-dashed transition-all flex items-center justify-center cursor-pointer group overflow-hidden ${
                config.clothingReferenceImage ? 'border-blue-500/50 bg-blue-500/5' : 'border-neutral-800 hover:border-blue-500/30 bg-neutral-900/30'
              }`}
            >
              {config.clothingReferenceImage ? (
                <div className="flex items-center gap-3 px-3 w-full h-full">
                  <img src={config.clothingReferenceImage} alt="Ref" className="w-12 h-12 object-cover rounded-lg border border-neutral-700" />
                  <div className="flex-1 overflow-hidden">
                    <p className="text-[10px] text-blue-400 font-bold uppercase tracking-tight">Model Tersimpan</p>
                    <p className="text-[9px] text-neutral-500 truncate italic">Klik untuk ganti</p>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChange('clothingReferenceImage', undefined);
                    }}
                    className="p-1.5 bg-neutral-800 hover:bg-red-500/20 text-neutral-500 hover:text-red-400 rounded-md transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1 text-neutral-600 group-hover:text-blue-500/60 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  <p className="text-[9px] font-bold uppercase tracking-widest">Pilih Referensi</p>
                </div>
              )}
              <input 
                type="file" 
                ref={clothingInputRef} 
                onChange={handleClothingUpload} 
                className="hidden" 
                accept="image/*" 
              />
            </div>
          </div>

          {/* Conditional Upload for Batik Pattern */}
          {config.clothingType === ClothingType.BATIK && (
            <div className="space-y-1.5 animate-in fade-in duration-300">
              <label className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">UNGGAH MOTIF BATIK</label>
              <div 
                onClick={() => batikInputRef.current?.click()}
                className={`relative h-20 w-full rounded-xl border-2 border-dashed transition-all flex items-center justify-center cursor-pointer group overflow-hidden ${
                  config.batikPatternImage ? 'border-blue-500/50 bg-blue-500/5' : 'border-neutral-800 hover:border-blue-500/30 bg-neutral-900/30'
                }`}
              >
                {config.batikPatternImage ? (
                  <div className="flex items-center gap-3 px-3 w-full h-full">
                    <img src={config.batikPatternImage} alt="Batik Pat" className="w-12 h-12 object-cover rounded-lg border border-neutral-700" />
                    <div className="flex-1 overflow-hidden">
                      <p className="text-[10px] text-blue-400 font-bold uppercase tracking-tight">Motif Terpasang</p>
                      <p className="text-[9px] text-neutral-500 truncate italic">Klik untuk ganti</p>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChange('batikPatternImage', undefined);
                      }}
                      className="p-1.5 bg-neutral-800 hover:bg-red-500/20 text-neutral-500 hover:text-red-400 rounded-md transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1 text-neutral-600 group-hover:text-blue-500/60 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    <p className="text-[9px] font-bold uppercase tracking-widest">Pilih Motif Batik</p>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={batikInputRef} 
                  onChange={handleBatikUpload} 
                  className="hidden" 
                  accept="image/*" 
                />
              </div>
            </div>
          )}

          {/* Name Tag Feature */}
          <div className="p-4 rounded-xl bg-neutral-900/30 border border-neutral-800/50 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-neutral-400">Gunakan Name Tag</label>
              <button 
                onClick={() => handleChange('showNameTag', !config.showNameTag)}
                className={`w-11 h-6 rounded-full transition-all relative ${config.showNameTag ? 'bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.4)]' : 'bg-neutral-800'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${config.showNameTag ? 'left-6' : 'left-1'}`} />
              </button>
            </div>
            {config.showNameTag && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">NAMA DI PIN KANAN</label>
                <input 
                  type="text"
                  value={config.nameTagName}
                  onChange={(e) => handleChange('nameTagName', e.target.value)}
                  placeholder="Contoh: BUDI SANTOSO"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-neutral-700"
                />
              </div>
            )}
          </div>

          {/* Pin/Logo Feature (Dada Kiri) */}
          <div className="p-4 rounded-xl bg-neutral-900/30 border border-neutral-800/50 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-neutral-400">Gunakan Pin Kiri</label>
              <button 
                onClick={() => handleChange('showPin', !config.showPin)}
                className={`w-11 h-6 rounded-full transition-all relative ${config.showPin ? 'bg-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 'bg-neutral-800'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${config.showPin ? 'left-6' : 'left-1'}`} />
              </button>
            </div>
            {config.showPin && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">UNGGAH MODEL PIN (KIRI)</label>
                <div 
                  onClick={() => pinInputRef.current?.click()}
                  className={`relative h-16 w-full rounded-xl border-2 border-dashed transition-all flex items-center justify-center cursor-pointer group overflow-hidden ${
                    config.pinReferenceImage ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-neutral-800 hover:border-emerald-500/30 bg-neutral-900/30'
                  }`}
                >
                  {config.pinReferenceImage ? (
                    <div className="flex items-center gap-3 px-3 w-full h-full">
                      <img src={config.pinReferenceImage} alt="Pin Ref" className="w-10 h-10 object-contain rounded-md" />
                      <div className="flex-1 overflow-hidden">
                        <p className="text-[9px] text-emerald-400 font-bold uppercase tracking-tight">Pin Terdeteksi</p>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleChange('pinReferenceImage', undefined);
                        }}
                        className="p-1 bg-neutral-800 hover:bg-red-500/20 text-neutral-500 hover:text-red-400 rounded transition-colors"
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-neutral-600 group-hover:text-emerald-500/60 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg>
                      <p className="text-[8px] font-bold uppercase tracking-widest">Unggah Pin</p>
                    </div>
                  )}
                  <input 
                    type="file" 
                    ref={pinInputRef} 
                    onChange={handlePinUpload} 
                    className="hidden" 
                    accept="image/*" 
                  />
                </div>
              </div>
            )}
          </div>

          {/* Head Accessory Feature */}
          <div className="p-4 rounded-xl bg-neutral-900/30 border border-neutral-800/50 space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">ATRIBUT KEPALA</label>
              <div className="relative">
                <select 
                  value={config.headAccessory}
                  onChange={(e) => handleChange('headAccessory', e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-xs text-neutral-300 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
                >
                  {Object.values(HeadAccessory).map(h => <option key={h} value={h}>{h}</option>)}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-600">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            {/* Head Accessory Reference Upload */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">UNGGAH MODEL ATRIBUT KEPALA</label>
              <div 
                onClick={() => headAccessoryInputRef.current?.click()}
                className={`relative h-16 w-full rounded-xl border-2 border-dashed transition-all flex items-center justify-center cursor-pointer group overflow-hidden ${
                  config.headAccessoryReferenceImage ? 'border-blue-500/50 bg-blue-500/5' : 'border-neutral-800 hover:border-blue-500/30 bg-neutral-900/30'
                }`}
              >
                {config.headAccessoryReferenceImage ? (
                  <div className="flex items-center gap-3 px-3 w-full h-full">
                    <img src={config.headAccessoryReferenceImage} alt="Head Acc Ref" className="w-10 h-10 object-contain rounded-md" />
                    <div className="flex-1 overflow-hidden">
                      <p className="text-[9px] text-blue-400 font-bold uppercase tracking-tight">Atribut Terdeteksi</p>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChange('headAccessoryReferenceImage', undefined);
                      }}
                      className="p-1 bg-neutral-800 hover:bg-red-500/20 text-neutral-500 hover:text-red-400 rounded transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1 text-neutral-600 group-hover:text-blue-500/60 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    <p className="text-[8px] font-bold uppercase tracking-widest">Pilih Referensi Atribut</p>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={headAccessoryInputRef} 
                  onChange={handleHeadAccessoryUpload} 
                  className="hidden" 
                  accept="image/*" 
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-1">
              <label className="text-xs font-semibold text-neutral-400">Gunakan Kacamata</label>
              <button 
                onClick={() => handleChange('hasGlasses', !config.hasGlasses)}
                className={`w-11 h-6 rounded-full transition-all relative ${config.hasGlasses ? 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]' : 'bg-neutral-800'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${config.hasGlasses ? 'left-6' : 'left-1'}`} />
              </button>
            </div>
          </div>

          {config.gender === Gender.FEMALE && (
            <div className="p-4 rounded-xl bg-neutral-900/30 border border-neutral-800/50 space-y-4">
               <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-neutral-400">Gunakan Hijab</label>
                  <button 
                    onClick={() => handleChange('hasHijab', !config.hasHijab)}
                    className={`w-11 h-6 rounded-full transition-all relative ${config.hasHijab ? 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]' : 'bg-neutral-800'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${config.hasHijab ? 'left-6' : 'left-1'}`} />
                  </button>
               </div>
               {config.hasHijab && (
                 <ColorInput 
                    label="Warna Hijab" 
                    value={config.hijabColor} 
                    onChange={(v) => handleChange('hijabColor', v)}
                 />
               )}
            </div>
          )}
        </section>

        {/* Custom Color Palette */}
        <section className="space-y-1">
          <h3 className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.25em] mb-6 flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-blue-500"></span>
            WARNA CUSTOM
          </h3>
          
          <ColorInput 
            label="Latar Belakang" 
            value={config.backgroundColor} 
            onChange={(v) => handleChange('backgroundColor', v)} 
          />

          {(config.clothingType === ClothingType.SUIT || config.clothingType === ClothingType.BLAZER || config.clothingType === ClothingType.BATIK) && (
            <ColorInput 
              label={config.clothingType === ClothingType.BATIK ? "Warna Dominan Batik" : (config.clothingType === ClothingType.BLAZER ? "Warna Blazer" : "Warna Jas")} 
              value={config.suitColor} 
              onChange={(v) => handleChange('suitColor', v)} 
            />
          )}

          {config.clothingType === ClothingType.SUIT && (
            <ColorInput 
              label="Warna Dasi" 
              value={config.tieColor} 
              onChange={(v) => handleChange('tieColor', v)} 
            />
          )}

          {(config.clothingType === ClothingType.SUIT || config.clothingType === ClothingType.BLAZER || config.clothingType === ClothingType.SHIRT_ONLY) && (
            <ColorInput 
              label="Warna Kemeja" 
              value={config.shirtColor} 
              onChange={(v) => handleChange('shirtColor', v)} 
            />
          )}
        </section>

        {/* Aesthetics */}
        <section className="grid grid-cols-2 gap-3 pb-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">EKSPRESI</label>
            <div className="relative">
              <select 
                value={config.expression}
                onChange={(e) => handleChange('expression', e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-[11px] text-neutral-300 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
              >
                {Object.values(Expression).map(e => <option key={e} value={e}>{e}</option>)}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-600">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">CAHAYA</label>
            <div className="relative">
              <select 
                value={config.lighting}
                onChange={(e) => handleChange('lighting', e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-[11px] text-neutral-300 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
              >
                {Object.values(Lighting).map(l => <option key={l} value={l}>{l}</option>)}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-600">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
        </section>

        {/* Negative AI Prompt */}
        <section className="space-y-1.5 pb-4">
          <label className="text-[10px] font-bold text-red-500 uppercase tracking-[0.2em]">PROMPT NEGATIF (LARANGAN AI)</label>
          <textarea 
            value={config.negativePrompt}
            onChange={(e) => handleChange('negativePrompt', e.target.value)}
            placeholder="Hal-hal yang HARUS DIHINDARI. Contoh: 'Jangan pakai dasi', 'Hindari kacamata', 'Jangan ada jenggot', 'Hilangkan bayangan tajam'..."
            className="w-full bg-neutral-900 border border-red-900/30 rounded-lg px-3 py-2.5 text-xs text-neutral-200 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all placeholder:text-neutral-700 resize-none h-24 shadow-inner"
          />
        </section>

        {/* Face Accuracy Slider */}
        <section className="space-y-3 pb-4 pt-2 border-t border-neutral-800/50">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">Akurasi Wajah</label>
            <span className="text-xs font-mono font-bold text-blue-500">{config.faceAccuracy}%</span>
          </div>
          <div className="relative group">
            <input 
              type="range" 
              min="0" 
              max="100" 
              step="1"
              value={config.faceAccuracy}
              onChange={(e) => handleChange('faceAccuracy', parseInt(e.target.value))}
              className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-500 transition-all"
            />
            <div className="flex justify-between mt-2">
              <span className="text-[8px] text-neutral-700 font-bold uppercase tracking-tighter italic">Low likeness</span>
              <span className="text-[8px] text-neutral-700 font-bold uppercase tracking-tighter italic">Identical</span>
            </div>
          </div>
          <p className="text-[9px] text-neutral-600 leading-tight italic">
            * Geser ke 100% untuk menjaga kemiripan wajah asli secara maksimal.
          </p>
        </section>

        {/* Zoom Out Slider */}
        <section className="space-y-3 pb-4 pt-2 border-t border-neutral-800/50">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">Zoom Out (Framing)</label>
            <span className="text-xs font-mono font-bold text-blue-500">{config.zoomOut}x</span>
          </div>
          <div className="relative group px-1">
            <input 
              type="range" 
              min="1" 
              max="5" 
              step="1"
              value={config.zoomOut}
              onChange={(e) => handleChange('zoomOut', parseInt(e.target.value))}
              className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all"
            />
            <div className="flex justify-between mt-2">
              <span className="text-[8px] text-neutral-700 font-bold uppercase tracking-tighter italic">1x Close-up</span>
              <span className="text-[8px] text-neutral-700 font-bold uppercase tracking-tighter italic">5x Wide</span>
            </div>
          </div>
          <p className="text-[9px] text-neutral-600 leading-tight italic">
            * Geser ke kanan untuk memperluas area tubuh (lebih banyak torso terlihat).
          </p>
        </section>
      </div>

      <div className="pt-4 border-t border-neutral-900/50">
        <button 
          onClick={onGenerate}
          disabled={isLoading}
          className={`w-full py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${
            isLoading 
            ? 'bg-neutral-900 cursor-not-allowed text-neutral-600' 
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-[0_8px_25px_rgba(37,99,235,0.3)] hover:-translate-y-1 text-white shadow-lg active:scale-95'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              PROSESING AI...
            </>
          ) : (
            'Generate Pas Foto'
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
