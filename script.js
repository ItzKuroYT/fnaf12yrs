const redirectUrl = "https://youareanidiot.cc/";
const redirectDelayMs = 2000;
const allowedIps = new Set([
  "2607:fb91:3d80:b160:a891:e155:a4ef:1de2",
  "172.59.116.24",
]);

const previewMode = new URLSearchParams(window.location.search).has("preview");
const localFileMode = window.location.protocol === "file:";
const stayMode = previewMode || localFileMode || sessionStorage.getItem("stay-on-page") === "true";

let redirectTimer;

function stayOnPage() {
  document.documentElement.dataset.preview = "true";
  sessionStorage.setItem("stay-on-page", "true");
  window.clearTimeout(redirectTimer);
}

async function getVisitorIp() {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 1500);

  try {
    const response = await fetch("https://api64.ipify.org?format=json", {
      cache: "no-store",
      signal: controller.signal,
    });
    const data = await response.json();
    return String(data.ip || "").toLowerCase();
  } catch {
    return "";
  } finally {
    window.clearTimeout(timeout);
  }
}

document.addEventListener("dblclick", stayOnPage);

if (stayMode) {
  stayOnPage();
} else {
  redirectTimer = window.setTimeout(() => {
    window.location.replace(redirectUrl);
  }, redirectDelayMs);

  getVisitorIp().then((ip) => {
    if (allowedIps.has(ip)) {
      stayOnPage();
    }
  });
}
