// Initialize the guide
document.addEventListener('DOMContentLoaded', function() {
    // Hide all steps except the first one
    document.querySelectorAll('.step:not(#step1)').forEach(step => {
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
}

// Function to go back to the main menu
function goToMainMenu() {
    showStep('step1');
}
