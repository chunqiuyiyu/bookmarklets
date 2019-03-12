// IIFE
(function() {
  var txt = document.getSelection().toString();
  if (txt) {
    alert(atob(txt));
  }
})();
