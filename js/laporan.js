// ===============================
// LAPORAN.JS
// SISTEM STOCK BATCH DROPSHIP
// ===============================

// DATA GLOBAL
let allData = [];

// ===============================
// LOAD DATA
// ===============================
function loadDashboard() {

  try{

    // =========================
    // AMBIL DATA LOCAL STORAGE
    // =========================
    allData = JSON.parse(
      localStorage.getItem("produkData")
    ) || [];

    console.log(
      "DATA LAPORAN:",
      allData
    );

    renderDashboard(allData);

  }catch(err){

    console.log(
      "Gagal load laporan:",
      err
    );

  }

}

// ===============================
// RENDER DASHBOARD
// ===============================
function renderDashboard(data) {

  // =========================
  // TOTAL
  // =========================
  let totalProduk = data.length;

  let totalStok = 0;

  let totalTerjual = 0;

  // =========================
  // ELEMENT
  // =========================
  const tbody =
    document.getElementById(
      "dashboardBody"
    );

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

  // =========================
  // VALIDASI
  // =========================
  if(!tbody) return;

  // RESET TABLE
  tbody.innerHTML = "";

  // =========================
  // LOOP DATA
  // =========================
  data.forEach(item => {

    console.log(
      "ITEM LAPORAN:",
      item
    );

    const stok =
      Number(item.stok || 0);

    const terjual =
      Number(item.terjual || 0);

    const sisa =
      stok - terjual;

    // =========================
    // TOTAL
    // =========================
    totalStok += stok;

    totalTerjual += terjual;

    // =========================
    // RENDER ROW
    // =========================
    tbody.innerHTML += `

      <tr>

        <td>
          ${item.sku || "-"}
        </td>

        <td>
          ${item.nama || "-"}
        </td>

        <td>
          ${item.status || "BARU"}
        </td>

        <td>
          ${stok}
        </td>

        <td>
          ${terjual}
        </td>

        <td>
          ${sisa}
        </td>

      </tr>

    `;

  });

  console.log(
    "TOTAL TERJUAL LAPORAN:",
    totalTerjual
  );

  // =========================
  // TOTAL CARD
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

}

// ===============================
// SEARCH SKU / NAMA PRODUK
// ===============================
const searchInput =
  document.getElementById(
    "searchInput"
  );

if(searchInput){

  searchInput.addEventListener(
    "input",
    function () {

      const keyword =
        this.value.toLowerCase();

      const filtered =
        allData.filter(item => {

          return (

            (item.nama || "")
              .toLowerCase()
              .includes(keyword)

            ||

            (item.sku || "")
              .toLowerCase()
              .includes(keyword)

          );

        });

      renderDashboard(filtered);

  });

}

// ===============================
// LOAD AWAL
// ===============================
document.addEventListener(
  "DOMContentLoaded",
  loadDashboard
);
