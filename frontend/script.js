const promptInput = document.getElementById("prompt");
const imageInput = document.getElementById("imageInput");
const generateBtn = document.getElementById("generateBtn");
const loading = document.getElementById("loading");
const output = document.getElementById("output");
const daysDiv = document.getElementById("days");

function checkReady() {
  generateBtn.disabled = !(promptInput.value && imageInput.files.length);
}

promptInput.addEventListener("input", checkReady);
imageInput.addEventListener("change", checkReady);

// image → base64
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
}

generateBtn.addEventListener("click", async () => {
  loading.classList.remove("hidden");
  document.querySelector(".container").classList.add("hidden");

  const prompt = promptInput.value;
  const imageFile = imageInput.files[0];
  const base64Image = await toBase64(imageFile);

  try {
    const res = await fetch("http://localhost:3000/process-travel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "hackathon-secret-2024"
      },
      body: JSON.stringify({
        prompt,
        image: base64Image
      })
    });

    const data = await res.json();

    if (!data.success) throw new Error(data.error);

    loading.classList.add("hidden");
    output.classList.remove("hidden");

    daysDiv.innerHTML = "";

    const days =
  data.itinerary.itinerary ||
  data.itinerary.days ||
  [];

days.forEach((day, index) => {
  const title =
    day.title ||
    day.theme ||
    "Planned Activities";

  const div = document.createElement("div");
  div.className = "day-card";
  div.innerHTML = `<h3>Day ${day.day || index + 1}: ${title}</h3>`;
  daysDiv.appendChild(div);
});

  } catch (err) {
  loading.classList.add("hidden");
  document.querySelector(".container").classList.remove("hidden");
  alert("Something went wrong. Please try again.");
  console.error(err);
}
});
