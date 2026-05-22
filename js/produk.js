document.addEventListener("DOMContentLoaded", loadProduk);

/* =========================
   LOAD DATA
========================= */
let ALL_DATA = [];

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
        <h3>${item.nama}</h3>
        <p>SKU: ${item.sku}</p>
        <p>Modal: ${formatRupiah(item.modal)}</p>
        <p>Harga: ${formatRupiah(item.harga_jual)}</p>
        <p>Stok: ${item.stok}</p>
        <p>Terjual: ${item.terjual}</p>

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
   SEARCH REALTIME
========================= */
function setupSearch() {
  const search = document.getElementById("search");

  search.addEventListener("input", function () {
    const keyword = this.value.toLowerCase();

    const filtered = ALL_DATA.filter(item =>
      item.nama.toLowerCase().includes(keyword) ||
      item.sku.toLowerCase().includes(keyword)
    );

    renderProduk(filtered);
  });
}

/* =========================
   HAPUS PRODUK
========================= */
async function hapusProduk(sku) {
  if (!confirm("Yakin mau hapus produk ini?")) return;

  await request({
    action: "delete",
    sku: sku
  });

  loadProduk();
}

/* =========================
   OPEN MODAL EDIT
========================= */
function openEdit(sku) {
  const item = ALL_DATA.find(p => p.sku === sku);
  if (!item) return;

  document.getElementById("editSku").value = item.sku;
  document.getElementById("editNama").value = item.nama;
  document.getElementById("editModal").value = item.modal;
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
  const data = {
    sku: document.getElementById("editSku").value,
    nama: document.getElementById("editNama").value,
    modal: Number(document.getElementById("editModal").value),
    harga_jual: Number(document.getElementById("editHarga").value),
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
  return Number(num || 0).toLocaleString("id-ID");
}
