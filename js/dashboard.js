document.addEventListener("DOMContentLoaded", loadDashboard);

/* =========================
   LOAD DASHBOARD
========================= */
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

/* =========================
   RENDER DASHBOARD
========================= */
function renderDashboard(data) {

  let totalProduk = data.length;
  let totalStok = 0;
  let totalProfit = 0;
  let totalTerjual = 0;

  data.forEach(item => {

    const stok = Number(item.stok || 0);
    const terjual = Number(item.terjual || 0);
    const modal = Number(item.modal || 0);
    const harga = Number(item.harga_jual || 0);

    totalStok += stok;
    totalTerjual += terjual;
    totalProfit += (harga - modal) * terjual;

  });

  /* =========================
     CARD ATAS
  ========================= */

  document.getElementById("totalProduk").innerText =
    totalProduk;

  document.getElementById("totalStok").innerText =
    totalStok;

  document.getElementById("totalProfit").innerText =
    formatRupiah(totalProfit);

  document.getElementById("totalTerjual").innerText =
    totalTerjual;

  /* =========================
     FAST / MEDIUM / SLOW
  ========================= */

  const sorted = [...data].sort((a, b) => {
    return Number(b.terjual || 0) - Number(a.terjual || 0);
  });

  renderKategori(
    "fastMoving",
    sorted.slice(0, 3),
    "🔥 FAST MOVING"
  );

  renderKategori(
    "mediumMoving",
    sorted.slice(3, 6),
    "⚡ MEDIUM"
  );

  renderKategori(
    "slowMoving",
    sorted.slice(-3).reverse(),
    "🐢 SLOW MOVING"
  );

  /* =========================
     GRAFIK PROFIT
  ========================= */

  renderChart(data);

}

/* =========================
   RENDER LIST PRODUK
========================= */
function renderKategori(id, items, title) {

  let html = `<h3>${title}</h3>`;

  if (items.length === 0) {
    html += `<p>Tidak ada data</p>`;
  }

  items.forEach(item => {

    const profit =
      (Number(item.harga_jual || 0) -
      Number(item.modal || 0))
      *
      Number(item.terjual || 0);

    html += `
      <div class="moving-item">

        <div>
          <strong>${item.nama}</strong>
          <p>${item.sku}</p>
        </div>

        <div>
          <span class="badge">
            ${item.terjual || 0} terjual
          </span>

          <p class="profit">
            ${formatRupiah(profit)}
          </p>
        </div>

      </div>
    `;
  });

  document.getElementById(id).innerHTML = html;
}

/* =========================
   GRAFIK
========================= */
function renderChart(data) {

  const canvas =
    document.getElementById("profitChart");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const profits = data.map(item => {
    return (
      (Number(item.harga_jual || 0) -
      Number(item.modal || 0))
      *
      Number(item.terjual || 0)
    );
  });

  if (profits.length === 0) return;

  const maxProfit = Math.max(...profits, 1);

  const width = canvas.width;
  const height = canvas.height;

  const stepX = width / profits.length;

  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#2563eb";

  profits.forEach((value, index) => {

    const x = index * stepX;

    const y =
      height -
      (value / maxProfit) * (height - 20);

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }

  });

  ctx.stroke();
}

/* =========================
   FORMAT RUPIAH
========================= */
function formatRupiah(num) {
  return "Rp " + Number(num || 0)
    .toLocaleString("id-ID");
}
