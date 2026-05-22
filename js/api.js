const API_URL = "https://script.google.com/macros/s/AKfycbyrh0tM0-1KbolYmND98j6z7VhMCuvwN9-tyrDcJNsXZgNsaUu6lxlT4XfG3qmge221/exec";

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
