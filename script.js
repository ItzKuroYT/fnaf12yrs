const redirectUrl = "https://youareanidiot.cc/";
const previewMode = new URLSearchParams(window.location.search).has("preview");

if (previewMode) {
  document.documentElement.dataset.preview = "true";
} else {
  window.location.replace(redirectUrl);
}
