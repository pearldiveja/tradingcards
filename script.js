// Ensure DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Hide all steps except the main menu
    document.querySelectorAll('.step').forEach(step => {
        if (step.id !== 'main-menu') {
            step.classList.add('hidden');
        } else {
            step.classList.remove('hidden');
        }
    });
});

// Function to show a specific step
function showStep(stepId) {
    console.log(`Attempting to show step: ${stepId}`); // Debugging log

    // Hide all steps
    document.querySelectorAll('.step').forEach(step => {
        step.classList.add('hidden');
    });

    // Show the target step
    const targetStep = document.getElementById(stepId);
    if (targetStep) {
        targetStep.classList.remove('hidden');
        console.log(`Successfully displayed step: ${stepId}`); // Debugging log
    } else {
        console.error(`Step not found: ${stepId}`); // Debugging log
    }
}
