"use strict";

const btnAjouterArticle = document.getElementById("btnAjouter");
let btnSupprArticle = document.getElementById("btnSuppr0");
let inputQteArticle = document.getElementById("qteProduit0");
let cpt = 1;

let listArticles = document.getElementById("commande");




/**
 * Fonction qui supprime un article de la page
 * @param {Event} e Evenement du click
 */
 function gererClicSupprimerArticle(e){
    let nb = e.target.id.substring(8,e.target.id.length); ///e.target.id.substring(e.target.id.length,e.target.id.length-1);
    
    
    let divSuppr = document.getElementById("divPrincipale"+nb);
    
    //for(let i = 0; i < listArticles.length; i++){
    //    if(listArticles[i].id == divSuppr.id){
    //        listArticles.splice(i,1);
    //    }
    //}
    ///console.log(listArticles);
    //console.log("divPrincipale"+nb);
    //console.log(divSuppr);
    listArticles.removeChild(divSuppr);
    //divSuppr.remove();

}

/**
 * Fonction qui met a jour le prix total en fonction de la quantitée d'article
 * @param {Event} e Evenement
 */
function gererUpdatePrix(e){
    if(e.target.value > 0){
        let nbIdQte = e.target.id.substring(10,e.target.id.length);
        let inputUpdate = document.getElementById("prixTProduit"+nbIdQte);
        let inputPrixUGet = document.getElementById("prixUProduit"+nbIdQte);
        inputUpdate.value = parseFloat(e.target.value) * parseFloat(inputPrixUGet.value);
        
        e.target.classList.remove("is-invalid");
        e.target.classList.add("is-valid");
    }
    else if(isNaN(parseFloat(e.target.value))){
        e.target.classList.remove("is-valid");
        e.target.classList.add("is-invalid");
    }
}



/**
 * Fonction qui ajoute un article a la page
 */
function gererClicAjouterArticle(){
    let divCommande = document.getElementById("commande");
    let divPrincipale = document.createElement("div");
    divPrincipale.id = "divPrincipale"+cpt;
    divPrincipale.classList = "row bg-primary rounded mb-5 pt-3";

    ///     ID


    let divId = document.createElement("div");
    let labelId = document.createElement("label");
    let inputId = document.createElement("input");
    let contenuId = document.createTextNode("Id");
    divId.classList = "mb-3 col-lg-4 col-xl-1";
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
    divNom.classList = "mb-3 col-lg-4 col-xl-3";
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
    divQte.classList = "mb-3 col-lg-4 col-xl-2";
    labelQte.classList = "form-label";
    labelQte.for = "qteProduit"+cpt;
    labelQte.appendChild(contenuQte);


    inputQte.classList = "form-control";
    inputQte.type = "number";
    inputQte.id = "qteProduit"+cpt;
    inputQte.name = "qteProduit"+cpt;
    inputQte.placeholder = "Quantité";
    inputQte.min = 1;
    
    divQte.appendChild(labelQte);
    divQte.appendChild(inputQte);
    divPrincipale.appendChild(divQte);

    inputQte.addEventListener("change",gererUpdatePrix,false);
    



    ///     PRIX UNITAIRE

    

    let divPrixU = document.createElement("div");
    let labelPrixU = document.createElement("label");
    let inputPrixU = document.createElement("input");
    let contenuPrixU = document.createTextNode("Prix unitaire");
    let divGroupPrixU = document.createElement("div");
    let spanGroupPrixU = document.createElement("span");
    let contenuSpanPrixU = document.createTextNode("$");
    spanGroupPrixU.classList = "input-group-text";
    spanGroupPrixU.appendChild(contenuSpanPrixU);
    divGroupPrixU.classList = "input-group mb-3";
    divPrixU.classList = "mb-3 col-lg-6 col-xl-3";
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
    divGroupPrixU.appendChild(spanGroupPrixU);
    divGroupPrixU.appendChild(inputPrixU);
    divPrixU.appendChild(divGroupPrixU);
    divPrincipale.appendChild(divPrixU);



    ///     PRIX TOTAL



    let divPrixT = document.createElement("div");
    let labelPrixT = document.createElement("label");
    let inputPrixT = document.createElement("input");
    let contenuPrixT = document.createTextNode("Prix total");
    let divGroupPrixT = document.createElement("div");
    let spanGroupPrixT = document.createElement("span");
    let contenuSpanPrixT = document.createTextNode("$");
    spanGroupPrixT.classList = "input-group-text";
    spanGroupPrixT.appendChild(contenuSpanPrixT);
    divGroupPrixT.classList = "input-group mb-3";
    divPrixT.classList = "mb-3 col-lg-6 col-xl-3";
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
    divGroupPrixT.appendChild(spanGroupPrixT);
    divGroupPrixT.appendChild(inputPrixT);
    divPrixT.appendChild(divGroupPrixT);
    divPrincipale.appendChild(divPrixT);



    ///     BTNSUPPR

    
    
    let btn = document.createElement("button");
    btn.id = "btnSuppr"+cpt;
    btn.classList = "btn btn-danger rounded-bottom";
    let contenueBtn = document.createElement("i");
    contenueBtn.classList = "bi bi-dash-circle";
    btn.appendChild(contenueBtn);

    divPrincipale.appendChild(btn);
    btn.addEventListener("click", gererClicSupprimerArticle,false);
    


    divPrincipale.classList.add("animatedin");
    

    //listArticles.push(divPrincipale);
    ///console.log(listArticles);
    divCommande.appendChild(divPrincipale);
    cpt++;
}





/**
 * Fonction qui s'execute au lancement de la page
 */
function initialisation(){

    btnAjouterArticle.addEventListener("click",gererClicAjouterArticle,false);
    btnSupprArticle.addEventListener("click", gererClicSupprimerArticle, false);
    inputQteArticle.addEventListener("change",gererUpdatePrix,false);
    //listArticles.push(document.getElementById("divPrincipale0"));
}


window.addEventListener("DOMContentLoaded", initialisation, false);