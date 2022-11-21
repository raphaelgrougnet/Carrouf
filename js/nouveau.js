/**
 * Le script s'occupe de toute la logique de la page secondaire, evenements avec les bouttons,
 * Validation des formulaires etc...
 */

"use strict";

/* eslint-disable no-useless-escape */
const regexCourriel =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/* global clients */

/* global telephonesParCourriel */

const regexCell = /^\d{3}-\d{4}$/;
const regexNom = /\D{3,50}/;
const regexNombre = /\d/;

let champNomNouveau = null;
let champAdresseNouveau = null;
let champCourrielNouveau = null;
let divErreurCourriel = null;
let champCellNouveauClient = null;
let divErreurCell = null;


/**
 * Vérifie s'il y a un nombre dans la string
 * @param {string} string Un string 
 * @returns vrai si le string contient un nombre et faux s'il ne contient pas de nombre
 */
function contientUnNombre(string){
    return regexNombre.test(string);
}

/**
 * Vérifier s'il y a déjà se courriel
 * @param {string} string Un string
 * @returns vrai s'il existe sinon faux
 */
function contientCourriel(string){

    for(let cour in telephonesParCourriel){
        if(string === cour){
            return true;
        }
    }
    return false;
}

/**
 * Vérifie s'il y a déjà se numéro de téléphone
 * @param {string} string Un string
 * @returns vrai s'il existe sinon faux
 */
function contientClient(string){

    for(let num in clients){
        if(string === num){
            return true;
        }
    }
    return false;
}

/**
 * Validation du nom du nouveau client 
 */
function validationNomNouveauClient(){

    champNomNouveau.value = champNomNouveau.value.trim();
    

    if(!regexNom.test(champNomNouveau.value)){
        champNomNouveau.classList.add("is-invalid");
        champNomNouveau.classList.remove("is-valid");
    } else if(contientUnNombre(champNomNouveau.value)){
        champNomNouveau.classList.add("is-invalid");
        champNomNouveau.classList.remove("is-valid");
    }
    else{
        champNomNouveau.classList.add("is-valid");
        champNomNouveau.classList.remove("is-invalid");
    }
}

/**
 * Validation de l'adresse du nouveau client
 */
function validationAdresseNouveauClient(){

    champAdresseNouveau.value = champAdresseNouveau.value.trim();


    if(champAdresseNouveau.value.length < 3 || champAdresseNouveau.value.length > 200){
        champAdresseNouveau.classList.add("is-invalid");
        champAdresseNouveau.classList.remove("is-valid");
    }
    else{
        champAdresseNouveau.classList.add("is-valid");
        champAdresseNouveau.classList.remove("is-invalid");
    }

}
/**
 * Validation du courriel du nouveau client
 */
function validationCourrielNouveauClient(){

    champCourrielNouveau.value = champCourrielNouveau.value.trim();
    divErreurCourriel = document.getElementById("msg-courriel");

    let msgCourriel = "";

    if(!regexCourriel.test(champCourrielNouveau.value)){
        champCourrielNouveau.classList.add("is-invalid");
        champCourrielNouveau.classList.remove("is-valid");
        
        msgCourriel = "Vous devez saisir un courriel valide";

    } else if(contientCourriel(champCourrielNouveau.value)){
        champCourrielNouveau.classList.add("is-invalid");
        champCourrielNouveau.classList.remove("is-valid");

        msgCourriel = "Ce courriel existe déjà";

    }
    else{
        champCourrielNouveau.classList.add("is-valid");
        champCourrielNouveau.classList.remove("is-invalid");
    }

    if(divErreurCourriel.firstChild != null){
        divErreurCourriel.firstChild.remove();
    }

    divErreurCourriel.append(msgCourriel);
}

/**
 * 
 */
function validationCellNouveauClient(){

    champCellNouveauClient.value = champCellNouveauClient.value.trim();
    divErreurCell = document.getElementById("msg-cell");

    let msgCell = "";

    if(!regexCell.test(champCellNouveauClient.value)){
        champCellNouveauClient.classList.add("is-invalid");
        champCellNouveauClient.classList.remove("is-valid");
        
        msgCell = "Vous devez saisir un numéro de téléphone valide";

    } else if(contientClient(champCellNouveauClient.value)){
        champCellNouveauClient.classList.add("is-invalid");
        champCellNouveauClient.classList.remove("is-valid");
        
        msgCell = "Ce numéro de téléphone existe déjà";
        

    }
    else{
        champCellNouveauClient.classList.add("is-valid");
        champCellNouveauClient.classList.remove("is-invalid");
    }

    if(divErreurCell.firstChild != null){
        divErreurCell.firstChild.remove();
    }

    divErreurCell.append(msgCell);


}

/**
 * Fonction qui gère le click du bouton pour ajouter un nouveau client
 * @param {Event} e un événement pour un click
 */
function gererClickAjouterClient(e){
    let tousLesChampsSontValides = false;
    const divErreurSubmit = document.getElementById("msg-erreur-client");
    const p = document.createElement("p");
    const msgErreur = document.createTextNode("Vous devez remplir tous les champs correctement"); 
    
    if(champAdresseNouveau.classList.contains("is-valid") && champCellNouveauClient.classList.contains("is-valid") 
        && champCourrielNouveau.classList.contains("is-valid") && champNomNouveau.classList.contains("is-valid")){
            tousLesChampsSontValides = true;
        }

    if (!tousLesChampsSontValides) {
        e.preventDefault();
        if(divErreurSubmit.firstChild != null){
            divErreurSubmit.firstChild.remove();
        }
        p.append(msgErreur);
        p.style.color = "red";
        p.style.fontWeight = "bold";
        p.classList.add("m-0");
        divErreurSubmit.append(p);
    }

    

}



/**
 * Fonction qui s'execute au lancement de la page
 */
function initialisation(){
    champNomNouveau = document.getElementById("nom-nouveau-client");
    champAdresseNouveau = document.getElementById("adresse-nouveau-client");
    champCourrielNouveau = document.getElementById("courriel-nouveau-client");
    champCellNouveauClient = document.getElementById("cell-nouveau-client");



    champNomNouveau.addEventListener('change', validationNomNouveauClient, false);
    champAdresseNouveau.addEventListener('change', validationAdresseNouveauClient, false);
    champCourrielNouveau.addEventListener('change', validationCourrielNouveauClient, false);
    champCellNouveauClient.addEventListener('change', validationCellNouveauClient, false);
    document.getElementById("validation-nouveau-client").addEventListener('submit', gererClickAjouterClient, false);
}

window.addEventListener("DOMContentLoaded", initialisation, false);