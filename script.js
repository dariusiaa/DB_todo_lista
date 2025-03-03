document.getElementById('TODO-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let tytul = document.getElementById('tytul-zad').value;
    let typ = document.getElementById('typ-zadania').value;

    // Wysłanie danych do backendu PHP za pomocą AJAX
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "add_task.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Jeśli odpowiedź jest pozytywna, dodaj zadanie do odpowiedniej listy na stronie
            if (xhr.responseText === "Zadanie dodane pomyślnie!") {
                let listaId = typ === 'Praca' ? 'lista-praca' : typ === 'Dom' ? 'lista-dom' : 'lista-inne';
                let listaZadan = document.getElementById(listaId);
                
                let li = document.createElement('li');
                li.innerHTML = `${tytul} <button class="delete-btn">Usuń</button>`;
                
                li.querySelector('.delete-btn').addEventListener('click', function() {
                    li.remove();
                });
                
                listaZadan.appendChild(li);
                document.getElementById('tytul-zad').value = '';
            } else {
                alert("Wystąpił problem z dodaniem zadania.");
            }
        }
    };
    xhr.send("tytul=" + encodeURIComponent(tytul) + "&typ=" + encodeURIComponent(typ));
});

// Pobieranie zadań z bazy danych (opcjonalnie)
window.onload = function() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "get_tasks.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let tasks = JSON.parse(xhr.responseText);
            tasks.forEach(task => {
                let listaId = task.typ === 'Praca' ? 'lista-praca' : task.typ === 'Dom' ? 'lista-dom' : 'lista-inne';
                let listaZadan = document.getElementById(listaId);
                
                let li = document.createElement('li');
                li.innerHTML = `${task.tytul} <button class="delete-btn">Usuń</button>`;
                
                li.querySelector('.delete-btn').addEventListener('click', function() {
                    li.remove();
                });
                
                listaZadan.appendChild(li);
            });
        }
    };
    xhr.send();
};
