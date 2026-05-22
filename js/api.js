const API_URL = "https://script.google.com/macros/s/AKfycbzA76uSzpDu86HmQLn2WE4IL3uCB_iufWdac4rhe408z_GZmI4C3_y_EbZMqMHq6z0W/exec";

let CACHE = null;
let CACHE_TIME = 0;

async function request(payload) {
  try {
    const now = Date.now();

    // 🔥 CACHE untuk getAllProduk
    if (
      payload.action === "getAllProduk" &&
      CACHE &&
      now - CACHE_TIME < 5000
    ) {
      return { data: CACHE };
    }

    const formData = new URLSearchParams();
    formData.append("data", JSON.stringify(payload));

    const res = await fetch(API_URL, {
      method: "POST",
      body: formData
    });

    const json = await res.json();

    // simpan cache
    if (payload.action === "getAllProduk") {
      CACHE = json.data;
      CACHE_TIME = now;
    }

    return json;

  } catch (err) {
    console.error("API ERROR:", err);
    return { error: true };
  }
}
