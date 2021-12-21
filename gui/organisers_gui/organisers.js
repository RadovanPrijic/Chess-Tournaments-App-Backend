const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function getAllOrganisers(){
    fetch('http://127.0.0.1:5000/admin/organisers', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
            .then( data => {
                document.getElementById("orgLst").innerHTML = "";
                const lst = document.getElementById('orgLst');
                
                if(data.msg){
                    alert(data.msg);
                } else {
                    data.forEach( el => {
                        lst.innerHTML += `<li>ID: ${el.id}, Ime: ${el.name}, Datum osnivanja: ${el.formation_date},  
                            Precednik: ${el.president}, Država: ${el.country}, Vebsajt: ${el.website}</li>`;
                    });
                }
        });
}

function getOrganiserById(){
    const id = document.getElementById('orgId').value;

    fetch('http://127.0.0.1:5000/admin/organisers/' + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
            .then( data => {
                document.getElementById("orgLst").innerHTML = "";
                document.getElementById('orgId').value = "";
                const lst = document.getElementById('orgLst');
                
                if(data.msg){
                    alert(data.msg);
                } else {
                    lst.innerHTML += `<li>ID: ${data.id}, Ime: ${data.name}, Datum osnivanja: ${data.formation_date},  
                        Precednik: ${data.president}, Država: ${data.country}, Vebsajt: ${data.website}</li>`;
                }  
        });
}

function initPostOrganiser(){

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            name: document.getElementById('name').value,
            formation_date: document.getElementById('formation_date').value,
            president: document.getElementById('president').value,
            country: document.getElementById('country').value,
            website: document.getElementById('website').value,
        };

        document.getElementById('orgLst').innerHTML = "";
        document.getElementById('name').value = "";
        document.getElementById('formation_date').value = "";
        document.getElementById('president').value = "";
        document.getElementById('country').value = "";
        document.getElementById('website').value = "";

        fetch('http://127.0.0.1:5000/admin/organisers', {
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
                    document.getElementById('orgLst').innerHTML += `<li>ID: ${el.id}, Ime: ${el.name}, 
                        Datum osnivanja: ${el.formation_date}, Precednik: ${el.president}, Država: ${el.country}, 
                            Vebsajt: ${el.website}</li>`;
                }
            });
    });   
}

function initUpdateOrganiser(){

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const id = document.getElementById('orgId').value;

        const data = {
            name: document.getElementById('name').value,
            formation_date: document.getElementById('formation_date').value,
            president: document.getElementById('president').value,
            country: document.getElementById('country').value,
            website: document.getElementById('website').value,
        };

        document.getElementById('orgLst').innerHTML = "";
        document.getElementById('orgId').value = "";
        document.getElementById('name').value = "";
        document.getElementById('formation_date').value = "";
        document.getElementById('president').value = "";
        document.getElementById('country').value = "";
        document.getElementById('website').value = "";

        fetch('http://127.0.0.1:5000/admin/organisers/' + id, {
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
                    document.getElementById('orgLst').innerHTML += `<li>ID: ${el.id}, Ime: ${el.name}, 
                        Datum osnivanja: ${el.formation_date}, Precednik: ${el.president}, Država: ${el.country}, 
                            Vebsajt: ${el.website}</li>`;
                }
            });
    });   
}

function deleteOrganiser(){
    const id = document.getElementById('orgId').value;

    fetch('http://127.0.0.1:5000/admin/organisers/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
            .then( data => {
                document.getElementById("orgLst").innerHTML = "";
                document.getElementById('orgId').value = "";
                const lst = document.getElementById('orgLst');
                
                if(data.msg){
                    alert(data.msg);
                } else {
                    lst.innerHTML += `<li>ID: ${data.id}, Ime: ${data.name}, Datum osnivanja: ${data.formation_date},  
                    Precednik: ${data.president}, Država: ${data.country}, Vebsajt: ${data.website}</li>`;
                }  
        });
}