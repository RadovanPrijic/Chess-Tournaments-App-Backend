function init() {

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            first_name: document.getElementById('first_name').value,
            last_name: document.getElementById('last_name').value,
            birth_date: document.getElementById('birth_date').value,
            country_of_residence: document.getElementById('country').value,
            elo_rating: document.getElementById('elo_rating').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            admin: document.getElementById('admin').value,
            moderator: document.getElementById('moderator').value,
            player: document.getElementById('player').value,
        };

        fetch('http://127.0.0.1:6000/register', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                document.cookie = `token=${el.token};SameSite=Lax`;
                window.location.href = 'homepage.html';
            });
    });
}