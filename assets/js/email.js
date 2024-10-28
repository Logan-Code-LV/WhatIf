document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-container");
  const messageDiv = document.getElementById("message");

  if (form && messageDiv) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          const json = await response.json();
          messageDiv.textContent =
            "Thanks for signing up! We'll be in touch soon.";
          form.reset();
        } else {
          const json = await response.json();
          throw new Error(json.error || "Failed to submit");
        }
      } catch (error) {
        messageDiv.textContent =
          "Something went wrong. Please try again later.";
        console.error("Error:", error);
      }
    });
  } else {
    console.error("Form or message elements not found");
  }
});
