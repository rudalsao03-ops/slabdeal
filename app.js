/* =============================================================================
   슬랩딜 (SLABDEAL) — 카드판 헤이딜러 / CardDealer
   모바일 웹앱 MVP 프로토타입 (빌드 도구 없음 · localStorage 양방향 연동)
   ============================================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------------- 상수 */
  var STORE_KEY = 'slabdeal.v1';
  var MY_SHOP_ID = 's1';
  var NEW_WINDOW = 15 * 60 * 1000;

  var SHOPS = [
    { id: 's1', name: '강남카드라운지', area: '서울 강남구', rating: 4.9, tag: '등급카드 전문', since: '2017' },
    { id: 's2', name: '홍대슬랩샵', area: '서울 마포구', rating: 4.7, tag: '직거래 강점', since: '2019' },
    { id: 's3', name: '잠실카드하우스', area: '서울 송파구', rating: 4.6, tag: '현장 즉시 입금', since: '2020' },
    { id: 's4', name: '분당 카드랩', area: '경기 성남시', rating: 4.8, tag: '미등급 적극 매입', since: '2018' },
    { id: 's5', name: '수원 포켓마켓', area: '경기 수원시', rating: 4.5, tag: '택배 매입 전문', since: '2021' }
  ];

  var ICON = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.6 10.4 12 3.7l8.4 6.7"/><path d="M5.9 9.4V20h12.2V9.4"/><path d="M9.8 20v-5.1h4.4V20"/></svg>',
    camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 8.6h3l1.4-2.3h8.2l1.4 2.3h3v10.6h-17z"/><circle cx="12" cy="13.8" r="3.4"/></svg>',
    inbox: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 13.2h4.2l1.4 2.8h5.8l1.4-2.8h4.2"/><path d="M3.5 13.2 6 4.6h12l2.5 8.6v4.2a1.8 1.8 0 0 1-1.8 1.8H5.3a1.8 1.8 0 0 1-1.8-1.8z"/></svg>',
    store: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.4 9.3 5.2 4.2h13.6l1.8 5.1"/><path d="M4.6 9.3V20h14.8V9.3"/><path d="M9.4 20v-5.3h5.2V20"/><path d="M3.4 9.3h17.2"/></svg>',
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6.5h16"/><path d="M4 12h16"/><path d="M4 17.5h10.5"/></svg>',
    tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.4 13.2 13 20.6l-9.4-9.4V3.4h7.8l9 9.8z"/><circle cx="8.1" cy="8.1" r="1.3"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m14.6 5.5-7 6.5 7 6.5"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9.4 5.5 7 6.5-7 6.5"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4.8 12.6 4.6 4.6L19.2 6.8"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3.2l7.2 3v5.6c0 4.4-3.1 8.3-7.2 9.5-4.1-1.2-7.2-5.1-7.2-9.5V6.2z"/><path d="m9 12.2 2.2 2.2 4-4.2"/></svg>',
    sparkle: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.4 14 8.1l5.6 1.9-5.6 1.9-2 5.7-2-5.7L4.4 10l5.6-1.9z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s6.4-5.6 6.4-11A6.4 6.4 0 1 0 5.6 10c0 5.4 6.4 11 6.4 11z"/><circle cx="12" cy="10" r="2.3"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.8 6.6h10.6v9.6H2.8z"/><path d="M13.4 9.8h4.1l3.1 3.1v3.3h-7.2z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17.2" cy="18" r="1.6"/></svg>',
    cash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.8" y="6.2" width="18.4" height="11.6" rx="2.2"/><circle cx="12" cy="12" r="2.6"/><path d="M6.2 9.4v5.2M17.8 9.4v5.2"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.6"/><path d="M12 7.4V12l3.2 1.9"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.2 3.6h7.4l4.2 4.2v12.6H6.2z"/><path d="M13.4 3.8v4.2h4.2"/><path d="M9.2 12.4h5.6M9.2 16h4"/></svg>'
  };

  /* ---------------------------------------------------------------- 유틸 */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function won(n) { return Number(n || 0).toLocaleString('ko-KR'); }

  function ago(ts) {
    var diff = Date.now() - ts;
    var m = Math.floor(diff / 60000);
    if (m < 1) return '방금 전';
    if (m < 60) return m + '분 전';
    var h = Math.floor(m / 60);
    if (h < 24) return h + '시간 전';
    var d = Math.floor(h / 24);
    if (d < 7) return d + '일 전';
    var dt = new Date(ts);
    return (dt.getMonth() + 1) + '.' + dt.getDate();
  }

  function uid(prefix) { return prefix + '-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5); }

  function shopOf(id) {
    for (var i = 0; i < SHOPS.length; i++) if (SHOPS[i].id === id) return SHOPS[i];
    return { id: id, name: '알 수 없는 샵', area: '-', rating: '-', tag: '' };
  }
  function getReq(id) {
    for (var i = 0; i < state.requests.length; i++) if (state.requests[i].id === id) return state.requests[i];
    return null;
  }

  /* ------------------------------------------------ 거래 방식 · 택배 조건 헬퍼 */
  function tradeOf(r) {
    return (r && (r.trade === 'pickup' || r.trade === 'delivery')) ? r.trade : 'both';
  }

  function tradeBadge(r) {
    var t = tradeOf(r);
    if (t === 'pickup') return '직거래 · ' + (r.region || '지역 협의');
    if (t === 'both') return '택배·직거래 가능' + (r.region ? ' · ' + r.region : '');
    return '택배 매입';
  }

  function shipLabel(q) { return (q && q.ship) || SHIP_FEES[0].val; }
  function returnLabel(q) { return (q && q.returnPolicy) || RETURN_PRESETS[0]; }
  function shipTone(v) {
    if (v === '판매자 선불') return 'prepaid';
    if (v === '직거래 전용') return 'pickup';
    return 'shop';
  }
  function shipIcon(v) { return v === '직거래 전용' ? ICON.pin : ICON.truck; }

  /* 이번 거래를 실제로 택배로 진행하는지 */
  function deliversByCourier(r, w) {
    if (w && shipLabel(w) === '직거래 전용') return false;
    var t = tradeOf(r);
    if (t === 'pickup') return false;
    if (t === 'both') return (r.fulfill || 'delivery') === 'delivery';
    return true;
  }

  function trackingOf(r) {
    return r && r.shipment && r.shipment.tracking ? r.shipment : null;
  }

  function retOptions(selected) {
    return RETURN_PRESETS.map(function (p) {
      return '<option value="' + esc(p) + '"' + (p === selected ? ' selected' : '') + '>' + esc(p) + '</option>';
    }).join('') +
      '<option value="__custom"' + (selected && RETURN_PRESETS.indexOf(selected) === -1 ? ' selected' : '') + '>직접 입력</option>';
  }

  /* ------------------------------------------------------- 샘플 카드 이미지 */
  function cardArt(c1, c2, label, sub) {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 420" width="300" height="420">' +
      '<defs>' +
      '<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="' + c1 + '"/><stop offset="1" stop-color="' + c2 + '"/></linearGradient>' +
      '<linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#FFF3C4"/><stop offset=".45" stop-color="#E7B520"/><stop offset="1" stop-color="#A6780A"/></linearGradient>' +
      '</defs>' +
      '<rect width="300" height="420" rx="17" fill="url(#gold)"/>' +
      '<rect x="5" y="5" width="290" height="410" rx="13" fill="url(#g)"/>' +
      '<rect x="18" y="18" width="264" height="248" rx="9" fill="#ffffff" opacity=".13"/>' +
      '<circle cx="150" cy="142" r="92" fill="#ffffff" opacity=".10"/>' +
      '<circle cx="150" cy="142" r="70" fill="#ffffff" opacity=".10"/>' +
      '<path d="M150 58 171 124 237 142 171 160 150 226 129 160 63 142 129 124Z" fill="#ffffff" opacity=".92"/>' +
      '<circle cx="150" cy="142" r="15" fill="#0B1B34" opacity=".22"/>' +
      '<rect x="5" y="244" width="290" height="171" rx="13" fill="#0B1B34" opacity=".26"/>' +
      '<text x="150" y="308" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="27" font-weight="700" letter-spacing="1" fill="#ffffff">' + label + '</text>' +
      '<text x="150" y="336" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" letter-spacing="2.4" fill="#ffffff" opacity=".82">' + sub + '</text>' +
      '<rect x="60" y="358" width="180" height="1" fill="#ffffff" opacity=".35"/>' +
      '<text x="150" y="386" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="11" letter-spacing="3.4" fill="#ffffff" opacity=".7">SAMPLE CARD</text>' +
      '</svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  var ART = {
    pikachu: cardArt('#FFDA5E', '#E9A200', 'PIKACHU ex', 'SAR 025/165'),
    charizard: cardArt('#FF9264', '#C0221A', 'CHARIZARD ex', 'SAR 201/187'),
    gengar: cardArt('#CBA6F7', '#5B2A8C', 'GENGAR ex', 'SAR 092/088'),
    lucario: cardArt('#A8C8FF', '#2A5BFF', 'LUCARIO ex', 'SAR 114/100')
  };
  var SAMPLE_LABEL = { pikachu: '피카츄', charizard: '리자몽', gengar: '팬텀', lucario: '루카리오' };
  var LANGUAGES = ['한국판', '일본판', '영문판'];
  var GRADES = ['PSA 10', 'PSA 9', 'BGS', 'ARS', 'CGC', '미등급'];

  /* 거래 희망 3분할 */
  var TRADE_OPTIONS = [
    { val: 'both', label: '택배·직거래 둘 다' },
    { val: 'delivery', label: '택배 매입' },
    { val: 'pickup', label: '직거래' }
  ];
  var TRADE_CHIP = { both: '택배·직거래', delivery: '택배', pickup: '직거래' };

  /* 카드샵 견적 조건 */
  var SHIP_FEES = [
    { val: '택배비 샵 부담(착불 가능)', label: '샵 부담', em: '착불 가능' },
    { val: '판매자 선불', label: '판매자 선불', em: '보내는 분 부담' },
    { val: '직거래 전용', label: '직거래 전용', em: '택배 거래 없음' }
  ];
  var RETURN_PRESETS = [
    '등급케이스 훼손 외 감가 없음 · 미매입 시 샵 부담 반송',
    '케이스 미세 기스 감가 없음 · 미매입 시 샵 부담 반송',
    '검수 후 상태 이견 시 재협상 · 반송 시 왕복 택배비 샵 부담',
    '현장 검수 · 반송 없음'
  ];
  var CARRIERS = ['우체국택배', 'CJ대한통운', '편의점택배(CU·GS25)', '롯데택배', '한진택배', '기타'];

  function photoSrc(p) {
    if (!p) return ART.pikachu;
    if (p.indexOf('art:') === 0) return ART[p.slice(4)] || ART.pikachu;
    return p;
  }

  /* --------------------------------------------------------------- 시드 데이터 */
  function seed() {
    var now = Date.now();
    var MIN = 60000;
    return {
      v: 1,
      settings: {
        pay: '검수 후 당일 입금',
        comment: '',
        ship: SHIP_FEES[0].val,
        returnPolicy: RETURN_PRESETS[0]
      },
      requests: [
        {
          id: 'r-pika',
          cardName: '피카츄 ex SAR',
          series: '포켓몬카드 151 · 025/165',
          grade: 'PSA 10',
          trade: 'both',
          region: '서울 강남·서초',
          photo: 'art:pikachu',
          language: '한국판',
          notes: '중앙 정렬 좋고 화이트닝 거의 없습니다. 슬리브 + 탑로더에 보관했고 모서리 상태 깨끗해요.',
          createdAt: now - 38 * MIN,
          status: 'open',
          quotes: [
            { id: 'q-p1', shopId: 's1', price: 1250000, pay: '검수 후 당일 입금',
              ship: '택배비 샵 부담(착불 가능)', returnPolicy: '등급케이스 훼손 외 감가 없음 · 미매입 시 샵 부담 반송',
              comment: '등급카드 전문입니다. 검수 후 당일 송금 가능해요.', at: now - 31 * MIN },
            { id: 'q-p2', shopId: 's2', price: 1180000, pay: '검수 후 당일 입금',
              ship: '판매자 선불', returnPolicy: '케이스 미세 기스 감가 없음 · 미매입 시 샵 부담 반송',
              comment: '홍대 매장에서 직접 검수 가능해요. 택배도 환영입니다.', at: now - 28 * MIN },
            { id: 'q-p3', shopId: 's3', price: 1120000, pay: '현장 즉시 입금',
              ship: '직거래 전용', returnPolicy: '현장 검수 · 반송 없음',
              comment: '잠실로 오시면 검수 후 바로 입금해드려요.', at: now - 22 * MIN },
            { id: 'q-p4', shopId: 's4', price: 1090000, pay: '검수 후 당일 입금',
              ship: '택배비 샵 부담(착불 가능)', returnPolicy: '검수 후 상태 이견 시 재협상 · 반송 시 왕복 택배비 샵 부담',
              comment: '분당 매장 검수 후 당일 입금입니다.', at: now - 16 * MIN }
          ]
        },
        {
          id: 'r-char',
          cardName: '리자몽 ex SAR',
          series: '테라스탈 페스티벌 · 201/187',
          grade: 'PSA 10',
          trade: 'pickup',
          region: '서울 강남·서초',
          photo: 'art:charizard',
          language: '일본판',
          notes: '케이스에 미세 스크래치가 있지만 카드 자체는 무결점입니다.',
          createdAt: now - 130 * MIN,
          status: 'open',
          quotes: [
            { id: 'q-c1', shopId: 's2', price: 2480000, pay: '현장 즉시 입금',
              ship: '직거래 전용', returnPolicy: '현장 검수 · 반송 없음',
              comment: '강남 직거래 가능합니다. 검수 후 당일 입금해드려요.', at: now - 95 * MIN },
            { id: 'q-c2', shopId: 's3', price: 2390000, pay: '검수 후 당일 입금',
              ship: '택배비 샵 부담(착불 가능)', returnPolicy: '등급케이스 훼손 외 감가 없음 · 미매입 시 샵 부담 반송',
              comment: '잠실 매장에서 검수 후 당일 입금됩니다.', at: now - 70 * MIN }
          ]
        },
        {
          id: 'r-phantom',
          cardName: '메가 팬텀 ex SAR',
          series: '메가드림 ex · 092/088',
          grade: '미등급',
          trade: 'delivery',
          region: '',
          photo: 'art:gengar',
          language: '일본판',
          notes: '미등급이지만 앞면 상태 좋습니다. 사진 그대로 보내드려요.',
          createdAt: now - 6 * MIN,
          status: 'open',
          quotes: [
            { id: 'q-m1', shopId: 's4', price: 285000, pay: '검수 후 당일 입금',
              ship: '택배비 샵 부담(착불 가능)', returnPolicy: '등급케이스 훼손 외 감가 없음 · 미매입 시 샵 부담 반송',
              comment: '미등급도 적극 매입합니다. 검수 후 당일 입금이에요.', at: now - 4 * MIN }
          ]
        },
        {
          id: 'r-luka',
          cardName: '루카리오 ex SAR',
          series: '메가드림 ex · 114/100',
          grade: 'PSA 10',
          trade: 'delivery',
          region: '',
          photo: 'art:lucario',
          language: '한국판',
          notes: '',
          createdAt: now - 26 * 60 * MIN,
          status: 'sold',
          soldAt: now - 23 * 60 * MIN,
          winner: 'q-l1',
          shipment: { carrier: 'CJ대한통운', tracking: '681234567890', at: now - 22 * 60 * MIN },
          quotes: [
            { id: 'q-l1', shopId: 's4', price: 890000, pay: '검수 후 당일 입금',
              ship: '택배비 샵 부담(착불 가능)', returnPolicy: '등급케이스 훼손 외 감가 없음 · 미매입 시 샵 부담 반송',
              comment: '상태 확인 후 당일 입금해드립니다.', at: now - 25 * 60 * MIN },
            { id: 'q-l2', shopId: 's2', price: 865000, pay: '검수 후 당일 입금',
              ship: '판매자 선불', returnPolicy: '케이스 미세 기스 감가 없음 · 미매입 시 샵 부담 반송',
              comment: '홍대 매장 검수 가능합니다.', at: now - 24 * 60 * MIN }
          ]
        }
      ]
    };
  }

  var FEED = [
    { name: '리자몽 ex SAR', grade: 'PSA 10', price: 2480000, shops: 6, shop: '강남카드라운지', ago: '12분 전', art: 'charizard' },
    { name: '메가 팬텀 ex SAR', grade: '미등급', price: 312000, shops: 4, shop: '분당 카드랩', ago: '48분 전', art: 'gengar' },
    { name: '피카츄 ex SAR', grade: 'PSA 10', price: 1180000, shops: 5, shop: '홍대슬랩샵', ago: '1시간 전', art: 'pikachu' },
    { name: '루카리오 ex SAR', grade: 'PSA 9', price: 412000, shops: 3, shop: '수원 포켓마켓', ago: '2시간 전', art: 'lucario' }
  ];

  /* --------------------------------------------------------------- 상태 */
  var state;
  try {
    var raw = localStorage.getItem(STORE_KEY);
    state = raw ? JSON.parse(raw) : null;
  } catch (e) {
    state = null;
  }
  if (!state || !Array.isArray(state.requests)) state = seed();
  if (!state.settings) state.settings = { pay: '검수 후 당일 입금', comment: '' };
  if (!state.settings.ship) state.settings.ship = SHIP_FEES[0].val;
  if (!state.settings.returnPolicy) state.settings.returnPolicy = RETURN_PRESETS[0];
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* 저장 불가 환경 */ }

  var ui = {
    mode: 'seller',
    view: 's-home',
    a: null,               // 열려 있는 카드 id
    filter: 'all',         // 견적함 필터
    dFilter: 'all',        // 딜러 목록 필터
    sampleOpen: false,
    editShip: false,       // 운송장 수정 중
    photo: '',             // 견적 요청 사진 (dataURL 또는 art:key)
    draft: { trade: 'both', language: '한국판' }
  };

  var sheet = { type: null, id: null, quoteId: null };

  function persist() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state));
      return true;
    } catch (e) {
      toast('저장 공간이 부족해요. 사진을 줄이거나 데모 데이터를 초기화해 주세요.');
      return false;
    }
  }

  /* --------------------------------------------------------------- 탭 정의 */
  var SELLER_TABS = [
    { id: 's-home', label: '홈', icon: 'home' },
    { id: 's-request', label: '견적요청', icon: 'camera' },
    { id: 's-inbox', label: '내 견적함', icon: 'inbox' },
    { id: 's-join', label: '입점안내', icon: 'store' }
  ];
  var DEALER_TABS = [
    { id: 'd-pending', label: '입찰 대기', icon: 'list' },
    { id: 'd-bids', label: '내 입찰', icon: 'tag' },
    { id: 'd-shop', label: '샵 관리', icon: 'store' }
  ];

  function activeViewKey() {
    if (ui.view === 's-detail') return 's-inbox';
    if (ui.view === 'd-detail') return 'd-pending';
    return ui.view;
  }

  /* ================================================================ 판매자 */
  function viewSellerHome() {
    var open = state.requests.filter(function (r) { return r.status === 'open'; });
    var quoteCount = open.reduce(function (n, r) { return n + r.quotes.length; }, 0);
    var soldCount = state.requests.filter(function (r) { return r.status === 'sold'; }).length;

    var feed = FEED.map(function (f) {
      return '<li class="feed-item">' +
        '<img class="feed-thumb" src="' + ART[f.art] + '" alt="">' +
        '<div class="feed-body">' +
        '<div class="feed-top"><span class="feed-name">' + esc(f.name) + '</span><span class="chip grade">' + esc(f.grade) + '</span></div>' +
        '<div class="feed-meta">' + f.shops + '개 샵 참여 · ' + f.ago + ' · <b>' + esc(f.shop) + '</b> 낙찰</div>' +
        '</div>' +
        '<div class="feed-price">' + won(f.price) + '<span>원</span><i>매입 완료</i></div>' +
        '</li>';
    }).join('');

    return '' +
      '<div class="pad">' +
      '  <section class="hero">' +
      '    <div class="hero-glow"></div><div class="hero-card"></div>' +
      '    <span class="hero-eyebrow">' + ICON.sparkle + ' 포켓몬 카드 전용 · 한국판·일본판·영문판</span>' +
      '    <h1>포켓몬 카드 사진 올리면,<br><span>카드샵들이 최고 매입가</span>를<br>불러요</h1>' +
      '    <p class="hero-sub">등급카드부터 미등급까지, 여러 카드샵 견적을<br>한 번에 비교하고 가장 높은 곳에 판매하세요.</p>' +
      '    <button class="btn hero-cta" data-action="go" data-view="s-request">' +
      '      <span>내 카드 견적 받기</span>' + ICON.chevron +
      '    </button>' +
      '    <div class="hero-stats">' +
      '      <div><b>' + open.length + '건</b><span>진행 중 견적</span></div><i></i>' +
      '      <div><b>' + quoteCount + '개</b><span>받은 견적</span></div><i></i>' +
      '      <div><b>' + soldCount + '건</b><span>거래 성사</span></div>' +
      '    </div>' +
      '  </section>' +
      '</div>' +

      '<section class="section">' +
      '  <div class="section-head"><h2>최근 매입 성사</h2><span>실시간</span></div>' +
      '  <ul class="feed">' + feed + '</ul>' +
      '</section>' +

      '<section class="section">' +
      '  <div class="section-head"><h2>이렇게 진행돼요</h2><span>평균 8분</span></div>' +
      '  <div class="steps">' +
      '    <div class="step"><span class="step-no">1</span><strong>사진 촬영</strong><p>카드 앞면 전체가<br>보이게 찍어요</p></div>' +
      '    <div class="step"><span class="step-no">2</span><strong>견적 비교</strong><p>최고가 순으로<br>한눈에 비교</p></div>' +
      '    <div class="step"><span class="step-no">3</span><strong>판매 확정</strong><p>샵에서 연락하고<br>검수 후 정산</p></div>' +
      '  </div>' +
      '</section>' +

      '<div class="safety">' + ICON.shield +
      '<div>거래를 확정하기 전까지 <b>연락처가 카드샵에 공개되지 않아요.</b> 확정한 샵에만 안내됩니다.</div></div>' +

      '<div class="footnote">슬랩딜은 <b>포켓몬 카드</b> 매입 비교 프로토타입입니다.<br>표시된 샵 이름과 금액은 모두 데모용 가상 데이터예요.</div>';
  }

  function viewSellerRequest() {
    var hasPhoto = !!ui.photo;
    var trade = ui.draft.trade || 'both';
    var lang = ui.draft.language || '한국판';
    var wantsRegion = trade === 'pickup' || trade === 'both';
    var tradeButtons = TRADE_OPTIONS.map(function (o) {
      return '<button type="button" data-action="seg" data-val="' + o.val + '" aria-pressed="' + (trade === o.val) + '">' + o.label + '</button>';
    }).join('');
    var langButtons = LANGUAGES.map(function (l) {
      return '<button type="button" data-action="seg" data-val="' + l + '" aria-pressed="' + (lang === l) + '">' + l + '</button>';
    }).join('');
    var gradeOptions = GRADES.map(function (g) { return '<option>' + g + '</option>'; }).join('');
    var samples = Object.keys(ART).map(function (k) {
      return '<button type="button" class="sample-btn" data-action="use-sample" data-key="' + k + '">' +
        '<img src="' + ART[k] + '" alt="">' +
        '<span>' + SAMPLE_LABEL[k] + '</span></button>';
    }).join('');

    return '' +
      '<div class="subhead"><button class="iconbtn" type="button" data-action="home" aria-label="홈으로">' + ICON.back + '</button></div>' +
      '<div class="page-title"><h1>견적 요청</h1><p>포켓몬 카드 사진 한 장이면 카드샵들이 매입가를 불러요.</p></div>' +

      '<div class="form">' +
      '  <div class="field">' +
      '    <label class="lbl">카드 사진 <span class="req">*</span></label>' +
      '    <div class="photo-picker ' + (hasPhoto ? 'has-photo' : '') + '" id="photoPicker">' +
      (hasPhoto
        ? '<img src="' + photoSrc(ui.photo) + '" alt="카드 사진 미리보기"><button type="button" class="photo-remove" data-action="clear-photo" aria-label="사진 삭제">×</button>'
        : '<div class="photo-empty"><div class="photo-icon">' + ICON.camera + '</div><strong>카드 앞면 사진</strong><p>밝은 곳에서 카드 전체가 보이게</p></div>') +
      '    </div>' +
      '    <div class="photo-actions">' +
      '      <label class="btn ghost file-btn">사진 선택<input type="file" accept="image/*" capture="environment" id="fileInput" hidden></label>' +
      '      <button type="button" class="btn ghost" data-action="sample-toggle">샘플 카드</button>' +
      '    </div>' +
      '    <div class="sample-row" id="sampleRow" ' + (ui.sampleOpen ? '' : 'hidden') + '>' + samples + '</div>' +
      '  </div>' +

      '  <div class="field">' +
      '    <label class="lbl" for="fCardName">카드명 <span class="req">*</span></label>' +
      '    <input class="input" id="fCardName" placeholder="예: 피카츄 ex SAR" maxlength="40" autocomplete="off">' +
      '  </div>' +

      '  <div class="field">' +
      '    <label class="lbl" for="fSeries">시리즈 / 카드 번호</label>' +
      '    <input class="input" id="fSeries" placeholder="예: 포켓몬카드 151 · 025/165" maxlength="40" autocomplete="off">' +
      '  </div>' +

      '  <div class="field">' +
      '    <label class="lbl">카드 언어</label>' +
      '    <div class="segmented" data-seg="language">' + langButtons + '</div>' +
      '    <p class="hint">일본판·영문판도 같은 카드로 매입가를 비교해요.</p>' +
      '  </div>' +

      '  <div class="field">' +
      '    <label class="lbl" for="fGrade">등급</label>' +
      '    <select class="select" id="fGrade">' + gradeOptions + '</select>' +
      '  </div>' +

      '  <div class="field">' +
      '    <label class="lbl">거래 희망</label>' +
      '    <div class="segmented three" data-seg="trade">' + tradeButtons + '</div>' +
      '    <p class="hint">둘 다를 고르면 택배·직거래 견적을 한 번에 받고, 판매 확정 후 발송 방식을 정해요.</p>' +
      '  </div>' +

      '  <div class="field" id="regionField" ' + (wantsRegion ? '' : 'hidden') + '>' +
      '    <label class="lbl" for="fRegion">직거래 희망 지역</label>' +
      '    <select class="select" id="fRegion">' +
      '      <option>서울 강남·서초</option><option>서울 마포·홍대</option><option>서울 송파·잠실</option>' +
      '      <option>서울 기타</option><option>경기 성남·분당</option><option>경기 수원</option>' +
      '      <option>인천</option><option>부산</option><option>대전</option><option>기타 지역</option>' +
      '    </select>' +
      '    <p class="hint">직거래로 진행할 때 만날 지역이에요.</p>' +
      '  </div>' +

      '  <div class="field">' +
      '    <label class="lbl" for="fNotes">특이사항</label>' +
      '    <textarea class="textarea" id="fNotes" maxlength="300" placeholder="상태, 슬리브 보관 여부, 검수 이력 등 샵이 참고할 내용을 적어주세요."></textarea>' +
      '  </div>' +
      '</div>' +

      '<div class="form-actions">' +
      '  <button type="button" class="btn primary block" data-action="submit-request">견적 요청 보내기</button>' +
      '  <p class="tiny muted" style="text-align:center;margin:10px 0 0">요청 후 <b>카드샵 모드</b>로 전환하면 직접 견적을 넣어볼 수 있어요.</p>' +
      '</div>';
  }

  function reqCard(r) {
    var sorted = r.quotes.slice().sort(function (a, b) { return b.price - a.price; });
    var sold = r.status === 'sold';
    var wq = null;
    if (sold) {
      for (var i = 0; i < r.quotes.length; i++) if (r.quotes[i].id === r.winner) wq = r.quotes[i];
    }
    var shown = wq || sorted[0];

    var shipInfo = trackingOf(r);
    var statusChip = shipInfo
      ? '<span class="chip shipped">' + ICON.truck + '배송 중</span>'
      : sold
        ? '<span class="chip sold">' + ICON.check + '거래 확정</span>'
        : (r.quotes.length
          ? '<span class="chip">견적 ' + r.quotes.length + '개</span>'
          : '<span class="chip">견적 대기</span>');

    var priceLine = shown
      ? '<span class="price ' + (sold ? '' : 'best') + '">' + won(shown.price) + '<em>원</em></span>' +
        '<span class="cnt">' + (sold ? '확정가' : (r.quotes.length > 1 ? '최고가' : '제시가')) + ' · ' + r.quotes.length + '개 샵</span>'
      : '<span class="tiny muted">아직 도착한 견적이 없어요</span>';

    return '<button type="button" class="card req-card" data-action="open-seller" data-id="' + r.id + '">' +
      '<img class="req-thumb" src="' + photoSrc(r.photo) + '" alt="">' +
      '<div class="req-main">' +
      '  <div class="req-top"><span class="chip grade">' + esc(r.grade) + '</span>' + statusChip + '</div>' +
      '  <strong class="req-name">' + esc(r.cardName) + '</strong>' +
      '  <span class="req-sub">' + esc(r.series || '시리즈 미입력') + ' · ' + esc(r.language || '언어 미입력') + ' · ' + ago(r.createdAt) + '</span>' +
      (shipInfo ? '<span class="req-ship">' + ICON.truck + '운송장 ' + esc(shipInfo.carrier) + ' · <b>' + esc(shipInfo.tracking) + '</b></span>' : '') +
      '  <div class="req-bottom">' + priceLine + '</div>' +
      '</div>' +
      '<span class="req-chev">' + ICON.chevron + '</span>' +
      '</button>';
  }

  function viewSellerInbox() {
    var all = state.requests.slice().sort(function (a, b) {
      var sa = a.status === 'sold' ? 1 : 0;
      var sb = b.status === 'sold' ? 1 : 0;
      if (sa !== sb) return sa - sb;
      return b.createdAt - a.createdAt;
    });
    var list = all.filter(function (r) {
      if (ui.filter === 'open') return r.status === 'open';
      if (ui.filter === 'sold') return r.status === 'sold';
      return true;
    });
    var openCount = state.requests.filter(function (r) { return r.status === 'open'; }).length;
    var quoteCount = state.requests.reduce(function (n, r) { return n + r.quotes.length; }, 0);

    var filters = [
      ['all', '전체'],
      ['open', '견적 수집 중'],
      ['sold', '거래 확정']
    ].map(function (f) {
      return '<button type="button" data-action="filter-seller" data-val="' + f[0] + '" aria-pressed="' + (ui.filter === f[0]) + '">' + f[1] + '</button>';
    }).join('');

    var body;
    if (list.length) {
      body = '<div class="list">' + list.map(reqCard).join('') + '</div>';
    } else {
      body = '<div class="empty">' +
        '<div class="empty-ico">' + ICON.inbox + '</div>' +
        '<strong>아직 견적 요청이 없어요</strong>' +
        '<p>카드 사진을 올리면 카드샵들이<br>매입가를 제안합니다.</p>' +
        '<button type="button" class="btn primary" data-action="go" data-view="s-request">첫 카드 견적 받기</button>' +
        '</div>';
    }

    return '' +
      '<div class="page-title" style="padding-top:14px"><h1>내 견적함</h1>' +
      '<p>' + openCount + '건 진행 중 · 받은 견적 ' + quoteCount + '개</p></div>' +
      '<div class="filters">' + filters + '</div>' +
      body +
      (list.length ? '<div class="footnote" style="padding-bottom:8px">견적은 매입가 높은 순으로 정렬돼요.</div>' : '');
  }

  function viewSellerDetail() {
    var r = getReq(ui.a);
    if (!r) return viewSellerInbox();

    var quotes = r.quotes.slice().sort(function (a, b) { return b.price - a.price; });
    var sold = r.status === 'sold';
    var win = null;
    if (sold) {
      for (var i = 0; i < r.quotes.length; i++) if (r.quotes[i].id === r.winner) win = r.quotes[i];
    }

    var quoteHTML = quotes.length
      ? '<div class="quote-list">' + quotes.map(function (q, i) {
          return quoteCard(r, q, i === 0 && !sold, sold, win);
        }).join('') + '</div>'
      : emptyQuotes(r);

    return '' +
      '<div class="subhead"><button type="button" class="iconbtn" data-action="back-inbox" aria-label="견적함으로">' + ICON.back + '</button></div>' +
      '<div class="photo-hero"><img src="' + photoSrc(r.photo) + '" alt="' + esc(r.cardName) + '"></div>' +
      '<div class="detail-body">' +
      '  <div class="detail-head"><div class="t"><h1>' + esc(r.cardName) + '</h1><p>' + esc(r.series || '시리즈 미입력') + '</p></div></div>' +
      '  <div class="chip-row">' +
      '    <span class="chip grade">' + esc(r.grade) + '</span>' +
      '    <span class="chip">' + esc(r.language || '언어 미입력') + '</span>' +
      '    <span class="chip trade">' + (tradeOf(r) === 'delivery' ? ICON.truck : ICON.pin) + esc(tradeBadge(r)) + '</span>' +
      (trackingOf(r) ? '<span class="chip shipped">' + ICON.truck + '배송 중 (' + esc(r.shipment.carrier) + ' ' + esc(r.shipment.tracking) + ')</span>' : '') +
      (sold ? '<span class="chip sold">거래 확정</span>' : '<span class="chip live">견적 ' + quotes.length + '건</span>') +
      '  </div>' +
      '  <dl class="infobox">' +
      '    <dt>등록</dt><dd>' + ago(r.createdAt) + '</dd>' +
      '    <dt>언어</dt><dd>' + esc(r.language || '미입력') + '</dd>' +
      '    <dt>거래 방식</dt><dd>' + esc(tradeBadge(r)) + '</dd>' +
      '    <dt>특이사항</dt><dd>' + (r.notes ? esc(r.notes) : '없음') + '</dd>' +
      '    <dt>받은 견적</dt><dd>' + quotes.length + '개 샵' + (quotes.length ? ' · 최고가 ' + won(quotes[0].price) + '원' : ' · 대기 중') + '</dd>' +
      '  </dl>' +
      (sold && win ? soldBanner(r, win) : '') +
      '</div>' +

      '<section class="section">' +
      '  <div class="section-head"><h2>받은 견적 <b>' + quotes.length + '</b></h2><span>' + (sold ? '마감됨' : '높은 가격 순') + '</span></div>' +
      quoteHTML +
      '</section>' +
      (sold ? '' : '<div class="safety">' + ICON.shield + '<div>판매할 샵을 확정하면 나머지 견적은 자동으로 마감돼요. 확정 전에는 연락처가 공개되지 않습니다.</div></div>') +
      '<div class="footnote">카드샵 정보와 금액은 데모용 가상 데이터입니다.</div>';
  }

  function quoteCard(r, q, isBest, sold, win) {
    var shop = shopOf(q.shopId);
    var isWin = !!(sold && win && win.id === q.id);
    var badge = isWin
      ? '<span class="chip sold">낙찰</span>'
      : (isBest ? '<span class="chip grade">최고가</span>' : '');

    return '<article class="quote ' + (isBest ? 'best' : '') + ' ' + (sold && !isWin ? 'dim' : '') + '">' +
      (sold && !isWin ? '<span class="closed-tag">마감</span>' : '') +
      '<div class="quote-q">' +
      '  <div class="quote-shop">' +
      '    <span class="shop-logo">' + esc(shop.name.slice(0, 1)) + '</span>' +
      '    <div>' +
      '      <div class="shop-name">' + esc(shop.name) + '</div>' +
      '      <div class="shop-meta">' + esc(shop.area) + ' · <b>★ ' + shop.rating + '</b> · ' + esc(shop.tag) + '</div>' +
      '    </div>' +
      '  </div>' + badge +
      '</div>' +
      '<div class="quote-amount">' +
      '  <span class="price ' + (isBest || isWin ? 'best' : '') + '">' + won(q.price) + '<em>원</em></span>' +
      '  <span class="tiny muted">' + ago(q.at) + '</span>' +
      '</div>' +
      '<div class="quote-chips">' +
      '  <span class="chip">' + ICON.cash + esc(q.pay) + '</span>' +
      '  <span class="chip ship-' + shipTone(shipLabel(q)) + '">' + shipIcon(shipLabel(q)) + esc(shipLabel(q)) + '</span>' +
      '  <span class="chip">' + (tradeOf(r) === 'delivery' ? ICON.truck + '택배 매입' : tradeOf(r) === 'pickup' ? ICON.pin + '직거래' : ICON.pin + '택배·직거래') + '</span>' +
      '</div>' +
      '<div class="quote-terms">' +
      '  <div class="qt-row"><span class="qt-k">검수·반송</span><span class="qt-v">' + esc(returnLabel(q)) + '</span></div>' +
      '</div>' +
      (q.comment ? '<p class="quote-comment">“' + esc(q.comment) + '”</p>' : '') +
      (sold ? '' :
        '<div class="quote-actions"><button type="button" class="btn ' + (isBest ? 'primary' : 'ghost') + '" data-action="sell" data-id="' + r.id + '" data-quote="' + q.id + '">이 샵에 판매하기</button></div>') +
      '</article>';
  }

  function emptyQuotes(r) {
    return '<div class="empty" style="padding:34px 24px">' +
      '<div class="empty-ico">' + ICON.inbox + '</div>' +
      '<strong>아직 도착한 견적이 없어요</strong>' +
      '<p>카드샵들이 사진을 확인하고 있어요.<br>프로토타입에서는 <b>카드샵 모드</b>로 전환해<br>직접 매입가를 제안해 볼 수 있어요.</p>' +
      '<button type="button" class="btn ghost" data-action="mode" data-mode="dealer">카드샵 모드로 견적 넣기</button>' +
      '</div>';
  }

  function soldBanner(r, w) {
    var shop = shopOf(w.shopId);
    var courier = deliversByCourier(r, w);
    return '<div class="sold-banner">' +
      '<div class="sb-top">' + ICON.check + ' 거래가 확정됐어요</div>' +
      '<div class="sb-price">' + won(w.price) + '<span>원</span></div>' +
      '<div class="sb-shop">' + esc(shop.name) + ' · ' + esc(shop.area) + ' · ' + esc(w.pay) + '</div>' +
      '<div class="sb-terms">' +
      '  <span>' + shipIcon(shipLabel(w)) + esc(shipLabel(w)) + '</span>' +
      '  <span>검수·반송 · ' + esc(returnLabel(w)) + '</span>' +
      '</div>' +
      '<ul>' +
      '  <li><b>1</b><span>' + esc(shop.name) + '에서 10분 안에 연락드려요.</span></li>' +
      '  <li><b>2</b><span>' + (courier ? '택배로 발송하면 도착 후 검수를 진행해요.' : '약속한 장소에서 카드 검수를 진행해요.') + '</span></li>' +
      '  <li><b>3</b><span>검수 완료 후 <b>' + esc(w.pay) + '</b>으로 정산돼요.</span></li>' +
      '</ul>' +
      shipSection(r, w) +
      '<button type="button" class="cancel-link" data-action="ask-cancel" data-id="' + r.id + '">거래 취소하기</button>' +
      '</div>';
  }

  /* 확정 배너 안의 거래 방식 선택 · 운송장 등록 블록 */
  function fulfilSwitch(r) {
    var f = r.fulfill || 'delivery';
    return '<div class="fulfill-switch">' +
      '<button type="button" data-action="fulfill" data-id="' + r.id + '" data-val="delivery" aria-pressed="' + (f === 'delivery') + '">' + ICON.truck + '택배로 발송</button>' +
      '<button type="button" data-action="fulfill" data-id="' + r.id + '" data-val="pickup" aria-pressed="' + (f === 'pickup') + '">' + ICON.pin + '직거래</button>' +
      '</div>';
  }

  function shipSection(r, w) {
    var both = tradeOf(r) === 'both';
    var courier = deliversByCourier(r, w);
    var head = (both && shipLabel(w) !== '직거래 전용') ? fulfilSwitch(r) : '';

    if (!courier) {
      var note = shipLabel(w) === '직거래 전용'
        ? '이 샵은 <b>직거래 전용</b>으로 견적을 냈어요 · 장소는 샵과 협의해 주세요.'
        : '직거래로 진행해요 · ' + esc(r.region || '장소는 샵과 협의해 주세요.');
      return '<div class="ship-box">' + head +
        '<div class="ship-note">' + ICON.pin + '<span>' + note + '</span></div></div>';
    }

    var done = trackingOf(r);
    if (done && !ui.editShip) {
      return '<div class="ship-box">' + head +
        '<div class="ship-box-head">' + ICON.truck + '<b>배송 중</b><em>' + esc(done.carrier) + ' · ' + ago(done.at) + '</em></div>' +
        '<div class="ship-track">' + esc(done.tracking) + '</div>' +
        '<div class="ship-done-note">운송장이 등록됐어요. 카드샵 <b>내 입찰</b> 화면에도 같은 번호가 표시됩니다.</div>' +
        '<button type="button" class="ship-edit" data-action="edit-shipment" data-id="' + r.id + '">운송장 수정</button>' +
        '</div>';
    }

    var carrier = done ? done.carrier : 'CJ대한통운';
    var tracking = done ? done.tracking : '';
    return '<div class="ship-box">' + head +
      '<div class="ship-box-head">' + ICON.truck + '<b>택배 발송 · 운송장 등록</b></div>' +
      '<label class="ship-lbl" for="shipCarrier">택배사</label>' +
      '<select class="select" id="shipCarrier">' + CARRIERS.map(function (c) {
        return '<option' + (c === carrier ? ' selected' : '') + '>' + esc(c) + '</option>';
      }).join('') + '</select>' +
      '<label class="ship-lbl" for="shipTracking">운송장 번호</label>' +
      '<input class="input" id="shipTracking" inputmode="numeric" autocomplete="off" placeholder="숫자만 입력 (예: 1234567890123)" value="' + esc(tracking) + '">' +
      '<button type="button" class="btn primary block" data-action="register-shipment" data-id="' + r.id + '">발송 완료 처리</button>' +
      '<p class="ship-hint">등록하면 상태가 <b>배송 중</b>으로 바뀌고 카드샵 화면에 운송장이 바로 반영돼요.</p>' +
      '</div>';
  }

  /* ================================================================ 카드샵 */
  function viewDealerPending() {
    var openAll = state.requests.filter(function (r) { return r.status === 'open'; })
      .sort(function (a, b) { return b.createdAt - a.createdAt; });

    var list = openAll.filter(function (r) {
      if (ui.dFilter === 'new') return Date.now() - r.createdAt < NEW_WINDOW;
      if (ui.dFilter === 'mine') return r.quotes.some(function (q) { return q.shopId === MY_SHOP_ID; });
      return true;
    });

    var myBids = state.requests.filter(function (r) {
      return r.quotes.some(function (q) { return q.shopId === MY_SHOP_ID; });
    }).length;
    var myWins = state.requests.filter(function (r) {
      return r.status === 'sold' && r.quotes.some(function (q) { return q.id === r.winner && q.shopId === MY_SHOP_ID; });
    }).length;

    var filters = [['all', '전체'], ['new', '새 요청'], ['mine', '내가 입찰']].map(function (f) {
      return '<button type="button" data-action="filter-dealer" data-val="' + f[0] + '" aria-pressed="' + (ui.dFilter === f[0]) + '">' + f[1] + '</button>';
    }).join('');

    var body = list.length
      ? '<div class="list">' + list.map(dealerCard).join('') + '</div>'
      : '<div class="empty"><div class="empty-ico">' + ICON.list + '</div><strong>조건에 맞는 카드가 없어요</strong><p>새 견적 요청이 올라오면<br>여기에 바로 표시됩니다.</p></div>';

    return '' +
      '<div class="dealer-banner">' +
      '  <div class="db-top">' +
      '    <div><h2>' + esc(shopOf(MY_SHOP_ID).name) + '</h2><p>입찰 대기 ' + openAll.length + '건 · 실시간 업데이트</p></div>' +
      '    <span class="chip" style="background:rgba(255,255,255,.18);color:#fff">딜러</span>' +
      '  </div>' +
      '  <div class="db-stats">' +
      '    <div><b>' + openAll.length + '</b><span>입찰 대기</span></div>' +
      '    <div><b>' + myBids + '</b><span>내 입찰</span></div>' +
      '    <div><b>' + myWins + '</b><span>낙찰</span></div>' +
      '  </div>' +
      '</div>' +
      '<div class="filters">' + filters + '</div>' +
      body +
      '<div class="footnote">판매자 모드에서 새 카드를 올리면<br>이 목록에 바로 나타납니다.</div>';
  }

  function dealerCard(r) {
    var my = null;
    for (var i = 0; i < r.quotes.length; i++) if (r.quotes[i].shopId === MY_SHOP_ID) my = r.quotes[i];
    var isNew = Date.now() - r.createdAt < NEW_WINDOW;
    var others = r.quotes.filter(function (q) { return q.shopId !== MY_SHOP_ID; }).length;

    var bottom = my
      ? '<span class="mine">내 견적 ' + won(my.price) + '원</span><span class="cnt">' + others + '개 샵 경쟁</span>'
      : '<span class="tiny muted">' + (others ? others + '개 샵이 이미 참여했어요' : '아직 견적 없음 · 첫 입찰 가능') + '</span>';

    return '<button type="button" class="card req-card" data-action="open-dealer" data-id="' + r.id + '">' +
      '<img class="req-thumb" src="' + photoSrc(r.photo) + '" alt="">' +
      '<div class="req-main">' +
      '  <div class="req-top"><span class="chip grade">' + esc(r.grade) + '</span>' +
      (isNew ? '<span class="chip new">NEW</span>' : '') +
      '<span class="chip trade">' + esc(TRADE_CHIP[tradeOf(r)]) + '</span></div>' +
      '  <strong class="req-name">' + esc(r.cardName) + '</strong>' +
      '  <span class="req-sub">' + esc(r.series || '시리즈 미입력') + ' · ' + esc(r.language || '언어 미입력') + ' · ' + ago(r.createdAt) + '</span>' +
      '  <div class="req-bottom">' + bottom + '</div>' +
      '</div>' +
      '<span class="req-chev">' + ICON.chevron + '</span>' +
      '</button>';
  }

  /* 낙참한 샵 화면에서 보는 발송 상태 */
  function dealerShipLine(r, w) {
    var s = trackingOf(r);
    if (s) {
      return '<div class="sb-ship">' + ICON.truck + '<span>배송 중 · ' + esc(s.carrier) + ' <b>' + esc(s.tracking) + '</b></span></div>';
    }
    if (deliversByCourier(r, w)) {
      return '<div class="sb-ship pending">' + ICON.clock + '<span>운송장 등록 대기 · 판매자가 발송하면 여기에 표시돼요</span></div>';
    }
    return '<div class="sb-ship pending">' + ICON.pin + '<span>직거래로 진행 · 장소는 판매자와 협의</span></div>';
  }

  function viewDealerDetail() {
    var r = getReq(ui.a);
    if (!r) return viewDealerPending();

    var my = null;
    for (var i = 0; i < r.quotes.length; i++) if (r.quotes[i].shopId === MY_SHOP_ID) my = r.quotes[i];
    var sold = r.status === 'sold';
    var iWon = !!(sold && my && r.winner === my.id);
    var others = r.quotes.filter(function (q) { return q.shopId !== MY_SHOP_ID; }).length;

    var result = '';
    if (sold) {
      result = '<div class="sold-banner" style="margin-top:14px">' +
        '<div class="sb-top">' + (iWon ? ICON.check + ' 낙찰됐어요' : ICON.clock + ' 마감된 카드예요') + '</div>' +
        '<div class="sb-price">' + (my ? won(my.price) + '<span>원</span>' : '<span>입찰 없음</span>') + '</div>' +
        '<div class="sb-shop">' +
        (iWon
          ? '판매자가 내 견적을 선택했어요. 판매자에게 연락해 검수를 진행하세요.'
          : (my ? '다른 샵의 견적이 선택됐어요. 다음 카드에서 다시 도전해 보세요.' : '이 카드에는 입찰하지 않았어요.')) +
        '</div>' +
        (iWon ? dealerShipLine(r, my) : '') +
        '</div></div>';
    }

    var payNow = my ? my.pay : (state.settings.pay || '검수 후 당일 입금');
    var commentNow = my ? (my.comment || '') : (state.settings.comment || '');
    var shipNow = my ? shipLabel(my) : (state.settings.ship || SHIP_FEES[0].val);
    var returnNow = my ? returnLabel(my) : (state.settings.returnPolicy || RETURN_PRESETS[0]);
    var returnCustom = RETURN_PRESETS.indexOf(returnNow) === -1;

    var bidForm = sold ? '' :
      '<div class="bid-form">' +
      '  <div class="section-head" style="padding:0 0 9px"><h2>매입가 제시</h2><span>부가세 포함</span></div>' +
      (my ? '<div class="mybid-note">' + ICON.check + ' 현재 <b>' + won(my.price) + '원</b>으로 견적을 냈어요 · 판매자 선택 대기 중</div>' : '') +
      '  <div class="price-input-wrap">' +
      '    <input id="bidPrice" inputmode="numeric" autocomplete="off" placeholder="0" aria-label="희망 매입가" value="' + (my ? won(my.price) : '') + '">' +
      '    <span class="unit">원</span>' +
      '  </div>' +
      '  <div class="field" style="margin-top:16px">' +
      '    <label class="lbl">송금 · 검수 조건</label>' +
      '    <div class="pay-options">' +
      '      <label class="pay-option"><input type="radio" name="pay" value="검수 후 당일 입금" ' + (payNow === '검수 후 당일 입금' ? 'checked' : '') + '>' +
      '        <span>검수 후 당일 입금<em>도착·검수 뒤 정산</em></span></label>' +
      '      <label class="pay-option"><input type="radio" name="pay" value="현장 즉시 입금" ' + (payNow === '현장 즉시 입금' ? 'checked' : '') + '>' +
      '        <span>현장 즉시 입금<em>직거래 즉시 정산</em></span></label>' +
      '    </div>' +
      '  </div>' +
      '  <div class="field" style="margin-top:16px">' +
      '    <label class="lbl">택배비</label>' +
      '    <div class="pay-options three">' +
      SHIP_FEES.map(function (s) {
        return '<label class="pay-option"><input type="radio" name="ship" value="' + esc(s.val) + '" ' + (shipNow === s.val ? 'checked' : '') + '>' +
          '<span>' + s.label + '<em>' + s.em + '</em></span></label>';
      }).join('') +
      '    </div>' +
      '  </div>' +
      '  <div class="field" style="margin-top:16px">' +
      '    <label class="lbl" for="bidReturn">검수 · 반송 기준</label>' +
      '    <select class="select" id="bidReturn">' + retOptions(returnNow) + '</select>' +
      '    <input class="input" id="bidReturnCustom" maxlength="60" autocomplete="off" placeholder="예: 등급케이스 훼손 외 감가 없음 · 미매입 시 샵 부담 반송" value="' + esc(returnCustom ? returnNow : '') + '"' + (returnCustom ? '' : ' hidden') + '>' +
      '    <p class="hint">판매자의 견적 비교 카드에 그대로 표시돼요.</p>' +
      '  </div>' +
      '  <div class="field" style="margin-top:16px">' +
      '    <label class="lbl" for="bidComment">샵 한 줄 코멘트 <span class="tiny muted">(선택)</span></label>' +
      '    <input class="input" id="bidComment" maxlength="50" autocomplete="off" placeholder="예: 검수 후 당일 입금해드려요" value="' + esc(commentNow) + '">' +
      '    <div class="counter"><span id="commentCount">' + commentNow.length + '</span>/50</div>' +
      '  </div>' +
      '  <button type="button" class="btn primary block" style="margin-top:18px" data-action="submit-bid" data-id="' + r.id + '">' +
      (my ? '견적 수정하기' : '이 가격으로 견적 넣기') + '</button>' +
      '  <p class="tiny muted" style="text-align:center;margin:10px 0 0">견적은 판매자에게 바로 전달돼요 · 수수료 0% (베타)</p>' +
      '</div>';

    return '' +
      '<div class="subhead"><button type="button" class="iconbtn" data-action="back-pending" aria-label="입찰 대기 목록으로">' + ICON.back + '</button></div>' +
      '<div class="photo-hero" style="height:210px"><img src="' + photoSrc(r.photo) + '" alt="' + esc(r.cardName) + '"></div>' +
      '<div class="detail-body">' +
      '  <div class="detail-head"><div class="t"><h1>' + esc(r.cardName) + '</h1><p>' + esc(r.series || '시리즈 미입력') + ' · ' + ago(r.createdAt) + '</p></div></div>' +
      '  <div class="chip-row">' +
      '    <span class="chip grade">' + esc(r.grade) + '</span>' +
      '    <span class="chip">' + esc(r.language || '언어 미입력') + '</span>' +
      '    <span class="chip trade">' + (tradeOf(r) === 'delivery' ? ICON.truck : ICON.pin) + esc(tradeBadge(r)) + '</span>' +
      (sold ? '<span class="chip">마감</span>' : '<span class="chip live">입찰 가능</span>') +
      '  </div>' +
      '  <dl class="infobox">' +
      '    <dt>카드 언어</dt><dd>' + esc(r.language || '미입력') + '</dd>' +
      '    <dt>판매자 희망</dt><dd>' + esc(tradeBadge(r)) + '</dd>' +
      '    <dt>특이사항</dt><dd>' + (r.notes ? esc(r.notes) : '없음') + '</dd>' +
      '    <dt>경쟁</dt><dd>' + (others ? others + '개 샵 참여 중 (가격 비공개)' : '아직 참여한 샵이 없어요') + '</dd>' +
      '  </dl>' +
      result +
      bidForm +
      '</div>' +
      '<div class="footnote">판매자에게는 샵 이름·매입가·조건·코멘트가 함께 표시됩니다.</div>';
  }

  function viewDealerBids() {
    var rows = state.requests.map(function (r) {
      var my = null;
      for (var i = 0; i < r.quotes.length; i++) if (r.quotes[i].shopId === MY_SHOP_ID) my = r.quotes[i];
      if (!my) return null;
      return {
        r: r,
        my: my,
        win: r.status === 'sold' && r.winner === my.id,
        lost: r.status === 'sold' && r.winner !== my.id
      };
    }).filter(Boolean).sort(function (a, b) { return b.my.at - a.my.at; });

    var body = rows.length
      ? '<div class="list">' + rows.map(function (row) {
          var chip = row.win ? '<span class="chip sold">낙찰</span>'
            : row.lost ? '<span class="chip">다른 샵 낙찰</span>'
            : '<span class="chip live">선택 대기</span>';
          return '<button type="button" class="card req-card" data-action="open-dealer" data-id="' + row.r.id + '">' +
            '<img class="req-thumb" src="' + photoSrc(row.r.photo) + '" alt="">' +
            '<div class="req-main">' +
            '  <div class="req-top"><span class="chip grade">' + esc(row.r.grade) + '</span>' + chip + '</div>' +
            '  <strong class="req-name">' + esc(row.r.cardName) + '</strong>' +
            '  <span class="req-sub">' + esc(row.my.pay) + ' · ' + ago(row.my.at) + '</span>' +
        (row.win ? '<span class="req-ship" id="bidShip-' + row.r.id + '">' + (trackingOf(row.r)
          ? ICON.truck + '운송장 ' + esc(row.r.shipment.carrier) + ' · <b>' + esc(row.r.shipment.tracking) + '</b>'
          : (deliversByCourier(row.r, row.my)
            ? '<i class="ship-pending">' + ICON.clock + '운송장 등록 대기</i>'
            : '<i class="ship-pending">' + ICON.pin + '직거래로 진행</i>')) + '</span>' : '') +
            '  <div class="req-bottom"><span class="price ' + (row.win ? '' : 'best') + '">' + won(row.my.price) + '<em>원</em></span>' +
            '  <span class="cnt">내 견적</span></div>' +
            '</div>' +
            '<span class="req-chev">' + ICON.chevron + '</span>' +
            '</button>';
        }).join('') + '</div>'
      : '<div class="empty"><div class="empty-ico">' + ICON.tag + '</div><strong>아직 낸 견적이 없어요</strong><p>입찰 대기 목록에서 카드를 골라<br>매입가를 제안해 보세요.</p>' +
        '<button type="button" class="btn primary" data-action="tab" data-view="d-pending">입찰 대기 보기</button></div>';

    var wonCount = rows.filter(function (x) { return x.win; }).length;

    return '<div class="page-title" style="padding-top:14px"><h1>내 입찰</h1>' +
      '<p>' + rows.length + '건 입찰 · ' + wonCount + '건 낙찰</p></div>' + body;
  }

  function viewDealerShop() {
    var shop = shopOf(MY_SHOP_ID);
    return '' +
      '<div class="page-title" style="padding-top:14px"><h1>샵 관리</h1><p>입찰 기본값과 샵 정보를 관리해요.</p></div>' +
      '<div class="profile">' +
      '  <div class="profile-top">' +
      '    <span class="shop-logo">' + esc(shop.name.slice(0, 1)) + '</span>' +
      '    <div><h2>' + esc(shop.name) + '</h2><p>' + esc(shop.area) + ' · ' + esc(shop.tag) + ' · ' + shop.since + '년부터</p></div>' +
      '  </div>' +
      '  <div class="stat-grid">' +
      '    <div><b>4.9</b><span>평점</span></div>' +
      '    <div><b>98%</b><span>응답률</span></div>' +
      '    <div><b>1,240</b><span>누적 매입</span></div>' +
      '  </div>' +
      '</div>' +

      '<div class="form">' +
      '  <div class="field">' +
      '    <label class="lbl">기본 송금 · 검수 조건</label>' +
      '    <select class="select" id="setPay">' +
      '      <option ' + (state.settings.pay === '검수 후 당일 입금' ? 'selected' : '') + '>검수 후 당일 입금</option>' +
      '      <option ' + (state.settings.pay === '현장 즉시 입금' ? 'selected' : '') + '>현장 즉시 입금</option>' +
      '    </select>' +
      '    <p class="hint">견적을 넣을 때 기본으로 선택돼요.</p>' +
      '  </div>' +
      '  <div class="field">' +
      '    <label class="lbl" for="setShip">기본 택배비</label>' +
      '    <select class="select" id="setShip">' +
      SHIP_FEES.map(function (s) {
        return '<option value="' + esc(s.val) + '"' + (state.settings.ship === s.val ? ' selected' : '') + '>' + esc(s.val) + '</option>';
      }).join('') +
      '    </select>' +
      '    <p class="hint">직거래만 하는 샵은 <b>직거래 전용</b>을 골라 두세요.</p>' +
      '  </div>' +
      '  <div class="field">' +
      '    <label class="lbl" for="setReturn">기본 검수 · 반송 기준</label>' +
      '    <select class="select" id="setReturn">' + retOptions(state.settings.returnPolicy || RETURN_PRESETS[0]) + '</select>' +
      '    <input class="input" id="setReturnCustom" maxlength="60" autocomplete="off" placeholder="기준을 직접 입력하세요" value="' +
      esc(RETURN_PRESETS.indexOf(state.settings.returnPolicy) === -1 ? (state.settings.returnPolicy || '') : '') + '"' +
      (RETURN_PRESETS.indexOf(state.settings.returnPolicy) === -1 ? '' : ' hidden') + '>' +
      '    <p class="hint">판매자 비교 카드에 이 기준이 함께 표시돼요.</p>' +
      '  </div>' +
      '  <div class="field">' +
      '    <label class="lbl" for="setComment">기본 코멘트</label>' +
      '    <input class="input" id="setComment" maxlength="50" autocomplete="off" placeholder="예: 등급카드 전문, 검수 후 당일 입금" value="' + esc(state.settings.comment || '') + '">' +
      '  </div>' +
      '</div>' +
      '<div class="form-actions" style="margin-top:14px">' +
      '  <button type="button" class="btn navy block" data-action="save-settings">기본값 저장</button>' +
      '</div>' +

      '<div class="section">' +
      '  <div class="section-head"><h2>데모 데이터</h2><span>프로토타입</span></div>' +
      '  <div class="pad">' +
      '    <button type="button" class="btn ghost block" data-action="ask-reset" style="color:var(--red)">모든 데모 데이터 초기화</button>' +
      '  </div>' +
      '</div>' +
      '<div class="footnote">샵 정보는 모두 가상 데이터입니다.<br>실제 서비스에서는 사업자 인증 후 노출됩니다.</div>';
  }

  /* ================================================================ 입점 안내 */
  function viewSellerJoin() {
    return '' +
      '<div class="join-hero">' +
      '  <span class="hero-eyebrow">' + ICON.store + ' 카드샵 파트너</span>' +
      '  <h1>카드샵이라면,<br><span>매일 올라오는 포켓몬 카드</span>에<br>입찰하세요</h1>' +
      '  <p>판매자가 올린 포켓몬 카드에 매입가를 제안하고,<br>선택받으면 바로 거래가 시작됩니다.</p>' +
      '</div>' +

      '<section class="section">' +
      '  <div class="section-head"><h2>입점 혜택</h2><span>베타 기간</span></div>' +
      '  <div class="benefits">' +
      '    <div class="benefit"><span class="b-ico">' + ICON.list + '</span><div><strong>매입 기회가 매일 쌓여요</strong><p>한국판·일본판·영문판, 등급카드부터 미등급까지 원하는 가격으로 입찰하세요.</p></div></div>' +
      '    <div class="benefit"><span class="b-ico">' + ICON.cash + '</span><div><strong>수수료 0% · 당일 정산</strong><p>베타 기간에는 입찰 수수료가 없고, 검수 완료 후 당일 정산을 기본으로 합니다.</p></div></div>' +
      '    <div class="benefit"><span class="b-ico">' + ICON.shield + '</span><div><strong>검증된 판매자만</strong><p>거래 확정 전에는 연락처가 공개되지 않고, 확정된 샵에만 안내됩니다.</p></div></div>' +
      '  </div>' +
      '</section>' +

      '<section class="section">' +
      '  <div class="section-head"><h2>입점 절차</h2><span>약 3영업일</span></div>' +
      '  <ol class="flow-list">' +
      '    <li><span class="flow-no">1</span><div><strong>입점 문의</strong><p>샵 이름과 사업자 정보를 남겨주세요.</p></div></li>' +
      '    <li><span class="flow-no">2</span><div><strong>서류 확인 · 실사</strong><p>사업자등록증과 매장 확인 후 승인됩니다.</p></div></li>' +
      '    <li><span class="flow-no">3</span><div><strong>입찰 시작</strong><p>입찰 대기 목록에서 매입가를 제안하세요.</p></div></li>' +
      '    <li><span class="flow-no">4</span><div><strong>검수 · 정산</strong><p>낙찰 후 검수를 거쳐 약속한 조건으로 정산합니다.</p></div></li>' +
      '  </ol>' +
      '</section>' +

      '<section class="section">' +
      '  <div class="section-head"><h2>자주 묻는 질문</h2><span></span></div>' +
      '  <div class="faq">' +
      '    <details><summary>입찰에 비용이 드나요?</summary><p>베타 기간에는 입찰 수수료가 0원입니다. 낙찰 후 거래가 성사된 건에 대해서만 추후 정책이 적용될 예정입니다.</p></details>' +
      '    <details><summary>견적을 수정할 수 있나요?</summary><p>판매자가 샵을 선택하기 전까지는 언제든 매입가와 조건을 수정할 수 있습니다.</p></details>' +
      '    <details><summary>다른 샵의 견적이 보이나요?</summary><p>다른 샵의 매입가는 공개되지 않습니다. 참여한 샵의 수만 확인할 수 있어요.</p></details>' +
      '  </div>' +
      '</section>' +

      '<div class="form-actions" style="margin-top:22px">' +
      '  <button type="button" class="btn primary block" data-action="join-cta">입점 문의 남기기</button>' +
      '</div>' +
      '<div class="footnote">현재는 프로토타입이라 실제 접수는 되지 않아요.<br>문의 폼은 정식 오픈 시 연결됩니다.</div>';
  }

  /* ================================================================ 시트 */
  function sheetHTML() {
    if (sheet.type === 'sell') {
      var r = getReq(sheet.id);
      if (!r) return '';
      var q = null;
      for (var i = 0; i < r.quotes.length; i++) if (r.quotes[i].id === sheet.quoteId) q = r.quotes[i];
      if (!q) return '';
      var shop = shopOf(q.shopId);
      return '<div class="sheet-backdrop" data-action="close-sheet"></div>' +
        '<div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheetTitle">' +
        '<div class="sheet-grab"></div>' +
        '<h2 id="sheetTitle">이 샵에 판매할까요?</h2>' +
        '<p class="sub">확정하면 다른 샵의 견적은 자동으로 마감돼요.</p>' +
        '<div class="sheet-summary">' +
        '  <div class="sheet-shop"><span class="shop-logo">' + esc(shop.name.slice(0, 1)) + '</span>' +
        '  <div><em class="n">' + esc(shop.name) + '</em><span class="m">' + esc(shop.area) + ' · ★ ' + shop.rating + '</span></div></div>' +
        '  <div class="sheet-price">' + won(q.price) + '<span>원</span></div>' +
        '</div>' +
        '<ul class="sheet-notes">' +
        '  <li><b>' + esc(r.cardName) + '</b> · ' + esc(r.grade) + '</li>' +
        '  <li>송금 조건: <b>' + esc(q.pay) + '</b></li>' +
        '  <li>확정 후 ' + esc(shop.name) + '에서 10분 안에 연락해요.</li>' +
        '  <li>연락처는 확정한 샵에만 전달됩니다.</li>' +
        '</ul>' +
        '<div class="sheet-actions">' +
        '  <button type="button" class="btn ghost" data-action="close-sheet">취소</button>' +
        '  <button type="button" class="btn primary" data-action="confirm-sell" data-id="' + r.id + '" data-quote="' + q.id + '">판매 확정</button>' +
        '</div></div>';
    }

    if (sheet.type === 'cancel' || sheet.type === 'reset') {
      var isReset = sheet.type === 'reset';
      return '<div class="sheet-backdrop" data-action="close-sheet"></div>' +
        '<div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheetTitle">' +
        '<div class="sheet-grab"></div>' +
        '<h2 id="sheetTitle">' + (isReset ? '데모 데이터를 초기화할까요?' : '거래를 취소할까요?') + '</h2>' +
        '<p class="sub">' + (isReset
          ? '내가 올린 카드, 받은 견적, 입찰 내역이 모두 처음 상태로 돌아가요.'
          : '확정이 취소되고 카드는 다시 견적을 받는 상태가 돼요.') + '</p>' +
        '<div class="sheet-actions">' +
        '  <button type="button" class="btn ghost" data-action="close-sheet">닫기</button>' +
        '  <button type="button" class="btn primary" style="background:var(--red);box-shadow:none" data-action="' + (isReset ? 'confirm-reset' : 'confirm-cancel') + '" data-id="' + (sheet.id || '') + '">' +
        (isReset ? '초기화' : '거래 취소') + '</button>' +
        '</div></div>';
    }
    return '';
  }

  function openSheet(type, data) {
    sheet = { type: type, id: (data && data.id) || null, quoteId: (data && data.quoteId) || null };
    var root = $('#sheetRoot');
    root.innerHTML = sheetHTML();
    root.hidden = false;
    document.body.style.overflow = 'hidden';
    var btn = root.querySelector('.sheet-actions .btn.primary') || root.querySelector('.sheet .btn');
    if (btn) btn.focus({ preventScroll: true });
  }

  function closeSheet() {
    var root = $('#sheetRoot');
    root.hidden = true;
    root.innerHTML = '';
    sheet = { type: null, id: null, quoteId: null };
    document.body.style.overflow = '';
  }

  /* ================================================================ 렌더 */
  function render() {
    var scr = $('#screen');
    var prev = scr.dataset.view || '';
    var html;

    switch (ui.view) {
      case 's-home': html = viewSellerHome(); break;
      case 's-request': html = viewSellerRequest(); break;
      case 's-inbox': html = viewSellerInbox(); break;
      case 's-detail': html = viewSellerDetail(); break;
      case 's-join': html = viewSellerJoin(); break;
      case 'd-pending': html = viewDealerPending(); break;
      case 'd-detail': html = viewDealerDetail(); break;
      case 'd-bids': html = viewDealerBids(); break;
      case 'd-shop': html = viewDealerShop(); break;
      default: html = viewSellerHome();
    }

    scr.innerHTML = '<div class="view">' + html + '</div>';
    scr.dataset.view = ui.view;
    if (prev !== ui.view) {
      scr.scrollTop = 0;
      ui.editShip = false;
    }

    renderTabbar();
    syncChrome();

    var counter = $('#commentCount');
    var comment = $('#bidComment');
    if (counter && comment) {
      counter.textContent = String(comment.value.length);
    }
  }

  function renderTabbar() {
    var tabs = ui.mode === 'seller' ? SELLER_TABS : DEALER_TABS;
    var active = activeViewKey();
    var bar = $('#tabbar');
    bar.dataset.count = String(tabs.length);
    bar.innerHTML = tabs.map(function (t) {
      return '<button type="button" class="tab ' + (t.id === active ? 'active' : '') + '" data-action="tab" data-view="' + t.id + '"' +
        (t.id === active ? ' aria-current="page"' : '') + '>' + ICON[t.icon] + '<span>' + t.label + '</span></button>';
    }).join('');
  }

  function syncChrome() {
    document.body.dataset.mode = ui.mode;
    $('#modeSeller').setAttribute('aria-selected', String(ui.mode === 'seller'));
    $('#modeDealer').setAttribute('aria-selected', String(ui.mode === 'dealer'));
  }

  /* ================================================================ 토스트 */
  var toastTimer = null;
  function toast(msg) {
    var el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2600);
  }

  /* ================================================================ 사진 처리 */
  function setPhoto(src) {
    ui.photo = src;
    var box = $('#photoPicker');
    if (!box) return;
    if (!src) {
      box.classList.remove('has-photo');
      box.innerHTML = '<div class="photo-empty"><div class="photo-icon">' + ICON.camera + '</div><strong>카드 앞면 사진</strong><p>밝은 곳에서 카드 전체가 보이게</p></div>';
    } else {
      box.classList.add('has-photo');
      box.innerHTML = '<img src="' + photoSrc(src) + '" alt="카드 사진 미리보기">' +
        '<button type="button" class="photo-remove" data-action="clear-photo" aria-label="사진 삭제">×</button>';
    }
  }

  function handleFile(file) {
    if (!file) return;
    if (file.type && file.type.indexOf('image/') !== 0) {
      toast('이미지 파일만 올릴 수 있어요.');
      return;
    }
    var reader = new FileReader();
    reader.onload = function () {
      var img = new Image();
      img.onload = function () {
        try {
          var max = 1000;
          var w = img.width;
          var h = img.height;
          var scale = Math.min(1, max / Math.max(w, h));
          w = Math.round(w * scale);
          h = Math.round(h * scale);
          var cv = document.createElement('canvas');
          cv.width = w;
          cv.height = h;
          var ctx = cv.getContext('2d');
          ctx.fillStyle = '#0F1F3C';
          ctx.fillRect(0, 0, w, h);
          ctx.drawImage(img, 0, 0, w, h);
          setPhoto(cv.toDataURL('image/jpeg', 0.82));
          toast('사진을 추가했어요.');
        } catch (err) {
          setPhoto(reader.result);
          toast('사진을 추가했어요.');
        }
      };
      img.onerror = function () { toast('사진을 읽지 못했어요. 다른 사진을 선택해 주세요.'); };
      img.src = reader.result;
    };
    reader.onerror = function () { toast('사진을 읽지 못했어요.'); };
    reader.readAsDataURL(file);
  }

  /* ================================================================ 액션 */
  function submitRequest() {
    if (!ui.photo) {
      toast('카드 사진을 먼저 추가해 주세요.');
      var picker = $('#photoPicker');
      if (picker) picker.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    var nameEl = $('#fCardName');
    var name = nameEl ? nameEl.value.trim() : '';
    if (!name) {
      toast('카드명을 입력해 주세요.');
      if (nameEl) nameEl.focus();
      return;
    }
    var seriesEl = $('#fSeries');
    var gradeEl = $('#fGrade');
    var notesEl = $('#fNotes');
    var regionEl = $('#fRegion');
    var trade = ui.draft.trade || 'both';
    var wantsRegion = trade === 'pickup' || trade === 'both';

    var req = {
      id: uid('r'),
      cardName: name,
      series: seriesEl ? seriesEl.value.trim() : '',
      grade: gradeEl ? gradeEl.value : 'PSA 10',
      language: ui.draft.language || '한국판',
      trade: trade,
      region: wantsRegion && regionEl ? regionEl.value : '',
      photo: ui.photo,
      notes: notesEl ? notesEl.value.trim() : '',
      createdAt: Date.now(),
      status: 'open',
      quotes: []
    };

    state.requests.unshift(req);
    if (!persist()) {
      state.requests.shift();
      return;
    }

    ui.view = 's-detail';
    ui.a = req.id;
    ui.photo = '';
    ui.sampleOpen = false;
    ui.draft = { trade: 'both', language: '한국판' };
    render();
    toast('견적 요청을 보냈어요. 카드샵들이 곧 매입가를 제안합니다.');
  }

  function submitBid(id) {
    var r = getReq(id);
    if (!r || r.status !== 'open') { toast('이미 마감된 카드예요.'); return; }

    var priceEl = $('#bidPrice');
    var digits = priceEl ? priceEl.value.replace(/[^0-9]/g, '') : '';
    var price = Number(digits);
    if (!price || price < 1000) {
      toast('매입가를 1,000원 이상 입력해 주세요.');
      if (priceEl) priceEl.focus();
      return;
    }
    var payEl = document.querySelector('input[name="pay"]:checked');
    var pay = payEl ? payEl.value : '검수 후 당일 입금';
    var shipEl = document.querySelector('input[name="ship"]:checked');
    var ship = shipEl ? shipEl.value : SHIP_FEES[0].val;
    var retEl = $('#bidReturn');
    var retCustom = $('#bidReturnCustom');
    var retPick = retEl ? retEl.value : RETURN_PRESETS[0];
    var returnPolicy = retPick === '__custom'
      ? (retCustom && retCustom.value.trim() ? retCustom.value.trim() : RETURN_PRESETS[0])
      : retPick;
    var commentEl = $('#bidComment');
    var comment = commentEl ? commentEl.value.trim() : '';

    var my = null;
    for (var i = 0; i < r.quotes.length; i++) if (r.quotes[i].shopId === MY_SHOP_ID) my = r.quotes[i];

    if (my) {
      my.price = price;
      my.pay = pay;
      my.ship = ship;
      my.returnPolicy = returnPolicy;
      my.comment = comment;
      my.at = Date.now();
    } else {
      r.quotes.push({
        id: uid('q'), shopId: MY_SHOP_ID, price: price, pay: pay,
        ship: ship, returnPolicy: returnPolicy, comment: comment, at: Date.now()
      });
    }

    persist();
    render();
    toast(my ? '견적을 수정했어요 · 판매자에게 바로 반영됩니다.' : '견적을 보냈어요 · 판매자에게 바로 반영됩니다.');
  }

  function confirmSell(id, quoteId) {
    var r = getReq(id);
    if (!r || r.status !== 'open') { closeSheet(); return; }
    r.status = 'sold';
    r.winner = quoteId;
    r.soldAt = Date.now();
    persist();
    closeSheet();
    render();
    toast('거래가 확정됐어요. 판매자 모드의 견적함에서 확인하세요.');
  }

  function confirmCancel(id) {
    var r = getReq(id);
    if (!r) { closeSheet(); return; }
    r.status = 'open';
    r.winner = null;
    delete r.soldAt;
    delete r.shipment;
    delete r.fulfill;
    persist();
    closeSheet();
    render();
    toast('거래를 취소했어요. 카드가 다시 견적을 받는 상태가 됐습니다.');
  }

  /* 발송 완료(운송장) 등록 */
  function registerShipment(id) {
    var r = getReq(id);
    if (!r || r.status !== 'sold') { toast('확정된 거래에서만 운송장을 등록할 수 있어요.'); return; }
    var carrierEl = $('#shipCarrier');
    var trackEl = $('#shipTracking');
    var carrier = carrierEl ? carrierEl.value : 'CJ대한통운';
    var tracking = trackEl ? trackEl.value.replace(/[^0-9]/g, '') : '';
    if (tracking.length < 8) {
      toast('운송장 번호를 8자리 이상 입력해 주세요.');
      if (trackEl) trackEl.focus();
      return;
    }
    r.shipment = { carrier: carrier, tracking: tracking, at: Date.now() };
    ui.editShip = false;
    persist();
    render();
    toast('발송 완료로 등록했어요 · 카드샵 화면에 운송장이 반영됩니다.');
  }

  /* ================================================================ 이벤트 */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-action]');
    if (!el) return;
    var action = el.dataset.action;

    if (el.tagName === 'A') e.preventDefault();

    switch (action) {
      case 'brand':
        ui.view = ui.mode === 'seller' ? 's-home' : 'd-pending';
        render();
        break;

      case 'mode':
        if (ui.mode !== el.dataset.mode) {
          ui.mode = el.dataset.mode;
          ui.view = ui.mode === 'seller' ? 's-home' : 'd-pending';
          ui.a = null;
          closeSheet();
          render();
        }
        break;

      case 'tab':
        ui.view = el.dataset.view;
        ui.a = null;
        render();
        break;

      case 'go':
        ui.view = el.dataset.view;
        ui.a = null;
        render();
        break;

      case 'home':
        ui.view = 's-home';
        render();
        break;

      case 'back-inbox':
        ui.view = 's-inbox';
        ui.a = null;
        render();
        break;

      case 'back-pending':
        ui.view = 'd-pending';
        ui.a = null;
        render();
        break;

      case 'open-seller':
        ui.a = el.dataset.id;
        ui.view = 's-detail';
        render();
        break;

      case 'open-dealer':
        ui.a = el.dataset.id;
        ui.view = 'd-detail';
        render();
        break;

      case 'filter-seller':
        ui.filter = el.dataset.val;
        render();
        break;

      case 'filter-dealer':
        ui.dFilter = el.dataset.val;
        render();
        break;

      case 'seg': {
        var group = el.closest('[data-seg]');
        if (!group) break;
        $$('button', group).forEach(function (b) { b.setAttribute('aria-pressed', String(b === el)); });
        var name = group.dataset.seg;
        ui.draft[name] = el.dataset.val;
        if (name === 'trade') {
          var rf = $('#regionField');
          if (rf) rf.hidden = !(el.dataset.val === 'pickup' || el.dataset.val === 'both');
        }
        break;
      }

      case 'sample-toggle': {
        ui.sampleOpen = !ui.sampleOpen;
        var row = $('#sampleRow');
        if (row) row.hidden = !ui.sampleOpen;
        break;
      }

      case 'use-sample':
        setPhoto('art:' + el.dataset.key);
        toast(SAMPLE_LABEL[el.dataset.key] + ' 샘플 카드를 사용했어요.');
        break;

      case 'clear-photo':
        setPhoto('');
        break;

      case 'submit-request':
        submitRequest();
        break;

      case 'sell':
        openSheet('sell', { id: el.dataset.id, quoteId: el.dataset.quote });
        break;

      case 'close-sheet':
        closeSheet();
        break;

      case 'confirm-sell':
        confirmSell(el.dataset.id, el.dataset.quote);
        break;

      case 'ask-cancel':
        openSheet('cancel', { id: el.dataset.id });
        break;

      case 'confirm-cancel':
        confirmCancel(el.dataset.id);
        break;

      case 'submit-bid':
        submitBid(el.dataset.id);
        break;

      case 'save-settings': {
        var payEl = $('#setPay');
        var cmEl = $('#setComment');
        var shipEl = $('#setShip');
        var setRet = $('#setReturn');
        var setRetCustom = $('#setReturnCustom');
        state.settings.pay = payEl ? payEl.value : '검수 후 당일 입금';
        state.settings.comment = cmEl ? cmEl.value.trim() : '';
        state.settings.ship = shipEl ? shipEl.value : SHIP_FEES[0].val;
        var setRetPick = setRet ? setRet.value : RETURN_PRESETS[0];
        state.settings.returnPolicy = setRetPick === '__custom'
          ? (setRetCustom && setRetCustom.value.trim() ? setRetCustom.value.trim() : RETURN_PRESETS[0])
          : setRetPick;
        persist();
        render();
        toast('기본 입찰 값을 저장했어요.');
        break;
      }

      case 'fulfill': {
        var fr = getReq(el.dataset.id);
        if (!fr) break;
        fr.fulfill = el.dataset.val === 'pickup' ? 'pickup' : 'delivery';
        ui.editShip = false;
        persist();
        render();
        toast(fr.fulfill === 'pickup' ? '직거래로 진행할게요.' : '택배 발송으로 진행할게요.');
        break;
      }

      case 'register-shipment':
        registerShipment(el.dataset.id);
        break;

      case 'edit-shipment': {
        ui.editShip = true;
        render();
        break;
      }

      case 'ask-reset':
        openSheet('reset', {});
        break;

      case 'confirm-reset':
        state = seed();
        persist();
        closeSheet();
        ui.view = ui.mode === 'seller' ? 's-home' : 'd-pending';
        ui.a = null;
        ui.filter = 'all';
        ui.dFilter = 'all';
        ui.photo = '';
        render();
        toast('데모 데이터를 초기 상태로 되돌렸어요.');
        break;

      case 'join-cta':
        toast('프로토타입이라 실제 접수는 되지 않아요. 정식 오픈 시 연결됩니다.');
        break;

      default:
        break;
    }
  });

  /* 입력 처리 -------------------------------------------------------- */
  document.addEventListener('input', function (e) {
    var t = e.target;
    if (!t || !t.id) return;

    if (t.id === 'bidPrice') {
      var digits = t.value.replace(/[^0-9]/g, '').slice(0, 9);
      t.value = digits ? Number(digits).toLocaleString('ko-KR') : '';
    }
    if (t.id === 'bidComment') {
      var c = $('#commentCount');
      if (c) c.textContent = String(t.value.length);
    }
    if (t.id === 'shipTracking') {
      t.value = t.value.replace(/[^0-9]/g, '').slice(0, 14);
    }
  });

  document.addEventListener('change', function (e) {
    var t = e.target;
    if (t && t.id === 'fileInput') {
      handleFile(t.files && t.files[0]);
    }
    if (t && (t.id === 'bidReturn' || t.id === 'setReturn')) {
      var box = t.id === 'bidReturn' ? $('#bidReturnCustom') : $('#setReturnCustom');
      if (box) {
        var custom = t.value === '__custom';
        box.hidden = !custom;
        if (custom) box.focus();
      }
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !$('#sheetRoot').hidden) closeSheet();
  });

  /* 다른 탭/창에서의 변경 반영 (판매자 ↔ 카드샵 실시간 연동) -------------- */
  window.addEventListener('storage', function (e) {
    if (e.key !== STORE_KEY) return;
    try {
      var next = JSON.parse(e.newValue);
      if (next && Array.isArray(next.requests)) {
        state = next;
        if (!state.settings) state.settings = { pay: '검수 후 당일 입금', comment: '' };
        if (!state.settings.ship) state.settings.ship = SHIP_FEES[0].val;
        if (!state.settings.returnPolicy) state.settings.returnPolicy = RETURN_PRESETS[0];
        render();
        toast('다른 화면의 변경사항을 반영했어요.');
      }
    } catch (err) { /* 무시 */ }
  });

  /* 시작 ------------------------------------------------------------ */
  render();
})();
