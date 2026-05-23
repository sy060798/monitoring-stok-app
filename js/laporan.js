// ===============================
// LAPORAN.JS
// ===============================

// DATA GLOBAL
let allData = [];

// ===============================
// LOAD DATA
// ===============================
async function loadDashboard() {

  try{

    // =========================
    // AMBIL DATA DARI API
    // =========================
    const res = await request({
      action:"getAllProduk"
    });

    console.log(
      "DATA API LAPORAN:",
      res
    );

    // =========================
    // DATA ARRAY
    // =========================
    allData = res.data || [];

    console.log(
      "ALL DATA LAPORAN:",
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
function renderDashboard(data) {

  // =========================
  // COPY DATA AGAR ASLI TIDAK BERUBAH
  // =========================
  data = [...data];

  // =========================
  // SORT DATA LAMA -> BARU
  // BERDASARKAN SKU
  // =========================
  data.sort((a,b)=>{

    return (a.sku || "")
      .localeCompare(b.sku || "");

  });

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
  // DATA KOSONG
  // =========================
  if(data.length === 0){

    tbody.innerHTML = `

      <tr>

        <td colspan="6" class="empty">
          Belum ada data produk
        </td>

      </tr>

    `;

    return;

  }

  // =========================
  // TRACKER NAMA
  // =========================
  const namaTracker = {};

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
    // NAMA PRODUK
    // =========================
    const nama =
      item.nama || "-";

    // =========================
    // KEY DUPLIKAT
    // BIAR TIDAK SENSITIF HURUF
    // =========================
    const namaKey =
      nama.trim().toLowerCase();

    // =========================
    // TRACK DUPLIKAT
    // =========================
    if(!namaTracker[namaKey]){

      namaTracker[namaKey] = 1;

    }else{

      namaTracker[namaKey]++;

    }

    // =========================
    // STATUS
    // PERTAMA = LAMA
    // SELANJUTNYA = BARU
    // =========================
    const status =
      namaTracker[namaKey] === 1
      ? "LAMA"
      : "BARU";

    const statusClass =
      status.toLowerCase();

    // =========================
    // RENDER ROW
    // =========================
    tbody.innerHTML += `

      <tr>

        <td>
          ${item.sku || "-"}
        </td>

        <td>
          ${nama}
        </td>

        <td>

          <span class="status ${statusClass}">
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
    "TOTAL TERJUAL:",
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
// SEARCH
// ===============================
document.addEventListener(
  "DOMContentLoaded",
  () => {

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
              .toLowerCase()
              .trim();

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

  }
);

// ===============================
// LOAD AWAL
// ===============================
document.addEventListener(
  "DOMContentLoaded",
  loadDashboard
);
