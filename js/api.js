const API_URL = "https://script.google.com/macros/s/AKfycbxS-Dy_OSDzMGVSpl6MbFCQ0aoyZJB17BG3Ue4sDJdCGm-8vOlPa6r8jV6akZ8fYiBQ/exec";

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
