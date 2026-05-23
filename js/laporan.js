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
  // SORT:
  // 1. NAMA PRODUK
  // 2. SKU LAMA -> BARU
  // =========================
  data.sort((a,b)=>{

    const namaA =
      (a.nama || "")
      .toLowerCase();

    const namaB =
      (b.nama || "")
      .toLowerCase();

    // SORT NAMA DULU
    if(namaA !== namaB){

      return namaA.localeCompare(namaB);

    }

    // JIKA NAMA SAMA
    // URUTKAN SKU LAMA -> BARU
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
    // =========================
    const namaKey =
      nama.trim().toLowerCase();

    // =========================
    // AMBIL SEMUA PRODUK
    // DENGAN NAMA SAMA
    // =========================
    const sameProducts =
      data.filter(p => {

        return (
          (p.nama || "")
          .trim()
          .toLowerCase() === namaKey
        );

      });

    // =========================
    // PRODUK YANG
    // STOK MASIH ADA
    // =========================
    const activeProducts =
      sameProducts.filter(p => {

        return Number(p.stok || 0) > 0;

      });

    // =========================
    // STATUS DEFAULT
    // =========================
    let status = "BARU";

    // =========================
    // JIKA STOK HABIS
    // =========================
    if(stok <= 0){

      status = "HABIS";

    }else{

      // =======================
      // PRODUK PERTAMA
      // YANG MASIH ADA
      // MENJADI LAMA
      // =======================
      const firstActiveSku =
        activeProducts[0]?.sku;

      if(item.sku === firstActiveSku){

        status = "LAMA";

      }

    }

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
