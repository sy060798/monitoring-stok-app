document.addEventListener("DOMContentLoaded", loadLaporan);

async function loadLaporan() {
  try {
    const res = await request({
      action: "getAllProduk"
    });

    const data = res.data || [];

    renderLaporan(data);

  } catch (err) {
    console.error(err);
  }
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
