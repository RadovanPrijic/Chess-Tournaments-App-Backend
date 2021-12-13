const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function getAllUsers(){
    fetch('http://127.0.0.1:5000/api/users', {mode: 'cors', 
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
            .then( data => {
                //TODO svaki put isprazniti listu kada se klikne na dugme
                const lst = document.getElementById('usrLst');
                
                data.forEach( el => {
                    lst.innerHTML += `<li>ID: ${el.id}, Ime: ${el.first_name}, Prezime: ${el.last_name}, 
                        Datum rodjenja: ${el.birth_date}, Prebivaliste: ${el.country_of_residence}, 
                            ELO: ${el.elo_rating}</li>`;
            });
        });
}

function getUserById(){

}

function postUser(){

}

function updateUser(){

}

function deleteUser(){

}