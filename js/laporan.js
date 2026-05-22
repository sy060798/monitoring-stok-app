const API_URL = "PASTE_URL_GOOGLE_APPS_SCRIPT_KAMU";

document.addEventListener("DOMContentLoaded", loadLaporan);

async function loadLaporan() {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "getAllProduk" })
  });

  const json = await res.json();
  const data = json.data || [];

  renderLaporan(data);
}

function renderLaporan(data) {
  let totalProduk = data.length;
  let totalStok = 0;
  let totalTerjual = 0;
  let totalProfit = 0;

  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    const stok = Number(item.stok || 0);
    const terjual = Number(item.terjual || 0);
    const modal = Number(item.modal || 0);
    const harga = Number(item.harga_jual || 0);

    totalStok += stok;
    totalTerjual += terjual;
    totalProfit += (harga - modal) * terjual;
  }

  document.getElementById("totalProduk").innerText = totalProduk;
  document.getElementById("totalStok").innerText = totalStok;
  document.getElementById("totalTerjual").innerText = totalTerjual;
  document.getElementById("totalProfit").innerText =
    "Rp " + formatRupiah(totalProfit);
}

function formatRupiah(num) {
  return Number(num || 0).toLocaleString("id-ID");
}
