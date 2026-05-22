const API_URL = "https://script.google.com/macros/s/AKfycbxS-Dy_OSDzMGVSpl6MbFCQ0aoyZJB17BG3Ue4sDJdCGm-8vOlPa6r8jV6akZ8fYiBQ/exec";

async function request(payload) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  return await res.json();
}
