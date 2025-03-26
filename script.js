document.addEventListener('DOMContentLoaded', function () {
    // Hide all steps except main menu on load
    document.querySelectorAll('.step').forEach(step => {
        if (step.id !== 'main-menu') {
            step.classList.add('hidden');
        } else {
            step.classList.remove('hidden');
        }
    });
});

function showStep(stepId) {
    console.log(`Attempting to show step: ${stepId}`); // Debug log

    // Hide all steps
    document.querySelectorAll('.step').forEach(step => {
        step.classList.add('hidden');
    });

    // Show target step
    const targetStep = document.getElementById(stepId);
    if (targetStep) {
        targetStep.classList.remove('hidden');
        console.log(`Successfully displayed step: ${stepId}`); // Debug log
    } else {
        console.error(`Step not found: ${stepId}`); // Debug log
    }
}

function searchPokemonCard() {
    const pokemonName = document.getElementById('pokemon-name').value;
    const setName = document.getElementById('set-name').value;
    const cardNumber = document.getElementById('card-number').value;

    if (!pokemonName) {
        alert("Please enter at least the Pokémon name.");
        return;
    }

    const resultsDiv = document.getElementById("search-results");
    resultsDiv.innerHTML = "<p>Searching...</p>";
    resultsDiv.classList.remove("hidden");

    fetchPokemonCard(pokemonName, setName, cardNumber)
        .then(cardData => displayCardResults(cardData))
        .catch(error => {
            resultsDiv.innerHTML = `<p>Error: ${error.message}</p>`;
            console.error(error);
        });
}

function displayCardResults(cardData) {
    const resultsDiv = document.getElementById("search-results");
    
    if (!cardData || cardData.length === 0) {
        resultsDiv.innerHTML = "<p>No cards found. Try adjusting your search terms.</p>";
        return;
    }

    let html = "<div>";
    
    cardData.forEach(card => {
        html += `
            <div style='margin-bottom:20px'>
                Name: ${card.name} | Rarity:${card.rarity}
            
            </div>`;
    
}
``
