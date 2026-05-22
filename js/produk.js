const API_URL = "PASTE_URL_GOOGLE_APPS_SCRIPT_KAMU";

document.addEventListener("DOMContentLoaded", loadProduk);

async function loadProduk() {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "getAllProduk" })
  });

  const json = await res.json();
  const data = json.data || [];

  renderProduk(data);
}

function renderProduk(data) {
  let html = "";

  data.forEach(item => {
    html += `
      <div class="card">
        <h3>${item.nama}</h3>
        <p>SKU: ${item.sku}</p>
        <p>Modal: ${formatRupiah(item.modal)}</p>
        <p>Harga: ${formatRupiah(item.harga_jual)}</p>
        <p>Stok: ${item.stok}</p>
        <p>Terjual: ${item.terjual}</p>

        <button onclick="editProduk('${item.sku}')">Edit</button>
        <button onclick="hapusProduk('${item.sku}')">Hapus</button>
      </div>
    `;
  });

  document.getElementById("listProduk").innerHTML = html;
}

async function hapusProduk(sku) {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "delete",
      sku: sku
    })
  });

  loadProduk();
}

function editProduk(sku) {
  const nama = prompt("Nama baru:");
  const modal = prompt("Modal:");
  const stok = prompt("Stok:");
  const harga_jual = prompt("Harga jual:");
  const terjual = prompt("Terjual:");

  updateProduk({
    sku,
    nama,
    modal,
    stok,
    harga_jual,
    terjual
  });
}

async function updateProduk(data) {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "update",
      data: data
    })
  });

  loadProduk();
}

function formatRupiah(num) {
  return Number(num || 0).toLocaleString("id-ID");
}
