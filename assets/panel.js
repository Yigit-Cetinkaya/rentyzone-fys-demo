(function () {
  'use strict';

  const paths = {
    home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M16 3v4M8 3v4M3 11h18M8 15h2M14 15h2"/>',
    'calendar-plus': '<path d="M21 11V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6M16 3v4M8 3v4M3 11h18M18 15v6M15 18h6"/>',
    'calendar-x': '<path d="M21 11V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6M16 3v4M8 3v4M3 11h18m12 4 6 6m0-6-6 6"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Zm0 0v6h6M8 13h8M8 17h5"/>',
    'file-plus': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Zm0 0v6h6M12 12v6M9 15h6"/>',
    'file-check': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Zm0 0v6h6m-11 7 2 2 4-4"/>',
    edit: '<path d="m16 3 5 5M4 15 16 3a2 2 0 0 1 3 0l2 2a2 2 0 0 1 0 3L9 20l-6 1Zm0 0 5 5M13 21h8"/>',
    switch: '<path d="M3 7h17m-4-4 4 4-4 4M21 17H4m4-4-4 4 4 4"/>',
    ticket: '<path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4ZM15 5v3m0 3v2m0 3v3"/>',
    'ticket-check': '<path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4Zm5 5 3 3 5-6"/>',
    user: '<circle cx="10" cy="7" r="4"/><path d="M2 21v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2M20 7v6M17 10h6"/>',
    building: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h1m4 0h1M9 11h1m4 0h1M10 21v-6h4v6"/>',
    wallet: '<path d="M20 8V5a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h15v12H5a3 3 0 0 1-3-3V6m18 6h-5v6h5M16 15h.01"/>',
    income: '<path d="M3 17V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2ZM7 9H3m18 0h-4M7 15H3m18 0h-4"/><circle cx="12" cy="12" r="3"/>',
    receipt: '<path d="M5 3 7 5l2-2 3 2 3-2 2 2 2-2v18l-2-2-2 2-3-2-3 2-2-2-2 2ZM9 9h6M9 13h6M9 17h3"/>',
    car: '<path d="m5 7 2-4h10l2 4 2 5v7H3v-7Zm0 0h14M3 12h18M6 19v2M18 19v2M7 15h1m8 0h1"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    x: '<path d="m6 6 12 12M6 18 18 6"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    'chevron-right': '<path d="m9 5 7 7-7 7"/>',
    arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
    lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V6a4 4 0 0 1 8 0v4M12 14v3"/>',
    layers: '<path d="m12 3 10 5-10 5L2 8Zm-10 9 10 5 10-5M2 17l10 5 10-5"/>'
  };
  const icon = (name) => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (paths[name] || paths.file) + '</svg>';
  const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const pricing = window.RentyzonePricing;

  const groups = [
    { title: '', items: [{ id: 'ana-sayfa', title: 'Ana Sayfa', icon: 'home' }] },
    { title: 'Rezervasyon İşlemleri', items: [
      { id: 'rezervasyon-girisi', title: 'Rezervasyon Girişi', icon: 'calendar-plus', kind: 'reservation', description: 'İlgili tarafları, araç grubunu ve fiyat kodunu hazırlayın.' },
      { id: 'rezervasyon-iptal', title: 'Rezervasyon İptal', icon: 'calendar-x', kind: 'selection', record: 'rezervasyon', action: 'iptal etmek', description: 'İptal edilecek rezervasyonu bulun ve işlem detaylarını inceleyin.' }
    ] },
    { title: 'Sözleşme İşlemleri', items: [
      { id: 'sozlesme-acma', title: 'Sözleşme Açma', icon: 'file-plus', kind: 'contract', description: 'Kiralama sözleşmesi için müşteri ve teslimat bilgilerini hazırlayın.' },
      { id: 'sozlesme-kapama', title: 'Sözleşme Kapama', icon: 'file-check', kind: 'selection', record: 'sözleşme', action: 'kapatmak', description: 'Araç iadesi ve kapanış işlemleri için açık sözleşmeyi seçin.' },
      { id: 'sozlesme-duzeltme', title: 'Sözleşme Düzeltme', icon: 'edit', kind: 'selection', record: 'sözleşme', action: 'düzeltmek', description: 'Bilgilerini güncellemek istediğiniz sözleşmeyi bulun.' },
      { id: 'sozlesme-plaka-degistirme', title: 'Sözleşme Plaka Değiştirme', icon: 'switch', kind: 'selection', record: 'sözleşme', action: 'plakasını değiştirmek', description: 'Araç değişikliği yapılacak sözleşmeyi seçin.' }
    ] },
    { title: 'Pass Bilet İşlemleri', items: [
      { id: 'pass-bilet-acma', title: 'Pass Bilet Açma', icon: 'ticket', kind: 'pass', description: 'Yeni Pass bilet için müşteri ve bilet bilgilerini hazırlayın.' },
      { id: 'pass-bilet-kapama', title: 'Pass Bilet Kapama', icon: 'ticket-check', kind: 'selection', record: 'Pass bilet', action: 'kapatmak', description: 'Kapatılacak Pass bileti bulun ve detaylarını inceleyin.' },
      { id: 'pass-bilet-duzeltme', title: 'Pass Bilet Düzeltme', icon: 'edit', kind: 'selection', record: 'Pass bilet', action: 'düzeltmek', description: 'Bilgilerini güncellemek istediğiniz Pass bileti seçin.' }
    ] },
    { title: 'Cari İşlemleri', items: [
      { id: 'kisi-kaydi-olustur', title: 'Kişi Kaydı Oluştur', icon: 'user', kind: 'person', description: 'Bireysel müşteri bilgilerini tek bir kayıt altında toplayın.' },
      { id: 'cari-kaydi-olustur', title: 'Cari Kaydı Oluştur', icon: 'building', kind: 'account', description: 'Firma ve cari hesap bilgilerini hazırlayın.' }
    ] },
    { title: 'Teknik', items: [
      { id: 'arac-bilgileri-tanimlama', title: 'Araç Bilgileri Tanımlama', icon: 'car', kind: 'vehicle', description: 'Filoya ait araçların temel ve teknik bilgilerini hazırlayın.' },
      { id: 'filo-listesi', title: 'Filo Listesi', icon: 'layers', kind: 'fleet', description: 'Filonuzdaki araçları ve mevcut durumlarını inceleyin.' },
      { id: 'oto-hareket-raporu', title: 'Oto Hareket Raporu', icon: 'switch', kind: 'vehicle-report', description: 'Araçların teslimat, iade ve diğer hareketlerini tarih aralığına göre inceleyin.' }
    ] },
    { title: 'Muhasebe İşlemleri', items: [
      { id: 'tahsilat-tediye-girisi', title: 'Tahsilat/Tediye Girişi', icon: 'income', kind: 'payment', description: 'Cari hesapların tahsilat ve tediye bilgilerini hazırlayın.' },
      { id: 'masraf-listesi-girisi', title: 'Masraf Listesi Girişi', icon: 'receipt', kind: 'expense', description: 'Araç ve operasyon masraflarını kayıt altına almak için hazırlayın.' },
      { id: 'kasa-islemleri', title: 'Kasa İşlemleri', icon: 'wallet', kind: 'cash', description: 'Kasa giriş ve çıkış işlemlerini yönetin.' }
    ] },
    { title: 'Ayarlar', items: [
      { id: 'fiyat-kodu-olusturma', title: 'Fiyat Kodu oluşturma', icon: 'receipt', kind: 'price-code', description: 'Araç grupları için günlük, haftalık, aylık ve yıllık tarifeleri düzenleyin.' }
    ] }
  ];
  const pages = groups.flatMap((group) => group.items.map((item) => ({ ...item, group: group.title })));
  const main = document.getElementById('main-content');
  const sidebar = document.getElementById('sidebar');
  const appShell = document.getElementById('app-shell');
  const menuToggle = document.getElementById('menu-toggle');
  const backdrop = document.getElementById('sidebar-backdrop');
  const searchDialog = document.getElementById('search-dialog');
  const searchInput = document.getElementById('menu-search');
  const searchResults = document.getElementById('search-results');
  const mobileQuery = window.matchMedia('(max-width: 760px)');
  let currentPage = null;
  let operationTab = 'all';
  let operationPeriod = 'today';

  document.querySelectorAll('[data-icon]').forEach((element) => { element.innerHTML = icon(element.dataset.icon); });
  document.getElementById('navigation').innerHTML = groups.map((group, index) => '<section class="nav-section"' + (group.title ? ' aria-labelledby="nav-group-' + index + '"' : '') + '>' + (group.title ? '<h2 id="nav-group-' + index + '">' + group.title + '</h2>' : '') + group.items.map((item) => '<a class="nav-link" href="#/' + item.id + '" data-page="' + item.id + '">' + icon(item.icon) + '<span>' + item.title + '</span></a>').join('') + '</section>').join('');
  const date = new Date();
  document.getElementById('current-year').textContent = new Intl.DateTimeFormat('en', { year: 'numeric', timeZone: 'Europe/Istanbul' }).format(date);

  function link(id, text, css, symbol) {
    return '<a href="#/' + id + '" class="' + (css || 'text-link') + '">' + (symbol ? icon(symbol) : '') + text + '</a>';
  }

  const tabDefinitions = [
    { id: 'all', title: 'Tüm işlemler', icon: 'calendar', empty: 'Operasyonlar burada görünecek', description: 'Rezervasyon, teslimat ve iade hareketleriniz veri bağlantısı tamamlandığında bu alanda listelenecek.', link: 'rezervasyon-girisi', action: 'Rezervasyon Girişi' },
    { id: 'reservations', title: 'Rezervasyonlar', icon: 'calendar-plus', empty: 'Rezervasyon verisi bekleniyor', description: 'Seçilen dönemdeki rezervasyonlar veri bağlantısı tamamlandığında burada görüntülenecek.', link: 'rezervasyon-girisi', action: 'Rezervasyon Girişi' },
    { id: 'contracts', title: 'Sözleşmeler', icon: 'file', empty: 'Sözleşme verisi bekleniyor', description: 'Seçilen dönemdeki teslimat ve iadeler veri bağlantısı tamamlandığında burada görüntülenecek.', link: 'sozlesme-acma', action: 'Sözleşme Açma' },
    { id: 'passes', title: 'Pass biletler', icon: 'ticket', empty: 'Pass bilet verisi bekleniyor', description: 'Seçilen dönemdeki Pass biletler veri bağlantısı tamamlandığında burada görüntülenecek.', link: 'pass-bilet-acma', action: 'Pass Bilet Açma' }
  ];
  function operationContent() {
    const tab = tabDefinitions.find((item) => item.id === operationTab);
    const periodText = { today: 'Bugün', week: 'Bu hafta', month: 'Bu ay' }[operationPeriod];
    return '<div class="table-wrap"><table class="operations-table"><caption class="sr-only">' + periodText + ' · ' + tab.title + '</caption><thead><tr><th scope="col">İşlem</th><th scope="col">Müşteri</th><th scope="col">Araç / Plaka</th><th scope="col">Tarih</th><th scope="col">Durum</th></tr></thead><tbody><tr><td colspan="5"><div class="empty-state"><span class="empty-visual">' + icon(tab.icon) + '</span><h3>' + tab.empty + '</h3><p>' + tab.description + '</p>' + link(tab.link, tab.action + icon('arrow')) + '</div></td></tr></tbody></table></div>';
  }

  function dashboard() {
    const metrics = [
      ['Toplam araç', 'car'], ['Aktif sözleşme', 'file-check'], ['Bekleyen rezervasyon', 'calendar'], ['Açık Pass bilet', 'ticket']
    ];
    return '<section class="metrics" aria-label="Filo özeti">' + metrics.map(([title, symbol]) => '<article class="metric"><div class="metric-head"><h2>' + title + '</h2><span class="metric-icon">' + icon(symbol) + '</span></div><span class="metric-value" aria-label="Veri henüz bağlı değil">—</span><div class="metric-foot">' + icon('clock') + 'Veri bağlantısı bekleniyor</div></article>').join('') + '</section>' +
      '<section class="panel operations-panel" aria-labelledby="operations-title"><div class="panel-header"><div><h2 class="panel-title" id="operations-title">Günlük operasyon</h2><p class="panel-description" id="period-description">Bugünün rezervasyon, teslimat ve iade akışı</p></div><select class="period-select" id="operation-period" aria-label="Operasyon dönemi"><option value="today">Bugün</option><option value="week">Bu hafta</option><option value="month">Bu ay</option></select></div>' +
      '<div class="tabs" role="tablist" aria-label="Operasyon türü">' + tabDefinitions.map((tab, index) => '<button class="tab' + (index === 0 ? ' active' : '') + '" type="button" role="tab" id="tab-' + tab.id + '" data-tab="' + tab.id + '" aria-selected="' + (index === 0) + '" aria-controls="operations-content" tabindex="' + (index === 0 ? '0' : '-1') + '">' + tab.title + '</button>').join('') + '</div><div id="operations-content" role="tabpanel" tabindex="0" aria-labelledby="tab-all">' + operationContent() + '</div><div class="panel-foot">' + icon('info') + 'Veriler bağlandığında operasyon özeti otomatik güncellenecek.</div></section>';
  }

  // These are UI-only forms. Do not connect the public reservation proxy to
  // privileged admin actions; an authenticated and authorized FYS API is needed.
  const field = (name, label, type, options = {}) => ({ name, label, type: type || 'text', ...options });
  const customerField = () => field('customer', 'Müşteri / Cari', 'select', { disabled: true, options: ['Müşteri listesi bağlantı bekliyor'] });
  const vehicleField = () => field('vehicle', 'Araç / Plaka', 'select', { disabled: true, options: ['Araç listesi bağlantı bekliyor'] });
  const vehicleGroupField = () => field('vehicle_group', 'Araç Grubu', 'select', { options: ['Araç grubu seçin', ...pricing.groups] });
  const priceCodeField = () => field('price_code', 'Fiyat Kodu', 'select', { disabled: true, options: ['Önce araç grubu seçin'] });
  const noteField = () => field('notes', 'Açıklama', 'textarea', { full: true, placeholder: 'İşlemle ilgili notlarınızı yazın...', max: 2000 });
  const dateField = (name, label) => field(name, label, 'date');
  const amountField = () => field('amount', 'Tutar (₺)', 'number', { placeholder: '0,00', min: '0.01', step: '0.01' });
  const formDefinitions = {
    reservation: [
      { title: 'Araç grubu ve fiyatlandırma', description: 'Rezervasyon araç grubuna göre hazırlanır; plaka sözleşme açılışında eşleştirilir.', fields: [vehicleGroupField(), priceCodeField()], extra: '<div id="reservation-prices" class="price-preview" aria-live="polite"></div>' },
      { title: 'Rezervasyon bilgileri', description: 'Kiralama planına ait tarihler ve ofisler.', fields: [dateField('pickup_date', 'Alış tarihi'), field('pickup_time', 'Alış saati', 'time'), dateField('return_date', 'Dönüş tarihi'), field('return_time', 'Dönüş saati', 'time'), field('pickup_branch', 'Alış ofisi', 'select', { disabled: true, options: ['Ofis listesi bağlantı bekliyor'] }), field('return_branch', 'Dönüş ofisi', 'select', { disabled: true, options: ['Ofis listesi bağlantı bekliyor'] }), noteField()] }
    ],
    contract: [{ title: 'Sözleşme bilgileri', description: 'Araç eşleştirmesi ve teslimat detayları.', fields: [vehicleField(), field('reservation_number', 'Rezervasyon numarası', 'text', { placeholder: 'Varsa rezervasyon numarası' }), dateField('delivery_date', 'Teslim tarihi'), dateField('return_date', 'Planlanan iade tarihi'), field('delivery_km', 'Teslim kilometresi', 'number', { min: '0', placeholder: '0' }), noteField()] }],
    pass: [{ title: 'Pass bilet bilgileri', description: 'Biletin bağlı olduğu müşteri ve işlem detayları.', fields: [customerField(), field('reference', 'Referans numarası', 'text', { placeholder: 'Varsa referans numarası' }), dateField('issue_date', 'Düzenleme tarihi'), dateField('valid_until', 'Geçerlilik tarihi'), noteField()] }],
    person: [
      { title: 'Kişisel bilgiler', description: 'Müşterinin kimlik ve iletişim bilgileri.', fields: [field('first_name', 'Ad', 'text', { placeholder: 'Ad', autocomplete: 'given-name' }), field('last_name', 'Soyad', 'text', { placeholder: 'Soyad', autocomplete: 'family-name' }), field('identity', 'T.C. kimlik / Pasaport numarası', 'text', { placeholder: 'Kimlik veya pasaport numarası', max: 30 }), dateField('birth_date', 'Doğum tarihi'), field('phone', 'Telefon', 'tel', { placeholder: '+90 5XX XXX XX XX', autocomplete: 'tel' }), field('email', 'E-posta', 'email', { placeholder: 'ornek@eposta.com', autocomplete: 'email' })] },
      { title: 'Adres ve ek bilgiler', description: 'Müşteri kaydına ait diğer bilgiler.', fields: [field('address', 'Adres', 'textarea', { full: true, placeholder: 'Açık adres', autocomplete: 'street-address' }), noteField()] }
    ],
    account: [{ title: 'Cari hesap bilgileri', description: 'Firma bilgileri ve iletişim detayları.', fields: [field('company', 'Firma / Cari unvanı', 'text', { full: true, placeholder: 'Firma unvanı', autocomplete: 'organization' }), field('tax_office', 'Vergi dairesi', 'text', { placeholder: 'Vergi dairesi' }), field('tax_number', 'Vergi numarası', 'text', { placeholder: 'Vergi numarası', max: 11 }), field('contact', 'Yetkili kişi', 'text', { placeholder: 'Ad soyad' }), field('phone', 'Telefon', 'tel', { placeholder: '+90', autocomplete: 'tel' }), field('email', 'E-posta', 'email', { full: true, placeholder: 'muhasebe@firma.com', autocomplete: 'email' }), field('address', 'Fatura adresi', 'textarea', { full: true, placeholder: 'Açık adres' }), noteField()] }],
    cash: [{ title: 'Kasa hareketi', description: 'İşlem türünü ve tutar bilgilerini hazırlayın.', fields: [field('register', 'Kasa', 'select', { disabled: true, options: ['Kasa listesi bağlantı bekliyor'] }), field('direction', 'İşlem türü', 'select', { options: ['İşlem türü seçin', 'Kasa girişi', 'Kasa çıkışı'] }), customerField(), dateField('transaction_date', 'İşlem tarihi'), amountField(), field('payment_method', 'Ödeme yöntemi', 'select', { options: ['Ödeme yöntemi seçin', 'Nakit', 'Kredi kartı', 'Havale / EFT'] }), noteField()] }],
    payment: [{ title: 'Tahsilat / Tediye bilgileri', description: 'Cari hesaba ait ödeme ve tahsilat detayları.', fields: [field('direction', 'İşlem türü', 'select', { options: ['İşlem türü seçin', 'Tahsilat', 'Tediye'] }), dateField('transaction_date', 'İşlem tarihi'), customerField(), field('register', 'Kasa', 'select', { disabled: true, options: ['Kasa listesi bağlantı bekliyor'] }), amountField(), field('payment_method', 'Ödeme yöntemi', 'select', { options: ['Ödeme yöntemi seçin', 'Nakit', 'Kredi kartı', 'Havale / EFT'] }), field('document_number', 'Belge numarası', 'text', { full: true, placeholder: 'Varsa belge numarası' }), noteField()] }],
    vehicle: [
      { title: 'Araç bilgileri', description: 'Araç kimliği ve fiyatlandırmada kullanılacak grup.', fields: [field('plate', 'Plaka', 'text', { placeholder: '34 ABC 123', max: 20 }), vehicleGroupField(), field('chassis_number', 'Şasi numarası', 'text', { placeholder: 'Şasi numarası', max: 17 }), field('mileage', 'Kilometre', 'number', { min: '0', placeholder: '0' })] },
      { title: 'Marka', compact: true, fields: [field('brand', 'Araç markası', 'text', { full: true, placeholder: 'Marka' })] },
      { title: 'Model', compact: true, fields: [field('model', 'Araç modeli', 'text', { full: true, placeholder: 'Model' })] },
      { title: 'Teknik özellikler', fields: [field('model_year', 'Model yılı', 'number', { min: '1900', placeholder: '2026' }), field('fuel', 'Yakıt türü', 'select', { options: ['Yakıt türü seçin', 'Benzin', 'Dizel', 'Hibrit', 'Elektrik', 'LPG'] }), field('transmission', 'Vites türü', 'select', { options: ['Vites türü seçin', 'Manuel', 'Otomatik'] })] },
      { title: 'Muayene, kasko ve sigorta tarihleri', fields: [dateField('inspection_start', 'Muayene yapılış tarihi'), dateField('inspection_end', 'Muayene bitiş tarihi'), dateField('casco_start', 'Kasko yapılış tarihi'), dateField('casco_end', 'Kasko bitiş tarihi'), dateField('insurance_start', 'Sigorta yapılış tarihi'), dateField('insurance_end', 'Sigorta bitiş tarihi')] },
      { title: 'Ek bilgiler', fields: [noteField()] }
    ],
    expense: [{ title: 'Masraf bilgileri', description: 'Araç veya operasyon giderinin detayları.', fields: [field('category', 'Masraf türü', 'select', { options: ['Masraf türü seçin', 'Bakım / Onarım', 'Yakıt', 'Sigorta', 'Ofis gideri', 'Diğer'] }), dateField('expense_date', 'Masraf tarihi'), vehicleField(), amountField(), field('document_number', 'Fiş / Fatura numarası', 'text', { placeholder: 'Belge numarası' }), field('supplier', 'Tedarikçi / Cari', 'select', { disabled: true, options: ['Cari listesi bağlantı bekliyor'] }), noteField()] }]
  };

  function renderField(item) {
    const id = 'field-' + item.name;
    const attrs = ' id="' + id + '" name="' + item.name + '"' + (item.disabled ? ' disabled' : '') + (item.placeholder ? ' placeholder="' + escape(item.placeholder) + '"' : '') + (item.autocomplete ? ' autocomplete="' + item.autocomplete + '"' : '') + (item.min !== undefined ? ' min="' + item.min + '"' : '') + (item.step ? ' step="' + item.step + '"' : '') + (item.max ? ' maxlength="' + item.max + '"' : '');
    const input = item.type === 'select' ? '<select' + attrs + '>' + item.options.map((option, index) => '<option value="' + escape(typeof option === 'object' ? option.value : index ? option : '') + '">' + escape(typeof option === 'object' ? option.label : option) + '</option>').join('') + '</select>' : item.type === 'textarea' ? '<textarea' + attrs + ' rows="3"></textarea>' : '<input type="' + item.type + '"' + attrs + '>';
    return '<div class="field' + (item.full ? ' field-full' : '') + '"><label for="' + id + '">' + escape(item.label) + '</label>' + input + '</div>';
  }

  function partySections() {
    const senderFields = [field('sender_type', 'Gönderen türü', 'select', { options: ['Gönderen türü seçin', { value: 'person', label: 'Kişi' }, { value: 'company', label: 'Firma / Cari' }] }), field('sender', 'Gönderen kişi / cari', 'select', { disabled: true, options: ['Kayıt listesi bağlantı bekliyor'] })];
    const driverFields = [field('driver', 'Sürücü / yolcu seçimi', 'select', { disabled: true, options: ['Kişi listesi bağlantı bekliyor'] })];
    const payerFields = [field('payer_type', 'Ödeyen türü', 'select', { options: ['Ödeyen türü seçin', { value: 'driver', label: 'Sürücü / yolcu' }, { value: 'person', label: 'Kişi' }, { value: 'company', label: 'Firma / Cari' }] }), field('payer', 'Ödeyen kişi / cari', 'select', { disabled: true, options: ['Önce ödeyen türü seçin'] })];
    return '<section class="form-section party-section"><div class="party-grid">' + [['Gönderen', 'Yönlendiren kişi veya firma.', senderFields], ['Sürücü / yolcu', 'Aracı kullanacak veya seyahat edecek kişi.', driverFields], ['Ödeyen', 'Sözleşmenin ödemesini yapacak kişi veya firma.', payerFields]].map(([title, description, fields]) => '<fieldset class="party-card"><legend>' + title + '</legend><p>' + description + '</p><div class="party-fields">' + fields.map(renderField).join('') + '</div></fieldset>').join('') + '</div><p class="payer-summary" id="payer-summary" role="status" aria-live="polite" hidden></p></section>';
  }

  function updateParties() {
    const senderType = main.querySelector('#field-sender_type');
    const payerType = main.querySelector('#field-payer_type');
    if (!senderType || !payerType) return;
    const sender = main.querySelector('#field-sender');
    sender.options[0].textContent = senderType.value === 'company' ? 'Cari firma listesi bağlantı bekliyor' : senderType.value === 'person' ? 'Kişi listesi bağlantı bekliyor' : 'Önce gönderen türü seçin';
    const payer = main.querySelector('#field-payer');
    const labels = { driver: ['Sürücü / yolcu ödemeli', 'Sürücü / yolcu seçimine göre eşleşecek'], person: ['Kişi ödemeli', 'Ödeyen kişi listesi bağlantı bekliyor'], company: ['Firma ödemeli', 'Ödeyen cari firma listesi bağlantı bekliyor'] };
    const selected = labels[payerType.value];
    payer.options[0].textContent = selected ? selected[1] : 'Önce ödeyen türü seçin';
    const summary = main.querySelector('#payer-summary');
    summary.textContent = selected ? 'Ödeme sorumluluğu: ' + selected[0] : '';
    summary.hidden = !selected;
  }

  function vehicleTable(page) {
    const isReport = page.kind === 'vehicle-report';
    const columns = isReport ? ['Tarih', 'Plaka', 'Hareket türü', 'Kilometre', 'Açıklama'] : ['Plaka', 'Araç grubu', 'Marka / Model', 'Model yılı', 'Yakıt / Vites', 'Kilometre', 'Durum'];
    const filters = isReport ? '<form class="report-filters" autocomplete="off" aria-label="Rapor filtreleri"><div class="form-grid">' + [vehicleField(), dateField('start_date', 'Başlangıç tarihi'), dateField('end_date', 'Bitiş tarihi')].map(renderField).join('') + '</div><button class="button button-primary" type="submit" disabled>' + icon('lock') + 'Raporu görüntüle</button></form>' : '<div class="fleet-search record-search">' + icon('search') + '<input type="search" aria-label="Araç ara" placeholder="Plaka, marka veya model ile arama veri bağlantısıyla kullanılabilecek" disabled></div>';
    return '<section class="panel"><div class="panel-header"><div><h2 class="panel-title">' + (isReport ? 'Araç hareketleri' : 'Filodaki araçlar') + '</h2><p class="panel-description">' + (isReport ? 'Seçilen dönemin araç hareketleri' : 'Araç bilgileri ve filo durumu') + '</p></div>' + icon(page.icon) + '</div>' + filters + '<div class="table-wrap"><table class="operations-table"><caption class="sr-only">' + escape(page.title) + '</caption><thead><tr>' + columns.map((column) => '<th scope="col">' + column + '</th>').join('') + '</tr></thead><tbody><tr><td colspan="' + columns.length + '"><div class="empty-state"><span class="empty-visual">' + icon(page.icon) + '</span><h3>' + (isReport ? 'Araç hareketleri henüz bağlı değil' : 'Filo kayıtları henüz bağlı değil') + '</h3><p>' + (isReport ? 'Teslimat, iade ve diğer araç hareketleri veri bağlantısı tamamlandığında burada listelenecek.' : 'Filodaki araçlar veri bağlantısı tamamlandığında burada listelenecek.') + '</p></div></td></tr></tbody></table></div></section>';
  }

  function moduleView(page) {
    let content;
    if (page.kind === 'selection') {
      content = '<section class="panel record-selection"><h2>İşlem yapılacak kaydı seçin</h2><p>' + escape(page.record.charAt(0).toLocaleUpperCase('tr-TR') + page.record.slice(1)) + ' numarası, müşteri veya plaka ile arayın.</p><div class="record-search">' + icon('search') + '<input type="search" aria-label="Kayıt ara" placeholder="Kayıt arama, veri bağlantısıyla kullanılabilecek" disabled></div><div class="empty-state"><span class="empty-visual">' + icon(page.icon) + '</span><h3>Kayıtlar henüz bağlı değil</h3><p>' + escape(page.record.charAt(0).toLocaleUpperCase('tr-TR') + page.record.slice(1)) + ' kayıtları veri bağlantısı tamamlandığında burada listelenecek.</p></div><p class="selection-hint">İşleme devam etmek için önce ' + escape(page.action) + ' istediğiniz kaydı seçmeniz gerekecek.</p></section>';
    } else if (page.kind === 'fleet' || page.kind === 'vehicle-report') {
      content = vehicleTable(page);
    } else if (page.kind === 'price-code') {
      content = pricing.renderEditor();
    } else {
      const parties = page.kind === 'reservation' || page.kind === 'contract' ? partySections() : '';
      const sections = formDefinitions[page.kind].map((section) => '<section class="form-section' + (section.compact ? ' compact-section' : '') + '"><h2>' + section.title + '</h2>' + (section.description ? '<p>' + section.description + '</p>' : '') + '<div class="form-grid">' + section.fields.map(renderField).join('') + '</div>' + (section.extra || '') + '</section>').join('');
      content = '<form class="panel module-form" id="module-form" aria-label="' + escape(page.title) + '" autocomplete="off">' + parties + (page.kind === 'vehicle' ? '<div class="vehicle-sections">' + sections + '</div>' : sections) + '<div class="form-bottom"><p id="save-description">Arayüz önizlemesi; bu formdaki bilgiler kaydedilmez veya sunucuya gönderilmez.</p><button class="button button-primary" type="submit" disabled aria-describedby="save-description">' + icon('lock') + 'Kaydet</button></div></form>';
    }
    return '<div class="module-layout">' + content + '</div>';
  }

  function setMenu(open, restoreFocus = true) {
    const isOpen = open && mobileQuery.matches;
    sidebar.classList.toggle('is-open', isOpen);
    backdrop.hidden = !isOpen;
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Menüyü kapat' : 'Menüyü aç');
    appShell.inert = isOpen;
    sidebar.inert = mobileQuery.matches && !isOpen;
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (isOpen) (sidebar.querySelector('.nav-link.active') || document.getElementById('sidebar-close')).focus();
    else if (restoreFocus && mobileQuery.matches) menuToggle.focus();
  }

  function renderPage() {
    const id = window.location.hash.replace(/^#\/?/, '') || 'ana-sayfa';
    const page = pages.find((item) => item.id === id);
    const isInitial = currentPage === null;
    currentPage = page || { id: 'not-found', title: 'Sayfa bulunamadı' };
    document.body.classList.toggle('home-page', currentPage.id === 'ana-sayfa');
    operationTab = 'all';
    operationPeriod = 'today';
    document.title = currentPage.title + ' | Rentyzone FYS';
    document.getElementById('breadcrumb-current').textContent = currentPage.title;
    document.querySelectorAll('.nav-link').forEach((anchor) => {
      const active = anchor.dataset.page === currentPage.id;
      anchor.classList.toggle('active', active);
      if (active) anchor.setAttribute('aria-current', 'page');
      else anchor.removeAttribute('aria-current');
    });
    main.innerHTML = '<h1 class="sr-only">' + escape(currentPage.title) + '</h1>' + (!page ? '<section class="panel record-selection"><p>Bu bağlantı bir yönetim ekranıyla eşleşmiyor.</p>' + link('ana-sayfa', 'Ana Sayfaya Dön', 'button button-primary', 'home') + '</section>' : page.id === 'ana-sayfa' ? dashboard() : moduleView(page));
    if (page && page.kind === 'price-code') pricing.bindEditor(main);
    if (page && page.kind === 'reservation') pricing.updateReservation(main);
    updateParties();
    setMenu(false, false);
    if (searchDialog.open) searchDialog.close();
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (!isInitial) main.focus({ preventScroll: true });
  }

  function selectTab(id, focus) {
    if (!tabDefinitions.some((item) => item.id === id)) return;
    operationTab = id;
    main.querySelectorAll('[data-tab]').forEach((button) => {
      const selected = button.dataset.tab === id;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
      if (selected && focus) button.focus();
    });
    const panel = document.getElementById('operations-content');
    panel.setAttribute('aria-labelledby', 'tab-' + id);
    panel.innerHTML = operationContent();
  }

  const normalize = (value) => value.toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i');
  function renderSearch() {
    const query = normalize(searchInput.value).trim();
    const results = pages.filter((page) => query.split(/\s+/).every((word) => normalize(page.title + ' ' + page.group).includes(word)));
    searchResults.innerHTML = results.length ? results.map((page) => '<a class="search-result" href="#/' + page.id + '">' + icon(page.icon) + '<span><strong>' + escape(page.title) + '</strong><small>' + escape(page.group || 'Çalışma alanı') + '</small></span>' + icon('arrow') + '</a>').join('') : '<p class="search-no-results" role="status">Aramanızla eşleşen bir işlem bulunamadı.</p>';
  }
  function openSearch() {
    setMenu(false, false);
    searchInput.value = '';
    renderSearch();
    if (!searchDialog.open) searchDialog.showModal();
    searchInput.focus();
  }

  menuToggle.addEventListener('click', () => setMenu(!sidebar.classList.contains('is-open')));
  document.getElementById('sidebar-close').addEventListener('click', () => setMenu(false));
  backdrop.addEventListener('click', () => setMenu(false));
  mobileQuery.addEventListener('change', () => setMenu(false, false));
  document.getElementById('search-trigger').addEventListener('click', openSearch);
  document.getElementById('search-close').addEventListener('click', () => searchDialog.close());
  searchInput.addEventListener('input', renderSearch);
  searchDialog.addEventListener('click', (event) => { if (event.target === searchDialog) searchDialog.close(); });
  searchDialog.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      searchDialog.close();
      return;
    }
    const results = Array.from(searchResults.querySelectorAll('a'));
    const index = results.indexOf(document.activeElement);
    if (event.key === 'ArrowDown' && results.length) { event.preventDefault(); results[Math.min(index + 1, results.length - 1)].focus(); }
    if (event.key === 'ArrowUp' && results.length) { event.preventDefault(); if (index <= 0) searchInput.focus(); else results[index - 1].focus(); }
    if (event.key === 'Enter' && document.activeElement === searchInput && results.length) { event.preventDefault(); results[0].click(); }
  });
  document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); openSearch(); }
    if (event.key === 'Escape' && sidebar.classList.contains('is-open')) setMenu(false);
    if (event.key === 'Tab' && sidebar.classList.contains('is-open')) {
      const focusable = Array.from(sidebar.querySelectorAll('a, button')).filter((item) => !item.disabled);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  document.addEventListener('click', (event) => {
    if (event.target.closest('.skip-link')) {
      event.preventDefault();
      main.focus();
      return;
    }
    const anchor = event.target.closest('a[href^="#/"]');
    if (anchor) {
      if (searchDialog.open) searchDialog.close();
      if (sidebar.classList.contains('is-open')) setMenu(false, false);
      if (anchor.hash === window.location.hash) main.focus({ preventScroll: true });
    }
  });
  main.addEventListener('click', (event) => {
    const tab = event.target.closest('[data-tab]');
    if (tab) selectTab(tab.dataset.tab, false);
  });
  main.addEventListener('keydown', (event) => {
    const tab = event.target.closest('[data-tab]');
    if (!tab) return;
    const index = tabDefinitions.findIndex((item) => item.id === tab.dataset.tab);
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabDefinitions.length;
    if (event.key === 'ArrowLeft') next = (index + tabDefinitions.length - 1) % tabDefinitions.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabDefinitions.length - 1;
    if (next !== undefined) { event.preventDefault(); selectTab(tabDefinitions[next].id, true); }
  });
  main.addEventListener('change', (event) => {
    if (event.target.id === 'field-sender_type' || event.target.id === 'field-payer_type') updateParties();
    if (event.target.id === 'field-vehicle_group' || event.target.id === 'field-price_code') pricing.updateReservation(main);
    if (event.target.id !== 'operation-period') return;
    operationPeriod = event.target.value;
    const labels = { today: ['Günlük operasyon', 'Bugünün rezervasyon, teslimat ve iade akışı'], week: ['Haftalık operasyon', 'Bu haftanın rezervasyon, teslimat ve iade akışı'], month: ['Aylık operasyon', 'Bu ayın rezervasyon, teslimat ve iade akışı'] };
    document.getElementById('operations-title').textContent = labels[operationPeriod][0];
    document.getElementById('period-description').textContent = labels[operationPeriod][1];
    document.getElementById('operations-content').innerHTML = operationContent();
  });
  // Prevent navigation and URL submissions for every form. The tariff editor
  // handles its own non-personal browser storage; operation forms stay previews.
  main.addEventListener('submit', (event) => { event.preventDefault(); });
  window.addEventListener('hashchange', renderPage);
  renderPage();
}());
