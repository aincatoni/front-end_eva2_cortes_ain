const newsData = [
  {
    id: 1,
    categoria: "Comunidad",
    fecha: "12 Mayo 2026",
    titulo: "100 jóvenes de Cholchol son beneficiados con becas para sus estudios superiores",
    imagen: "img/100_jovenes.jpg",
    resumen:
      "El municipio benefició a 100 estudiantes de educación superior mediante el programa de becas municipales."
  },
  {
    id: 2,
    categoria: "Cultura",
    fecha: "10 Mayo 2026",
    titulo: "Municipio reconoce a dirigentes históricos por la creación de la comuna",
    imagen: "img/dirigentes.jpeg",
    resumen: "El municipio rindió homenaje a dirigentes que impulsaron la creación de la comuna."
  },
  {
    id: 3,
    categoria: "Comunidad",
    fecha: "08 Mayo 2026",
    titulo: "RESULTADOS BECA MUNICIPAL 2026: click aquí para ver los resultados y saber si eres beneficiario",
    imagen: "img/resultados_becas.png",
    resumen: "Publicación oficial de resultados de la beca municipal 2026."
  },
  {
    id: 4,
    categoria: "Cultura",
    fecha: "06 Mayo 2026",
    titulo: "Concurso literario: Cholchol en 100 palabras",
    imagen: "img/concurso_literario.png",
    resumen: "Concurso comunal con convocatoria en categorías infantil y adulto."
  },
  {
    id: 5,
    categoria: "Comunidad",
    fecha: "05 Mayo 2026",
    titulo: "Actualización Plan de Desarrollo Comunal Cholchol 2025-2029",
    imagen: "img/plan_de_desarrollo_comunal.png",
    resumen: "Proceso de actualización del PLADECO con enfoque territorial y participación local."
  },
  {
    id: 6,
    categoria: "Comunidad",
    fecha: "03 Mayo 2026",
    titulo: "Encuestas ciudadanas disponibles para participación comunal",
    imagen: "img/encuestas.jpeg",
    resumen: "Acceso a formularios ciudadanos para consultas y levantamiento de información local."
  }
];

const siteHeader = document.getElementById("siteHeader");
const newsGrid = document.getElementById("newsGrid");
const newsSearch = document.getElementById("newsSearch");
const filterButtons = Array.from(document.querySelectorAll(".btn-filter"));
const resultCount = document.getElementById("resultCount");

const contactForm = document.getElementById("contactForm");
const nombreInput = document.getElementById("nombre");
const correoInput = document.getElementById("correo");
const mensajeInput = document.getElementById("mensaje");
const formStatus = document.getElementById("formStatus");
const googleScriptUrl =
  "https://script.google.com/macros/s/AKfycbyc2y35v-EsQrmqev3rcEuyIiizEVyPVENw3o-OSRG_p-Uj7rHrdRBiVKU3Z2Gcj6Oyww/exec";
const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

let activeFilter = "Todos";

function applyHeaderScrollState() {
  const hasScrolled = window.scrollY > 12;
  siteHeader.classList.toggle("is-scrolled", hasScrolled);
}

function createNewsCard(newsItem) {
  return `
    <div class="col-md-6 col-xl-4" data-id="${newsItem.id}">
      <article class="news-card" tabindex="0">
        <img src="${newsItem.imagen}" alt="Imagen asociada a noticia: ${newsItem.titulo}" loading="lazy" />
        <div class="news-content">
          <div class="news-meta">
            <span>${newsItem.categoria}</span>
            <span>${newsItem.fecha}</span>
          </div>
          <h3 class="news-title">${newsItem.titulo}</h3>
          <a class="btn btn-sm btn-outline-muni" href="noticia.html?id=${newsItem.id}">Leer más</a>
        </div>
      </article>
    </div>
  `;
}

function filterNews() {
  const searchText = newsSearch.value.trim().toLowerCase();

  const filtered = newsData.filter((item) => {
    const matchFilter = activeFilter === "Todos" || item.categoria === activeFilter;
    const matchText =
      item.titulo.toLowerCase().includes(searchText) ||
      item.categoria.toLowerCase().includes(searchText);
    return matchFilter && matchText;
  });

  if (!filtered.length) {
    newsGrid.innerHTML = `
      <div class="col-12">
        <div class="alert alert-light border" role="status">No se encontraron resultados para tu búsqueda.</div>
      </div>
    `;
  } else {
    newsGrid.innerHTML = filtered.map(createNewsCard).join("");
  }

  resultCount.textContent = `Mostrando ${filtered.length} resultado(s)`;
}

