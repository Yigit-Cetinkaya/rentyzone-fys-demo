(function () {
  'use strict';

  const groups = Object.freeze(['A', 'A1', 'B', 'B1', 'C', 'D', 'D1', 'S', 'S1', 'F', 'F1', 'G', 'G1', 'I', 'I1', 'R', 'R1', 'J', 'J1', 'L', 'L1', 'M', 'M1', 'N', 'N1', 'O', 'O1', 'T', 'T1', 'U', 'U1', 'V', 'V1', 'Z', 'Z1', 'P', 'P1', 'P2', 'X', 'X1']);
  const periods = Object.freeze({ daily: 'Günlük', weekly: 'Haftalık', monthly: 'Aylık', yearly: 'Yıllık' });
  const storageKey = 'rentyzone-fys-price-codes-v1';
  const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const money = (value) => value === null || value === undefined ? '—' : new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(value);

  // Only non-personal tariff configuration is stored by the public demo.
  // Customer, driver, reservation and contract data never enter this storage.
  function cleanCode(code) {
    if (!code || typeof code.id !== 'string' || !/^[a-zA-Z0-9_-]{1,100}$/.test(code.id) || typeof code.name !== 'string' || !code.name.trim() || code.name.trim().length > 60 || !code.rates || typeof code.rates !== 'object') return null;
    const rates = {};
    groups.forEach((group) => {
      const source = code.rates[group];
      if (!source || typeof source !== 'object') return;
      const row = {};
      Object.keys(periods).forEach((period) => {
        const value = source[period];
        row[period] = typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 1000000000 ? Math.round(value * 100) / 100 : null;
      });
      if (Object.values(row).some((value) => value !== null)) rates[group] = row;
    });
    return Object.keys(rates).length ? { id: code.id, name: code.name.trim(), rates } : null;
  }

  function loadCodes() {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
      if (!Array.isArray(stored)) return [];
      const ids = new Set();
      return stored.map(cleanCode).filter((code) => {
        if (!code || ids.has(code.id)) return false;
        ids.add(code.id);
        return true;
      });
    } catch (_) { return []; }
  }

  function rows(rates, editable) {
    return groups.filter((group) => rates[group]).map((group) => '<tr><th scope="row">' + group + '</th>' + Object.keys(periods).map((period) => '<td>' + money(rates[group][period]) + '</td>').join('') + (editable ? '<td><button class="text-link" type="button" data-edit-group="' + group + '" aria-label="' + group + ' grubunu düzenle">Düzenle</button></td>' : '') + '</tr>').join('');
  }

  function table(rates, editable, caption) {
    return '<div class="table-wrap"><table class="operations-table price-table"><caption class="sr-only">' + escape(caption) + '</caption><thead><tr><th scope="col">Araç grubu</th>' + Object.values(periods).map((period) => '<th scope="col">' + period + '</th>').join('') + (editable ? '<th scope="col">İşlem</th>' : '') + '</tr></thead><tbody>' + rows(rates, editable) + '</tbody></table></div>';
  }

  function savedCodes() {
    const codes = loadCodes();
    return codes.length ? codes.map((code) => '<section class="saved-price-code"><div class="panel-header"><h3 class="panel-title">' + escape(code.name) + '</h3><button class="button button-secondary" type="button" data-edit-code="' + code.id + '" aria-label="' + escape(code.name) + ' fiyat kodunu düzenle">Düzenle</button></div>' + table(code.rates, false, code.name) + '</section>').join('') : '<p class="pricing-empty">Henüz fiyat kodu oluşturulmadı.</p>';
  }

  function renderEditor() {
    return '<div class="pricing-layout"><form class="panel module-form" id="price-code-form" autocomplete="off" aria-label="Fiyat kodu oluşturma"><section class="form-section"><h2 id="price-editor-title">Yeni fiyat kodu</h2><p>Fiyat koduna bir isim verin; her araç grubu için dönem fiyatlarını ekleyin.</p><div class="form-grid"><div class="field"><label for="price-code-name">Fiyat kodu adı</label><input id="price-code-name" name="price_code_name" type="text" maxlength="60" placeholder="Örn. Standart tarife" required></div></div></section><section class="form-section"><h2>Araç grubu fiyatları</h2><div class="form-grid"><div class="field field-full"><label for="price-group">Araç grubu</label><select id="price-group" name="price_group"><option value="">Araç grubu seçin</option>' + groups.map((group) => '<option value="' + group + '">' + group + '</option>').join('') + '</select></div>' + Object.entries(periods).map(([period, label]) => '<div class="field"><label for="rate-' + period + '">' + label + ' fiyat (₺)</label><input id="rate-' + period + '" name="' + period + '" type="number" min="0" max="1000000000" step="0.01" placeholder="0,00"></div>').join('') + '</div><div class="pricing-actions"><button class="button button-secondary" type="button" data-add-group>Grup fiyatını ekle</button></div><div id="draft-prices"></div></section><div class="form-bottom"><p>Demo fiyat kodları bu tarayıcıda saklanır.</p><div class="pricing-actions"><button class="button button-secondary" type="button" data-reset-code>Yeni fiyat kodu</button><button class="button button-primary" type="submit" id="save-price-code">Fiyat kodunu kaydet</button></div></div><p class="pricing-status" id="pricing-status" role="status" aria-live="polite" hidden></p></form><section class="panel"><div class="panel-header"><h2 class="panel-title">Kayıtlı fiyat kodları</h2></div><div id="saved-price-codes">' + savedCodes() + '</div></section></div>';
  }

  function bindEditor(root) {
    const form = root.querySelector('#price-code-form');
    if (!form) return;
    const name = form.querySelector('#price-code-name');
    const group = form.querySelector('#price-group');
    const status = form.querySelector('#pricing-status');
    const addButton = form.querySelector('[data-add-group]');
    let editingId = null;
    let draft = {};
    const rateInputs = Object.fromEntries(Object.keys(periods).map((period) => [period, form.querySelector('#rate-' + period)]));
    function message(text) { status.textContent = text; status.hidden = !text; }
    function showDraft() { form.querySelector('#draft-prices').innerHTML = Object.keys(draft).length ? table(draft, true, 'Fiyat kodu taslağı') : ''; }
    function fillGroup(value) {
      group.value = value;
      Object.keys(periods).forEach((period) => { rateInputs[period].value = draft[value] && draft[value][period] !== null ? draft[value][period] : ''; });
      addButton.textContent = draft[value] ? 'Grup fiyatını güncelle' : 'Grup fiyatını ekle';
    }
    function readGroup() {
      if (!groups.includes(group.value)) { message('Önce bir araç grubu seçin.'); group.focus(); return null; }
      const row = {};
      for (const period of Object.keys(periods)) {
        const input = rateInputs[period];
        if (!input.checkValidity()) { input.reportValidity(); return null; }
        row[period] = input.value === '' ? null : Number(input.value);
      }
      if (Object.values(row).every((value) => value === null)) { message('Bu grup için en az bir dönem fiyatı girin.'); rateInputs.daily.focus(); return null; }
      return row;
    }
    function reset() {
      editingId = null;
      draft = {};
      form.reset();
      root.querySelector('#price-editor-title').textContent = 'Yeni fiyat kodu';
      root.querySelector('#save-price-code').textContent = 'Fiyat kodunu kaydet';
      fillGroup('');
      showDraft();
      message('');
    }
    group.addEventListener('change', () => { fillGroup(group.value); message(''); });
    addButton.addEventListener('click', () => {
      const row = readGroup();
      if (!row) return;
      draft[group.value] = row;
      showDraft();
      fillGroup(group.value);
      message(group.value + ' grubu taslağa eklendi. Fiyat kodunu kaydederek tamamlayın.');
    });
    root.querySelector('.pricing-layout').addEventListener('click', (event) => {
      const groupButton = event.target.closest('[data-edit-group]');
      if (groupButton) { fillGroup(groupButton.dataset.editGroup); message(''); group.focus(); }
      if (event.target.closest('[data-reset-code]')) { reset(); name.focus(); }
      const editButton = event.target.closest('[data-edit-code]');
      if (!editButton) return;
      const code = loadCodes().find((item) => item.id === editButton.dataset.editCode);
      if (!code) return;
      editingId = code.id;
      name.value = code.name;
      draft = Object.fromEntries(Object.entries(code.rates).map(([key, row]) => [key, { ...row }]));
      root.querySelector('#price-editor-title').textContent = 'Fiyat kodunu düzenle';
      root.querySelector('#save-price-code').textContent = 'Değişiklikleri kaydet';
      fillGroup(groups.find((item) => draft[item]));
      showDraft();
      message('');
      name.focus();
    });
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!name.value.trim()) { message('Fiyat koduna bir isim verin.'); name.focus(); return; }
      if (group.value) {
        const row = readGroup();
        if (!row) return;
        draft[group.value] = row;
      }
      if (!Object.keys(draft).length) { message('En az bir araç grubu için fiyat ekleyin.'); group.focus(); return; }
      const codes = loadCodes();
      if (codes.some((code) => code.id !== editingId && code.name.toLocaleLowerCase('tr-TR') === name.value.trim().toLocaleLowerCase('tr-TR'))) { message('Bu isimde bir fiyat kodu var. Farklı bir isim kullanın veya mevcut kodu düzenleyin.'); name.focus(); return; }
      const code = cleanCode({ id: editingId || crypto.randomUUID(), name: name.value, rates: draft });
      if (!code) { message('Fiyat kodu bilgilerini kontrol edin.'); return; }
      try { localStorage.setItem(storageKey, JSON.stringify(codes.filter((item) => item.id !== code.id).concat(code))); }
      catch (_) { message('Fiyat kodu bu tarayıcıda kaydedilemedi. Mevcut bilgiler değiştirilmedi.'); return; }
      root.querySelector('#saved-price-codes').innerHTML = savedCodes();
      reset();
      message(code.name + ' fiyat kodu kaydedildi.');
    });
  }

  function updateReservation(root) {
    const group = root.querySelector('#field-vehicle_group');
    const select = root.querySelector('#field-price_code');
    const preview = root.querySelector('#reservation-prices');
    if (!group || !select || !preview) return;
    const selectedId = select.value;
    const codes = loadCodes().filter((code) => code.rates[group.value]);
    const placeholder = !group.value ? 'Önce araç grubu seçin' : codes.length ? 'Fiyat kodu seçin' : 'Bu grup için fiyat kodu oluşturulmadı';
    select.innerHTML = '<option value="">' + placeholder + '</option>' + codes.map((code) => '<option value="' + code.id + '">' + escape(code.name) + '</option>').join('');
    select.disabled = !codes.length;
    select.value = codes.some((code) => code.id === selectedId) ? selectedId : '';
    const code = codes.find((item) => item.id === select.value);
    preview.innerHTML = code ? '<dl class="price-preview-grid">' + Object.entries(periods).map(([period, label]) => '<div><dt>' + label + '</dt><dd>' + money(code.rates[group.value][period]) + '</dd></div>').join('') + '</dl>' : '';
  }

  window.RentyzonePricing = Object.freeze({ groups, renderEditor, bindEditor, updateReservation });
}());
