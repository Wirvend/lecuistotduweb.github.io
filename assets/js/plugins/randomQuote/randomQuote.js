const quotes = [{
    "quote": "Avant de vouloir qu’un logiciel soit réutilisable, il faudrait d’abord qu’il ait été utilisable.",
    "author": " Ralph Johnson"
}, {
    "quote": "Il y aura deux sortes de personnes dans le monde, celles qui disent aux ordinateurs ce qu’elles doivent faire et celles qui sont informées par les ordinateurs.",
    "author": "Marc Andreesen"
}, {
    "quote": "On considère que les neuf dixièmes du code correspondent à environ 90% du temps de développement. Les 10% restant correspondent également à 90% du temps de développement .",
    "author": " Tom Cargill"
}, {
    "quote": "On considère que les neuf dixièmes du code correspondent à environ 90% du temps de développement. Les 10% restant correspondent également à 90% du temps de développement .",
    "author": "Tom Cargill"
}, {
    "quote": "Aujourd’hui, la programmation est devenue une course entre le développeur, qui s’efforce de produire de meilleures applications à l’épreuve des imbéciles et l’univers, qui s’efforce de produire de meilleurs imbéciles. Pour l’instant, l’univers a une bonne longueur d’avance .",
    "author": "Rich Cook"
}, {
    "quote": "Si debugger, c’est supprimer des bugs, alors programmer ne peut être que les ajouter",
    "author": "Edsger Dijkstra"
}, {
    "quote": "Un geek ne crie pas, il url.",
    "author": ""
}, {
    "quote": "Tu ne feras pas de mise en prod le vendredi.",
    "author": ""
}];

function randomQuote() {
    let getQuote = () => {
        let quoteRandom = quotes[Math.floor(Math.random() * quotes.length)];
        if (quoteRandom.author != "") {
            return `
                <div class="rq-quote">${quoteRandom.quote}</div>
                <div class="rq-author"> — ${quoteRandom.author}</div>
            `;
        } else {
            return `<div class="rq-quote">${quoteRandom.quote}</div>`;
        }
    }
    document.getElementById("citation").innerHTML = getQuote()
}

// 
setInterval(() => {
    randomQuote();
}, 3500);