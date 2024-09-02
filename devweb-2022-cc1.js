/// Noubliez pas de mettre l'image pour addfuecoco dans le meme fichier que le fichier js 

"use strict";


const $startBtn = document.getElementById("start-btn");
const $guessBtn = document.getElementById("guess-btn");
const $cowBtn = document.getElementById("cow-btn");
const $output = document.getElementById("output");
const $numUsr = document.getElementById("num-usr");
const $maxUsr = document.getElementById("max-usr");

let secretNumber = 0;
let nbGuesses = 0;
let maxGuesses = 0;

function launchGame(_evt) {
  // on convertie avec parseint le nombre entrer dans la barre  en un int .
  const maxUserValue = parseInt($maxUsr.value, 10);

  // On génère un nombre aléatoire entre 1 et maxuservalue avec math.floor 
  secretNumber = Math.floor(Math.random() * maxUserValue) + 1;

  // Meme chose mais pour le nombre de tentatives
  maxGuesses = Math.floor(Math.random() * maxUserValue) + 1;

  // on mets le nombre de tentatives a 0
  nbGuesses = 0;

  // On affiche dans le output le message avec text.content les instructions .
  $output.textContent = "Deviner un nombre entre 1 et " + $maxUsr.value + ". Tu as " + maxGuesses + " Tentatives.";

  // On Active le bouton de soumission pour permettre au joueur de commencer à deviner
  $guessBtn.disabled = false;
}

/* fonction pour le jeu du trouve nombre  */ 
function guess() {
  //on convertie avec parseint le nombre entrer dans la barre  en un int .
  const guest_usr = parseInt($numUsr.value, 10);
  
  // On Incrémente le nombre de tentatives effectuées , ce qui veut dire qu'on augmente a chaque guest .
  nbGuesses += 1;

  // On Vérifie si l'utilisateur a deviné le nombre secret
  if (guest_usr === secretNumber) {
    // On Affiche un message de victoire avec le nombre de tentatives utilisées
    $output.textContent = "Bravo! tu as trouvé le chiffre en " + nbGuesses + " coups.";
    // Et On  Désactive le bouton de devinette car le jeu est terminé
    $guessBtn.disabled = true;

  // On Vérifie si l'utilisateur a épuisé toutes ses tentatives
  } else if (nbGuesses >= maxGuesses) {
    // On Affiche un message de défaite avec la valeur du nombre secret
    $output.textContent = "Désolé, tu as perdu. Tu as épuisé le nombre de tentatives, le nombre était " + secretNumber + ".";
    // Et On Désactive le bouton de devinette car le jeu est terminé
    $guessBtn.disabled = true;

  // On Vérifie si la valeur devinée est supérieure au nombre secret
  } else if (guest_usr > secretNumber) {
    // On Affiche un message indiquant que le nombre est trop élevé et le nombre de tentatives restantes
    $output.textContent = "Le chiffre/nombre est trop haut ! Il te reste " + (maxGuesses - nbGuesses) + " coups restants.";

  // On Vérifie si la valeur devinée est inférieure au nombre secret
  } else if (guest_usr < secretNumber) {
    // On Affiche un message indiquant que le nombre est trop bas et le nombre de tentatives restantes
    $output.textContent = "Le chiffre/nombre est trop bas ! Il te reste " + (maxGuesses - nbGuesses) + " coups restants.";
  }
}

// ON ajoute l'évènement pour pouvoir commencer le jeu de la recherche de nombre.
$startBtn.addEventListener("click", launchGame);

// On ajoute l'évènement pour pouvoir utiliser le boutton guess pour la vérification du nombre 
$guessBtn.addEventListener("click", guess);

// On Ajoute un événement pour soumettre la devinette lorsque l'utilisateur appuie sur la touche entrer
$numUsr.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    guess();
  }
});

/* fonction qui nous permet de pouvoir a chaque clic de faire apparaitre une image d'un fuecoco 
(j'ai changer comme ca , on aura pas que des vaches et au lieu de ca un pokemon) */ 
function addfuecoco(evt) {
  console.debug(evt.x, evt.y);
  
  // Crée une instance de l'élément vache 
  const image_fuecoco = document.createElement("img");
  // on mets comme source de img , le png en question ( pour le fuecoco , le png s'appelle 909)
  image_fuecoco.src = "909.png";  

  // On Ajoute une classe à l'image pour qu'elle soit facilement identifiable dans le CSS
  image_fuecoco.className = "vache";
  
  // On Positionne avec style.left et top  l'image à l'endroit du clic
  image_fuecoco.style.left = `${evt.x}px`;
  image_fuecoco.style.top = `${evt.y + window.scrollY - 25}px`; /// j'ai rajouter window scrolly pour ajuster a la position de ma souris 


  // Chaque image aura une rotation differente avec rotation 
  const rotation = Math.floor(Math.random() * 360);
  image_fuecoco.style.transform = `rotate(${rotation}deg)`;

  // Ajoute l'image au corps du document
  document.body.appendChild(image_fuecoco);
}

/* fonction pour activer ou desactiver le bouton pour faire apparaitre les fuecoco*/ 
function togglefuecoco(_evt) {
  ///On Vérifie si une fonction est déjà assignée à l'événement 'mousedown' du document
  if (document.onmousedown instanceof Function) {
    // Si oui, On désactive l'événement en le mettant à 'null'
    document.onmousedown = null;
  } else {
    // Sinon, On assigne la fonction 'addfuecoco' à l'événement 'mousedown'
    document.onmousedown = addfuecoco;
  }
}
// On Ajoute un événement pour basculer la fonctionnalité 'fuecoco' lorsque le bouton $cowBtn est cliqué
$cowBtn.addEventListener("click", togglefuecoco);

