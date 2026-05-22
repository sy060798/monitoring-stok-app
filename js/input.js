const API_URL = "https://script.google.com/macros/s/AKfycbxS-Dy_OSDzMGVSpl6MbFCQ0aoyZJB17BG3Ue4sDJdCGm-8vOlPa6r8jV6akZ8fYiBQ/exec";

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnSimpan");
  if (btn) btn.addEventListener("click", tambahProduk);
});

async function tambahProduk() {
  const nama = document.getElementById("nama").value;
  const modal = Number(document.getElementById("modal").value);
  const margin = Number(document.getElementById("margin").value);
  const ppn = Number(document.getElementById("ppn").value);
  const stok = Number(document.getElementById("stok").value);

  const sku = generateSKU("BRG");
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

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "add",
      data: data
    })
  });

  clearForm();
}

function clearForm() {
  document.getElementById("nama").value = "";
  document.getElementById("modal").value = "";
  document.getElementById("margin").value = "";
  document.getElementById("ppn").value = "";
  document.getElementById("stok").value = "";
}
