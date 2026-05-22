const API_URL = "PASTE_URL_GOOGLE_APPS_SCRIPT_KAMU";

document.addEventListener("DOMContentLoaded", () => {
  const btnSave = document.getElementById("btnSaveSetting");
  const btnApply = document.getElementById("btnApplyAll");

  if (btnSave) btnSave.addEventListener("click", saveSetting);
  if (btnApply) btnApply.addEventListener("click", applyToAll);
});

/* =========================
   SIMPAN SETTING (LOCAL)
========================= */
function saveSetting() {
  const ppn = Number(document.getElementById("ppn").value);
  const margin = Number(document.getElementById("margin").value);

  const setting = { ppn, margin };

  localStorage.setItem("setting", JSON.stringify(setting));
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
  const setting = getSetting();

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "getAllProduk"
    })
  });

  const json = await res.json();
  const data = json.data || [];

  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    const hargaBaru = hitungHargaJual(
      item.modal,
      setting.margin,
      setting.ppn
    );

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
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
      })
    });
  }

  alert("Semua produk berhasil di-update");
}
