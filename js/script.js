"use strict";

const btnAjouterArticle = document.getElementById("btnAjouter");
let cpt = 1;

/**
 * Fonction qui ajoute un article a la page
 */
function gererClicAjouterArticle(){
    let divCommande = document.getElementById("commande");
    let divPrincipale = document.createElement("div");
    divPrincipale.classList = "row bg-primary rounded mb-2";

    ///     ID


    let divId = document.createElement("div");
    let labelId = document.createElement("label");
    let inputId = document.createElement("input");
    let contenuId = document.createTextNode("Id");
    divId.classList = "m-3 col-md-2";
    labelId.classList = "form-label";
    labelId.for = "idProduit"+cpt;
    labelId.appendChild(contenuId);


    inputId.classList = "form-control";
    inputId.type = "text";
    inputId.id = "idProduit"+cpt;
    inputId.name = "idProduit"+cpt;
    inputId.placeholder = "Id";
    
    divId.appendChild(labelId);
    divId.appendChild(inputId);
    divPrincipale.appendChild(divId);
    
    ///     NOM

    let divNom = document.createElement("div");
    let labelNom = document.createElement("label");
    let inputNom = document.createElement("input");
    let contenuNom = document.createTextNode("Nom de l'article");
    divNom.classList = "m-3 col-md-2";
    labelNom.classList = "form-label";
    labelNom.for = "idProduit"+cpt;
    labelNom.appendChild(contenuNom);


    inputNom.classList = "form-control";
    inputNom.type = "text";
    inputNom.id = "nomProduit"+cpt;
    inputNom.name = "nomProduit"+cpt;
    inputNom.placeholder = "Nom du produit";
    inputNom.readOnly = true;
    
    divNom.appendChild(labelNom);
    divNom.appendChild(inputNom);
    divPrincipale.appendChild(divNom);


    ///     QUANTITE

    
    let divQte = document.createElement("div");
    let labelQte = document.createElement("label");
    let inputQte = document.createElement("input");
    let contenuQte = document.createTextNode("Quantité");
    divQte.classList = "m-3 col-md-2";
    labelQte.classList = "form-label";
    labelQte.for = "qteProduit"+cpt;
    labelQte.appendChild(contenuQte);


    inputQte.classList = "form-control";
    inputQte.type = "text";
    inputQte.id = "qteProduit"+cpt;
    inputQte.name = "qteProduit"+cpt;
    inputQte.placeholder = "Quantité";
    
    divQte.appendChild(labelQte);
    divQte.appendChild(inputQte);
    divPrincipale.appendChild(divQte);




    ///     QUANTITE

    

    let divPrixU = document.createElement("div");
    let labelPrixU = document.createElement("label");
    let inputPrixU = document.createElement("input");
    let contenuPrixU = document.createTextNode("Prix unitaire");
    divPrixU.classList = "m-3 col-md-2";
    labelPrixU.classList = "form-label";
    labelPrixU.for = "prixUProduit"+cpt;
    labelPrixU.appendChild(contenuPrixU);


    inputPrixU.classList = "form-control";
    inputPrixU.type = "text";
    inputPrixU.id = "prixUProduit"+cpt;
    inputPrixU.name = "prixUProduit"+cpt;
    inputPrixU.placeholder = "Prix unitaire";
    inputPrixU.readOnly = true;
    
    divPrixU.appendChild(labelPrixU);
    divPrixU.appendChild(inputPrixU);
    divPrincipale.appendChild(divPrixU);







    let divPrixT = document.createElement("div");
    let labelPrixT = document.createElement("label");
    let inputPrixT = document.createElement("input");
    let contenuPrixT = document.createTextNode("Prix total");
    divPrixT.classList = "m-3 col-md-2";
    labelPrixT.classList = "form-label";
    labelPrixT.for = "prixTProduit"+cpt;
    labelPrixT.appendChild(contenuPrixT);


    inputPrixT.classList = "form-control";
    inputPrixT.type = "text";
    inputPrixT.id = "prixTProduit"+cpt;
    inputPrixT.name = "prixTProduit"+cpt;
    inputPrixT.placeholder = "Prix total";
    inputPrixT.readOnly = true;
    
    divPrixT.appendChild(labelPrixT);
    divPrixT.appendChild(inputPrixT);
    divPrincipale.appendChild(divPrixT);

    divCommande.appendChild(divPrincipale);
    cpt++;
}


/**
 * Fonction qui s'execute au lancement de la page
 */
function initialisation(){

    btnAjouterArticle.addEventListener("click",gererClicAjouterArticle,false);
}


window.addEventListener("DOMContentLoaded", initialisation, false);