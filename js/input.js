document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnSimpan");
  const modalInput = document.getElementById("modal");

  // tombol simpan
  if (btn) {
    btn.addEventListener("click", tambahProduk);
  }

  // auto margin saat modal diinput
  if (modalInput) {
    modalInput.addEventListener("input", autoMargin);
  }
});

// =========================
// AUTO MARGIN
// =========================
function autoMargin() {
  const modal = Number(document.getElementById("modal").value);
  const marginInput = document.getElementById("margin");

  let margin = 0;

  if (modal < 10000) {
    margin = 35;
  } 
  else if (modal >= 10000 && modal <= 25000) {
    margin = 22;
  } 
  else if (modal > 25000 && modal <= 60000) {
    margin = 15;
  } 
  else if (modal > 60000 && modal <= 100000) {
    margin = 10;
  } 
  else {
    margin = 8;
  }

  marginInput.value = margin;
}

// =========================
// HITUNG HARGA JUAL
// =========================
function hitungHargaJual(modal, margin, ppn) {

  // tambah margin
  let harga = modal + (modal * margin / 100);

  // tambah ppn
  harga = harga + (harga * ppn / 100);

  // pembulatan harga
  return Math.round(harga);
}

// =========================
// TAMBAH PRODUK
// =========================
async function tambahProduk() {

  const nama = document.getElementById("nama").value;
  const modal = Number(document.getElementById("modal").value);
  const margin = Number(document.getElementById("margin").value);
  const ppn = Number(document.getElementById("ppn").value);
  const stok = Number(document.getElementById("stok").value);

  // validasi sederhana
  if (!nama || modal <= 0 || stok < 0) {
    alert("Lengkapi data produk");
    return;
  }

  // generate SKU
  const sku = generateSKU("BRG");

  // hitung harga jual
  const harga_jual = hitungHargaJual(modal, margin, ppn);

  const data = {
    sku,
    nama,
    modal,
    margin,
    ppn,
    harga_jual,
    stok,
    terjual: 0
  };

  try {

    await request({
      action: "add",
      data: data
    });

    alert("Produk berhasil ditambahkan");

    clearForm();

  } catch (err) {

    console.error(err);
    alert("Gagal menambahkan produk");

  }
}

// =========================
// CLEAR FORM
// =========================
function clearForm() {
  document.getElementById("nama").value = "";
  document.getElementById("modal").value = "";
  document.getElementById("margin").value = "";
  document.getElementById("ppn").value = "";
  document.getElementById("stok").value = "";
}

// =========================
// GENERATE SKU
// =========================
function generateSKU(prefix = "BRG") {
  return `${prefix}-${Date.now()}`;
}
