/**
 * Le script s'occupe de toute la logique de la page principale, ajout d'article, evenements avec les bouttons,
 * Validation des formulaires etc...
 */

"use strict";
const btnCommander = document.getElementById("btnValider");
const btnAjouterArticle = document.getElementById("btnAjouter");
const btnVider = document.getElementById("btnVider");
let btnSupprArticle = document.getElementById("btnSuppr0");
let inputQteArticle = document.getElementById("qteProduit0");
let inputIdArticle = document.getElementById("idProduit0");
let inputNomArticle = document.getElementById("nomProduit0");
let inputNumTel = document.getElementById("telephone");
let inputEmail = document.getElementById("courriel");
let selectLivraison = document.getElementById("selectShipping");
let listeNum = document.getElementById("suggestNum");
let inputPrixUArticle = document.getElementById("prixUProduit0");
let inputPrixTArticle = document.getElementById("prixTProduit0");
let progressBar = document.getElementById("progressbar");
let progress = 0;

let cpt = 1;

/*global clients*/
/*global telephonesParCourriel*/
/*global catalogue*/

/* eslint-disable no-useless-escape */
const regexCourriel = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const modesLivraison = {
    "magasin": 0,
    "standard": 35,
    "express": 50
};

let listArticles = document.getElementById("commande");

/**
 * Fonction qui permet d'augmenter et reduire la progressbar en fonction du remplissage des etapes 
 */
 function UpdateProgressBar(){
    let champTel = document.getElementById("telephone");
    
    let champCourriel = document.getElementById("courriel");
    
    progress = 0;
    if(champCourriel.value != ""  && champTel.value != ""){
        progress += 33;
    }


    /*let champIdProduit = document.getElementById("idProduit0");
    let champNomProduit = document.getElementById("nomProduit0");
    let champQteProduit = document.getElementById("qteProduit0");
    let champPrixProduit = document.getElementById("prixUProduit0");
    let champPrixTotalProduit = document.getElementById("prixTProduit0");

    if(champIdProduit.value != "" && champNomProduit.value != "" && champQteProduit.value != "" && champPrixProduit.value != "" && champPrixTotalProduit.value != ""){
        progress += 33;
    }*/

    let listInputId = document.querySelectorAll(".inputId");
    let valide = false;
    for(let input of listInputId){
        if(input.classList != "form-control inputId rounded is-valid"){
            valide = true;
        }
    }

    if(!valide){
        progress += 33;
    }

    

    if(selectLivraison.value != "unselected" ){
        progress += 33;
    }
    

    if(progress == 99){
        progress = 100;
        btnCommander.disabled = false;
    }
    else{
        btnCommander.disabled = true;
    }

    if(progressBar.style.width != progress + "%"){
        progressBar.style.width = progress + "%";
    }

    
}


/**
 * Met a jour les infos du client si le numero de telephone est correct
 * @param {Event} e Evenement
 */
function validationNumero(e) {
    let inputCourriel = document.getElementById("courriel");
    let inputAdresse = document.getElementById("adresse");
    let inputNom = document.getElementById("nom");
    if (e.target.value.trim().length >= 8) {
        for (let numbers in clients) {
            if (numbers == e.target.value.trim()) {
                e.target.classList.remove("is-invalid");
                e.target.classList.add("is-valid");

                inputCourriel.value = clients[numbers].courriel;
                inputAdresse.value = clients[numbers].adresse;
                inputNom.value = clients[numbers].nom;
            }
        }

    }
    else {

        inputCourriel.value = "";
        inputAdresse.value = "";
        inputNom.value = "";
        e.target.classList.remove("is-valid");
        e.target.classList.add("is-invalid");

    }

    if (e.target.value.trim() === "") {
        e.target.classList.remove("is-valid");
        e.target.classList.remove("is-invalid");
        inputCourriel.classList.remove("is-valid");
        inputCourriel.classList.remove("is-invalid");
    }

    


}
/**
 * Ajouter les numeros a la liste de suggestion
 * @param {Event} e Evenement
 */
