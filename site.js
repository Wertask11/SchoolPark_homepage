/* 共通ナビのハンバーガー（979px以下）。キーボードでも開け閉めできる。 */
(function () {
  "use strict";
  var btn = document.querySelector(".site-burger");
  var menu = document.getElementById("siteMenu");
  if (!btn || !menu) return;
  var icon = btn.querySelector(".site-burger-icon");
  function set(open) {
    menu.hidden = !open;
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    if (icon) icon.textContent = open ? "✕" : "☰";
  }
  btn.addEventListener("click", function () { set(menu.hidden); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !menu.hidden) { set(false); btn.focus(); }
  });
  menu.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest("a")) set(false);
  });
  // 広げてPC幅になったら閉じておく
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 980 && !menu.hidden) set(false);
  });
})();
