// ===============================
// GLOBAL FRONTEND HELPERS
// ===============================

// Check if user is logged in
function isLoggedIn() {
  return !!localStorage.getItem("token");
}

// Logout user
function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login.html";
}

// Go to favorites page
function goFavorites() {
  window.location.href = "/favorites.html";
}

// Go to admin page
function goAdmin() {
  window.location.href = "/admin.html";
}

// Optional: decode JWT to get user info
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

// Optional: hide admin button if not admin
function handleRoleUI() {
  const token = localStorage.getItem("token");
  if (!token) return;

  const payload = parseJwt(token);
  if (!payload) return;

  const adminBtn = document.getElementById("adminBtn");
  if (adminBtn && payload.role !== "ADMIN") {
    adminBtn.style.display = "none";
  }
}

// Run on page load
document.addEventListener("DOMContentLoaded", () => {
  handleRoleUI();
});
