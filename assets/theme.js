document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-scroll]").forEach(el => {
        el.addEventListener("click", e => {
            e.preventDefault();
            document.querySelector(el.dataset.scroll).scrollIntoView({ behavior: "smooth" });
        });
    });
});


(() => {
    function initHero(root) {
        const slides = Array.from(root.querySelectorAll(".naju-hero__slide"));
        if (slides.length <= 1) return;

        // evita duplicar intervalos (editor do Shopify recarrega sections)
        if (root._najuTimer) clearInterval(root._najuTimer);

        let i = slides.findIndex(s => s.classList.contains("is-active"));
        if (i < 0) i = 0;

        const interval = Number(root.dataset.interval || "4500");

        root._najuTimer = setInterval(() => {
            slides[i].classList.remove("is-active");
            i = (i + 1) % slides.length;
            slides[i].classList.add("is-active");
        }, interval);
    }

    function boot() {
        document.querySelectorAll("[data-naju-hero]").forEach(initHero);
    }

    document.addEventListener("DOMContentLoaded", boot);

    // suporte ao Theme Editor
    document.addEventListener("shopify:section:load", boot);
    document.addEventListener("shopify:section:reorder", boot);
})();
