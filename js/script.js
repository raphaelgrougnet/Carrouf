"use strict";

const btnAjouterArticle = document.getElementById("btnAjouter");
const btnVider = document.getElementById("btnVider");
let btnSupprArticle = document.getElementById("btnSuppr0");
let inputQteArticle = document.getElementById("qteProduit0");
let inputIdArticle = document.getElementById("idProduit0");
let inputNumTel = document.getElementById("telephone");
let inputEmail = document.getElementById("courriel");
let selectLivraison = document.getElementById("selectShipping");
let cpt = 1;
const regexCourriel = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const modesLivraison = {
    "magasin" : 0,
    "standard" : 35,
    "express" : 50
};
let listArticles = document.getElementById("commande");

let progressBar = 0;


/**
 * Met a jour les infos du client si le numero de telephone est correct
 * @param {Event} e Evenement
 */
function validationNumero(e){
    let inputCourriel = document.getElementById("courriel");
    let inputAdresse = document.getElementById("adresse");
    let inputNom = document.getElementById("nom");
    if(e.target.value.trim().length >= 8){
        for(let numbers in clients){
            if(numbers == e.target.value.trim()){
                e.target.classList.remove("is-invalid");
                e.target.classList.add("is-valid");
                
                inputCourriel.value = clients[numbers].courriel;
                inputAdresse.value = clients[numbers].adresse;
                inputNom.value = clients[numbers].nom;
            }
        }
        
    }
    else{
        
        inputCourriel.value = "";
        inputAdresse.value = "";
        inputNom.value = "";
        e.target.classList.remove("is-valid");
        e.target.classList.add("is-invalid");
        
    }

    if(e.target.value.trim() === ""){
        e.target.classList.remove("is-valid");
        e.target.classList.remove("is-invalid");
    }


    //let option = document.createElement("option");
    //if(e.target.value.trim().length >=2){
    //    
    //    for (let numero in clients) {
    //        if(numero.startsWith(e.target.value.trim())){
    //            option.value = numero;
    //            
    //            listeNum.appendChild(option);
    //        }
    //    }
    //}

}


/**
 * Met a jour les infos du client si le courriel est correct
 * @param {Event} e Evenement
 */
function validationCourriel(e){
    let inputNum = document.getElementById("telephone");
    let inputAdresse = document.getElementById("adresse");
    let inputNom = document.getElementById("nom");
    if(!regexCourriel.test(e.target.value.trim())){
        for(let emails in telephonesParCourriel){
            if(emails == e.target.value.trim()){
                e.target.classList.remove("is-invalid");
                e.target.classList.add("is-valid");
                
                inputNum.value = clients[telephonesParCourriel[emails]].courriel;
                inputAdresse.value = clients[telephonesParCourriel[emails]].adresse;
                inputNom.value = clients[telephonesParCourriel[emails]].nom;
            }
        }
        
    }
    else{
        
        inputNum.value = "";
        inputAdresse.value = "";
        inputNom.value = "";
        e.target.classList.remove("is-valid");
        e.target.classList.add("is-invalid");
        
    }

    if(e.target.value.trim() === ""){
        e.target.classList.remove("is-valid");
        e.target.classList.remove("is-invalid");
    }
}

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
 * Fonction qui met a jour le nom et le prix unitaire de l'article quand l'id est saisis
 * @param {Event} e Evenement
 */
function gererUpdateId(e){
    let nb = e.target.id.substring(9,e.target.id.length);
    let divNom = document.getElementById("nomProduit"+nb);
    let divPrix = document.getElementById("prixUProduit"+nb);
    let divQte = document.getElementById("qteProduit"+nb);
    let divPrixT = document.getElementById("prixTProduit"+nb);
    if(e.target.value.trim() !== "" && !isNaN(e.target.value.trim()) && e.target.value.trim() >= 100 && e.target.value.trim() <= 999){
        for (let article in catalogue) {
            if(e.target.value.trim() === article){
                divNom.value = catalogue[article].titre;
                divPrix.value = catalogue[article].prix;
                e.target.classList.remove("is-invalid");
                e.target.classList.add("is-valid");
                divQte.readOnly = false;
                divQte.focus();
            }
        }
    }
    else{
        divNom.value = "";
        divPrix.value = "";
        divPrixT.value= "";
        e.target.classList.remove("is-valid");
        e.target.classList.add("is-invalid");
        divQte.classList.remove("is-invalid");
        divQte.classList.remove("is-valid");
        divQte.readOnly = true;
        divQte.value = "";
    }
    
    
}

