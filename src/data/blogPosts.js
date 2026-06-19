export const BLOG_POSTS = [
  {
    id: 'timeline-planner',
    title: 'React ile Drag-and-Drop Gantt Chart: Timeline Planner',
    date: '2026-06-17',
    tags: ['React', 'TypeScript', 'Proje'],
    summary: 'Banka iç denetim ekipleri için haftalık saha planlama aracı. React 18 + TypeScript ile drag-to-select, otomatik çakışma çözümü (cascade) ve Excel export içeren bir Gantt chart nasıl inşa edilir?',
    project: 'timeline-planner',
    projectUrl: 'https://github.com/gurcangul/timeline-planner',
    content: `
## Proje Nedir?

Banka iç denetim ekiplerinin haftalık saha planlamasını yönetmek için geliştirdiğim bir web uygulaması. Denetçiler sol kolonda sabit kalır, günler yatayda kaydırılır. Görevler sürükle-bırak ile atanır.

**Teknoloji:** React 18, TypeScript, Vite 5, TanStack React Query 5, SheetJS (Excel export), Vitest

## Slot Modeli

Planlamayı kolaylaştırmak için zamanı "slot" birimine çevirdim:

\`\`\`
1 gün = 2 slot (sabah + öğleden sonra)
\`\`\`

Bu sayede yarım günlük atamalar da sorunsuz çalışıyor. Tüm hesaplamalar slot indeksleri üzerinden yapılıyor:

\`\`\`typescript
const DAY_TO_SLOTS = 2;

function dateRangeToSlots(start: Date, end: Date): number {
  const days = differenceInDays(end, start) + 1;
  return days * DAY_TO_SLOTS;
}

function slotToDate(weekStart: Date, slotIndex: number): Date {
  const dayOffset = Math.floor(slotIndex / DAY_TO_SLOTS);
  return addDays(weekStart, dayOffset);
}
\`\`\`

## Push Engine: Cascade Çakışma Çözümü

En ilginç kısım bu. Bir görevi taşıdığında veya boyutlandırdığında, üst üste binen görevler otomatik olarak öteleniyor. Buna "cascade" (şelale) mantığı dedim.

\`\`\`typescript
// PushEngine.ts
function cascadeResolve(
  assignments: Assignment[],
  movedId: string,
  newSlot: number
): Assignment[] {
  const sorted = [...assignments].sort((a, b) => a.startSlot - b.startSlot);
  const result: Assignment[] = [];

  for (const item of sorted) {
    if (item.id === movedId) {
      result.push({ ...item, startSlot: newSlot });
      continue;
    }

    // Önceki görevle çakışıyor mu?
    const prev = result.findLast(r => r.auditorId === item.auditorId);
    if (prev && overlaps(prev, item)) {
      // Çakışanı, öncekinin bitişinden itibaren kaydır
      result.push({ ...item, startSlot: prev.startSlot + prev.duration });
    } else {
      result.push(item);
    }
  }

  return result;
}

function overlaps(a: Assignment, b: Assignment): boolean {
  return a.startSlot < b.startSlot + b.duration &&
         b.startSlot < a.startSlot + a.duration;
}
\`\`\`

### Pinned Görevler

İzin ve sağlık raporu gibi sabit görevler cascade'den etkilenmiyor. \`isPinned: true\` bayrağı taşıyanlar yerlerinde kalıyor, diğer görevler onların etrafında yeniden düzenleniyor.

## Drag-to-Select

Tek tıkla atama yerine, fare ile birden fazla slotu seçip tek hamlede görev oluşturabilirsin. Sürükleme sırasında otomatik scroll da var:

\`\`\`typescript
function useAutoScroll(containerRef: RefObject<HTMLDivElement>, isDragging: boolean) {
  useEffect(() => {
    if (!isDragging) return;

    const handle = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const { left, right } = container.getBoundingClientRect();
      const THRESHOLD = 60;
      const SPEED = 8;

      if (e.clientX < left + THRESHOLD)  container.scrollLeft -= SPEED;
      if (e.clientX > right - THRESHOLD) container.scrollLeft += SPEED;
    };

    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, [isDragging]);
}
\`\`\`

## Excel Export

Haftalık plan tek tıkla \`.xlsx\` olarak indirilebiliyor. SheetJS ile:

\`\`\`typescript
import * as XLSX from 'xlsx';

export function exportWeekToExcel(week: WeekData) {
  const rows = week.auditors.map(auditor => ({
    Denetçi: auditor.name,
    ...week.days.reduce((acc, day) => {
      const assignment = week.assignments.find(
        a => a.auditorId === auditor.id && isSameDay(a.date, day)
      );
      acc[format(day, 'dd.MM')] = assignment?.task ?? '';
      return acc;
    }, {} as Record<string, string>),
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Haftalık Plan');
  XLSX.writeFile(wb, \`plan-\${format(week.startDate, 'yyyy-MM-dd')}.xlsx\`);
}
\`\`\`

## Mimari Özet

\`\`\`
src/
├── components/   → GanttGrid, AuditorRow, AssignmentCell, StatsPanel
├── hooks/        → useDragSelect, useAutoScroll, useWeekNav
├── engine/       → PushEngine.ts (cascade logic)
├── services/     → api.ts (backend-ready, şimdilik mock)
└── utils/        → dateUtils.ts, slotUtils.ts
\`\`\`

Backend entegrasyonu için Spring Boot scaffold hazır; \`api.ts\` içindeki mock'lar gerçek endpoint'lerle değiştirildiğinde sistem ayağa kalkıyor.
    `
  },
  {
    id: 'mediator-pattern',
    title: 'Mediator Pattern: Nesneleri Birbirinden Ayırmak',
    date: '2025-12-01',
    tags: ['Design Patterns', 'Java', 'OOP'],
    summary: 'Mediator pattern, nesnelerin birbirleriyle doğrudan konuşması yerine merkezi bir aracı üzerinden iletişim kurmasını sağlar. MSTeamsClone projesinden gerçek bir örnek üzerinden inceliyoruz.',
    project: 'MSTeamsClone',
    projectUrl: 'https://github.com/gurcangul/MSTeamsClone',
    content: `
## Problem

Bir uygulama büyüdükçe nesneler birbirini doğrudan referanslamaya başlar. A → B, B → C, C → A gibi bir ağ oluşur. Birini değiştirmek hepsini etkiler.

## Çözüm: Mediator

Mediator pattern, her nesnenin sadece bir "aracı" nesneyi (mediator) bilmesini sağlar. Nesneler birbirine değil, mediatora mesaj gönderir. Mediator gerekli yönlendirmeyi yapar.

## MSTeamsClone'daki Uygulama

Projede \`UserMenu\`, takım işlemleri için doğrudan \`Team\` veya \`MeetingChannel\`'a bağlanmak yerine \`Mediator\` üzerinden konuşur.

\`\`\`java
// IMediator.java
public interface IMediator {
    void createTeam(String teamName, User owner);
    void addMemberToTeam(Team team, User user, User requestingUser);
    void removeMemberFromTeam(Team team, User user, User requestingUser);
    void createMeetingChannel(Team team, String channelName, boolean isPrivate);
}
\`\`\`

\`\`\`java
// Mediator.java — merkezi koordinatör
public class Mediator implements IMediator {
    private List<Team> teams;
    private List<User> users;

    @Override
    public void addMemberToTeam(Team team, User user, User requestingUser) {
        if (!team.getOwner().equals(requestingUser)) {
            throw new UnauthorizedUserOperationException(
                "Sadece takım sahibi üye ekleyebilir"
            );
        }
        team.addMember(user);
    }
}
\`\`\`

### Neden Faydalı?

- \`UserMenu\` sınıfı \`Team\` veya \`MeetingChannel\`'ın iç yapısını bilmiyor
- Yetki kontrolü tek bir yerden yönetiliyor
- Yeni bir işlem eklemek için sadece Mediator'a metod ekleniyor

## Özet

| Soru | Cevap |
|------|-------|
| **Sorun** | Nesneler arasında örümcek ağı bağımlılıklar |
| **Çözüm** | Merkezi bir koordinatör (Mediator) |
| **Avantaj** | Loose coupling, tek sorumluluk |
| **Dezavantaj** | Mediator büyüyünce God Object'e dönüşebilir |
    `
  },
  {
    id: 'factory-pattern',
    title: 'Factory Pattern: Nesne Üretimini Merkezileştirmek',
    date: '2025-12-08',
    tags: ['Design Patterns', 'Java', 'OOP'],
    summary: 'Factory pattern, nesne oluşturma sorumluluğunu bir fabrika sınıfına devreder. Trendyol Clone projesindeki UserFactory implementasyonunu inceliyoruz.',
    project: 'Trendyol Clone',
    projectUrl: 'https://github.com/gurcangul/Trendyol-Clone',
    content: `
## Problem

\`new Admin(...)\`, \`new Buyer(...)\`, \`new Seller(...)\` çağrıları kodun her yerine yayılırsa, rol eklediğinde onlarca yeri değiştirmek gerekir.

## Çözüm: Factory

Nesne oluşturmayı tek bir yere topla. İstemci kod sadece "bana şu tipte nesne ver" der, nasıl oluşturulduğunu bilmez.

## Trendyol Clone'daki Uygulama

\`\`\`java
// UserFactory.java
public class UserFactory {

    public User getUser(int userID, String userType,
                        String name, String email, String password) {

        return switch (userType.toLowerCase()) {
            case "admin"  -> new Admin(userID, name, email, password);
            case "buyer"  -> new Buyer(userID, name, email, password);
            case "seller" -> new Seller(userID, name, email, password);
            default       -> throw new IllegalArgumentException("Bilinmeyen kullanıcı tipi: " + userType);
        };
    }
}
\`\`\`

\`\`\`java
// Kullanım — istemci kod tipi bilmiyor
UserFactory factory = new UserFactory();
User user = factory.getUser(1, csvRow[1], csvRow[2], csvRow[3], csvRow[4]);
\`\`\`

### Buna Neden İhtiyaç Duyuldu?

CSV'den okunan her satır bir kullanıcı tipini temsil ediyor. \`Reader\` sınıfı her satırda \`userType\` string'ini alıyor ve \`UserFactory\`'ye veriyor. \`Reader\`, \`Admin\` sınıfını hiç import etmek zorunda kalmıyor.

## Factory Method vs Abstract Factory

| | Factory Method | Abstract Factory |
|---|---|---|
| **Kapsam** | Tek ürün ailesi | Birden fazla ürün ailesi |
| **Bu projede** | UserFactory (tek aile: User) | — |
| **Genişleme** | Yeni tip = fabrikaya 1 case | Yeni fabrika sınıfı gerekir |

## Özet

Factory pattern'ı şu durumlarda kullan:
- Nesne tipi runtime'da belli oluyorsa (dosyadan/DB'den okuma)
- Nesne oluşturma karmaşıksa ve tek yerde yönetmek istiyorsan
- Bağımlılıkları azaltmak istiyorsan
    `
  },
  {
    id: 'composite-pattern',
    title: 'Composite Pattern: Ağaç Yapısını Tek Arayüzle Yönetmek',
    date: '2025-12-15',
    tags: ['Design Patterns', 'Java', 'OOP'],
    summary: 'Composite pattern, tekil nesneler ve nesne gruplarını aynı arayüz üzerinden yönetmeni sağlar. Trendyol Clone\'daki ürün kategorisi ağacını örnek alıyoruz.',
    project: 'Trendyol Clone',
    projectUrl: 'https://github.com/gurcangul/Trendyol-Clone',
    content: `
## Problem

Bir ürün kataloğu hem kategorileri hem de ürünleri içeriyor. UI bir ürünü ve bir kategoriyi aynı şekilde listelemek istiyor ama bunlar farklı sınıflar.

## Çözüm: Composite

Hem "yaprak" (leaf) hem de "dal" (composite) aynı arayüzü implement eder. İstemci kod ikisi arasındaki farkı görmez.

\`\`\`
IProduct (interface)
├── Product   ← yaprak: getName(), getPrice()
└── Category  ← dal: getName(), add(IProduct), getChildren()
      ├── Product (Laptop)
      └── Category (Aksesuarlar)
            └── Product (Mouse)
\`\`\`

## Trendyol Clone'daki Uygulama

\`\`\`java
// IProduct.java
public interface IProduct {
    String getName();
    double getPrice();
}

// Product.java — yaprak
public class Product implements IProduct {
    private String name;
    private double price;
    private int stock;
    // Observable ile Observer pattern da var — aşağıya bak
}

// Category.java — dal
public class Category implements IProduct {
    private String name;
    private List<IProduct> children = new ArrayList<>();

    public void add(IProduct item)    { children.add(item); }
    public void remove(IProduct item) { children.remove(item); }

    @Override
    public double getPrice() {
        // Kategorinin "fiyatı" = tüm ürünlerin toplam fiyatı
        return children.stream().mapToDouble(IProduct::getPrice).sum();
    }
}
\`\`\`

### UI Tarafındaki Faydası

\`BuyerHomePageController\` sadece \`IProduct\` listesiyle çalışıyor:

\`\`\`java
for (IProduct item : rootCategory.getChildren()) {
    // item bir Product mu Category mi? Farketmez.
    listModel.addElement(item.getName());
}
\`\`\`

Kullanıcı "Elektronik" kategorisine tıklarsa alt öğeleri genişlet, "Laptop"a tıklarsa detayı göster — her ikisi de aynı \`getChildren()\` mantığıyla çalışır.

## Ne Zaman Kullan?

- Ağaç yapısı modelliyorsan (dosya sistemi, menüler, organizasyon şeması)
- "Parça" ve "bütün" aynı işlemleri destekliyorsa
- İstemcinin yaprak/dal farkını bilmesini istemiyorsan
    `
  },
  {
    id: 'observer-pattern',
    title: 'Observer Pattern: Olay Tabanlı Haberleşme',
    date: '2025-12-22',
    tags: ['Design Patterns', 'Java', 'OOP'],
    summary: 'Observer pattern, bir nesnedeki değişikliği bağımlı nesnelere otomatik olarak bildiren publish-subscribe mekanizmasıdır. Gerçek dünya analogları ve kod örnekleri.',
    project: 'Trendyol Clone',
    projectUrl: 'https://github.com/gurcangul/Trendyol-Clone',
    content: `
## Gerçek Dünya Analogu

YouTube'da bir kanala abone oluyorsun. Kanal yeni video yüklediğinde sen otomatik bildirim alıyorsun. Kanalın seni tanıması gerekmiyor — sadece "abone listesi" var.

- **Subject (Yayıncı):** YouTube kanalı = \`Product\`
- **Observer (Abone):** Sen = Seller dashboard, Buyer watchlist
- **Olay:** Stok değişikliği, favori sayısı değişikliği

## Trendyol Clone'daki Uygulama

Java'nın built-in \`Observable\` sınıfı kullanılmış:

\`\`\`java
// Product.java — Subject
public class Product extends Observable implements IProduct {
    private int stock;
    private int numberOfFavorite;

    public void setStock(int stock) {
        this.stock = stock;
        setChanged();           // "değişti" bayrağını koy
        notifyObservers(this);  // tüm observer'lara haber ver
    }

    public void setNumberOfFavorite(int count) {
        this.numberOfFavorite = count;
        setChanged();
        notifyObservers(this);
    }
}
\`\`\`

\`\`\`java
// SellerHomePageController.java — Observer
public class SellerHomePageController implements Observer {

    @Override
    public void update(Observable o, Object arg) {
        if (o instanceof Product product) {
            // Ürün değişti, UI'ı güncelle
            refreshProductTable(product);
        }
    }
}

// Observer'ı kaydet
product.addObserver(sellerController);
\`\`\`

### Akış Şeması

\`\`\`
Buyer "Sepete Ekle" → Product.setStock(stock-1)
                           ↓ setChanged() + notifyObservers()
                    SellerDashboard.update()  → tabloyu yenile
                    BuyerWatchlist.update()   → favori sayısını güncelle
\`\`\`

## Modern Java'da Observer

Java'nın \`Observable\` sınıfı Java 9'da deprecated oldu. Günümüzde şu alternatifler kullanılıyor:

| Yöntem | Kullanım |
|--------|---------|
| \`java.beans.PropertyChangeSupport\` | Swing uygulamaları |
| Guava EventBus | Genel amaçlı |
| Spring \`@EventListener\` | Spring Boot uygulamaları |
| RxJava / Project Reactor | Reaktif akışlar |

Spring Boot'ta:

\`\`\`java
// Event yayınla
applicationEventPublisher.publishEvent(new StockChangedEvent(product));

// Dinle
@EventListener
public void onStockChanged(StockChangedEvent event) {
    log.info("Stok değişti: {}", event.getProduct().getName());
}
\`\`\`
    `
  },
  {
    id: 'singleton-pattern',
    title: 'Singleton Pattern: Tek Örnek Garantisi',
    date: '2026-01-05',
    tags: ['Design Patterns', 'Java', 'Spring Boot'],
    summary: 'Singleton pattern bir sınıftan sadece bir örnek oluşturulmasını garanti eder. Spring Bean\'lerin varsayılan scope\'u Singleton\'dır — bunu bilerek kullanmak önemlidir.',
    project: 'Employee Management',
    projectUrl: 'https://github.com/gurcangul/sturdy-eureka',
    content: `
## Singleton Nedir?

Bir sınıfın JVM içinde sadece bir örneğinin bulunmasını sağlayan pattern. Global bir erişim noktası sunar.

## Klasik Java Implementasyonu

\`\`\`java
// Thread-safe Singleton (Bill Pugh Holder idiom)
public class DatabaseConnectionPool {

    private DatabaseConnectionPool() {}  // dışarıdan new yapılamaz

    private static class Holder {
        static final DatabaseConnectionPool INSTANCE = new DatabaseConnectionPool();
    }

    public static DatabaseConnectionPool getInstance() {
        return Holder.INSTANCE;
    }
}

// Kullanım
DatabaseConnectionPool pool = DatabaseConnectionPool.getInstance();
\`\`\`

## Spring Boot'ta Singleton

Spring'de \`@Service\`, \`@Repository\`, \`@Component\` annotationları ile işaretlenen her sınıf varsayılan olarak **Singleton** scope'ta oluşturulur. Spring IoC Container bunu senin için yönetir.

\`\`\`java
@Service  // → Spring bu sınıftan tek bir bean oluşturur
public class EmployeeServiceImpl implements EmployeeService {
    // ...
}
\`\`\`

\`\`\`java
@RestController
public class EmployeeController {

    // Spring her injection noktasına AYNI bean'i verir
    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }
}
\`\`\`

**Bunu elle yazmana gerek yok** — \`@Bean\` scope'u \`singleton\` olduğu sürece Spring halleder.

## Singleton'ın Tuzakları

### 1. Mutable state — tehlikeli

\`\`\`java
@Service
public class CartService {
    // YANLIŞ: Singleton'da instance variable, tüm kullanıcılar paylaşır!
    private List<Item> cart = new ArrayList<>();
}
\`\`\`

### 2. Thread safety

Singleton'da paylaşılan state varsa mutlaka \`synchronized\` veya \`AtomicReference\` kullan.

### 3. Test zorluğu

Singleton'lar test izolasyonunu bozar. Spring'de \`@MockBean\` ile bu problem aşılır.

## Ne Zaman Kullan?

✅ Configuration nesneleri
✅ Connection pool'lar
✅ Cache yöneticileri
✅ Logger instance'ları

❌ Kullanıcıya özel state tutan sınıflar
❌ Sık değişen bağımlılıklar
    `
  },
  {
    id: 'strategy-pattern',
    title: 'Strategy Pattern: Algoritmaları Değiştirilebilir Yapmak',
    date: '2026-01-12',
    tags: ['Design Patterns', 'Java', 'Spring Boot'],
    summary: 'Strategy pattern, bir algoritmayı aynı arayüzü paylaşan farklı sınıflara taşır. Runtime\'da hangi algoritmanın çalışacağını seçmeni sağlar.',
    project: 'Employee Management',
    projectUrl: 'https://github.com/gurcangul/sturdy-eureka',
    content: `
## Problem

Bir rapor üretici düşün: PDF, Excel, CSV çıktısı verebiliyor. Bunları \`if-else\` ile yazmak hem okunaksız hem de yeni format eklemek için mevcut kodu değiştirmek gerekiyor (Open/Closed Principle ihlali).

## Çözüm: Strategy

Her algoritma (format) ayrı bir sınıfa taşınır. Hepsi aynı arayüzü implement eder. Context sınıfı hangi stratejiyi kullanacağını bilir, nasıl çalıştığını değil.

## Java Örneği — Çalışan Raporu

\`\`\`java
// Strategy arayüzü
public interface ReportExporter {
    byte[] export(List<EmployeeDto> employees);
    String getContentType();
    String getFileExtension();
}

// Concrete Strategy 1
@Component
public class CsvExporter implements ReportExporter {
    @Override
    public byte[] export(List<EmployeeDto> employees) {
        StringBuilder sb = new StringBuilder("Ad,Soyad,Departman\\n");
        employees.forEach(e ->
            sb.append(e.getFirstName()).append(',')
              .append(e.getLastName()).append(',')
              .append(e.getDepartment()).append('\\n')
        );
        return sb.toString().getBytes(StandardCharsets.UTF_8);
    }

    @Override public String getContentType()   { return "text/csv"; }
    @Override public String getFileExtension() { return ".csv"; }
}

// Concrete Strategy 2
@Component
public class ExcelExporter implements ReportExporter {
    @Override
    public byte[] export(List<EmployeeDto> employees) {
        // Apache POI ile Excel oluştur
        // ...
    }
    @Override public String getContentType()   { return "application/vnd.ms-excel"; }
    @Override public String getFileExtension() { return ".xlsx"; }
}
\`\`\`

\`\`\`java
// Context — Spring'de Map injection
@Service
@RequiredArgsConstructor
public class ReportService {

    // Spring, ReportExporter'ı implement eden tüm bean'leri otomatik inject eder
    private final Map<String, ReportExporter> exporters;
    //             ^class adı   ^bean

    public byte[] export(String format, List<EmployeeDto> employees) {
        ReportExporter exporter = exporters.get(format + "Exporter");
        if (exporter == null) throw new IllegalArgumentException("Desteklenmeyen format: " + format);
        return exporter.export(employees);
    }
}
\`\`\`

\`\`\`java
// Controller
@GetMapping("/export")
public ResponseEntity<byte[]> export(
        @RequestParam String format,
        @RequestParam(defaultValue = "0") int page) {

    List<EmployeeDto> employees = employeeService.list(page, 1000, "id", "ASC").getContent();
    ReportExporter exporter = reportService.getExporter(format);
    byte[] data = exporter.export(employees);

    return ResponseEntity.ok()
        .contentType(MediaType.parseMediaType(exporter.getContentType()))
        .header("Content-Disposition", "attachment; filename=employees" + exporter.getFileExtension())
        .body(data);
}
\`\`\`

## Yeni Format Eklemek

Artık mevcut kodu değiştirmiyorsun — sadece yeni bir \`ReportExporter\` sınıfı yazıp \`@Component\` koyuyorsun. Spring onu otomatik olarak \`exporters\` map'ine ekliyor.

## Strategy vs. Switch/If-Else

| | Switch/If-Else | Strategy |
|---|---|---|
| Yeni format ekle | Mevcut kodu değiştir | Yeni sınıf ekle |
| Test | Tüm dalları test et | Her sınıfı izole test et |
| Okunabilirlik | Karmaşıklaşır | Her sınıf tek amaca odaklı |
    `
  },
  {
    id: "chain-of-responsibility-pattern",
    title: "Chain of Responsibility: Ödeme Doğrulama Hattı",
    date: "2026-01-19",
    tags: ["Design Patterns", "Java", "Spring Boot", "Fintech"],
    summary: "Bir ödeme onaylanmadan önce limit, bakiye, KYC ve fraud kontrollerinden sırayla geçmeli. İç içe if/else yerine Chain of Responsibility ile kurulan bir doğrulama hattını payment-engine projesinden inceliyoruz.",
    project: 'payment-engine',
    projectUrl: 'https://github.com/gurcangul/payment-engine',
    content: `
## Problem

Bir ödeme onaylanmadan önce sırayla birçok kuraldan geçmeli: limit kontrolü, bakiye yeterliliği, KYC uyumu, fraud (dolandırıcılık) skoru... Bunları tek bir metotta iç içe \`if/else\` ile yazarsan:

- Metot okunamaz hale gelir
- Yeni bir kural eklemek mevcut kodu değiştirmeyi gerektirir (Open/Closed ihlali)
- Kuralların sırasını değiştirmek riskli olur

## Çözüm: Chain of Responsibility

Her kuralı ayrı bir "halka" (handler) yap. Her halka tek bir kontrolü bilir ve sonucu bir sonrakine devreder. Bir halka isteği reddederse zincir orada kırılır.

\`payment-engine\` projesinde doğrulama hattı tam olarak böyle kurulu.

## Handler Tabanı

Akışın mantığı (sıradakine devret / zinciri kır) tek bir yerde, taban sınıfta toplanır:

\`\`\`java
public abstract class PaymentValidator {

    private PaymentValidator next;

    public PaymentValidator setNext(PaymentValidator next) {
        this.next = next;
        return next; // zincirlemeyi kolaylaştırır
    }

    public final ValidationResult validate(Payment payment) {
        ValidationResult result = check(payment);
        if (!result.passed()) {
            return result;                  // başarısız -> zincir burada durur
        }
        if (next != null) {
            return next.validate(payment);  // başarılı -> sıradaki halkaya devret
        }
        return ValidationResult.ok();       // zincirin sonu, hepsi geçti
    }

    // Somut doğrulayıcının tek sorumluluğu: kendi kontrolü
    protected abstract ValidationResult check(Payment payment);
}
\`\`\`

## Somut Halkalar

Her doğrulayıcı sadece kendi işine bakar — diğer halkalardan ve sıradan habersizdir:

\`\`\`java
@Component
public class BalanceValidator extends PaymentValidator {

    private final CustomerRepository customers;

    public BalanceValidator(CustomerRepository customers) {
        this.customers = customers;
    }

    @Override
    protected ValidationResult check(Payment payment) {
        var customer = customers.findById(payment.getCustomerId());
        if (customer.isEmpty()) {
            return ValidationResult.fail("CUSTOMER_NOT_FOUND", "Müşteri bulunamadı");
        }
        if (customer.get().balance().compareTo(payment.getAmount()) < 0) {
            return ValidationResult.fail("INSUFFICIENT_BALANCE", "Yetersiz bakiye");
        }
        return ValidationResult.ok();
    }
}
\`\`\`

## Zinciri Kurmak

Sıralama tek bir yerde tanımlı — akışı değiştirmek demek bu sırayı değiştirmek demek:

\`\`\`java
@Configuration
public class ValidationChainConfig {

    @Bean
    public PaymentValidator validationChain(LimitValidator limit,
                                            BalanceValidator balance,
                                            KycValidator kyc,
                                            FraudValidator fraud) {
        limit.setNext(balance).setNext(kyc).setNext(fraud);
        return limit; // zincirin başı
    }
}
\`\`\`

Spring tüm doğrulayıcıları \`@Component\` olarak yönetir; config sınıfı onları sıraya dizip tek bir \`PaymentValidator\` bean'i (zincirin başı) üretir. Servis sadece bu başı çağırır ve sonucu State makinesine bağlar:

\`\`\`java
ValidationResult result = validationChain.validate(payment);
if (!result.passed()) {
    payment.fail(result.message());   // State: PENDING -> FAILED
    throw new PaymentValidationException(result);
}
payment.authorize();                  // State: PENDING -> AUTHORIZED
\`\`\`

## Yeni Kural Eklemek

Diyelim ki "günlük işlem adedi limiti" eklemek istiyorsun. Mevcut hiçbir sınıfa dokunmazsın:

- \`VelocityValidator extends PaymentValidator\` sınıfını yaz
- \`@Component\` ile işaretle
- \`ValidationChainConfig\`'te zincirdeki sırasına ekle

## Özet

| Soru | Cevap |
|------|-------|
| **Sorun** | Çok sayıda sıralı kural, iç içe if/else |
| **Çözüm** | Her kural ayrı bir halka, sırayla devreden zincir |
| **Avantaj** | Open/Closed, tek sorumluluk, sıra tek yerde tanımlı |
| **Dezavantaj** | İstek zincirin sonuna kadar gezebilir; debug için akış takibi gerekir |

Bu deseni Servlet \`Filter\` zincirinde, Spring Security filter chain'inde ve hemen her ödeme/risk motorunda görürsün.
`
  },
  {
    id: "state-pattern",
    title: "State Pattern: Ödeme Durum Makinesi",
    date: "2026-01-26",
    tags: ["Design Patterns", "Java", "Spring Boot", "Fintech"],
    summary: "Bir ödeme PENDING, AUTHORIZED, CAPTURED, SETTLED, REFUNDED durumları arasında geçer ama her geçiş geçerli değildir. switch(status) bloklari yerine State pattern ile geçersiz geçişleri tasarım engeller.",
    project: 'payment-engine',
    projectUrl: 'https://github.com/gurcangul/payment-engine',
    content: `
## Gerçek Dünya Analogu

Bir ödeme, yaşam döngüsü boyunca belirli durumlardan geçer: yetkilendirildi, tahsil edildi, mutabakat yapıldı, iade edildi. Ama her geçiş geçerli değildir — mutabakatı tamamlanmış (SETTLED) bir ödemeyi yeniden "tahsil et" diyemezsin.

## Problem

Durumu bir \`enum\` ile tutup her işlemde kontrol edersen, kod \`switch(status)\` bloklarıyla dolar:

\`\`\`java
public void capture(Payment p) {
    switch (p.getStatus()) {
        case AUTHORIZED -> p.setStatus(CAPTURED);
        case PENDING    -> throw new IllegalStateException("önce yetkilendir");
        case SETTLED    -> throw new IllegalStateException("zaten tahsil edildi");
        // ... ve aynı switch capture, settle, refund metotlarında tekrar eder
    }
}
\`\`\`

Yeni bir durum eklediğinde \`capture\`, \`settle\`, \`refund\`... hepsindeki switch'i güncellemen gerekir. Bir geçişi kolayca unutursun.

## Çözüm: State Pattern

Her durumu ayrı bir sınıf yap. Her durum, o durumdayken hangi geçişlerin geçerli olduğunu kendisi bilir. Ödeme (context) işi o anki duruma devreder.

## Arayüz ve Akıllı Taban

\`\`\`java
public interface PaymentState {
    PaymentStatus status();
    void authorize(Payment payment);
    void capture(Payment payment);
    void settle(Payment payment);
    void refund(Payment payment);
    void fail(Payment payment, String reason);
}
\`\`\`

Püf noktası: tüm geçişleri varsayılan olarak "geçersiz" kabul eden bir taban sınıf. Somut durumlar yalnızca izin verdikleri geçişi override eder:

\`\`\`java
public abstract class AbstractPaymentState implements PaymentState {
    @Override public void authorize(Payment p)      { throw illegal("authorize"); }
    @Override public void capture(Payment p)        { throw illegal("capture"); }
    @Override public void settle(Payment p)         { throw illegal("settle"); }
    @Override public void refund(Payment p)         { throw illegal("refund"); }
    @Override public void fail(Payment p, String r) { throw illegal("fail"); }

    protected IllegalStateTransitionException illegal(String action) {
        return new IllegalStateTransitionException(status(), action);
    }
}
\`\`\`

## Somut Durumlar

Her durum sınıfı sadece kendi geçerli geçişlerini içerir — gerisi otomatik olarak yasaktır:

\`\`\`java
public final class AuthorizedState extends AbstractPaymentState {

    public static final AuthorizedState INSTANCE = new AuthorizedState();
    private AuthorizedState() {}

    @Override public PaymentStatus status() { return PaymentStatus.AUTHORIZED; }

    @Override public void capture(Payment p) {
        p.transitionTo(CapturedState.INSTANCE);   // izin verilen geçiş
    }
    @Override public void fail(Payment p, String reason) {
        p.markFailureReason(reason);
        p.transitionTo(FailedState.INSTANCE);
    }
    // authorize/settle/refund override edilmedi -> AbstractState yasaklar
}
\`\`\`

## Context: Payment

Ödeme "nasıl" geçileceğini bilmez; niyeti o anki duruma yönlendirir:

\`\`\`java
public class Payment {
    private PaymentState state = PendingState.INSTANCE;

    public void authorize() { state.authorize(this); }
    public void capture()   { state.capture(this); }
    public void settle()    { state.settle(this); }
    public void refund()    { state.refund(this); }

    public void transitionTo(PaymentState newState) {
        this.state = newState;
        history.add(newState.status());   // geçiş geçmişini tut
    }
}
\`\`\`

## Geçiş Haritası

\`\`\`
PENDING --authorize--> AUTHORIZED --capture--> CAPTURED --settle--> SETTLED
  |                        |                       |                   |
  +--> FAILED              +--> FAILED             +------refund------> REFUNDED
\`\`\`

Geçersiz bir geçiş denendiğinde (örn. PENDING'ken \`capture\`), kararı context değil durum sınıfı verir ve \`IllegalStateTransitionException\` fırlatır. REST katmanında bu \`409 Conflict\`'e map edilir.

## State vs. Enum + switch

| | Enum + switch | State pattern |
|---|---|---|
| Yeni durum ekle | Tüm switch'leri güncelle | Yeni sınıf ekle |
| Geçersiz geçiş | Elle kontrol, unutulabilir | Varsayılan olarak yasak |
| İlgili mantık | Metotlara dağılır | Tek durum sınıfında toplanır |
| Test | Tüm dallar | Her durum izole |

## Ne Zaman Kullan?

- Bir nesnenin davranışı durumuna göre köklü değişiyorsa
- Geçişlerin sıkı kurallara bağlı olduğu akışlarda (ödeme, sipariş, onay süreci)
- \`switch(status)\` blokları kodun her yerine yayılmaya başladıysa
`
  },
];
