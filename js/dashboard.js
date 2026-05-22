const API_URL = "PASTE_URL_GOOGLE_APPS_SCRIPT_KAMU";

document.addEventListener("DOMContentLoaded", loadDashboard);

async function loadDashboard() {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        action: "getAllProduk"
      })
    });

    const json = await res.json();
    const data = json.data || [];

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
  return Number(num).toLocaleString("id-ID");
}
