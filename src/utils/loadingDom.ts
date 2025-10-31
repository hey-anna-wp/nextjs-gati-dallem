// 전역 로딩 오버레이 제어 (브라우저 전용 DOM 조작)
// - 동시 요청 카운팅
// - 짧은 요청 깜빡임 방지(지연 표시)

let activeCount = 0;
let showTimer: number | null = null;
let hideTimer: number | null = null;

// 초단기 요청에서 깜빡임 방지용 지연
const DELAY_MS = 250; // 표시 지연 (짧은 요청은 아예 안 보여줌)
const MIN_SHOW_MS = 300; // 최소 표시 시간 (보였다면 최소 이 시간은 유지)
const QUIET_MS = 150; // 마지막 요청 종료 후 숨기기까지 대기(연쇄 요청 대비)

// 내부 상태
let isShown = false;
let shownAt = 0;

function el(): HTMLElement | null {
  if (typeof window === "undefined") return null;
  return document.getElementById("global-loading");
}

function actuallyShow() {
  const node = el();
  if (!node || isShown) return;
  node.classList.remove("hidden");
  node.classList.add("flex");
  document.body.dataset.loading = "true";
  isShown = true;
  shownAt = Date.now();
}

function actuallyHide() {
  const node = el();
  if (!isShown) return;
  // body 상태는 노드 존재 여부와 무관하게 정리
  delete document.body.dataset.loading;
  document.body.removeAttribute("aria-busy");
  if (!node) {
    isShown = false;
    shownAt = 0;
    return;
  }
  node.classList.remove("flex");
  node.classList.add("hidden");
  isShown = false;
  shownAt = 0;
}

export function showGlobalLoading() {
  if (typeof window === "undefined") return;
  activeCount += 1;

  // 숨김 예약이 잡혀있다면 취소 (곧 새 요청이 이어질 수 있음)
  if (hideTimer) {
    window.clearTimeout(hideTimer);
    hideTimer = null;
  }

  // 첫 요청일 때만 지연 후 표시
  if (activeCount === 1 && !isShown) {
    if (showTimer) window.clearTimeout(showTimer);
    showTimer = window.setTimeout(() => {
      actuallyShow();
      showTimer = null;
    }, DELAY_MS);
  }
}

export function hideGlobalLoading() {
  if (typeof window === "undefined") return;
  activeCount = Math.max(0, activeCount - 1);

  // 아직 남은 요청이 있으면 숨기지 않음
  if (activeCount > 0) return;

  // 아직 표시 타이머만 있고 실제로는 안 보이는 상태라면 표시 자체 취소
  if (showTimer) {
    window.clearTimeout(showTimer);
    showTimer = null;
  }

  // 연쇄 요청 대비: 잠깐 대기 후 숨김 시도
  if (hideTimer) window.clearTimeout(hideTimer);
  hideTimer = window.setTimeout(() => {
    hideTimer = null;
    if (!isShown) return; // 이미 안 보임

    const elapsed = Date.now() - shownAt;
    const remain = Math.max(0, MIN_SHOW_MS - elapsed);

    // 최소 표시 시간 보장
    if (remain > 0) {
      window.setTimeout(() => {
        if (activeCount === 0) actuallyHide();
      }, remain);
    } else {
      if (activeCount === 0) actuallyHide();
    }
  }, QUIET_MS);
}
