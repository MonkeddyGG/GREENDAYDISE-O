document.addEventListener('DOMContentLoaded', () => {
    // 1. Año dinámico en el footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Cambio de estilo del Header al hacer scroll
    const header = document.getElementById('header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // 3. Menú Móvil Responsivo
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 4. Resaltar enlace activo según la sección visible
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 110;
            const sectionId = current.getAttribute('id');
            const navItem = document.querySelector(`.nav-list a[href*="${sectionId}"]`);

            if (navItem) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navItem.classList.add('active');
                } else {
                    navItem.classList.remove('active');
                }
            }
        });
    });

    // 5. Filtro interactivo de Galería
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

    // 6. Lightbox para ampliar imágenes de la galería
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = item.querySelector('h4').textContent;
            lightboxImg.src = img.src;
            lightboxCaption.textContent = title;
            lightbox.classList.add('active');
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // 7. Preseleccionar servicio al dar clic en "Cotizar servicio"
    const serviceLinks = document.querySelectorAll('.service-link');
    const servicioSelect = document.getElementById('servicio');

    serviceLinks.forEach(link => {
        link.addEventListener('click', () => {
            const selectedService = link.getAttribute('data-service');
            if (servicioSelect && selectedService) {
                servicioSelect.value = selectedService;
            }
        });
    });

    // 8. Envío de formulario directo a WhatsApp de Diseños Green Day (+52 1 477 227 5550)
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const servicio = document.getElementById('servicio').value;
            const superficie = document.getElementById('superficie').value.trim() || 'Por definir';
            const tipoProyecto = document.getElementById('tipoProyecto').value;
            const detalles = document.getElementById('detalles').value.trim();

            const mensaje = `Hola *Diseños Green Day* 🌿, solicito una cotización:\n\n` +
                `👤 *Nombre:* ${nombre}\n` +
                `📞 *Teléfono:* ${telefono}\n` +
                `🌱 *Servicio:* ${servicio}\n` +
                `🏡 *Tipo de espacio:* ${tipoProyecto}\n` +
                `📐 *Superficie aprox.:* ${superficie}\n` +
                `📝 *Detalles:* ${detalles}`;

            const whatsappNumber = '5214772275550';
            const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`;

            window.open(url, '_blank', 'noopener');
        });
    }

    // 9. Animación suave de aparición (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    revealElements.forEach(el => revealObserver.observe(el));
});