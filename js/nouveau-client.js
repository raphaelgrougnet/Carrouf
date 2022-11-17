/**
 * 
 */

"use strict";

/* global regexCourriel */

const regexCell = /^\d{3}-\d{4}$/;
const regexNom = /\D{3,50}/;

let champNomNouveau = null;
let champAdresseNouveau = null;
let champCourrielNouveau = null;
let champCellNouveauClient = null;
let divErreurNom = null;

/**
 * Validation du nom du nouveau client est 
 */
function validationNomNouveauClient(){

    champNomNouveau.value = champNomNouveau.value.trim();

    if(!regexNom.test(champNomNouveau.value)){
        champNomNouveau.classList.add("is-invalid");
        champNomNouveau.classList.remove("is-valid");
    }


}

/**
 * Fonction qui gère le click du bouton pour ajouter un nouveau client
 * @param {Event} e un événement pour un click
 */
function gererClickAjouterClient(e){
    let nomNouveauClient = document.getElementById("nom-nouveau-client");
    let adresseNouveauClient = document.getElementById("adresse-nouveau-client");
    let courrielNouveauClient = document.getElementById("courriel-nouveau-client");
    let cellNouveauClient = document.getElementById("cell-nouveau-client");

}

/**
 * Fonction qui s'execute au lancement de la page
 */
function initialisation(){
    champNomNouveau = document.getElementById("nom-nouveau-client");

    champNomNouveau.addEventListener('change', validationNomNouveauClient, false);
}

window.addEventListener("DOMContentLoaded", initialisation, false);