/**
 * Fonction qui vide tous les articles
 */
function gererClicViderArticle(){
    location.reload();
}


/**
 * Fonction qui ajoute un article a la page
 */
function gererClicAjouterArticle(){
    let divCommande = document.getElementById("commande");
    let divPrincipale = document.createElement("div");
    divPrincipale.id = "divPrincipale"+cpt;
    divPrincipale.classList = "row bg-primary rounded mb-3 pt-3";

    ///     ID


    let divId = document.createElement("div");
    let labelId = document.createElement("label");
    let inputId = document.createElement("input");
    let contenuId = document.createTextNode("Id");
    divId.classList = "mb-3 col-lg-4 col-xl-1";
    labelId.classList = "form-label";
    labelId.for = "idProduit"+cpt;
    labelId.appendChild(contenuId);


    inputId.classList = "form-control inputId rounded";
    inputId.type = "text";
    inputId.id = "idProduit"+cpt;
    inputId.name = "idProduit"+cpt;
    inputId.placeholder = "Id";
    
    divId.appendChild(labelId);
    divId.appendChild(inputId);
    divPrincipale.appendChild(divId);
    
    inputId.addEventListener("change", gererUpdateId, false);

    ///     NOM

    let divNom = document.createElement("div");
    let labelNom = document.createElement("label");
    let inputNom = document.createElement("input");
    let contenuNom = document.createTextNode("Nom de l'article");
    divNom.classList = "mb-3 col-lg-4 col-xl-3";
    labelNom.classList = "form-label";
    labelNom.for = "idProduit"+cpt;
    labelNom.appendChild(contenuNom);


    inputNom.classList = "form-control rounded";
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


    inputQte.classList = "form-control inputQte rounded";
    inputQte.type = "number";
    inputQte.id = "qteProduit"+cpt;
    inputQte.name = "qteProduit"+cpt;
    inputQte.placeholder = "Quantité";
    inputQte.min = 1;
    inputQte.readOnly = true;
    
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


    inputPrixU.classList = "form-control inputPrixU";
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


    inputPrixT.classList = "form-control inputPrixT";
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
    contenueBtn.id = "iiiSuppr"+cpt;
    contenueBtn.classList = "bi bi-dash-circle";
    btn.appendChild(contenueBtn);

    divPrincipale.appendChild(btn);
    btn.addEventListener("click", gererClicSupprimerArticle,false);
    

    if(cpt%2 > 0){
        divPrincipale.classList.add("animatedin");
    }
    else{
        divPrincipale.classList.add("animatedout");
    }
    
    

    //listArticles.push(divPrincipale);
    ///console.log(listArticles);
    divCommande.appendChild(divPrincipale);
    cpt++;
}

/**
 * 
 * @param {Event} e Event
 */
function gererSelectLivraison(e){

    let comment = document.getElementById("priceShipping");
    comment.textContent = "";
    let textSelectLivraison = "Le mode de livraison sélectionné ajoutera $" + modesLivraison[e.target.value] + " CAD à la commande";
    if(e.target.value == "express"){
        textSelectLivraison += " plus $10 CAD par item unitaire";
    }
    textSelectLivraison += ".";
    comment.appendChild(document.createTextNode(textSelectLivraison));
    e.target.classList.add("is-valid");
}




/**
 * Fonction qui s'execute au lancement de la page
 */
function initialisation(){

    btnAjouterArticle.addEventListener("click",gererClicAjouterArticle,false);
    btnVider.addEventListener("click",gererClicViderArticle,false);
    btnSupprArticle.addEventListener("click", gererClicSupprimerArticle, false);
    inputQteArticle.addEventListener("change",gererUpdatePrix,false);
    inputIdArticle.addEventListener("change", gererUpdateId, false);
    inputNumTel.addEventListener("input", validationNumero, false);
    inputEmail.addEventListener("change",validationCourriel,false);
    selectLivraison.addEventListener("input", gererSelectLivraison, false);
    //listArticles.push(document.getElementById("divPrincipale0"));
}


window.addEventListener("DOMContentLoaded", initialisation, false);