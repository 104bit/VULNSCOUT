# 🛡️ VulnScout AI

> **Yapay Zeka Destekli Pasif Zafiyet İstihbarat ve Analiz Motoru**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-Active-success.svg)
![Tech](https://img.shields.io/badge/tech-React%20%7C%20Gemini%202.5%20%7C%20Tailwind-00bcd4.svg)

VulnScout AI, **Google Gemini 2.5** modellerini ve **Google Search Grounding** teknolojisini kullanarak hedef sistemler üzerinde **pasif tarama (passive reconnaissance)** yapan, yeni nesil bir siber güvenlik analiz aracıdır.

Klasik tarayıcıların aksine, hedef sisteme doğrudan paket göndermeden (active scanning yapmadan), internet üzerindeki açık kaynaklardan (OSINT), dokümantasyonlardan ve güncel CVE veritabanlarından bilgi toplayarak olası saldırı yüzeyini haritalandırır.

![App Screenshot](https://via.placeholder.com/1200x600/050a0f/26e6f9?text=VulnScout+Dashboard+Preview)

## 🚀 Özellikler

VulnScout, 7 adımlı özel bir analiz metodolojisi kullanır:

*   **🕵️ Pasif Keşif (Reconnaissance):** Hedefin teknoloji yığınını (OS, Web Server, CMS vb.) tespit eder.
*   **🗺️ Saldırı Yüzeyi Haritalama:** Dışarıya açık endpointleri ve potansiyel giriş noktalarını belirler.
*   **🔓 CVE Eşleştirme:** Tespit edilen sürümleri güncel zafiyet veritabanlarıyla (CVE) eşleştirir.
*   **⚔️ Saldırı Simülasyonu:** Teorik saldırı senaryoları ve "Exploit Path" analizleri oluşturur.
*   **💉 PoC Payload Üretimi:** Zafiyetin doğrulanması için (zararsız) örnek payload kodları üretir.
*   **🛡️ Sıkılaştırma (Hardening):** Tespit edilen açıkların nasıl kapatılacağına dair teknik rehberlik sunar.
*   **🇹🇷 Türkçe Raporlama:** Tüm teknik çıktıları ve risk analizlerini Türkçe olarak raporlar.

## 🛠️ Teknolojiler

Bu proje aşağıdaki modern teknolojiler kullanılarak geliştirilmiştir:

*   **Core:** React 19
*   **AI Engine:** Google Gemini 2.5 Flash (via `@google/genai` SDK)
*   **Grounding:** Google Search Tool (Canlı web araması için)
*   **Styling:** Tailwind CSS (Cyberpunk/Dark Mode teması)
*   **Icons:** Lucide React
*   **Rendering:** Marked (Markdown render motoru)

## ⚙️ Kurulum ve Çalıştırma

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

### 1. Repoyu Klonlayın
```bash
git clone https://github.com/KULLANICI_ADINIZ/vulnscout-ai.git
cd vulnscout-ai
```

### 2. API Anahtarını Ayarlayın
Bu proje Google Gemini API kullanmaktadır. Çalışması için geçerli bir API anahtarına ihtiyacınız vardır.
*   [Google AI Studio](https://aistudio.google.com/) üzerinden API anahtarı alın.
*   Ana dizinde `.env` dosyası oluşturun (veya mevcut yapılandırmaya uygun şekilde key'i tanımlayın).

### 3. Uygulamayı Başlatın
Proje modern ES modülleri ve CDN tabanlı bir yapı kullanıyorsa `index.html` dosyasını bir Live Server ile açmanız yeterlidir. Node.js tabanlı bir ortamdaysanız:

```bash
npm install
npm start
```

## ⚠️ Yasal Uyarı (Disclaimer)

**Lütfen Dikkat:**

VulnScout AI, **sadece eğitim, araştırma ve yasal güvenlik testleri (yetkili olunan sistemler)** için tasarlanmıştır. Bu aracın, izniniz olmayan sistemler üzerinde kullanılması yasa dışıdır.

*   Geliştirici, bu aracın kötüye kullanımından doğabilecek herhangi bir zarardan sorumlu tutulamaz.
*   Üretilen raporlar yapay zeka tabanlıdır (halüsinasyon riski içerebilir) ve profesyonel bir pentest hizmetinin yerini tutmaz.

## 🤝 Katkıda Bulunma

Pull request'ler kabul edilir. Büyük değişiklikler için lütfen önce tartışmak üzere bir "Issue" açınız.

## 📄 Lisans

[MIT](https://choosealicense.com/licenses/mit/)
