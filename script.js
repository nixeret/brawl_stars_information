document.addEventListener("DOMContentLoaded", function() {
    const risultato = document.getElementById("risultato");

    // Variabile per tenere traccia del menu selezionato
    let currentQuery = 'brawl stars';

    // Funzione per caricare le notizie
    function loadNews(query) {
        fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=b338bdc2f19b4f1980c6dcb2277d90e6`)
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

    // Funzione per aggiornare il contenuto basato sul menu attivo
    function updateContent() {
        loadNews(currentQuery);
    }

    // Eventi per i pulsanti del menu
    document.getElementById('notizie').addEventListener('click', function() {
        currentQuery = 'brawl stars';
        updateContent();
    });

    document.getElementById('nuovi-brawler').addEventListener('click', function() {
        currentQuery = 'nuovi brawler brawl stars';
        updateContent();
    });

    document.getElementById('brawl-talk').addEventListener('click', function() {
        currentQuery = 'brawl talk';
        updateContent();
    });

    // Carica le notizie di default
    updateContent();

    // Esegui un aggiornamento delle notizie ogni 5 minuti
    setInterval(updateContent, 600000);
});
