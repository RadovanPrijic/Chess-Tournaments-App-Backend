const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function getAllResults(){
    fetch('http://127.0.0.1:5000/admin/results', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
            .then( data => {
                document.getElementById("resLst").innerHTML = "";
                const lst = document.getElementById('resLst');
                
                if(data.msg){
                    alert(data.msg);
                } else {
                    data.forEach( el => {
                        lst.innerHTML += `<li>ID: ${el.id}, Korisnički ID: ${el.userId}, ID turnira: ${el.tournamentId},  
                            Osvojeno mesto: ${el.ranking}, Nagrada (u dolarima): ${el.prize}, 
                                Država koju reprezentuje: ${el.country_represented}, 
                                    Promena ELO rejtinga: ${el.elo_change}, Trener: ${el.coach}</li>`;
                    });
                } 
        });
}

function getResultById(){
    const id = document.getElementById('resId').value;

    fetch('http://127.0.0.1:5000/admin/results/' + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
            .then( data => {
                document.getElementById("resLst").innerHTML = "";
                document.getElementById('resId').value = "";
                const lst = document.getElementById('resLst');
                
                if(data.msg){
                    alert(data.msg);
                } else {
                    lst.innerHTML += `<li>ID: ${data.id}, Korisnički ID: ${data.userId}, ID turnira: ${data.tournamentId},  
                        Osvojeno mesto: ${data.ranking}, Nagrada (u dolarima): ${data.prize}, 
                            Država koju reprezentuje: ${data.country_represented}, 
                                Promena ELO rejtinga: ${data.elo_change}, Trener: ${data.coach}</li>`;
                } 
        });
}

function initPostResult(){

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            userId: document.getElementById('userId').value,
            tournamentId: document.getElementById('trnmtId').value,
            ranking: document.getElementById('ranking').value,
            prize: document.getElementById('prize').value,
            country_represented: document.getElementById('country').value,
            elo_change: document.getElementById('elo_change').value,
            coach: document.getElementById('coach').value,
        };

        document.getElementById('resLst').innerHTML = "";
        document.getElementById('userId').value = "";
        document.getElementById('trnmtId').value = "";
        document.getElementById('ranking').value = "";
        document.getElementById('prize').value = "";
        document.getElementById('country').value = "";
        document.getElementById('elo_change').value = "";
        document.getElementById('coach').value = "";

        fetch('http://127.0.0.1:5000/admin/results', {
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
                    document.getElementById('resLst').innerHTML += `<li>ID: ${el.id}, Korisnički ID: ${el.userId}, 
                        ID turnira: ${el.tournamentId}, Osvojeno mesto: ${el.ranking}, 
                            Nagrada (u dolarima): ${el.prize}, Država koju reprezentuje: ${el.country_represented}, 
                                Promena ELO rejtinga: ${el.elo_change}, Trener: ${el.coach}</li>`;
                }
            });
    });   
}

function initUpdateResult(){

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const id = document.getElementById('resId').value;

        const data = {
            userId: document.getElementById('userId').value,
            tournamentId: document.getElementById('trnmtId').value,
            ranking: document.getElementById('ranking').value,
            prize: document.getElementById('prize').value,
            country_represented: document.getElementById('country').value,
            elo_change: document.getElementById('elo_change').value,
            coach: document.getElementById('coach').value,
        };

        document.getElementById('resLst').innerHTML = "";
        document.getElementById('resId').value = "",
        document.getElementById('userId').value = "";
        document.getElementById('trnmtId').value = "";
        document.getElementById('ranking').value = "";
        document.getElementById('prize').value = "";
        document.getElementById('country').value = "";
        document.getElementById('elo_change').value = "";
        document.getElementById('coach').value = "";

        fetch('http://127.0.0.1:5000/admin/results/' + id, {
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
                    document.getElementById('resLst').innerHTML += `<li>ID: ${el.id}, Korisnički ID: ${el.userId}, 
                        ID turnira: ${el.tournamentId}, Osvojeno mesto: ${el.ranking}, 
                            Nagrada (u dolarima): ${el.prize}, Država koju reprezentuje: ${el.country_represented}, 
                                Promena ELO rejtinga: ${el.elo_change}, Trener: ${el.coach}</li>`;
                }
            });
    });   
}

function deleteResult(){
    const id = document.getElementById('resId').value;

    fetch('http://127.0.0.1:5000/admin/results/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
            .then( data => {
                document.getElementById("resLst").innerHTML = "";
                document.getElementById('resId').value = "";
                const lst = document.getElementById('resLst');
                
                if(data.msg){
                    alert(data.msg);
                } else {
                    lst.innerHTML += `<li>ID: ${data.id}, Korisnički ID: ${data.userId}, ID turnira: ${data.tournamentId},  
                        Osvojeno mesto: ${data.ranking}, Nagrada (u dolarima): ${data.prize}, 
                            Država koju reprezentuje: ${data.country_represented}, 
                                Promena ELO rejtinga: ${data.elo_change}, Trener: ${data.coach}</li>`;
                }  
        });
}