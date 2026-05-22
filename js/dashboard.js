function renderDashboard(data) {

  let totalProduk = data.length;
  let totalStok = 0;
  let totalTerjual = 0;
  let totalProfit = 0;

  data.forEach(item => {

    const stok = Number(item.stok || 0);
    const terjual = Number(item.terjual || 0);

    totalStok += stok;
    totalTerjual += terjual;

    // 🔥 PROFIT LOCK (PAKAI DATA FIX)
    const profitFinal = Number(item.profit_final || 0);

    totalProfit += profitFinal;

  });

  document.getElementById("totalProduk").innerText = totalProduk;
  document.getElementById("totalStok").innerText = totalStok;
  document.getElementById("totalTerjual").innerText = totalTerjual;
  document.getElementById("totalProfit").innerText = formatRupiah(totalProfit);

  renderMoving(data);
}
