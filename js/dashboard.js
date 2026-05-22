document.addEventListener("DOMContentLoaded", loadDashboard);

async function loadDashboard() {
  try {
    const res = await request({
      action: "getAllProduk"
    });

    const data = res.data || [];

    renderDashboard(data);

  } catch (err) {
    console.error(err);
  }
}

function renderDashboard(data) {
  let totalProduk = data.length;
  let totalStok = 0;
  let totalProfit = 0;

  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    const stok = Number(item.stok || 0);
    const terjual = Number(item.terjual || 0);
    const modal = Number(item.modal || 0);
    const hargaJual = Number(item.harga_jual || 0);

    totalStok += stok;
    totalProfit += (hargaJual - modal) * terjual;
  }

  document.getElementById("totalProduk").innerText = totalProduk;
  document.getElementById("totalStok").innerText = totalStok;
  document.getElementById("totalProfit").innerText =
    "Rp " + formatRupiah(totalProfit);
}

function formatRupiah(num) {
  return Number(num || 0).toLocaleString("id-ID");
}
