const API_URL = "https://script.google.com/macros/s/AKfycbzA76uSzpDu86HmQLn2WE4IL3uCB_iufWdac4rhe408z_GZmI4C3_y_EbZMqMHq6z0W/exec";

async function request(payload) {
  try {
    const formData = new URLSearchParams();
    formData.append("data", JSON.stringify(payload));

    const res = await fetch(API_URL, {
      method: "POST",
      body: formData
    });

    const json = await res.json();
    return json;

  } catch (err) {
    console.error("API ERROR:", err);
    return { error: true, message: err.toString() };
  }
}
