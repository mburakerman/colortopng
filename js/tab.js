const tab = document.querySelectorAll(".tab");

for (let i = 0; i < tab.length; i++) {
    tab[i].addEventListener("click", function() {
        document.querySelector(".tab.active").classList.remove("active");
        this.classList.toggle("active");

        if (solidTab.classList.contains("active")) {
            generatorBodySolid.style.display = "block";
            generatorBodyGradient.style.display = "none";
        } else {
            generatorBodySolid.style.display = "none";
            generatorBodyGradient.style.display = "block";
            update();
        }
    }, false);
}
