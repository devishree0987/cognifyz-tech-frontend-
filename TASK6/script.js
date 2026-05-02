// Toggle forms
let loginBtn = document.getElementById("loginBtn");
let signupBtn = document.getElementById("signupBtn");
let loginForm = document.getElementById("loginForm");
let signupForm = document.getElementById("signupForm");

loginBtn.onclick = () => {
  loginForm.classList.add("active");
  signupForm.classList.remove("active");
  loginBtn.classList.add("active");
  signupBtn.classList.remove("active");
};

signupBtn.onclick = () => {
  signupForm.classList.add("active");
  loginForm.classList.remove("active");
  signupBtn.classList.add("active");
  loginBtn.classList.remove("active");
};

// Dark / Light mode
let toggleMode = document.getElementById("toggleMode");

toggleMode.onclick = () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");

  toggleMode.innerText =
    document.body.classList.contains("dark")
      ? "☀️ Light Mode"
      : "🌙 Dark Mode";
};

// Default mode
document.body.classList.add("light");

// Validation (Signup)
document.getElementById("signupForm").onsubmit = function(e) {
  e.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let msg = document.getElementById("signupMsg");

  msg.style.color = "red";

  if (!email.includes("@")) {
    msg.innerText = "Invalid email!";
    return;
  }

  if (password.length < 6) {
    msg.innerText = "Password must be 6+ chars!";
    return;
  }

  msg.style.color = "lightgreen";
  msg.innerText = "Signup successful!";
};

// Validation (Login)
document.getElementById("loginForm").onsubmit = function(e) {
  e.preventDefault();

  let msg = document.getElementById("loginMsg");
  msg.style.color = "lightgreen";
  msg.innerText = "Login successful!";
};