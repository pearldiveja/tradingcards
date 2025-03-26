// Initialize the guide
document.addEventListener('DOMContentLoaded', function() {
    // Hide all steps except the first one
    document.querySelectorAll('.step:not(#main-menu)').forEach(step => {
        step.classList.add('hidden');
    });
});

// Function to show a specific step
function showStep(stepId) {
    // Hide all steps
    document.querySelectorAll('.step').forEach(step => {
        step.classList.add('hidden');
    });
    
    // Show the selected step
    document.getElementById(stepId).classList.remove('hidden');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Function to search for a Pokémon card
function searchPokemonCard() {
    const pokemonName = document.getElementById('pokemon-name').value;
    const setName = document.getElementById('set-name').value;
    const cardNumber = document.getElementById('card-number').value;
    
    if (!pokemonName) {
        alert('Please enter at least the Pokémon name');
        return;
    }
    
    // Show loading state
    const resultsDiv = document.getElementById('search-results');
    resultsDiv.innerHTML = '<p>Searching for card data...</p>';
    resultsDiv.classList.remove('hidden');
    
    // Call the API function from api-integration.js
    fetchPokemonCard(pokemonName, setName, cardNumber)
        .then(displayCardResults)
        .catch(error => {
            resultsDiv.innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

// Function to display card search results
function displayCardResults(cardData) {
    const resultsDiv = document.getElementById('search-results');
    
    if (!cardData || cardData.length === 0) {
        resultsDiv.innerHTML = '<p>No cards found. Try adjusting your search terms.</p>';
        return;
    }
    
    // Display the first card (or multiple cards if needed)
    let html = '<div class="card-results">';
    
    cardData.forEach(card => {
        html += `
            <div class="card-result">
                <div class="card-image">
                    <img src="${card.images.small}" alt="${card.name}">
                </div>
                <div class="card-info">
                    <h3>${card.name}</h3>
                    <p><strong>Set:</strong> ${card.set.name}</p>
                    <p><strong>Number:</strong> ${card.number}/${card.set.printedTotal}</p>
                    <p><strong>Rarity:</strong> ${card.rarity || 'Not specified'}</p>
                    <p><strong>Release Date:</strong> ${card.set.releaseDate || 'Unknown'}</p>
                    <p><strong>Estimated Value:</strong> <span id="card-value-${card.id}">Checking market data...</span></p>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    resultsDiv.innerHTML = html;
    
    // Estimate value for each card
    cardData.forEach(card => {
        setTimeout(() => {
            const valueSpan = document.getElementById(`card-value-${card.id}`);
            if (valueSpan) {
                const isHolo = card.name.includes('Holo') || 
                               card.rarity?.includes('Holo') || 
                               card.rarity?.includes('Rare Holo');
                const isRare = card.rarity?.includes('Rare');
                const isVintage = new Date(card.set.releaseDate) < new Date('2003-01-01');
                const isUltraRare = card.rarity?.includes('Ultra Rare') || 
                                   card.rarity?.includes('Secret') || 
                                   card.supertype === 'Pokémon V' ||
                                   card.supertype === 'Pokémon VMAX';
                
                // Estimate value based on card attributes
                if (isVintage && isHolo && card.name.includes('Charizard')) {
                    valueSpan.textContent = '$500-$5,000+ (depending on condition)';
                } else if (isVintage && isHolo && (card.name.includes('Blastoise') || card.name.includes('Venusaur'))) {
                    valueSpan.textContent = '$100-$1,000+ (depending on condition)';
                } else if (isVintage && isHolo) {
                    valueSpan.textContent = '$20-$200+ (depending on condition)';
                } else if (isVintage && isRare) {
                    valueSpan.textContent = '$5-$30 (depending on condition)';
                } else if (isUltraRare) {
                    valueSpan.textContent = '$10-$100+ (depending on popularity)';
                } else if (isHolo || isRare) {
