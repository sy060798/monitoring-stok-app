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

    // =========================
    // AMBIL DATA API
    // =========================
    const res = await request({
      action:"getAllProduk"
    });

    console.log(
      "DATA API:",
      res
    );

    // =========================
    // DATA ARRAY
    // =========================
    const data =
      res.data || [];

    console.log(
      "DATA PRODUK:",
      data
    );

    // =========================
    // RENDER
    // =========================
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

  // =========================
  // BAGI PROMO BERDASARKAN
  // JUMLAH TERJUAL
  // =========================
  const pembagiPromo =
    terjual > 0
    ? terjual
    : 1;

  // =========================
  // PROMO PER PCS
  // =========================
  const promoPerBarang =
    promo / pembagiPromo;

  // =========================
  // MARGIN NORMAL
  // =========================
  const margin =
    hargaJual - modal;

  // =========================
  // PROFIT FINAL PCS
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
  let totalProduk =
    data.length;

  let totalStok = 0;

  let totalTerjual = 0;

  let totalProfit = 0;

  // =========================
  // LOOP DATA
  // =========================
  data.forEach(item => {

    console.log(
      "ITEM:",
      item
    );

    const stok =
      Number(item.stok || 0);

    const terjual =
      Number(item.terjual || 0);

    const modal =
      Number(item.modal || 0);

    const hargaJual =
      Number(item.harga_jual || 0);

    const promo =
      Number(item.promo_beli || 0);

    // =========================
    // TOTAL
    // =========================
    totalStok += stok;

    totalTerjual += terjual;

    // =========================
    // BAGI PROMO BERDASARKAN
    // JUMLAH TERJUAL
    // =========================
    const pembagiPromo =
      terjual > 0
      ? terjual
      : 1;

    // =========================
    // PROMO PER PCS
    // =========================
    const promoPerBarang =
      promo / pembagiPromo;

    // =========================
    // MARGIN NORMAL
    // =========================
    const margin =
      hargaJual - modal;

    // =========================
    // PROFIT FINAL PCS
    // =========================
    const profitPerBarang =
      margin + promoPerBarang;

    // =========================
    // TOTAL PROFIT
    // =========================
    totalProfit +=
      profitPerBarang * terjual;

  });

  console.log(
    "TOTAL TERJUAL:",
    totalTerjual
  );

  // =========================
  // ELEMENT
  // =========================
  const elProduk =
    document.getElementById(
      "totalProduk"
    );

  const elStok =
    document.getElementById(
      "totalStok"
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

  if(elStok){

    elStok.innerText =
      totalStok;

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
  // DATA KOSONG
  // =========================
  if(data.length === 0){

    html = `

      <div class="item">
        Belum ada data
      </div>

    `;

  }

  // =========================
  // LOOP DATA
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