function gererListeSuggestionNumero(e) {
    while (listeNum.firstChild !== null) {
        listeNum.firstChild.remove();
    }

    if (e.target.value.trim().length < 8) {
        if (e.target.value.trim().length >= 2) {

            for (let numero in clients) {
                if (numero.startsWith(e.target.value.trim())) {
                    let option = document.createElement("option");
                    option.value = numero;

                    listeNum.appendChild(option);
                }
            }
        }
    }


}


/**
 * Met a jour les infos du client si le courriel est correct
 * @param {Event} e Evenement
 */
function validationCourriel(e) {
    let inputNum = document.getElementById("telephone");
    let inputAdresse = document.getElementById("adresse");
    let inputNom = document.getElementById("nom");
    if (regexCourriel.test(e.target.value.trim())) {
        for (let emails in telephonesParCourriel) {
            if (emails == e.target.value.trim()) {
                e.target.classList.remove("is-invalid");
                e.target.classList.add("is-valid");

                inputNum.value = telephonesParCourriel[emails];
                inputAdresse.value = clients[telephonesParCourriel[emails]].adresse;
                inputNom.value = clients[telephonesParCourriel[emails]].nom;
            }
        }

    }
    else {

        inputNum.value = "";
        inputAdresse.value = "";
        inputNom.value = "";
        e.target.classList.remove("is-valid");
        e.target.classList.add("is-invalid");

    }

    if (e.target.value.trim() === "") {
        e.target.classList.remove("is-valid");
        e.target.classList.remove("is-invalid");
        inputNum.classList.remove("is-valid");
        inputNum.classList.remove("is-invalid");
    }
}

/**
 * Fonction qui met a jour la liste des articles dans le sommaire
 */
function gererAjouterArticleSommaire() {
    let divArticlesSommaire = document.getElementById("sommaireArticles");
    while (divArticlesSommaire.childElementCount > 0) {
        divArticlesSommaire.firstChild.remove();
    }
    let listNom = [];
    let listPrix = [];

    for (let nom of document.querySelectorAll(".inputNom")) {

        if (nom.value != "") {
            let nomP = document.createElement("p");
            nomP.classList = "m-0";
            nomP.appendChild(document.createTextNode(nom.value));
            listNom.push(nomP);
        }

    }
    for (let prix of document.querySelectorAll(".inputPrixT")) {

        if (parseFloat(prix.value) != 0) {
            let prixP = document.createElement("p");
            prixP.classList = "m-0";
            prixP.appendChild(document.createTextNode("$" + prix.value + ".00"));
            listPrix.push(prixP);
        }

    }

    for (let i = 0; i < listNom.length; i++) {
        let div = document.createElement("div");
        div.classList = "d-flex justify-content-between";
        div.appendChild(listNom[i]);
        div.appendChild(listPrix[i]);
        divArticlesSommaire.appendChild(div);
    }



}

/**
 * Fonction qui met a jour le prix total de la livraison
 */
function gererUpdatePrixTotal() {
    let prixTotalSommaire = document.getElementById("prixTotalSommaire");
    let prixLivraisonSommaire = document.getElementById("prixLivraisonSommaire");
    let inputsPrixT = document.querySelectorAll(".inputPrixT");
    let total = 0;
    for (let prix of inputsPrixT) {
        total += parseFloat(prix.value);
    }
    total += parseFloat(prixLivraisonSommaire.textContent.substring(1, prixLivraisonSommaire.textContent.length));
    prixTotalSommaire.firstChild.replaceWith("$" + total + ".00");

}

/**
 * Fonction qui actualise le prix de la livraison en fonction du nombre d'article
 */
function gererUpdatePrixLivraison() {
    if (selectLivraison.value === "express") {
        let prixLivraisonSommaire = document.getElementById("prixLivraisonSommaire");
        let inputsQte = document.querySelectorAll(".inputQte");
        let nbArticle = 0;

        for (let qte of inputsQte) {
            nbArticle += parseFloat(qte.value);
        }
        prixLivraisonSommaire.firstChild.replaceWith("$" + (50 + (nbArticle * 10)) + ".00");


    }
    if (selectLivraison.value === "unselected") {
        let prixLivraisonSommaire = document.getElementById("prixLivraisonSommaire");
        prixLivraisonSommaire.firstChild.replaceWith("$0.00");
    }

}

