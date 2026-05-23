// ===============================
// LAPORAN.JS
// SISTEM STOCK BATCH DROPSHIP
// ===============================

// ===============================
// DATA GLOBAL
// ===============================
let allData = [];

// ===============================
// LOAD DATA
// ===============================
function loadDashboard(){

  try{

    // =========================
    // AMBIL DATA LOCAL STORAGE
    // =========================
    allData = JSON.parse(
      localStorage.getItem(
        "produkData"
      )
    ) || [];

    console.log(
      "DATA LAPORAN:",
      allData
    );

    // =========================
    // RENDER
    // =========================
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
function renderDashboard(data){

  // =========================
  // TOTAL
  // =========================
  let totalProduk =
    data.length;

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

  // =========================
  // RESET TABLE
  // =========================
  tbody.innerHTML = "";

  // =========================
  // DATA KOSONG
  // =========================
  if(data.length === 0){

    tbody.innerHTML = `

      <tr>

        <td
          colspan="6"
          class="empty"
        >

          Belum ada data produk

        </td>

      </tr>

    `;

  }

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

    // =========================
    // SISA STOK
    // =========================
    const sisa =
      stok - terjual;

    // =========================
    // TOTAL
    // =========================
    totalStok += stok;

    totalTerjual += terjual;

    // =========================
    // STATUS
    // =========================
    const status =
      item.status || "BARU";

    // =========================
    // CLASS STATUS
    // =========================
    let statusClass = "baru";

    if(
      status
      .toLowerCase()
      .includes("lama")
    ){

      statusClass = "lama";

    }

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

          <span class="
            status
            ${statusClass}
          ">

            ${status}

          </span>

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
  // RENDER TOTAL
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
    function(){

      const keyword =
        this.value
        .toLowerCase();

      // =====================
      // FILTER DATA
      // =====================
      const filtered =
        allData.filter(item => {

          const nama =
            (item.nama || "")
            .toLowerCase();

          const sku =
            (item.sku || "")
            .toLowerCase();

          return (

            nama.includes(
              keyword
            )

            ||

            sku.includes(
              keyword
            )

          );

        });

      // =====================
      // RENDER FILTER
      // =====================
      renderDashboard(
        filtered
      );

  });

}

// ===============================
// LOAD AWAL
// ===============================
document.addEventListener(
  "DOMContentLoaded",
  loadDashboard
);
