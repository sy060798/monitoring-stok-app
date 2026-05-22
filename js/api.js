const API_URL = "PASTE_URL_GOOGLE_APPS_SCRIPT_KAMU";

async function request(payload) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

function getAllProduk() {
  return request({ action: "getAllProduk" });
}

function addProduk(data) {
  return request({
    action: "add",
    data: data
  });
}

function updateProduk(data) {
  return request({
    action: "update",
    data: data
  });
}

function deleteProduk(sku) {
  return request({
    action: "delete",
    sku: sku
  });
}
