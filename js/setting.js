// ===============================
// SETTING.JS
// ===============================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const btnSave =
      document.getElementById("btnSaveSetting");

    const btnApply =
      document.getElementById("btnApplyAll");

    if(btnSave){
      btnSave.addEventListener("click", saveSetting);
    }

    if(btnApply){
      btnApply.addEventListener("click", applyToAll);
    }

    loadSetting();

  }
);

// =========================
// LOAD SETTING
// =========================
function loadSetting() {

  const setting = getSetting();

  const ppnEl = document.getElementById("ppn");

  if(ppnEl){
    ppnEl.value = setting.ppn;
  }

}

// =========================
// SIMPAN SETTING (PPN ONLY)
// =========================
function saveSetting() {

  const ppn = Number(
    document.getElementById("ppn").value || 0
  );

  const setting = { ppn };

  localStorage.setItem(
    "setting",
    JSON.stringify(setting)
  );

  alert("PPN berhasil disimpan");

}

// =========================
// AMBIL SETTING
// =========================
function getSetting() {

  const data = localStorage.getItem("setting");

  return data
    ? JSON.parse(data)
    : { ppn: 0 };

}

// =========================
// HITUNG HARGA (MARGIN + PPN)
// =========================
function hitungHargaJual(modal, margin, ppn) {

  modal = Number(modal || 0);
  margin = Number(margin || 0);
  ppn = Number(ppn || 0);

  // 1. tambah margin dulu
  const hargaMargin =
    modal + (modal * margin / 100);

  // 2. baru tambah PPN
  const hargaFinal =
    hargaMargin + (hargaMargin * ppn / 100);

  return Math.round(hargaFinal);
}

// =========================
// APPLY PPN KE SEMUA PRODUK
// (TIDAK MERUSAK DATA LAIN)
// =========================
async function applyToAll() {

  try {

    const setting = getSetting();

    const res = await request({
      action: "getAllProduk"
    });

    const data = res.data || [];

    for (let i = 0; i < data.length; i++) {

      const item = data[i];

      // =========================
      // HITUNG HARGA BARU
      // =========================
      const hargaBaru = hitungHargaJual(
        item.modal,
        item.margin,   // <- dari data produk
        setting.ppn
      );

      // =========================
      // UPDATE PRODUK
      // (PAKAI SPREAD BIAR AMAN)
      // =========================
      await request({
        action: "update",
        data: {
          ...item, // penting: biar margin & data lain tidak hilang

          ppn: setting.ppn,
          harga_jual: hargaBaru
        }
      });

    }

    alert("PPN semua produk berhasil di-update");

  } catch (err) {

    console.error(err);
    alert("Gagal update PPN produk");

  }

}
