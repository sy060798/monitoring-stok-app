function hitungHargaJual(modal, margin, ppn) {
  modal = Number(modal || 0);
  margin = Number(margin || 0);
  ppn = Number(ppn || 0);

  let hargaMargin = modal + (modal * margin / 100);
  let hargaFinal = hargaMargin + (hargaMargin * ppn / 100);

  return Math.round(hargaFinal);
}

function hitungProfit(modal, hargaJual, terjual) {
  modal = Number(modal || 0);
  hargaJual = Number(hargaJual || 0);
  terjual = Number(terjual || 0);

  return (hargaJual - modal) * terjual;
}

function formatRupiah(num) {
  return Number(num || 0).toLocaleString("id-ID");
}

function generateSKU(prefix = "BRG") {
  return prefix + "-" + Date.now();
}
