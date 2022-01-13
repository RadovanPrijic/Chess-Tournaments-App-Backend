const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function getAllTournaments(){
    fetch('http://127.0.0.1:8500/admin/tournaments', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
            .then( data => {
                document.getElementById("trnmtLst").innerHTML = "";
                const lst = document.getElementById('trnmtLst');
                
                if(data.msg){
                    alert(data.msg);
                } else {
                    data.forEach( el => {
                        lst.innerHTML += `<li>ID: ${el.id}, Ime: ${el.name}, Grad: ${el.city},  
                            Država: ${el.country}, Datum početka: ${el.start_date}, Datum završetka: ${el.end_date},
                                Format: ${el.format}, Organizatorov ID: ${el.organiserId}</li>`;
                    });
                }
        });
}

function getTournamentById(){
    const id = document.getElementById('trnmtId').value;

    fetch('http://127.0.0.1:8500/admin/tournaments/' + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
            .then( data => {
                document.getElementById("trnmtLst").innerHTML = "";
                document.getElementById('trnmtId').value = "";
                const lst = document.getElementById('trnmtLst');
                
                if(data.msg){
                    alert(data.msg);
                } else {
                    lst.innerHTML += `<li>ID: ${data.id}, Ime: ${data.name}, Grad: ${data.city},  
                        Država: ${data.country}, Datum početka: ${data.start_date}, Datum završetka: ${data.end_date},
                            Format: ${data.format}, Organizatorov ID: ${data.organiserId}</li>`;
                }
        });
}

function initPostTournament(){

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            name: document.getElementById('name').value,
            city: document.getElementById('city').value,
            country: document.getElementById('country').value,
            start_date: document.getElementById('start_date').value,
            end_date: document.getElementById('end_date').value,
            format: document.getElementById('format').value,
            organiserId: document.getElementById('organiserId').value,
        };

        document.getElementById('trnmtLst').innerHTML = "";
        document.getElementById('name').value;
        document.getElementById('city').value;
        document.getElementById('country').value;
        document.getElementById('start_date').value;
        document.getElementById('end_date').value;
        document.getElementById('format').value;
        document.getElementById('organiserId').value;

        fetch('http://127.0.0.1:8500/admin/tournaments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    document.getElementById('trnmtLst').innerHTML += `<li>ID: ${el.id}, Ime: ${el.name}, 
                        Grad: ${el.city}, Država: ${el.country}, Datum početka: ${el.start_date}, 
                            Datum završetka: ${el.end_date}, Format: ${el.format}, 
                                Organizatorov ID: ${el.organiserId}</li>`;
                }
            });
    });   
}

function initUpdateTournament(){

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const id = document.getElementById('trnmtId').value;

        const data = {
            name: document.getElementById('name').value,
            city: document.getElementById('city').value,
            country: document.getElementById('country').value,
            start_date: document.getElementById('start_date').value,
            end_date: document.getElementById('end_date').value,
            format: document.getElementById('format').value,
            organiserId: document.getElementById('organiserId').value,
        };

        document.getElementById('trnmtLst').innerHTML = "";
        document.getElementById('trnmtId').value = "";
        document.getElementById('name').value = "";
        document.getElementById('city').value = "";
        document.getElementById('country').value = "";
        document.getElementById('start_date').value = "";
        document.getElementById('end_date').value = "";
        document.getElementById('format').value = "";
        document.getElementById('organiserId').value = "";

        fetch('http://127.0.0.1:8500/admin/tournaments/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    document.getElementById('trnmtLst').innerHTML += `<li>ID: ${el.id}, Ime: ${el.name}, 
                        Grad: ${el.city}, Država: ${el.country}, Datum početka: ${el.start_date}, 
                            Datum završetka: ${el.end_date}, Format: ${el.format}, 
                                Organizatorov ID: ${el.organiserId}</li>`;
                }
            });
    });   
}

function deleteTournament(){
    const id = document.getElementById('trnmtId').value;

    fetch('http://127.0.0.1:8500/admin/tournaments/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
            .then( data => {
                document.getElementById("trnmtLst").innerHTML = "";
                document.getElementById('trnmtId').value = "";
                const lst = document.getElementById('trnmtLst');
                
                if(data.msg){
                    alert(data.msg);
                } else {
                    lst.innerHTML += `<li>ID: ${data.id}, Ime: ${data.name}, Grad: ${data.city},  
                        Država: ${data.country}, Datum početka: ${data.start_date}, Datum završetka: ${data.end_date},
                            Format: ${data.format}, Organizatorov ID: ${data.organiserId}</li>`;
                }
        });
}