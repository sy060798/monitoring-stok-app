// =====================================
// DASHBOARD.JS
// =====================================

document.addEventListener(
  "DOMContentLoaded",
  loadDashboard
);

// =====================================
// LOAD DATA
// =====================================
async function loadDashboard(){

  try{

    const res = await request({
      action:"getAllProduk"
    });

    const data = res.data || [];

    renderDashboard(data);

  }catch(err){

    console.log(
      "Gagal load dashboard:",
      err
    );

  }

}

// =====================================
// HITUNG PROFIT
// =====================================
function hitungProfit(item){

  const modal =
    Number(item.modal || 0);

  const hargaJual =
    Number(item.harga_jual || 0);

  const terjual =
    Number(item.terjual || 0);

  const promo =
    Number(item.promo_beli || 0);

  const qtyBeli =
    Number(item.qty_beli || 1);

  // =========================
  // PROMO PER PCS
  // =========================
  const promoPerBarang =
    promo / qtyBeli;

  // =========================
  // MARGIN NORMAL
  // =========================
  const margin =
    hargaJual - modal;

  // =========================
  // PROFIT PER BARANG
  // =========================
  const profitPerBarang =
    margin + promoPerBarang;

  // =========================
  // TOTAL PROFIT
  // =========================
  return profitPerBarang * terjual;

}

// =====================================
// DASHBOARD
// =====================================
function renderDashboard(data){

  // =========================
  // TOTAL
  // =========================
  let totalProduk = data.length;

  let totalTerjual = 0;

  let totalProfit = 0;

  // =========================
  // LOOP DATA
  // =========================
  data.forEach(item => {

    const terjual =
      Number(item.terjual || 0);

    totalTerjual += terjual;

    // =========================
    // TOTAL PROFIT
    // =========================
    totalProfit +=
      hitungProfit(item);

  });

  // =========================
  // ELEMENT
  // =========================
  const elProduk =
    document.getElementById(
      "totalProduk"
    );

  const elTerjual =
    document.getElementById(
      "totalTerjual"
    );

  const elProfit =
    document.getElementById(
      "totalProfit"
    );

  // =========================
  // RENDER
  // =========================
  if(elProduk){

    elProduk.innerText =
      totalProduk;

  }

  if(elTerjual){

    elTerjual.innerText =
      totalTerjual;

  }

  if(elProfit){

    elProfit.innerText =
      formatRupiah(totalProfit);

  }

  // =========================
  // MOVING
  // =========================
  renderMoving(data);

}

// =====================================
// MOVING SYSTEM
// =====================================
function renderMoving(data){

  const sorted =
    [...data].sort(

      (a,b)=>

        Number(b.terjual || 0)
        -
        Number(a.terjual || 0)

    );

  // =========================
  // FAST
  // =========================
  renderList(
    "fastMoving",
    sorted.slice(0,3)
  );

  // =========================
  // MEDIUM
  // =========================
  renderList(
    "mediumMoving",
    sorted.slice(3,6)
  );

  // =========================
  // SLOW
  // =========================
  renderList(
    "slowMoving",
    sorted.slice(-3)
  );

}

// =====================================
// RENDER LIST
// =====================================
function renderList(id,data){

  const element =
    document.getElementById(id);

  if(!element) return;

  let html = "";

  // =========================
  // KOSONG
  // =========================
  if(data.length === 0){

    html = `

      <div class="item">
        Belum ada data
      </div>

    `;

  }

  // =========================
  // LOOP
  // =========================
  data.forEach(item => {

    const profit =
      hitungProfit(item);

    const promo =
      Number(item.promo_beli || 0);

    html += `

      <div class="item">

        <strong>
          ${item.nama || "-"}
        </strong>

        <br>

        SKU:
        ${item.sku || "-"}

        <br><br>

        Stok:
        ${item.stok || 0}

        <br>

        Terjual:
        ${item.terjual || 0}

        <div class="profit">

          Profit:
          ${formatRupiah(profit)}

        </div>

        ${promo > 0 ? `

          <div class="promo">

            Promo Supplier:
            ${formatRupiah(promo)}

          </div>

        ` : ""}

      </div>

    `;

  });

  element.innerHTML = html;

}

// =====================================
// FORMAT RUPIAH
// =====================================
function formatRupiah(num){

  return "Rp " +

    Number(num || 0)
    .toLocaleString("id-ID");

}
