document.addEventListener("DOMContentLoaded", function() {
    // Funzione per caricare le notizie
    function loadNews(query) {
        const risultato = document.getElementById("risultato");

        fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=5509419701b44f1faeb40e221bd8f1b8`)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok' && data.articles.length > 0) {
                    risultato.innerHTML = ''; // Pulisce il contenuto precedente

                    data.articles.forEach(article => {
                        const articleDiv = document.createElement('div');
                        articleDiv.classList.add('article');

                        const title = document.createElement('h3');
                        title.textContent = article.title;

                        const description = document.createElement('p');
                        description.textContent = article.description;

                        const link = document.createElement('a');
                        link.href = article.url;
                        link.textContent = 'Leggi di più';
                        link.target = '_blank';

                        articleDiv.appendChild(title);
                        articleDiv.appendChild(description);
                        articleDiv.appendChild(link);

                        risultato.appendChild(articleDiv);
                    });
                } else {
                    risultato.innerHTML = 'Nessuna notizia trovata.';
                }
            })
            .catch(error => {
                risultato.innerHTML = 'Si è verificato un errore nel caricamento delle notizie.';
                console.error(error);
            });
    }

    // Carica le notizie per default (Notizie)
    loadNews('brawl stars');

    // Ascolta i cambiamenti del menù e carica le notizie appropriate
    document.getElementById('notizie').addEventListener('click', function() {
        loadNews('brawl stars');
    });
    document.getElementById('nuovi-brawler').addEventListener('click', function() {
        loadNews('nuovi brawler brawl stars');
    });
    document.getElementById('brawl-talk').addEventListener('click', function() {
        loadNews('brawl talk');
    });

    // Esegui un aggiornamento delle notizie ogni 5 minuti (300000 ms)
    setInterval(function() {
        loadNews('brawl stars');
    }, 300000);
});
