
import { GoogleGenAI } from "@google/genai";
import { PhotoConfig, Gender, ClothingType, HeadAccessory, HairStyleMale, HairStyleFemale } from "../types";

export const generatePassportPhoto = async (
  base64Image: string,
  config: PhotoConfig
): Promise<string> => {
  // Always use {apiKey: process.env.API_KEY}
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  let clothingPrompt = '';
  switch (config.clothingType) {
    case ClothingType.SUIT:
      clothingPrompt = `Jas formal rapi berwarna ${config.suitColor}, kemeja dalaman putih bersih atau berwarna ${config.shirtColor}, dan dasi berwarna ${config.tieColor}.`;
      break;
    case ClothingType.BLAZER:
      clothingPrompt = `Blazer formal wanita yang elegan and rapi berwarna ${config.suitColor} dengan kemeja dalaman berwarna ${config.shirtColor}.`;
      break;
    case ClothingType.SHIRT_ONLY:
      clothingPrompt = `Kemeja formal rapi berkancing penuh berwarna ${config.shirtColor} yang disetrika halus.`;
      break;
    case ClothingType.BATIK:
      clothingPrompt = `Kemeja Batik tradisional Indonesia yang elegan with ornamen rapi and warna dominan ${config.suitColor}. Jika gambar referensi motif batik disediakan, gunakan motif tersebut secara akurat.`;
      break;
    case ClothingType.BATIK_KORPRI:
      clothingPrompt = `SERAGAM BATIK KORPRI RESMI (STANDAR ASN INDONESIA TERBARU). WAJIB:
      1. WARNA DASAR: Deep Navy Blue (Biru Navy Gelap).
      2. MOTIF: Ornamen filigree Cyan/Biru Muda yang kontras.
      3. LOGO: Emblem 'Pohon Beringin' Emas (Golden Yellow) repetitif dan tegak lurus.
      4. KONSTRUKSI: Kancing tertutup, kerah kaku, motif menyambung simetris di tengah dada.`;
      break;
    case ClothingType.UNIFORM:
      clothingPrompt = `Seragam PDH/Dinas pemerintah resmi (warna coklat khaki atau sesuai standar instansi) yang sangat rapi and profesional.`;
      break;
    case ClothingType.SCHOOL_SD:
      clothingPrompt = `Seragam sekolah dasar (SD) Indonesia: Kemeja putih bersih lengan pendek/panjang dengan saku di dada kiri subjek (SISI KANAN FOTO) yang memiliki logo OSIS SD. PENTING: JANGAN MENGGUNAKAN DASI. Kerah kemeja harus terbuka rapi tanpa dasi.`;
      break;
    case ClothingType.SCHOOL_SMP:
      clothingPrompt = `Seragam sekolah menengah pertama (SMP) Indonesia: Kemeja putih bersih lengan pendek/panjang dengan saku di dada kiri subjek (SISI KANAN FOTO) yang memiliki logo OSIS SMP. PENTING: JANGAN MENGGUNAKAN DASI. Kerah kemeja harus terbuka rapi tanpa dasi.`;
      break;
    case ClothingType.SCHOOL_SMA:
      clothingPrompt = `Seragam sekolah menengah atas (SMA) Indonesia: Kemeja putih bersih lengan pendek/panjang with saku di dada kiri subjek (SISI KANAN FOTO) yang memiliki logo OSIS SMA. PENTING: JANGAN MENGGUNAKAN DASI. Kerah kemeja harus terbuka rapi tanpa dasi.`;
      break;
    case ClothingType.CUSTOM:
      clothingPrompt = `Pakaian mengikuti model referensi yang diunggah. Pastikan potongan kerah and bahu formal and rapi.`;
      break;
  }

  if (config.customClothingPrompt) {
    clothingPrompt += ` DETAIL TAMBAHAN PAKAIAN DARI PENGGUNA: ${config.customClothingPrompt}`;
  }

  // OPTIMIZED NAME TAG PROMPT: Extreme focus on Subject's Right Chest (Image Left)
  const nameTagPrompt = config.showNameTag && config.nameTagName ? `
    CRITICAL MANDATORY INSTRUCTION - NAME TAG POSITION:
    1. PLACEMENT: Place the name tag STRICTLY on the SUBJECT'S RIGHT CHEST.
    2. IMAGE COORDINATES: This corresponds to the LEFT SIDE OF THE IMAGE FRAME.
    3. NEGATIVE CONSTRAINT: DO NOT place the name tag on the Subject's Left Chest (the side where pockets or OSIS logos usually appear).
    4. ALIGNMENT: The name tag must be perfectly horizontal and level.
    5. APPEARANCE: Black rectangular board with white text: "${config.nameTagName.toUpperCase()}". It must look physically pinned to the fabric.
    6. CONSISTENCY: Even if the original photo suggests otherwise, the final generated image MUST have the name tag on the subject's right (viewer's left).
  ` : 'NONAKTIF: JANGAN tambahkan Name Tag atau papan nama apa pun.';

  const pinPrompt = config.showPin ? `
    PIN/LOGO POSITION: TAMBAHKAN PIN PADA DADA KIRI SUBJEK (SISI KANAN DI LAYAR/FOTO):
    - Lokasi: Dada sebelah KIRI subjek (Tepat di atas area saku).
    - JANGAN tertukar dengan posisi Name Tag. Name Tag di kanan (kiri foto), Pin di kiri (kanan foto).
  ` : 'NONAKTIF: JANGAN tambahkan Pin di dada kiri.';

  const accuracyPrompt = `
    STRICT FACE PRESERVATION (ACCURACY: ${config.faceAccuracy}%):
    ${config.faceAccuracy >= 80 ? `- MANDATORY: Preserve 100% of the anatomical features. The shape of the eyes, thickness of eyebrows, bridge of the nose, curve of the mouth, ear structure, and overall face shape MUST NOT CHANGE. Treat the original face as an immutable reference.` : ''}
    ${config.faceAccuracy < 80 && config.faceAccuracy >= 40 ? `- BALANCE: Maintain high likeness while allowing subtle skin texture smoothing. Keep all major landmarks identical.` : ''}
    ${config.faceAccuracy < 40 ? `- GUIDANCE: Follow the subject's identity but focus on a clean studio aesthetic.` : ''}
  `;

  let headAccessoryPrompt = '';
  if (config.headAccessoryReferenceImage) {
    headAccessoryPrompt = `AKTIF: REKONSTRUKSI ATRIBUT KEPALA mengikuti referensi gambar.`;
  } else if (config.headAccessory !== HeadAccessory.NONE) {
    switch (config.headAccessory) {
      case HeadAccessory.KOPIAH_HITAM: headAccessoryPrompt = 'AKTIF: Kopiah Hitam.'; break;
      case HeadAccessory.KOPIAH_HAJI: headAccessoryPrompt = 'AKTIF: Kopiah Haji (Putih).'; break;
      case HeadAccessory.KOPIAH_KARANJI: headAccessoryPrompt = 'AKTIF: Kopiah Karanji.'; break;
      case HeadAccessory.KOPIAH_MAKASAR: headAccessoryPrompt = 'AKTIF: Kopiah Makasar.'; break;
      case HeadAccessory.TOPI_FORMAL: headAccessoryPrompt = 'AKTIF: Topi Formal/Baret.'; break;
      case HeadAccessory.OTHER: headAccessoryPrompt = 'AKTIF: Atribut kepala sesuai permintaan.'; break;
    }
  }

  const glassesPrompt = config.hasGlasses ? 'AKTIF: Tambahkan kacamata formal.' : 'NONAKTIF: JANGAN tambahkan kacamata.';
  const hijabPrompt = (config.gender === Gender.FEMALE && config.hasHijab) ? `AKTIF: Hijab polos berwarna ${config.hijabColor}.` : '';

  let hairStylePrompt = '';
  if (config.hairStyle !== HairStyleMale.ORIGINAL && config.hairStyle !== HairStyleFemale.ORIGINAL) {
    hairStylePrompt = `UBAH GAYA RAMBUT subjek menjadi gaya "${config.hairStyle}".`;
  }

  let framingInstruction = '';
  const zoom = config.zoomOut;
  if (zoom === 1) framingInstruction = 'Extreme Close-up.';
  else if (zoom === 2) framingInstruction = 'Standard ID/Visa framing.';
  else if (zoom === 3) framingInstruction = 'Medium Close-up.';
  else if (zoom === 4) framingInstruction = 'Medium Shot.';
  else if (zoom === 5) framingInstruction = 'Wide Medium Shot.';

  const negativePromptSection = config.negativePrompt ? `
    LARANGAN KERAS (DAFTAR NEGATIF - NEGATIVE PROMPT):
    "${config.negativePrompt}"
  ` : '';

  // Add global constraint for school uniforms to ensure no ties are generated
  const schoolUniformConstraint = (config.clothingType === ClothingType.SCHOOL_SD || config.clothingType === ClothingType.SCHOOL_SMP || config.clothingType === ClothingType.SCHOOL_SMA) 
    ? "NEGASI MUTLAK: JANGAN PERNAH MENAMBAHKAN DASI PADA SERAGAM SEKOLAH. Kerah harus bersih tanpa aksesori dasi apa pun." 
    : "";

  const prompt = `
    TUGAS: TRANSFORMASI FOTO MENJADI PAS FOTO STUDIO PROFESIONAL.
    
    1. POSISI NAME TAG (PRIORITAS TERTINGGI): ${nameTagPrompt}
    2. POSISI PIN/LOGO: ${pinPrompt}
    
    PERATURAN KOMPOSISI:
    - Framing: ${framingInstruction}
    - Background: Warna solid ${config.backgroundColor} FLAT. NO SHADOW.
    - Lighting: ${config.lighting} studio lighting. Zero shadow under jaw.
    - Wajah: ${accuracyPrompt} (Preservasi identitas 100%).
    - Rambut: ${hairStylePrompt}
    - Kacamata: ${glassesPrompt}
    - Hijab: ${hijabPrompt}
    - Pakaian: ${clothingPrompt}
    - Ekspresi: ${config.expression}.
    
    ${schoolUniformConstraint}
    ${negativePromptSection}

    FINAL CHECK: Pastikan Name Tag berada di dada KANAN subjek (SISI KIRI FOTO). JANGAN taruh di sisi kanan foto/dada kiri subjek. JANGAN ADA DASI jika jenis pakaian adalah Seragam SD, SMP, atau SMA.
  `;

  // Always use generateContent for image editing with gemini-2.5-flash-image
  const parts: any[] = [
    { text: prompt },
    { inlineData: { data: base64Image.split(',')[1], mimeType: 'image/jpeg' } },
  ];

  if (config.clothingReferenceImage) {
    parts.push({ inlineData: { data: config.clothingReferenceImage.split(',')[1], mimeType: 'image/jpeg' } });
  }
  if (config.batikPatternImage && config.clothingType === ClothingType.BATIK) {
    parts.push({ inlineData: { data: config.batikPatternImage.split(',')[1], mimeType: 'image/jpeg' } });
  }
  if (config.pinReferenceImage && config.showPin) {
    parts.push({ inlineData: { data: config.pinReferenceImage.split(',')[1], mimeType: 'image/jpeg' } });
  }
  if (config.headAccessoryReferenceImage) {
    parts.push({ inlineData: { data: config.headAccessoryReferenceImage.split(',')[1], mimeType: 'image/jpeg' } });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: parts },
    });

    let imageUrl = '';
    // Find image part in response candidates
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        imageUrl = `data:image/png;base64,${part.inlineData.data}`;
        break;
      }
    }

    if (!imageUrl) throw new Error("AI gagal menghasilkan gambar.");
    return imageUrl;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
