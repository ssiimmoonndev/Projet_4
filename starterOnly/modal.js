function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const form = document.querySelector("form");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
closeBtn.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// Form validation
function validate() {
  let isValid = true;
  
  // Get form elements
  const firstName = document.getElementById("first");
  const lastName = document.getElementById("last");
  const email = document.getElementById("email");
  const birthdate = document.getElementById("birthdate");
  const quantity = document.getElementById("quantity");
  const locations = document.querySelectorAll('input[name="location"]');
  const terms = document.getElementById("checkbox1");
  
  // Clear previous error messages
  clearErrors();
  
  // Validate first name (min 2 characters, not empty)
  if (firstName.value.trim().length < 2) {
    displayError(firstName, "Le prénom doit contenir au moins 2 caractères.");
    isValid = false;
  }
  
  // Validate last name (min 2 characters, not empty)
  if (lastName.value.trim().length < 2) {
    displayError(lastName, "Le nom doit contenir au moins 2 caractères.");
    isValid = false;
  }
  
  // Validate email (format)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    displayError(email, "Veuillez entrer une adresse email valide.");
    isValid = false;
  }
  
  // Validate birthdate (not empty)
  if (birthdate.value === "") {
    displayError(birthdate, "Veuillez entrer votre date de naissance.");
    isValid = false;
  }
  
  // Validate quantity (numeric value)
  if (quantity.value === "" || isNaN(quantity.value)) {
    displayError(quantity, "Veuillez entrer un nombre valide.");
    isValid = false;
  }
  
  // Validate location (one radio button selected)
  let locationSelected = false;
  locations.forEach((location) => {
    if (location.checked) {
      locationSelected = true;
    }
  });
  if (!locationSelected) {
    const radioContainer = document.querySelector('.formData:nth-of-type(6)');
    radioContainer.setAttribute('data-error', "Vous devez choisir une option.");
    radioContainer.setAttribute('data-error-visible', "true");
    isValid = false;
  }
  
  // Validate terms (checkbox checked)
  if (!terms.checked) {
    const termsContainer = document.querySelector('.formData:nth-of-type(7)');
    termsContainer.setAttribute('data-error', "Vous devez vérifier que vous acceptez les termes et conditions.");
    termsContainer.setAttribute('data-error-visible', "true");
    isValid = false;
  }
  
  return isValid;
}

// Helper function to display error messages
function displayError(element, message) {
  const parent = element.closest('.formData');
  parent.setAttribute('data-error', message);
  parent.setAttribute('data-error-visible', "true");
}

// Helper function to clear all error messages
function clearErrors() {
  const errorElements = document.querySelectorAll('.formData');
  errorElements.forEach((element) => {
    element.removeAttribute('data-error-visible');
    element.removeAttribute('data-error');
  });
}

// Add form submit event listener
form.addEventListener("submit", function(event) {
  if (!validate()) {
    event.preventDefault(); // Prevent form submission if validation fails
    console.log(event)
  }
});

// Affiche le message de confirmation
function showConfirmation() {
  document.querySelector(".modal-body form").style.display = "none";
  document.getElementById("confirmationMessage").style.display = "block";
}

// Ferme le message de confirmation
function closeConfirmation() {
  document.getElementById("confirmationMessage").style.display = "none"; // Cache le message
  document.querySelector(".modal-body form").style.display = "block"; // Réaffiche le formulaire
  modalbg.style.display = "none"; // Ferme la modale
}

// Modifie la fonction de validation pour afficher le message
document.querySelector("form[name='reserve']").addEventListener("submit", function(event) {
  if (!validate()) {
    event.preventDefault(); // Empêche l'envoi si le formulaire est invalide
  } else {
    event.preventDefault(); // Empêche la soumission réelle pour la démonstration
    showConfirmation(); // Affiche le message
  }
});