// =====================================
// CORE.JS
// =====================================

// =====================================
// HITUNG HARGA JUAL
// =====================================
function hitungHargaJual(modal, margin, ppn) {

  modal = Number(modal || 0);

  margin = Number(margin || 0);

  ppn = Number(ppn || 0);

  // =========================
  // HARGA + MARGIN
  // =========================
  let hargaMargin =

    modal +

    (modal * margin / 100);

  // =========================
  // TAMBAH PPN
  // =========================
  let hargaFinal =

    hargaMargin +

    (hargaMargin * ppn / 100);

  return Math.round(hargaFinal);

}

// =====================================
// HITUNG PROFIT
// SUPPORT PROMO / VOUCHER
// =====================================
function hitungProfit(

  modal,

  hargaJual,

  terjual,

  promo = 0,

  qtyBeli = 1

){

  modal = Number(modal || 0);

  hargaJual = Number(hargaJual || 0);

  terjual = Number(terjual || 0);

  promo = Number(promo || 0);

  qtyBeli = Number(qtyBeli || 1);

  // =========================
  // PROMO PER BARANG
  // =========================
  const promoPerBarang =

    promo / qtyBeli;

  // =========================
  // MARGIN NORMAL
  // =========================
  const marginNormal =

    hargaJual - modal;

  // =========================
  // PROFIT FINAL PER PCS
  // =========================
  const profitPerBarang =

    marginNormal +

    promoPerBarang;

  // =========================
  // TOTAL PROFIT
  // =========================
  return profitPerBarang * terjual;

}

// =====================================
// FORMAT RUPIAH
// =====================================
function formatRupiah(num) {

  return "Rp " +

    Number(num || 0)
    .toLocaleString("id-ID");

}

// =====================================
// GENERATE SKU
// =====================================
function generateSKU(prefix = "BRG") {

  return prefix + "-" + Date.now();

}
