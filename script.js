let clickCount = parseInt(localStorage.getItem("clickCount")) || 0;
const shareBtn = document.getElementById("whatsappShareBtn");
const counterDisplay = document.getElementById("clickCounter");
const form = document.getElementById("registrationForm");
const submitBtn = document.getElementById("submitBtn");
const thankYouMsg = document.getElementById("thankYouMsg");

// Update counter on load
if (clickCount >= 5) {
  counterDisplay.textContent = "Sharing complete. Please continue.";
  shareBtn.disabled = true;
} else {
  counterDisplay.textContent = `Click count: ${clickCount}/5`;
}

// Check if already submitted
if (localStorage.getItem("submitted") === "true") {
  form.style.display = "none";
  thankYouMsg.classList.remove("hidden");
}

// WhatsApp sharing
shareBtn.addEventListener("click", () => {
  if (clickCount < 5) {
    clickCount++;
    localStorage.setItem("clickCount", clickCount);

    if (clickCount < 5) {
      counterDisplay.textContent = `Click count: ${clickCount}/5`;
    } else {
      counterDisplay.textContent = "Sharing complete. Please continue.";
      shareBtn.disabled = true;
    }

    window.open(
      "https://wa.me/?text=Hey%20Buddy%2C%20Join%20Tech%20For%20Girls%20Community!",
      "_blank"
    );
  }
});

// Form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (clickCount < 5) {
    alert("Please complete WhatsApp sharing (5/5) before submitting.");
    return;
  }

  const name = form.elements["name"].value;
  const phone = form.elements["phone"].value;
  const email = form.elements["email"].value;
  const college = form.elements["college"].value;
  const screenshot = document.getElementById("screenshot").files[0];

  if (!screenshot) {
    alert("Please upload your screenshot.");
    return;
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("email", email);
  formData.append("college", college);
  formData.append("screenshot", screenshot); // Handle this in Apps Script if needed

  const scriptURL = "YOUR_GOOGLE_SCRIPT_WEB_APP_URL"; // Replace this

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      localStorage.setItem("submitted", "true");
      form.style.display = "none";
      thankYouMsg.classList.remove("hidden");
    } else {
      throw new Error("Google Apps Script Error");
    }
  } catch (err) {
    alert("Submission failed. Please try again later.");
    console.error(err);
  }
});