/**
 * Fonction qui supprime un article de la page
 * @param {Event} e Evenement du click
 */
function gererClicSupprimerArticle(e) {
    let nb = e.target.id.substring(8, e.target.id.length); ///e.target.id.substring(e.target.id.length,e.target.id.length-1);


    let divSuppr = document.getElementById("divPrincipale" + nb);

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
    gererUpdatePrixLivraison();
    gererUpdatePrixTotal();
    gererAjouterArticleSommaire();
    UpdateProgressBar()
}


/**
 * Fonction qui met a jour le prix total en fonction de la quantitée d'article
 * @param {Event} e Evenement
 */
function gererUpdatePrix(e) {
    if (e.target.value > 0) {
        let nbIdQte = e.target.id.substring(10, e.target.id.length);
        let inputUpdate = document.getElementById("prixTProduit" + nbIdQte);
        let inputPrixUGet = document.getElementById("prixUProduit" + nbIdQte);
        inputUpdate.value = parseFloat(e.target.value) * parseFloat(inputPrixUGet.value);

        e.target.classList.remove("is-invalid");
        e.target.classList.add("is-valid");
    }
    else if (isNaN(parseFloat(e.target.value))) {
        e.target.classList.remove("is-valid");
        e.target.classList.add("is-invalid");
    }
}


/**
 * Fonction qui met a jour le nom et le prix unitaire de l'article quand l'id est saisis
 * @param {Event} e Evenement
 */
function gererUpdateId(e) {
    let nb = e.target.id.substring(9, e.target.id.length);
    let divNom = document.getElementById("nomProduit" + nb);
    let divPrix = document.getElementById("prixUProduit" + nb);
    let divQte = document.getElementById("qteProduit" + nb);
    let divPrixT = document.getElementById("prixTProduit" + nb);
    if (e.target.value.trim() !== "" && !isNaN(e.target.value.trim()) && e.target.value.trim() >= 100 && e.target.value.trim() <= 999) {
        for (let article in catalogue) {
            if (e.target.value.trim() === article) {
                divNom.value = catalogue[article].titre;
                divPrix.value = catalogue[article].prix;
                divPrixT.value = divPrix.value * divQte.value;
                e.target.classList.remove("is-invalid");
                e.target.classList.add("is-valid");
                divQte.readOnly = false;

                divQte.focus();
            }
        }
    }
    else {
        divNom.value = "";
        divPrix.value = "0";
        divPrixT.value = "0";
        e.target.classList.remove("is-valid");
        e.target.classList.add("is-invalid");
        divQte.classList.remove("is-invalid");
        divQte.classList.remove("is-valid");
        divQte.readOnly = true;
        divQte.value = "1";
    }

    gererUpdatePrixLivraison();
    gererUpdatePrixTotal();
    gererAjouterArticleSommaire();
}

/**
 * Fonction qui vide tous les articles
 */
function gererClicViderPage() {
    let num = document.getElementById("telephone");
    let nom = document.getElementById("nom");
    let courriel = document.getElementById("courriel");
    let adresse = document.getElementById("adresse");
    while (listArticles.childElementCount > 1) {
        listArticles.lastChild.remove();
    }
    num.value = "";
    num.classList.remove("is-valid");
    num.classList.remove("is-invalid");

    nom.value = "";
    nom.classList.remove("is-valid");
    nom.classList.remove("is-invalid");

    courriel.value = "";
    courriel.classList.remove("is-valid");
    courriel.classList.remove("is-invalid");

    adresse.value = "";
    adresse.classList.remove("is-valid");
    adresse.classList.remove("is-invalid");


    inputIdArticle.value = "";
    inputIdArticle.classList.remove("is-valid");
    inputIdArticle.classList.remove("is-invalid");

    inputNomArticle.value = "";

    inputQteArticle.value = 1;
    inputQteArticle.classList.remove("is-valid");
    inputQteArticle.classList.remove("is-invalid");

    inputPrixTArticle.value = 0;
    inputPrixUArticle.value = 0;

    selectLivraison.value = "unselected";
    selectLivraison.classList.remove("is-valid");
    selectLivraison.classList.remove("is-invalid");

    gererAjouterArticleSommaire();
    gererUpdatePrixLivraison();
    gererUpdatePrixTotal();
    progress = 0;
    UpdateProgressBar();
}



