async function register() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("msg");

  msg.innerText = "";

  if (!name || !email || !password) {
    msg.innerText = "All fields are required";
    return;
  }

  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      msg.innerText = data.message || "Registration failed";
      return;
    }

    msg.innerText = "Registration successful! Redirecting...";
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);

  } catch {
    msg.innerText = "Server error. Please try again later.";
  }
}
