const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
  });
});

const usePriceButton = document.querySelector("#usePrice");
const priceFeedback = document.querySelector("#priceFeedback");

usePriceButton.addEventListener("click", () => {
  priceFeedback.textContent = "Precio sugerido seleccionado: S/ 8.50 – 9.20.";
  usePriceButton.textContent = "Precio seleccionado";
  usePriceButton.disabled = true;
  usePriceButton.style.opacity = "0.8";
});

const contactForm = document.querySelector("#contactForm");
const formFeedback = document.querySelector("#formFeedback");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = String(formData.get("nombre") || "").trim();
  formFeedback.textContent = `¡Gracias${name ? ", " + name : ""}! El formulario está validado. Para recibir mensajes reales, conecta este formulario a un backend o servicio de correo.`;
  contactForm.reset();
});
