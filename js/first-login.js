// FIRST LOGIN - COOKIE AND TERMS MODAL
function setCookie(name, value, days) {
  var d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Check first visit and ensure modal stays until user accepts or denies
document.addEventListener('DOMContentLoaded', function() {
  var cookieName = "gameofbarbers_terms";
  var value = getCookie(cookieName);

  function showTerms() {
    var modalEl = document.getElementById('conditionsModal');
    if (!modalEl) return;
    var modal = new bootstrap.Modal(modalEl, { backdrop: 'static', keyboard: false });
    modal.show();
  }

  // Ensure event listeners are only added once
  var acceptBtn = document.getElementById('conditionsAcceptBtn');
  var denyBtn = document.getElementById('conditionsDenyBtn');
  if (acceptBtn && !acceptBtn.dataset.listenerAdded) {
    acceptBtn.addEventListener('click', function() {
      setCookie(cookieName, 'accepted', 365);
      var modalEl = document.getElementById('conditionsModal');
      if (modalEl) {
        var modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modal.hide();
      }
    });
    acceptBtn.dataset.listenerAdded = 'true';
  }
  if (denyBtn && !denyBtn.dataset.listenerAdded) {
    denyBtn.addEventListener('click', function() {
      setCookie(cookieName, 'denied', 365);
      var modalEl = document.getElementById('conditionsModal');
      if (modalEl) {
        var modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modal.hide();
      }
    });
    denyBtn.dataset.listenerAdded = 'true';
  }

  // If cookie doesn't exist, create it with empty value and show modal
  if (value === null) {
    setCookie(cookieName, '', 365);
    setTimeout(showTerms, 300);
    return;
  }

  // If cookie exists but empty (user visited before but didn't choose), show modal again
  if (value === '') {
    setTimeout(showTerms, 300);
    return;
  }

  // If value is 'accepted' or 'denied' do nothing
});
