const API_URL = "https://script.google.com/macros/s/AKfycbyztmqRUapHvNGZrEArbwT6ZO_CZ-xn4u4KF7OztOTv1llx8o3GnQWk9mhhKo0qcOUu/exec";

async function request(payload) {
  const formData = new URLSearchParams();
  formData.append("data", JSON.stringify(payload));

  const res = await fetch(API_URL, {
    method: "POST",
    body: formData
  });

  return await res.json();
}
