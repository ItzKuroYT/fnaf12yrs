const redirectUrl = "https://youareanidiot.cc/";
const secondsBeforeRedirect = 1;
const previewMode = new URLSearchParams(window.location.search).has("preview");

const countdown = document.querySelector("#countdown");
const redirectCopy = document.querySelector("#redirect-copy");

if (previewMode) {
  if (redirectCopy) {
    redirectCopy.textContent = "Preview mode";
  }
} else {
  let remaining = secondsBeforeRedirect;

  const tick = window.setInterval(() => {
    remaining -= 1;

    if (countdown) {
      countdown.textContent = String(Math.max(remaining, 0));
    }

    if (remaining <= 0) {
      window.clearInterval(tick);
      window.location.assign(redirectUrl);
    }
  }, 1000);
}
