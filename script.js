document.addEventListener("DOMContentLoaded", function () {
    let currentQuery = "brawl+stars"; // Query iniziale predefinita
    let autoUpdateInterval; // Variabile per gestire l'intervallo di aggiornamento

    // Funzione per caricare le notizie
    function loadNews(query) {
        currentQuery = query; // Aggiorna la query corrente
        const risultato = document.getElementById("risultato");
        risultato.innerHTML = '<p>Caricamento in corso...</p>'; // Mostra un messaggio di caricamento

        // Costruzione dell'URL dinamico
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=5509419701b44f1faeb40e221bd8f1b8`;

        fetch(apiUrl)
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
                    risultato.innerHTML = '<p>Nessuna notizia trovata.</p>';
                }
            })
            .catch(error => {
                risultato.innerHTML = '<p>Si è verificato un errore nel caricamento delle notizie.</p>';
                console.error(error);
            });
    }

    // Funzione per avviare l'aggiornamento automatico
    function startAutoUpdate() {
        clearInterval(autoUpdateInterval); // Cancella l'intervallo precedente (se esiste)
        autoUpdateInterval = setInterval(() => {
            loadNews(currentQuery); // Carica le notizie per la query corrente
        }, 300000); // Aggiorna ogni 5 minuti
    }

    // Event listeners per i pulsanti del menu
    document.getElementById("notizie-btn").addEventListener("click", function () {
        loadNews("brawl+stars");
        startAutoUpdate(); // Riavvia l'intervallo di aggiornamento
    });

    document.getElementById("brawler-btn").addEventListener("click", function () {
        loadNews("brawl+stars+new+brawler");
        startAutoUpdate(); // Riavvia l'intervallo di aggiornamento
    });

    document.getElementById("brawltalk-btn").addEventListener("click", function () {
        loadNews("brawl+stars+brawl+talk");
        startAutoUpdate(); // Riavvia l'intervallo di aggiornamento
    });

    // Carica le notizie iniziali al caricamento della pagina
    loadNews(currentQuery);
    startAutoUpdate(); // Avvia l'intervallo di aggiornamento
});
