const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    if (card.dataset.category == "foreign") 

        card.addEventListener("click", () => {
        window.location.href = `MovieOrSeries.html`;
        });
    else
        card.addEventListener("click", () => {

            const category = card.dataset.category;

            window.location.href = `category/index.html?cat=${category}`;

        });

});