// ===============================
// LAPORAN.JS
// SISTEM STOCK BATCH DROPSHIP
// ===============================

// DATA GLOBAL
let allData = [];

// LOAD DATA
function loadDashboard() {

  // AMBIL DATA DARI LOCAL STORAGE
  allData = JSON.parse(
    localStorage.getItem("produkData")
  ) || [];

  renderDashboard(allData);

}

// ===============================
// RENDER DASHBOARD
// ===============================
function renderDashboard(data) {

  let totalProduk = data.length;
  let totalStok = 0;
  let totalTerjual = 0;

  const tbody =
    document.getElementById("dashboardBody");

  // RESET TABLE
  tbody.innerHTML = "";

  // LOOP DATA
  data.forEach(item => {

    const stok =
      Number(item.stok || 0);

    const terjual =
      Number(item.terjual || 0);

    const sisa =
      stok - terjual;

    totalStok += stok;
    totalTerjual += terjual;

    // RENDER ROW
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

  // TOTAL
  document.getElementById(
    "totalProduk"
  ).innerText = totalProduk;

  document.getElementById(
    "totalStok"
  ).innerText = totalStok;

  document.getElementById(
    "totalTerjual"
  ).innerText = totalTerjual;

}

// ===============================
// SEARCH SKU / NAMA PRODUK
// ===============================
document
  .getElementById("searchInput")
  .addEventListener("input", function () {

    const keyword =
      this.value.toLowerCase();

    const filtered =
      allData.filter(item => {

        return (

          item.nama
            .toLowerCase()
            .includes(keyword)

          ||

          item.sku
            .toLowerCase()
            .includes(keyword)

        );

      });

    renderDashboard(filtered);

});

// ===============================
// LOAD AWAL
// ===============================
loadDashboard();