function setFilterButtonState(buttonSelected) {
  filterButtons.forEach((btn) => {
    const isActive = btn === buttonSelected;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });
}

function validateName() {
  const feedback = document.getElementById("nombreError");
  const value = nombreInput.value.trim();

  if (!value) {
    feedback.textContent = "El nombre es obligatorio.";
    feedback.className = "field-feedback is-invalid-field";
    return false;
  }

  if (value.length < 3) {
    feedback.textContent = "El nombre debe tener al menos 3 caracteres.";
    feedback.className = "field-feedback is-invalid-field";
    return false;
  }

  feedback.textContent = "Nombre válido.";
  feedback.className = "field-feedback is-valid-field";
  return true;
}

function validateEmail() {
  const feedback = document.getElementById("correoError");
  const value = correoInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!value) {
    feedback.textContent = "El correo es obligatorio.";
    feedback.className = "field-feedback is-invalid-field";
    return false;
  }

  if (!emailRegex.test(value)) {
    feedback.textContent = "Formato de correo no válido.";
    feedback.className = "field-feedback is-invalid-field";
    return false;
  }

  feedback.textContent = "Correo válido.";
  feedback.className = "field-feedback is-valid-field";
  return true;
}

function validateMessage() {
  const feedback = document.getElementById("mensajeError");
  const value = mensajeInput.value.trim();

  if (!value) {
    feedback.textContent = "El mensaje es obligatorio.";
    feedback.className = "field-feedback is-invalid-field";
    return false;
  }

  if (value.length < 10) {
    feedback.textContent = "El mensaje debe tener al menos 10 caracteres.";
    feedback.className = "field-feedback is-invalid-field";
    return false;
  }

  feedback.textContent = "Mensaje válido.";
  feedback.className = "field-feedback is-valid-field";
  return true;
}

window.addEventListener("scroll", applyHeaderScrollState);

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    activeFilter = btn.dataset.filter;
    setFilterButtonState(btn);
    filterNews();
  });
});

newsSearch.addEventListener("input", filterNews);

nombreInput.addEventListener("input", validateName);
correoInput.addEventListener("input", validateEmail);
mensajeInput.addEventListener("input", validateMessage);

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nameOk = validateName();
  const emailOk = validateEmail();
  const messageOk = validateMessage();

  if (!nameOk || !emailOk || !messageOk) {
    formStatus.textContent = "Revisa los campos marcados antes de enviar.";
    formStatus.className = "text-danger";
    return;
  }

  const payload = {
    nombre: nombreInput.value.trim(),
    correo: correoInput.value.trim(),
    mensaje: mensajeInput.value.trim()
  };

  formStatus.textContent = "Enviando mensaje...";
  formStatus.className = "text-secondary";

  try {
    const response = await fetch(googleScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(payload)
    });

    const rawText = await response.text();
    let result = { ok: response.ok };

    try {
      result = JSON.parse(rawText);
    } catch (parseError) {
      result = { ok: response.ok, message: rawText || "Respuesta no JSON" };
    }

    if (!response.ok || !result.ok) {
      throw new Error(result.message || "No fue posible enviar el formulario.");
    }

    formStatus.textContent = "Mensaje enviado correctamente. Te contactaremos pronto.";
    formStatus.className = "text-success";

    const responseTag = document.createElement("span");
    responseTag.className = "badge text-bg-success ms-2";
    responseTag.textContent = "Enviado";
    formStatus.appendChild(responseTag);

    contactForm.reset();
    ["nombreError", "correoError", "mensajeError"].forEach((id) => {
      const field = document.getElementById(id);
      field.textContent = "";
      field.className = "field-feedback";
    });
  } catch (error) {
    formStatus.textContent = `Error al enviar: ${error.message}`;
    formStatus.className = "text-danger";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  applyHeaderScrollState();
  filterNews();
  setFilterButtonState(filterButtons[0]);
});

function openLightbox(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  lightboxImage.alt = "";
  document.body.style.overflow = "";
}

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    openLightbox(item.dataset.lightboxSrc, item.dataset.lightboxAlt);
  });
});

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
    closeLightbox();
  }
});
