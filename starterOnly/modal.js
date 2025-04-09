function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground"); // Séléctionne l'élément background de la modale
const modalBtns = document.querySelectorAll(".modal-btn"); // Séléctionne l'élément bouton qui ouvre de la modale
const formData = document.querySelectorAll(".formData"); // Séléctionne les éléments qui contiennent les données
const closeBtn = document.querySelector(".close"); // Séléctionne le bouton qui ferme la modale
const form = document.querySelector(".form"); // Séléctionne le formulaire

// launch modal event
  modalBtns.forEach(btn => { // Parcourt chaque élément "btn"
    btn.addEventListener("click", launchModal);
}); // Ajoute un écouteur d'évènement 'click' à chaque bouton d'ouverture de la modale

// launch modal form
function launchModal() {
  modalbg.style.display = "block"; // Change la propriété d'affichage pour rendre la modale visible
}

// close modal event
closeBtn.addEventListener("click", closeModal); // Ajoute un écouteur d'évènement 'click' au bouton de fermeture de la modale

// close modal form
function closeModal() {
  modalbg.style.display = "none"; // Change la propriété d'affichage pour cacher la modale
}

// form elements
const prenom = document.getElementById("first"); // Champ prénom
const nom = document.getElementById("last"); // Champ nom
const mail = document.getElementById("email"); // Champ mail
const date = document.getElementById("birthdate"); // Champ date de naissance
const participation = document.getElementById("quantity"); // Champ quantité de participations aux tournois
const localisation = document.querySelectorAll("radio"); // Bouton radio de localisation
const terms = document.querySelectorAll("checkbox1"); // Case à cocher pour les conditions

// Fonction pour afficher des messages d'erreur de validation de formulaire
const displayError = (field, message) => {
  const formData = field.closest('.formData'); // Recherche l'élément parent le plus proche qui a la classe CSS '.formData' par rapport à l'élément 'field' qui a été passé en paramètre à la fonction.
  const existingError = formData.querySelector('.error-message'); // Recherche s'il existe déjà un message d'erreur précédent dans l'élément parent
  if (existingError) {
    existingError.remove(); // Si un message d'erreur existait déjà, le supprimer pour éviter les doublons
  }
  const newError = document.createElement('div'); // Crée un nouvel élément HTML (div) pour afficher le message d'erreur
  newError.className = 'error-message'; // Ajoute une classe CSS 'error-message' au nouvel élément pour le styliser
  newError.textContent = message; // Définit le texte du message d'erreur passé en paramêtre à la fonction
  formData.appendChild(newError); // Ajoute le nouveau message d'erreur comme enfant de l'élément parent du champ de formulaire. Cela va afficher le message d'erreur àcôté du champ concerné
}

function validate() {
  let isValid = true; // Initialise une variable qui indique si le formulaire est valide
  
  // Prenom
  const nameRegex = /^([a-zA-ZÀ-ÖØ-öø-ÿ]{2,})$/; // Création d'une regex pour vérifier que le prénom contient uniquement des lettres en majuscules et minuscules et a une longueur minimale de 2 caractères
  if (!nameRegex.test(prenom.value)) { // Vérifie si le prénom ne correspond pas à la regex
    displayError(prenom, "Le prénom doit contenir au moins 2 caractères"); // Affcihe ce message d'erreur si la validation échoue
    isValid = false; // Marque le formulaire comme invalide
  }

  // Nom
  if (!nameRegex.test(nom.value)) { // Regex identique àcelle du prénom
    displayError(nom, "Le nom doit contenir au moins 2 caractères"); // Affcihe ce message d'erreur si la validation échoue
    isValid = false; // Marque le formulaire comme invalide
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex qui vérifie le format d'une adresse mail
  if (!emailRegex.test(mail.value)) { // Vérifie si l'email ne correspond pas au format attendu
    displayError(mail, "Veuillez entrer une adresse mail valide"); // Affiche ce message d'erreur si la validation échoue
    isValid = false;  // Marque le formulaire comme invalide
  }

  // Participation
  if (participation.value === "" || isNaN(participation.value)) { // Vérifie si le champ est vide ou n'est pas un nombre
    displayError(participation, "Veuillez entrer un nombre valide"); // Affcihe ce message d'erreur si la validation échoue
    isValid = false;  // Marque le formulaire comme invalide
  }

  // Date
  if (date.value === "") { // Vérifie si aucune date n'a étén sélectionnée
    displayError(date, "Veuillez entrer votre date de naissance"); // Affcihe ce message d'erreur si aucune date n'est renseignée
    isValid = false;  // Marque le formulaire comme invalide
  }

  // Localisation
  const locations = document.querySelectorAll('input[name="location"]'); // Sélectionne tous les boutons radio de localisation
  let locationSelected = false; // Variable pour suivre si une localisation est sélectionnée
  locations.forEach((location) => { // Parcourt tous les boutons radio
    if (location.checked) { // Vérifie si l'un d'eux est coché
      locationSelected = true; // Marque comme sélectionné si l'un d'eux est coché
    }
  });
  if (!locationSelected) { // Si aucune localisation n'est sélectionnée
    displayError(locations[0], "Veuillez sélectionner une option"); // Affiche ce message d'erreur
    isValid = false; // Marque le formulaire comme invalide
  }

  // Conditions générales
  const terms = document.getElementById('checkbox1'); // Récupère la case à cocher des conditions
  if (!terms.checked) { // Vérifie si les conditions ne sont pas acceptées
    displayError(terms, "Vous devez accepter les termes et conditions."); // Affiche ce message d'erreur 
    isValid = false; // Marque le formulaire comme invalide
  }

  // Sélection du bouton radio
  let localisationSelected = false; // Initialise une variable pour suivre si une localisation est sélectionnée
  locations.forEach((location) => { // Parcourt tous les boutons radio
    if (location.checked) { // Vérifie si l'un d'eux est coché
      localisationSelected = true; // Marque qu'une localisation est sélectionnée
    }
  });

  if (localisationSelected === false) { // Si aucune localisation n'est sélectionnée
    isValid = false // Marque le formulaire comme invalide
  }

  // Ici, ça veut dire que le formulaire est bon, donc gérer le message de confirmation avec son apparition et sa disparition
  if (isValid === true) { // Si toutes les validations sont ok
    showConfirmation(); // Affiche le message de confirmation
    return true // Retourne true pour indiquer que le formulaire est valide
  }

  return isValid; // Retourne le statue de validation (true ou false)
}

function showConfirmation() { // Fonction pour afficher le message de confirmation
  document.querySelector(".modal-body form").style.display = "none"; // Cache le formulaire
  document.getElementById("confirmationMessage").style.display = "flex"; // Affiche le message de confirmation
}

function closeConfirmation() {
  // Cache le message de confirmation
  document.getElementById("confirmationMessage").style.display = "none";
  
  // Réinitialise le formulaire en utilisant la méthode reset()
  document.querySelector("form[name='reserve']").reset();
  
  // Supprime tous les messages d'erreur
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(message => message.remove());
  
  // Réaffiche le formulaire
  document.querySelector(".modal-body form").style.display ="block";
  
  // Ferme la modale
  modalbg.style.display = "none";
}

document.querySelector("form[name='reserve']").addEventListener("submit", function(event) { // Ajout d'un écouteur d'événement sur le formulaire lors de sa soumission
  if (!validate()) { // Vérifie la validation du formulaire
    event.preventDefault(); // Empêche l'envoi si le formulaire est invalide
  } else {
    event.preventDefault(); // Empêche la soumission réelle pour la démonstration
    showConfirmation(); // Affiche le message de confirmation
  }});