import { GoogleGenAI } from "@google/genai";
import { GroundingChunk, VulnerabilityReport } from "../types";

// Initialize the client with the API key from the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Searches for vulnerabilities related to a specific target using Google Search Grounding.
 * Implements the 7-step "VulnScout" workflow:
 * 1. Input Collection
 * 2. Attack Surface Reconstruction
 * 3. Vulnerability Reasoning
 * 4. Exploit Path Simulation
 * 5. Payload Blueprint Generation
 * 6. Mitigation & Hardening
 * 7. Reporting
 */
export const analyzeTargetVulnerabilities = async (target: string): Promise<VulnerabilityReport> => {
  try {
    const modelId = 'gemini-2.5-flash';
    
    const systemInstruction = `
    Sen VulnScout v2.0'sın. Gelişmiş bir siber istihbarat ve zafiyet tespit motorusun.
    GÖREVİN: Kullanıcının girdiği hedefe karşı "Google Search" modülünü kullanarak pasif bir tarama (reconnaissance) gerçekleştirmek ve BULGULARI raporlamaktır.

    KURAL 1: Asla "şunu yapmalısınız" veya "bunu kontrol edin" gibi tavsiye dili kullanma.
    KURAL 2: İşlemleri ZATEN YAPMIŞSIN gibi raporla.
    KURAL 3: Çıktı dili KESİNLİKLE TÜRKÇE olacak.
    KURAL 4: Teknik terimleri koru (SQL Injection, XSS, SSRF, RCE vb.).

    AŞAĞIDAKİ 7 ADIMLI RAPOR FORMATINI KULLAN:

    ### 1. GİRİŞ VE KEŞİF RAPORU (RECON RESULT)
    - Google aramaları sonucunda tespit edilen teknoloji yığınını listele (OS, Web Server, Framework, CMS).
    - Örnek çıktı: "Tespit Edilen Altyapı: Nginx 1.18.0, PHP 7.4, WordPress 5.8."

    ### 2. SALDIRI YÜZEYİ HARİTASI (ATTACK SURFACE)
    - Dışarıdan erişilebilir olduğu tespit edilen veya muhtemel endpointleri listele.
    - Örnek çıktı: "Açık Endpointler: /wp-admin, /api/v1/login, /upload."

    ### 3. ZAFİYET ANALİZİ VE EŞLEŞTİRME (VULNERABILITY REASONING)
    - 1. adımda bulduğun sürümleri bilinen CVE veritabanı ile eşleştirdim de.
    - Örnek çıktı: "Nginx 1.18.0 sürümünde CVE-2021-23017 (Buffer Overflow) riski tespit edildi."

    ### 4. SALDIRI VEKTÖRÜ SİMÜLASYONU (EXPLOIT PATH)
    - Bu zafiyetin nasıl sömürülebileceğini adım adım simüle et (Teorik Saldırı).
    - Örnek çıktı: "Saldırı Yolu: Saldırgan özel hazırlanmış bir başlık bilgisi ile Nginx worker process'i çökertebilir."

    ### 5. PAYLOAD TASLAKLARI (POC GENERATION)
    - Bu hedef için özel üretilmiş, test amaçlı (zararsız) payload kodlarını oluştur.
    - Kod blokları kullan.
    - Örnek: SQLi için hedef veritabanına uygun syntax kullan.

    ### 6. SIKILAŞTIRMA VE YAMA DURUMU (MITIGATION STATUS)
    - Bu açığın nasıl kapatılacağını teknik dille anlat.

    ### 7. KRİTİKLİK SEVİYESİ (RISK ASSESSMENT)
    - Risk Skoru ata (0-10 arası) ve Seviye Belirle (DÜŞÜK / ORTA / YÜKSEK / KRİTİK).

    Markdown formatında, profesyonel, soğuk ve teknik bir dille yaz. Tavsiye verme, Rapor sun.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: `Hedef: "${target}".
      
      Bu hedef üzerinde tam kapsamlı pasif tarama işlemini başlat. Sürümleri tespit et, CVE veritabanını tara, saldırı yüzeyini haritalandır ve bulguları raporla.`,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: systemInstruction,
        temperature: 0.3, 
      },
    });

    // Extract text
    const text = response.text || "Tarama tamamlandı ancak rapor oluşturulamadı. Hedef erişilebilir olmayabilir.";

    // Extract grounding chunks (sources)
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[] || [];

    return {
      rawText: text,
      sources: groundingChunks,
      timestamp: Date.now(),
      target: target
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};