const paths = document.querySelectorAll("#t-path");

paths.forEach((path) => {
  path.addEventListener("click", () => {
    const copyText = path.textContent;
    navigator.clipboard.writeText(copyText.trim());
    alert("copied path:" + copyText.trim());
  });
});
