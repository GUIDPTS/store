export function initializeCountdown(
  elementId: string,
  endDate: string | Date,
  onFinish?: () => void
): ReturnType<typeof setInterval> | null {
  if (!import.meta.client) return null;

  const targetTime = new Date(endDate).getTime();
  if (isNaN(targetTime)) return null;

  let daysEl: HTMLElement | null = null;
  let hoursEl: HTMLElement | null = null;
  let minutesEl: HTMLElement | null = null;
  let secondsEl: HTMLElement | null = null;
  let wrapperEl: HTMLElement | null = null;

  const attachElements = () => {
    wrapperEl = document.getElementById(elementId);
    if (!wrapperEl) return false;

    daysEl = wrapperEl.querySelector(".days");
    hoursEl = wrapperEl.querySelector(".hours");
    minutesEl = wrapperEl.querySelector(".minutes");
    secondsEl = wrapperEl.querySelector(".seconds");

    return !!(daysEl && hoursEl && minutesEl && secondsEl);
  };

  const observer = new MutationObserver(() => {
    if (attachElements()) observer.disconnect();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  const SECOND = 1000;
  const MINUTE = SECOND * 60;
  const HOUR = MINUTE * 60;
  const DAY = HOUR * 24;

  const update = () => {
    if (!wrapperEl && !attachElements()) return;

    const now = Date.now();
    const distance = targetTime - now;

    if (distance <= 0) {
      if (wrapperEl) wrapperEl.style.display = "none";
      clearInterval(interval);
      if (onFinish) onFinish();
      return;
    }

    if (daysEl) daysEl.textContent = Math.floor(distance / DAY).toString();
    if (hoursEl) hoursEl.textContent = Math.floor((distance % DAY) / HOUR).toString();
    if (minutesEl) minutesEl.textContent = Math.floor((distance % HOUR) / MINUTE).toString();
    if (secondsEl) secondsEl.textContent = Math.floor((distance % MINUTE) / SECOND).toString();
  };

  const interval = setInterval(update, 1000);
  update();

  return interval;
}
