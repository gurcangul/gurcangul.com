export const CATEGORIES = [
  { id: 'all',    label: 'Tümü',            icon: 'fas fa-border-all' },
  { id: 'doga',   label: 'Doğa',            icon: 'fas fa-leaf' },
  { id: 'teknik', label: 'Teknik & Hobi',   icon: 'fas fa-screwdriver-wrench' },
  { id: 'hukuk',  label: 'Hukuk & Fikirler',icon: 'fas fa-scale-balanced' },
];

export const NOTES = [
  {
    id: 'balikcilik-baslangic',
    title: 'Balıkçılığa Başlamak: Ekipman, Sabır ve Deniz',
    category: 'doga',
    date: '2026-05-10',
    readMin: 5,
    summary: 'Yıllarca denizin yanında yaşadım ama olta tutmayı geç öğrendim. İlk ekipmanı nasıl seçtim, hangi hatalar yaptım ve balıkçılığın bana ne öğrettiği üzerine.',
    content: `
## Neden Balıkçılık?

Denizin kenarında büyümek, balık tutmayı otomatik olarak öğrenmek anlamına gelmiyor. Ben de uzun yıllar denize bakmakla yetindim. Balıkçılığa başlama kararım aslında bir yazın ortasında, tamamen dürtüsel geldi.

## İlk Ekipman Seçimi

Başlarken en çok yanıltıcı olan şey ekipman çeşitliliği. Onlarca koltuk, yüzlerce iğne çeşidi, onlarca misina numarası. Benim önerim:

- **Kamış:** 3-4 metre arası, orta sertlikte bir kıyı kamışıyla başla
- **Makara:** Kapalı kafa makaralar başlangıç için affedici — ama açık kafa makaraya geç, çok daha iyi hissettiriyor
- **Misina:** 0.25-0.30 mm ile başla, her şey için yeterli
- **İğne:** 4-8 numara arasında, mısırlı çift iğne kıyıda işe yarar

## Sabah mı, Akşam mı?

Kıyı balıkçılığında altın saatler şaşmaz:
- **Sabah:** Güneş yeni doğmuş, deniz sakin, balıklar kıyıya gelmiş
- **Akşam üstü:** Gün batımından 1 saat önce, 1 saat sonra

Öğle vakti güneş dibine vurmuşken olta atmak — manzara güzel ama balık yok.

## Benim Hatalıyım

İlk dönemde çok iğne bıraktım kayalıklara. Kayalık dipten olta atmak cazip görünüyor (balık sığınağı orası) ama misina hazırlıksızsa kayıp kaçınılmaz. Çözüm: kayalıkta dip yerine yüzey veya yarım su.

## Balıkçılığın Öğrettikleri

Beklemek. Sadece beklemek. Telefonsuz, plansız, sadece su sesi ve ip gerginliği. Modern hayatın antidotu bu.
    `
  },
  {
    id: 'mantar-toplama',
    title: 'Orman Mantarı Toplamak: Ne Yenir, Ne Yenmez?',
    category: 'doga',
    date: '2026-04-03',
    readMin: 7,
    summary: 'Mantarı marketten almak kolay ama ormanda bulmak başka bir his. Türkiye\'de yaygın yenilebilir mantarlar, kesinlikle dokunulmaması gerekenler ve toplama tüyoları.',
    content: `
## Önce Uyarı

Mantar toplama ciddi bir iştir. "Bence yenir" yeterli değil. Türkiye'de her yıl mantar zehirlenmesinden insanlar hayatını kaybediyor. Bu yazıyı okumak yeterli değil; mutlaka bir uzmanla birlikte sahaya çık en az ilk 3-4 seferinde.

## Türkiye'de Güvenle Toplanabilen Mantarlar

### Kanlıca (Lactarius deliciosus)
Turuncu-kırmızı rengi ve kesildiğinde portakal suyu gibi sıvı çıkarmasıyla tanınır. Çam ormanlarının altında, Ekim-Kasım arası. Türkiye'nin en yaygın ve güvenli yenilebilir mantarlarından.

### Şitaki (Lentinula edodes)
Yaban formunu bulmak zor ama kültür formunu kolayca bulabilirsin. Meşe ve kayın kütüklerinde yetişir.

### Kuzugöbeği (Morchella)
İlkbaharda, genellikle Mart-Nisan. Bal peteği gibi görünümü ayırt edicidir. Çiğ yenmez — mutlaka pişirilmeli.

## Kesinlikle Dokunma

- **Ölüm Meleği (Amanita phalloides):** Türkiye'de mantar ölümlerinin büyük çoğunluğu bu. Beyaz, temiz, zararsız görünümlü. Karaciğeri çok hızlı tahrip eder.
- **Sinekmantar (Amanita muscaria):** Kırmızı, beyaz noktalı — ikoniktir ama zehirlidir.

## Temel Kural

> Emin değilsen bırak.

Tanımlayamadığın bir mantarı asla toplama. Güzel görünmesi zehirli olmadığı anlamına gelmez.

## Ekipman

- Hasır sepet (naylon çanta boğar, mantarın sporları orman zeminine dökülmeli)
- Küçük fırça (toprağı temizlemek için)
- Cep bıçağı
- Fotoğraf referans kitabı veya iNaturalist uygulaması
    `
  },
  {
    id: 'motosiklet-bakimi',
    title: 'Motosiklet Bakımını Kendin Yapmak: Nereden Başlanır?',
    category: 'teknik',
    date: '2026-03-15',
    readMin: 8,
    summary: 'Motosikletini servise götürmek para ve zaman ister. Basit bakımları kendin yapmak hem ekonomik hem tatmin edici. Yağ değişiminden zincir ayarına temel işlemler.',
    content: `
## Neden Kendin Yapmalısın?

Servise gidince iki şey kaybediyorsun: para ve kontrol. Motor hakkında kimse senden fazla bilemez. Bakımını kendin yaparken aynı zamanda motoru tanırsın — anormal bir ses, hafif bir titreşim, hemen fark edersin.

## Başlamadan Önce: Temel Alet Kutusu

Bunlar olmadan başlama:
- Tork anahtarı (özellikle gövde vidaları ve tekerlek göbeği için şart)
- Altıgen (allen) anahtar seti
- Motosiklet için merkez standı veya arka lift
- Filtre sökme pensi
- Temiz plastik leğen (yağ için)

## Yağ Değişimi

En kolay ve en kritik bakım. Her 3.000-5.000 km'de bir (motora göre değişir, el kitabını oku).

1. Motoru 5 dakika çalıştır — yağı ısıt, akışkanlığı artar
2. Karta vidasını sökmeden önce üst kapağı aç (vakum oluşmasın)
3. Yağı leğene boşalt, bekle — tamamen akıtsın
4. Filtreyi değiştir (markaya göre ya kağıt filtre ya da centrifugal)
5. Karta vidasını tork değerinde sık — el kuvvetiyle sıkma
6. Yeni yağı doldur, seviyeyi kontrol et

**Önemli:** Kullanılmış yağı kanalizasyona dökme. Akaryakıt istasyonları veya belediyeler topluyor.

## Zincir Bakımı

Zincir, motosikletin en çok ihmal edilen parçası. Kuru ve kirli zincir hem hızla aşınır hem de güç kaybettirir.

- **Ne zaman:** Her 500-600 km'de temizle ve yağla
- **Nasıl:** Zincir temizleyici sprey → fırçayla temizle → kurutsun → zincir yağı (O-ring uyumlu)
- **Gerginlik:** Orta noktada 2-3 cm oynama normal. Fazlası veya azı ayar gerektirir

## Avans (Supap) Ayarı

Bunu ilk başta servise bırak ama nasıl yapıldığını öğren. Motor sesi "tıkırtılı" gelmeye başladıysa supap boşlukları büyümüş olabilir.

## En Önemli Kural

El kitabı (service manual) kutsal metin gibidir. Her vidanın tork değeri, her yağın viskozitesi orada yazar.
    `
  },
  {
    id: 'elektronik-tamir',
    title: 'Kırık Elektroniği Tamir Etmek: Lehim, Ölçüm ve Sabır',
    category: 'teknik',
    date: '2026-02-20',
    readMin: 6,
    summary: 'Çöpe gitmek üzere olan bir televizyon, bozuk bir güç kaynağı veya şarj olmayan bir cihaz. Temel elektronik tamir için neye ihtiyacın var ve nereden başlarsın?',
    content: `
## Neden Tamir Etmeli?

Her yıl milyonlarca elektronik cihaz çöpe gidiyor, çoğu tamamen değil kısmen bozuk olduğu için. Hem ekonomik hem çevreci hem de tatmin edici.

## Temel Ekipman

### Zorunlu
- **Lehim istasyonu:** Sabit uçlu lehim kalemi değil, sıcaklık ayarlı istasyon. 300-350°C arası çalışma sıcaklığı.
- **Multimetre:** En ucuzu bile işe yarar. Voltaj, akım ve direnç ölçmek için.
- **Lehim teli:** 0.8mm, kurşunsuz veya kurşunlu (60/40 daha kolay erir)
- **Lehim emici şerit ve pompa**

### Faydalı
- Büyüteç veya stereo mikroskop (SMD komponentler için)
- Osiloskop (ileri seviye)
- Isıyla büzüşen makaron

## En Yaygın Arızalar

### Şişmiş Kapasitörler
Güç kaynağı, monitör, anakart — en yaygın sorun. Kapasitörün üstü şişmiş veya sıvı sızmışsa değiştir. Değeri ve voltaj toleransı etikette yazar (örn. 1000µF 16V).

### Soğuk Lehim
Cihaz arada çalışıyorsa, hafifçe bastırınca düzeliyorsa büyük ihtimalle soğuk lehim var. Şüpheli noktaları ısıtıp yeniden lehimle.

### Sigorta
Her güç devresi sigortayla korunur. Multimetreyle sürekliliği ölç (bip sesi = sağlam). Sigortayı değiştirmeden önce neden attığını anlamaya çalış.

## Güvenlik

- Kondansatörler şarjlı kalabilir. Büyük bir kapasitörü ellemeeden önce deşarj et.
- Şebeke voltajıyla çalışıyorsan — 220V öldürür. Bağlı değilken çalış.
- Gözlük tak, küçük komponentler sıçrayabilir.

## Kaynak

iFixit.com ve YouTube neredeyse her cihaz için söküm/tamir rehberi sunuyor. Model numarasıyla ara, büyük ihtimalle biri daha önce aynısını tamir etmiş.
    `
  },
  {
    id: 'sukulent-bakim',
    title: 'Sukulent Yetiştirmek: Az Su, Çok Sabır',
    category: 'doga',
    date: '2026-01-18',
    readMin: 4,
    summary: 'Sukulentler ölmez derler ama ben öldürdüm. Sonra tekrar yetiştirdim. Doğru toprak, doğru sulama ve doğru ışık — üçü tamsa sukulent neredeyse kendi kendine büyür.',
    content: `
## "Sukulentler Kolaydır" Yanlış

Öğrencilerin ve başlangıç bitki severlerinin ilk tercihi sukulentler. "Su istemez, bakım istemez" deniyor. Ben de inandım ve aylarca karanlık bir köşede, haftada iki kez sularken öldürdüm.

## Üç Temel Kural

### 1. Toprak
Standart saksı toprağu sukulentleri öldürür. Su tuttu mu çürüme başlar. Karışım şöyle olmalı:
- 50% kaktüs/sukulent toprağı
- 25% perlit (ya da iri kum)
- 25% pomza ya da volkanik taş

Hava alımı su alımından önemli.

### 2. Sulama
"Dip sulamak" en doğrusu. Saksıyı su dolu bir kaba koy, 15-20 dakika bekle, çıkar. Toprağın tamamen kurumasını bekle — genellikle 7-14 gün.

Kışın çok daha seyrek (ayda bir yeterli). Büyüme döneminde (ilkbahar-yaz) daha sık.

### 3. Işık
Mümkün olan en fazla doğal ışık. Güneye bakan pencere ideal. Doğrudan güneş alan yerde bile çoğu sukulent mutlu.

## Çoğaltma

Yaprak çoğaltma sukulentlerin sihri. Sağlıklı bir yaprağı saksıdan hafifçe kopar (kök bağlantısı sağlam olsun), gölgeli bir yerde birkaç gün kurutsun, sonra nemli toprağın üstüne yatır. 2-4 hafta içinde kökçükler çıkar.

## Kış Uyuması

Çoğu sukulent kışın dinlenme moduna girer. Bu dönemde sulamayı iyice azalt, gübreleme. İlkbaharda yeniden canlanırlar.
    `
  },
  {
    id: 'hukuki-sozlesme',
    title: 'Kira Sözleşmesinde Dikkat Edilmesi Gerekenler',
    category: 'hukuk',
    date: '2026-04-25',
    readMin: 6,
    summary: 'Kira sözleşmesi imzalarken çoğu kişi "nasılsa standart sözleşme" diye geçiyor. Ama küçük maddeler büyük sorun yaratabilir. Nelere dikkat etmeli, hangi maddeler sizi korur?',
    content: `
## Önemli Uyarı

Bu yazı hukuki tavsiye değildir. Somut hukuki sorunlar için mutlaka bir avukatan görüş alın. Buradakiler genel bilgi ve kişisel deneyimlerime dayanmaktadır.

---

## Sözleşme Neden Önemli?

Türkiye'de kira ilişkisi 6570 sayılı Kanun ve TBK (Türk Borçlar Kanunu) ile düzenlenmiş. Kanun kiracıyı güçlü koruyor — ama sözleşmede yazan bazı maddeler bu korumayı etkileyebilir.

## Dikkat Edilmesi Gereken Maddeler

### 1. Kira Artış Oranı
TBK md. 344'e göre kira artışı TÜFE 12 aylık ortalamasını geçemez (konutlarda). Sözleşmede "yüzde 50 artış yapılacaktır" gibi bir madde yazıyor olsa bile kanun sınırı geçemez. O madde geçersiz sayılır.

### 2. Depozito
Konut kiralarında depozito en fazla 3 aylık kira bedeli olabilir. Üzerindeyse fazlası için zorunlu değilsin. Depozitoyu nakit vermek yerine banka blokeli havale ile ver — belge olsun.

### 3. Tahliye Taahhütnamesi
Bazı ev sahipleri sözleşmeyle birlikte tarihsiz tahliye taahhütnamesi imzalatmak istiyor. **Bu çok tehlikeli.** Tarihsiz bırakılan taahhütname doldurularak aleyhine kullanılabilir. İmzalayacaksan mutlaka tarihli imzala.

### 4. Aidat ve Ortak Giderler
Kim ödeyecek? Sözleşmede yazmalı. Yazmazsa anlaşmazlık çıkabilir.

### 5. Sözleşme Süresi Bitti, Kiracı Çıkmalı mı?
**Hayır.** TBK'ya göre sözleşme süresi biten kira sözleşmesi aynı şartlarla devam eder. Ev sahibi süre bitti diye kiracıyı çıkaramaz — yalnızca belirli yasal sebeplerle (ihtiyaç, yeniden inşa vb.) tahliye davası açabilir.

## Taşınma Öncesi

- Sözleşmeyi imzalamadan önce dairenin mevcut hasarlarını fotoğrafla belgele, tarihli.
- Elektrik, su, doğalgaz aboneliklerinin başvurusunu kendi üstüne al — ileride "sen yaktın" demesin.
- Sözleşmenin bir kopyasını mutlaka sakla.
    `
  },
];
