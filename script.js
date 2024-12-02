document.addEventListener("DOMContentLoaded", function() {
    // Funzione per caricare le notizie
    function loadNews() {
        const risultato = document.getElementById("risultato");

        fetch('https://newsapi.org/v2/everything?q=brawl+stars&apiKey=c3173d2e9f024a4a843ea629bbd87f8f')
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

    // Carica le notizie al caricamento della pagina
    loadNews();

    // Esegui un aggiornamento delle notizie ogni 5 minuti (300000 ms)
    setInterval(loadNews, 300000);
});
