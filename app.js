let nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  if (window.scrollY == 0) {    
    nav.style.boxShadow = "";
  } else {
    nav.style.boxShadow = "0px 1px 5px rgba(0, 0, 0, 0.5)";
  }
});
