const newsMap = {
  1: {
    categoria: "Comunidad",
    fecha: "2025",
    titulo: "100 jóvenes de Cholchol son beneficiados con becas para sus estudios superiores",
    imagen: "img/100_jovenes.jpg",
    contenido:
      "El Municipio de Cholchol, a través del Programa de Becas Municipales, benefició a 100 estudiantes de educación superior, reafirmando el compromiso con el acceso equitativo a la educación y el desarrollo académico local."
  },
  2: {
    categoria: "Cultura",
    fecha: "2025",
    titulo: "Municipio reconoce a dirigentes históricos por la creación de la comuna",
    imagen: "img/dirigentes.jpeg",
    contenido:
      "Ceremonia de reconocimiento a vecinos y dirigentes sociales que fueron parte fundamental en la restitución de la comuna de Cholchol."
  },
  3: {
    categoria: "Comunidad",
    fecha: "2026",
    titulo: "RESULTADOS BECA MUNICIPAL 2026: click aquí para ver los resultados y saber si eres beneficiario",
    imagen: "img/resultados_becas.png",
    contenido:
      "Publicación oficial de resultados de beca municipal."
  },
  4: {
    categoria: "Cultura",
    fecha: "2025",
    titulo: "Concurso literario: Cholchol en 100 palabras",
    imagen: "img/concurso_literario.png",
    contenido:
      "Convocatoria literaria comunal con categorías infantil y adulto, orientada a promover identidad y participación cultural."
  },
  5: {
    categoria: "Comunidad",
    fecha: "2025",
    titulo: "Actualización Plan de Desarrollo Comunal Cholchol 2025-2029",
    imagen: "img/plan_de_desarrollo_comunal.png",
    contenido:
      "Actualización del PLADECO con apoyo técnico y enfoque territorial para fortalecer la planificación estratégica comunal."
  },
  6: {
    categoria: "Comunidad",
    fecha: "2025",
    titulo: "Encuestas ciudadanas disponibles para participación comunal",
    imagen: "img/encuestas.jpeg",
    contenido:
      "La municipalidad dispone encuestas abiertas para participación y levantamiento de información ciudadana."
  }
};

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));
const data = newsMap[id];
const newsDetail = document.getElementById("newsDetail");

if (!data) {
  newsDetail.innerHTML = "<div class='alert alert-warning'>Noticia no encontrada.</div>";
} else {
  newsDetail.innerHTML = `
    <p class="section-chip">${data.categoria}</p>
    <h1 class="section-title mb-2">${data.titulo}</h1>
    <p class="text-secondary mb-4"><i class="bi bi-calendar-event"></i> ${data.fecha}</p>
    <img class="img-fluid rounded-4 border mb-4" src="${data.imagen}" alt="${data.titulo}" />
    <p class="fs-5">${data.contenido}</p>
  `;
}
