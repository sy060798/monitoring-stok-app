document.addEventListener("DOMContentLoaded", () => {
  const btnSave = document.getElementById("btnSaveSetting");
  const btnApply = document.getElementById("btnApplyAll");

  if (btnSave) btnSave.addEventListener("click", saveSetting);
  if (btnApply) btnApply.addEventListener("click", applyToAll);

  loadSetting();
});

/* =========================
   LOAD SETTING KE INPUT
========================= */
function loadSetting() {
  const setting = getSetting();

  const ppnEl = document.getElementById("ppn");
  const marginEl = document.getElementById("margin");

  if (ppnEl) ppnEl.value = setting.ppn;
  if (marginEl) marginEl.value = setting.margin;
}

/* =========================
   SIMPAN SETTING (LOCAL)
========================= */
function saveSetting() {
  const ppn = Number(document.getElementById("ppn").value || 0);
  const margin = Number(document.getElementById("margin").value || 0);

  const setting = { ppn, margin };

  localStorage.setItem("setting", JSON.stringify(setting));

  alert("Setting berhasil disimpan");
}

/* =========================
   AMBIL SETTING
========================= */
function getSetting() {
  const data = localStorage.getItem("setting");
  return data ? JSON.parse(data) : { ppn: 0, margin: 0 };
}

/* =========================
   APPLY KE SEMUA PRODUK
========================= */
async function applyToAll() {
  try {
    const setting = getSetting();

    const res = await request({
      action: "getAllProduk"
    });

    const data = res.data || [];

    for (let i = 0; i < data.length; i++) {
      const item = data[i];

      const hargaBaru = hitungHargaJual(
        item.modal,
        setting.margin,
        setting.ppn
      );

      await request({
        action: "update",
        data: {
          sku: item.sku,
          nama: item.nama,
          modal: item.modal,
          margin: setting.margin,
          ppn: setting.ppn,
          harga_jual: hargaBaru,
          stok: item.stok,
          terjual: item.terjual
        }
      });
    }

    alert("Semua produk berhasil di-update");
  } catch (err) {
    console.error(err);
    alert("Gagal update produk");
  }
}
