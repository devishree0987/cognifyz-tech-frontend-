// ============================================================
// script.js — API Integration using JSONPlaceholder
// ============================================================

// Step 1: Define API endpoints
const API_BASE = "https://jsonplaceholder.typicode.com";
const ENDPOINTS = {
  users: `${API_BASE}/users`,
  posts: `${API_BASE}/posts?_limit=12`,
};

// Step 2: Track current tab
let currentTab = "users";

// ── DOM references ──────────────────────────────────────────
const fetchBtn    = document.getElementById("fetch-btn");
const clearBtn    = document.getElementById("clear-btn");
const outputGrid  = document.getElementById("output-grid");
const loadingEl   = document.getElementById("loading");
const statusText  = document.getElementById("status-text");
const tabBtns     = document.querySelectorAll(".tab-btn");

// ── Tab switching ───────────────────────────────────────────
tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    tabBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentTab = btn.dataset.tab;
    outputGrid.innerHTML = "";
    setStatus(`Tab switched to "${currentTab}". Click Fetch to load.`);
  });
});

// ── Helper: Update status bar ───────────────────────────────
function setStatus(msg, isError = false) {
  statusText.textContent = msg;
  statusText.style.color = isError ? "#c0392b" : "#2c3e50";
}

// ── Show / Hide loading spinner ─────────────────────────────
function showLoading(show) {
  loadingEl.classList.toggle("hidden", !show);
  fetchBtn.disabled = show;
}

// ── Step 2: Fetch data using fetch() ───────────────────────
async function fetchData() {
  showLoading(true);
  setStatus(`Fetching ${currentTab} from API...`);
  outputGrid.innerHTML = "";

  try {
    // fetch() sends a GET request to the API URL
    const response = await fetch(ENDPOINTS[currentTab]);

    // Check if the response was successful
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    // Step 3: Parse the JSON response
    const data = await response.json();

    // Step 3: Dynamically update the DOM
    displayData(data, currentTab);
    setStatus(`✓ Loaded ${data.length} ${currentTab} successfully from JSONPlaceholder API.`);

  } catch (error) {
    setStatus(`✗ Error: ${error.message}`, true);
    outputGrid.innerHTML = `<div class="error-box">&#9888; Failed to fetch: ${error.message}</div>`;
  } finally {
    showLoading(false);
  }
}

// ── Step 3: Render fetched data into the DOM ────────────────
function displayData(data, type) {
  outputGrid.innerHTML = ""; // Clear previous cards

  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = type === "users"
      ? buildUserCard(item)
      : buildPostCard(item);

    // Animate card in
    card.style.opacity = "0";
    card.style.transform = "translateY(16px)";
    outputGrid.appendChild(card);

    // Trigger fade-in animation with stagger
    setTimeout(() => {
      card.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, data.indexOf(item) * 60);
  });
}

// ── Card templates ──────────────────────────────────────────
function buildUserCard(user) {
  const initials = user.name.split(" ").map(n => n[0]).join("").slice(0, 2);
  return `
    <div class="card-avatar">${initials}</div>
    <div class="card-body">
      <h3>${user.name}</h3>
      <p class="meta">@${user.username}</p>
      <p>&#9993; ${user.email}</p>
      <p>&#127758; ${user.address.city}, ${user.address.zipcode}</p>
      <p>&#128241; ${user.phone}</p>
      <a href="https://${user.website}" target="_blank" class="link">&#128279; ${user.website}</a>
      <div class="badge">${user.company.name}</div>
    </div>
  `;
}

function buildPostCard(post) {
  return `
    <div class="post-id">#${post.id}</div>
    <div class="card-body">
      <h3>${capitalize(post.title)}</h3>
      <p class="post-body">${capitalize(post.body)}</p>
      <div class="badge">User ${post.userId}</div>
    </div>
  `;
}

// ── Utilities ───────────────────────────────────────────────
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ── Button Events ───────────────────────────────────────────
fetchBtn.addEventListener("click", fetchData);

clearBtn.addEventListener("click", () => {
  outputGrid.innerHTML = "";
  setStatus("Cleared. Click Fetch Data to load again.");
});
