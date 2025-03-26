// API key for Pokemon TCG API
const API_KEY = '6ea63cfa-a21d-4ac8-81cc-92556ea7410e';

// Function to fetch card data from Pokemon TCG API
async function fetchPokemonCard(name, setName, cardNumber) {
    let query = `name:"${name}"`;
    
    if (setName) {
        query += ` set.name:"${setName}"`;
    }
    
    if (cardNumber) {
        query += ` number:${cardNumber}`;
    }
    
    const url = `https://api.pokemontcg.io/v2/cards?q=${encodeURIComponent(query)}&orderBy=set.releaseDate`;
    
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'X-Api-Key': API_KEY
        }
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch card data');
    }
    
    const data = await response.json();
    return data.data; // Returns array of matching cards
}
