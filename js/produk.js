document.addEventListener("DOMContentLoaded", () => {

  loadProduk();

  setupSearch();

  autoHitungHarga();

});

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

  } catch (err) {

    console.error("LOAD ERROR:", err);

  }

}

/* =========================
   RENDER TABLE
========================= */
function renderProduk(data) {

  let html = "";

  if (data.length === 0) {

    html = `
      <tr>
        <td colspan="9" style="text-align:center;">
          Tidak ada produk
        </td>
      </tr>
    `;

  }

  data.forEach(item => {

    const stokBadge =
      Number(item.stok) <= 0
      ? `<span class="badge badge-empty">Habis</span>`
      : `<span class="badge badge-stock">${item.stok}</span>`;

    // 🔥 PROMO DISPLAY (WAJIB 0 JIKA NULL)
    const promo = Number(item.promo_beli || 0);

    const promoInfo = promo > 0
  ? `<small style="color:#ef4444;">Promo: ${formatRupiah(promo)}</small>`
  : `<small style="color:#94a3b8;">Promo: 0</small>`;

    html += `

      <tr>

        <td>
          <strong>${item.nama}</strong><br>
          ${promoInfo}
        </td>

        <td>${item.sku}</td>

        <td>${formatRupiah(item.modal)}</td>

        <td>${item.margin || 0}%</td>

        <td>
          <strong>
            ${formatRupiah(item.harga_jual)}
          </strong>
        </td>

        <td>${stokBadge}</td>

        <td>${item.terjual}</td>

        <td>

          <button
            class="btn-edit"
            onclick="openEdit('${item.sku}')"
          >
            ✏️
          </button>

          <button
            class="btn-delete"
            onclick="hapusProduk('${item.sku}')"
          >
            🗑
          </button>

        </td>

      </tr>

    `;
  });

  document.getElementById("listProduk").innerHTML = html;

}

/* =========================
   SEARCH
========================= */
function setupSearch() {

  const search = document.getElementById("search");

  search.addEventListener("input", function () {

    const keyword = this.value.toLowerCase();

    const filtered = ALL_DATA.filter(item => {

      const nama = String(item.nama || "").toLowerCase();
      const sku = String(item.sku || "").toLowerCase();

      return (
        nama.includes(keyword) ||
        sku.includes(keyword)
      );

    });

    renderProduk(filtered);

  });

}

/* =========================
   HAPUS PRODUK
========================= */
async function hapusProduk(sku) {

  const yes = confirm("Yakin ingin menghapus produk ini?");
  if (!yes) return;

  try {

    await request({
      action: "delete",
      sku: sku
    });

    loadProduk();

  } catch (err) {

    console.error("DELETE ERROR:", err);

  }

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
  document.getElementById("editMargin").value = item.margin || 0;
  document.getElementById("editHarga").value = item.harga_jual;
  document.getElementById("editStok").value = item.stok;
  document.getElementById("editTerjual").value = item.terjual;

  // 🔥 TAMBAHAN PROMO
  document.getElementById("editPromo").value =
    Number(item.promo_beli || 0);

  document.getElementById("modalEdit").style.display = "flex";
}

/* =========================
   CLOSE MODAL
========================= */
function closeModal() {

  document.getElementById("modalEdit").style.display = "none";

}

/* =========================
   AUTO HITUNG HARGA
========================= */
function autoHitungHarga() {

  const modalInput = document.getElementById("editModal");
  const marginInput = document.getElementById("editMargin");

  if (!modalInput || !marginInput) return;

  modalInput.addEventListener("input", hitungHarga);
  marginInput.addEventListener("input", hitungHarga);

}

/* =========================
   HITUNG HARGA
========================= */
function hitungHarga() {

  const modal =
    Number(document.getElementById("editModal").value);

  const margin =
    Number(document.getElementById("editMargin").value);

  const harga =
    modal + (modal * margin / 100);

  document.getElementById("editHarga").value =
    Math.round(harga);

}

/* =========================
   SIMPAN EDIT
========================= */
async function simpanEdit() {

  try {

    const data = {

      sku: document.getElementById("editSku").value,
      nama: document.getElementById("editNama").value,
      modal: Number(document.getElementById("editModal").value),
      margin: Number(document.getElementById("editMargin").value),
      harga_jual: Number(document.getElementById("editHarga").value),
      stok: Number(document.getElementById("editStok").value),
      terjual: Number(document.getElementById("editTerjual").value),

      // 🔥 PROMO MASUK SINI
      promo_beli: Number(document.getElementById("editPromo").value || 0)

    };

    await request({
      action: "update",
      data: data
    });

    closeModal();
    loadProduk();

  } catch (err) {

    console.error("UPDATE ERROR:", err);

  }

}

/* =========================
   FORMAT RUPIAH
========================= */
function formatRupiah(num) {

  return "Rp " +
    Number(num || 0).toLocaleString("id-ID");

}
