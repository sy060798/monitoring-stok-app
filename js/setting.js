// ===============================
// SETTING.JS
// ===============================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const btnSave =
      document.getElementById(
        "btnSaveSetting"
      );

    const btnApply =
      document.getElementById(
        "btnApplyAll"
      );

    if(btnSave){

      btnSave.addEventListener(
        "click",
        saveSetting
      );

    }

    if(btnApply){

      btnApply.addEventListener(
        "click",
        applyToAll
      );

    }

    loadSetting();

  }
);

// =========================
// LOAD SETTING
// =========================
function loadSetting() {

  const setting =
    getSetting();

  const ppnEl =
    document.getElementById(
      "ppn"
    );

  if(ppnEl){

    ppnEl.value =
      setting.ppn;

  }

}

// =========================
// SIMPAN SETTING
// =========================
function saveSetting() {

  const ppn =
    Number(
      document.getElementById(
        "ppn"
      ).value || 0
    );

  const setting = {
    ppn
  };

  localStorage.setItem(
    "setting",
    JSON.stringify(setting)
  );

  alert(
    "PPN berhasil disimpan"
  );

}

// =========================
// AMBIL SETTING
// =========================
function getSetting() {

  const data =
    localStorage.getItem(
      "setting"
    );

  return data
    ? JSON.parse(data)
    : { ppn: 0 };

}

// =========================
// HITUNG HARGA + PPN
// =========================
function hitungHargaPPN(
  modal,
  ppn
){

  modal =
    Number(modal || 0);

  ppn =
    Number(ppn || 0);

  const total =
    modal + (
      modal * ppn / 100
    );

  return Math.round(total);

}

// =========================
// APPLY PPN KE SEMUA PRODUK
// =========================
async function applyToAll() {

  try{

    const setting =
      getSetting();

    // =====================
    // AMBIL SEMUA PRODUK
    // =====================
    const res =
      await request({
        action:"getAllProduk"
      });

    const data =
      res.data || [];

    // =====================
    // LOOP UPDATE
    // =====================
    for(let i = 0; i < data.length; i++){

      const item =
        data[i];

      // ===================
      // HITUNG HARGA BARU
      // ===================
      const hargaBaru =
        hitungHargaPPN(
          item.modal,
          setting.ppn
        );

      // ===================
      // UPDATE PRODUK
      // ===================
      await request({

        action:"update",

        data:{

          sku:
            item.sku,

          nama:
            item.nama,

          modal:
            item.modal,

          ppn:
            setting.ppn,

          harga_jual:
            hargaBaru,

          stok:
            item.stok,

          terjual:
            item.terjual

        }

      });

    }

    alert(
      "PPN semua produk berhasil di-update"
    );

  }catch(err){

    console.error(err);

    alert(
      "Gagal update PPN produk"
    );

  }

}
