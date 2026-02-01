// FIRST LOGIN - LOCAL STORAGE AND TERMS MODAL
function setItem(name, value) {
  if (!name || typeof name !== "string") return;
  if (typeof value !== "string") return;
  localStorage.setItem(name, value);
}

function getItem(name) {
  return localStorage.getItem(name);
}

document.addEventListener('DOMContentLoaded', function () {
  const storageKey = "gameofbarbers_terms";
  const value = getItem(storageKey);

  function showTerms() {
    const modalEl = document.getElementById('conditionsModal');
    if (!modalEl) return;

    const modal = new bootstrap.Modal(modalEl, {
      backdrop: 'static',
      keyboard: false
    });

    modal.show();
  }

  const acceptBtn = document.getElementById('conditionsAcceptBtn');
  const denyBtn = document.getElementById('conditionsDenyBtn');

  if (acceptBtn && !acceptBtn.dataset.listenerAdded) {
    acceptBtn.addEventListener('click', function () {
      setItem(storageKey, 'accepted');

      document.activeElement.blur();

      const modalEl = document.getElementById('conditionsModal');
      if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();
      }
    });
    acceptBtn.dataset.listenerAdded = true;
  }

  if (denyBtn && !denyBtn.dataset.listenerAdded) {
    denyBtn.addEventListener('click', function () {
      setItem(storageKey, 'denied');

      document.activeElement.blur();

      const modalEl = document.getElementById('conditionsModal');
      if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();
      }
    });
    denyBtn.dataset.listenerAdded = true;
  }

  // SHOW MODAL ONLY IF LOCAL STORAGE ITEM DOES NOT EXIST
  if (value === null) {
    setTimeout(showTerms, 300);
  }
});