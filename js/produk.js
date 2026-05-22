document.addEventListener("DOMContentLoaded", loadProduk);

/* =========================
   DATA CACHE
========================= */
let ALL_DATA = [];

/* =========================
   LOAD PRODUK
========================= */
async function loadProduk() {
  try {
    const res = await request({
      action: "getAllProduk"
    });

    ALL_DATA = res.data || [];
    renderProduk(ALL_DATA);

    setupSearch();

  } catch (err) {
    console.error(err);
  }
}

/* =========================
   RENDER PRODUK
========================= */
function renderProduk(data) {
  let html = "";

  data.forEach(item => {

    html += `
      <div class="card">

        <div class="card-left">
          <h3>${item.nama}</h3>
          <p>SKU: ${item.sku}</p>
          <p>Modal: ${formatRupiah(item.modal)}</p>
          <p>Margin: ${item.margin || 0}%</p>
          <p>Harga: ${formatRupiah(item.harga_jual)}</p>
          <p>Stok: ${item.stok}</p>
          <p>Terjual: ${item.terjual}</p>
        </div>

        <div class="action">
          <button class="btn-edit" onclick="openEdit('${item.sku}')">✏️ Edit</button>
          <button class="btn-delete" onclick="hapusProduk('${item.sku}')">🗑 Hapus</button>
        </div>

      </div>
    `;
  });

  document.getElementById("listProduk").innerHTML = html;
}

/* =========================
   SEARCH
========================= */
function setupSearch() {
  const search = document.getElementById("search");

  search.oninput = function () {
    const keyword = this.value.toLowerCase();

    const filtered = ALL_DATA.filter(item =>
      item.nama.toLowerCase().includes(keyword) ||
      item.sku.toLowerCase().includes(keyword)
    );

    renderProduk(filtered);
  };
}

/* =========================
   HAPUS
========================= */
async function hapusProduk(sku) {
  if (!confirm("Yakin hapus produk ini?")) return;

  await request({
    action: "delete",
    sku: sku
  });

  loadProduk();
}

/* =========================
   OPEN EDIT MODAL
========================= */
function openEdit(sku) {
  const item = ALL_DATA.find(p => p.sku === sku);
  if (!item) return;

  document.getElementById("editSku").value = item.sku;
  document.getElementById("editNama").value = item.nama;
  document.getElementById("editModal").value = item.modal;
  document.getElementById("editMargin").value = item.margin || 0;
  document.getElementById("editHarga").value = item.harga_jual;
  document.getElementById("editStok").value = item.stok;
  document.getElementById("editTerjual").value = item.terjual;

  document.getElementById("modalEdit").style.display = "flex";
}

/* =========================
   CLOSE MODAL
========================= */
function closeModal() {
  document.getElementById("modalEdit").style.display = "none";
}

/* =========================
   SIMPAN EDIT
========================= */
async function simpanEdit() {

  const modal = Number(document.getElementById("editModal").value);
  const margin = Number(document.getElementById("editMargin").value);

  // hitung harga otomatis
  const harga_jual = modal + (modal * margin / 100);

  const data = {
    sku: document.getElementById("editSku").value,
    nama: document.getElementById("editNama").value,
    modal: modal,
    margin: margin,
    harga_jual: harga_jual,
    stok: Number(document.getElementById("editStok").value),
    terjual: Number(document.getElementById("editTerjual").value)
  };

  await request({
    action: "update",
    data: data
  });

  closeModal();
  loadProduk();
}

/* =========================
   FORMAT RUPIAH
========================= */
function formatRupiah(num) {
  return "Rp " + Number(num || 0).toLocaleString("id-ID");
}