/**
 * Fonction qui ajoute un article a la page
 */
function gererClicAjouterArticle() {
    let divCommande = document.getElementById("commande");
    let divPrincipale = document.createElement("div");
    divPrincipale.id = "divPrincipale" + cpt;
    divPrincipale.classList = "row bg-primary rounded mb-3 pt-3 article";

    ///     ID


    let divId = document.createElement("div");
    let labelId = document.createElement("label");
    let inputId = document.createElement("input");
    let contenuId = document.createTextNode("Id");
    divId.classList = "mb-3 col-lg-4 col-xl-1";
    labelId.classList = "form-label";
    labelId.for = "idProduit" + cpt;
    labelId.appendChild(contenuId);


    inputId.classList = "form-control inputId rounded";
    inputId.type = "text";
    inputId.id = "idProduit" + cpt;
    inputId.name = "idProduit" + cpt;
    inputId.placeholder = "Id";

    divId.appendChild(labelId);
    divId.appendChild(inputId);
    divPrincipale.appendChild(divId);

    inputId.addEventListener("change", gererUpdateId, false);
    inputId.addEventListener("change", UpdateProgressBar, false);

    ///     NOM

    let divNom = document.createElement("div");
    let labelNom = document.createElement("label");
    let inputNom = document.createElement("input");
    let contenuNom = document.createTextNode("Nom de l'article");
    divNom.classList = "mb-3 col-lg-4 col-xl-3";
    labelNom.classList = "form-label";
    labelNom.for = "idProduit" + cpt;
    labelNom.appendChild(contenuNom);


    inputNom.classList = "form-control inputNom rounded";
    inputNom.type = "text";
    inputNom.id = "nomProduit" + cpt;
    inputNom.name = "nomProduit" + cpt;
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
    labelQte.for = "qteProduit" + cpt;
    labelQte.appendChild(contenuQte);


    inputQte.classList = "form-control inputQte rounded";
    inputQte.type = "number";
    inputQte.id = "qteProduit" + cpt;
    inputQte.name = "qteProduit" + cpt;
    inputQte.placeholder = "Quantité";
    inputQte.min = 1;
    inputQte.value = 1;
    inputQte.readOnly = true;

    divQte.appendChild(labelQte);
    divQte.appendChild(inputQte);
    divPrincipale.appendChild(divQte);

    inputQte.addEventListener("change", gererUpdatePrix, false);
    inputQte.addEventListener("change", gererUpdatePrixLivraison, false);
    inputQte.addEventListener("change", gererUpdatePrixTotal, false);
    inputQte.addEventListener("change", gererAjouterArticleSommaire, false);





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
    labelPrixU.for = "prixUProduit" + cpt;
    labelPrixU.appendChild(contenuPrixU);


    inputPrixU.classList = "form-control inputPrixU";
    inputPrixU.type = "text";
    inputPrixU.id = "prixUProduit" + cpt;
    inputPrixU.name = "prixUProduit" + cpt;
    inputPrixU.placeholder = "Prix unitaire";
    inputPrixU.readOnly = true;
    inputPrixU.value = "0";


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
    labelPrixT.for = "prixTProduit" + cpt;
    labelPrixT.appendChild(contenuPrixT);


    inputPrixT.classList = "form-control inputPrixT";
    inputPrixT.type = "text";
    inputPrixT.id = "prixTProduit" + cpt;
    inputPrixT.name = "prixTProduit" + cpt;
    inputPrixT.placeholder = "Prix total";
    inputPrixT.readOnly = true;
    inputPrixT.value = "0";


    divPrixT.appendChild(labelPrixT);
    divGroupPrixT.appendChild(spanGroupPrixT);
    divGroupPrixT.appendChild(inputPrixT);
    divPrixT.appendChild(divGroupPrixT);
    divPrincipale.appendChild(divPrixT);



    ///     BTNSUPPR



    let btn = document.createElement("button");
    btn.id = "btnSuppr" + cpt;
    btn.classList = "btn btn-danger rounded-bottom";
    let contenueBtn = document.createElement("i");
    contenueBtn.id = "iiiSuppr" + cpt;
    contenueBtn.classList = "bi bi-dash-circle";
    btn.appendChild(contenueBtn);

    divPrincipale.appendChild(btn);
    btn.addEventListener("click", gererClicSupprimerArticle, false);


    if (cpt % 2 > 0) {
        divPrincipale.classList.add("animatedin");
    }
    else {
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
function gererSelectLivraison(e) {
    let prixLivraisonSommaire = document.getElementById("prixLivraisonSommaire");
    let comment = document.getElementById("priceShipping");
    comment.firstChild.remove();
    let textSelectLivraison = "Le mode de livraison sélectionné ajoutera $" + modesLivraison[e.target.value] + " CAD à la commande";
    if (e.target.value == "express") {
        textSelectLivraison += " plus $10 CAD par item unitaire";
        prixLivraisonSommaire.firstChild.replaceWith("$"+50 + ".00");
    }
    if (e.target.value == "standard") {
        prixLivraisonSommaire.firstChild.replaceWith("$"+35 + ".00");
    }
    if (e.target.value == "magasin") {
        prixLivraisonSommaire.firstChild.replaceWith("$0.00");
    }
    textSelectLivraison += ".";
    comment.appendChild(document.createTextNode(textSelectLivraison));
    e.target.classList.add("is-valid");

    gererUpdatePrixLivraison();
    
}




/**
 * Fonction qui s'execute au lancement de la page
 */
function initialisation() {

    btnAjouterArticle.addEventListener("click", gererClicAjouterArticle, false);
    btnVider.addEventListener("click", gererClicViderPage, false);
    btnAjouterArticle.addEventListener("click", UpdateProgressBar, false);
    btnCommander.addEventListener("click", gererClicViderPage,false);
    btnSupprArticle.addEventListener("click", gererClicSupprimerArticle, false);
    btnSupprArticle.addEventListener("click", UpdateProgressBar, false);
    inputQteArticle.addEventListener("change", gererUpdatePrix, false);
    inputQteArticle.addEventListener("change", gererUpdatePrixLivraison, false);
    inputQteArticle.addEventListener("change", gererUpdatePrixTotal, false);
    inputQteArticle.addEventListener("change", gererAjouterArticleSommaire, false);
    inputIdArticle.addEventListener("change", gererUpdateId, false);
    inputIdArticle.addEventListener("change", UpdateProgressBar, false);
    inputNumTel.addEventListener("input", validationNumero, false);
    inputNumTel.addEventListener("input", gererListeSuggestionNumero, false);
    inputNumTel.addEventListener("change", UpdateProgressBar, false);
    inputEmail.addEventListener("input", validationCourriel, false);
    inputEmail.addEventListener("change", UpdateProgressBar, false);
    selectLivraison.addEventListener("input", gererSelectLivraison, false);
    selectLivraison.addEventListener("input", gererUpdatePrixTotal, false);
    selectLivraison.addEventListener("input", UpdateProgressBar, false);
    
    
    ///Trucs de bootstrap
    // const toastTrigger = document.getElementById('btnValider');
    // const toastLiveExample = document.getElementById('liveToast');
    // if (toastTrigger) {
    //     toastTrigger.addEventListener('click', () => {
    //         const toast = new bootstrap.Toast(toastLiveExample);

    //         toast.show();
    //         gererClicViderPage();
    //     });
    // }

}


window.addEventListener("DOMContentLoaded", initialisation, false);
