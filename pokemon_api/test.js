///////////////////////////////////////////////////////////////////////////////
// principe de programmation fonctionnel le curying ou la curryfication : ////
/////////////////////////////////////////////////////////////////////////////


// est un processus qui consiste à transformer une fonction qui attend plusieurs arguments, en plusieurs fonctions qui vont attendre un seul argument 

const items = [2, 4, 6, 12]


//l'avantage etant de simplifier l'utilisation d'une fonction afin de la rendre utilisable (* et personailsable ) sans avoir a declarer des fonctions comme ci dessous :
function mutiplyArrayBy2() {
    return items.map(item => multiply(item, 2))
    
}


//console.log(mutiplyArrayBy2())


//cette fonction permet une multiplication entre des chiffres ( ou nombres ) 
function multiply(a, b) {
    return a * b
}





//cette fonction permet d'additionner des chiffres ( ou nombres ) 
function addition(a, b) {
    return a + b
}



//cette fonction permet de determiner 
function curry(fn) { // fn correspond à la fonction utilisé ( multiply ou addition )
    return function (a) {       //voir console.log "items.map", a =items.map 
        return function (b) {  //voir console.log "items.map" , b = 15 
            return fn(a, b)    //permet d'apliquer une fonction ,voir console.log "items.map"  fn = addition
        }
    }
}


console.log(items.map(curry(addition)(15)))  
//             (a)           (fn)     (b)


function division(a, b) {
    return b / a
}

//console.log(items.map(curry(addition)(15)))   //ici curry est un intermédiare qui permet d'appliquer une fonction 




const items2 = ["9x", "6n", "130", "20", "28"]


//console.log(items2.map(parseInt))
//la ligne ci dessus aura un comportement similaire à la ligne juste dessous


//console.log(items2.map((item, index) => parseInt(item, index)))

//ci dessus le .map renvoi 2 parametres ,l'élément (chiffre ou nombre du tableau items2) puis l'index
//le probleme c'est qu'ici l'index revoyé est renvoyer au ParseInt mais celui ci va le considérer comme une base
// en effet le parseInt attend 2 valeurs ,l'élément puis la bas à appliquer


//ci dessous une curry function permetant determiner une base pour les  nombres dans un tableau (suite plus bas console.log chaine de 4 fonctions)

function curryToDetermineABaseToArray(fn) {
    return function (a) {    //la fonction (a) correspond à la base de parseInt (10) , voir console.log plus bas
        return function (b) {//la fonction (b) correspond au nombre du tableau "items2"
            return fn(b, a)   // ici on inverse l'ordre des fonction afin de fournir la base corretement , autrement base et élément sont inversé 
            //le comportement par defaut ne permet pas de parser correctement . 
        }
    }
}
//          items2 = (b)                   (10)=(a)  dans la fonction ci dessus (curryRight(fn)) 
console.log(items2.map(curryToDetermineABaseToArray(parseInt)(10)))// ici (10) correspond a la base decimale (base commune pour les chiffres et les nombres)
//la base binaire correspond à (2) => resultat possible 0,1 ou NaN
//la base hexadecimale à (16) => resultat possible 0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F ou NaN



//console.log(items2.map(curryRight(parseInt)(10)).map(multiply.bind(undefined, 2)))
//ci dessus l'utilisation de .bind afin d'utiliser la fonction "multiply" juste aprés l'utilisation de parseInt, a l'instar du currying ,  .bind permet l'utilisation d'une fonction à la volée.  
//bind prend 2 argument ,le premier permet de changer le contexte de la fonction ,ici nous desiront conserver le même context donc "undefined"
//et en second parametre on indique le chiffre ou le nombre afin de multiplier tous les éléments parsés

//ce qui est equivalent à console.log(items2.map(curryRight(parseInt)(10)).map(curry(multiply)(2)))
//donc .bind permet d'integrer une fonction et de la paramétrer à la volée

const items3 = ["3ff", "9kldmkdl"] //le parseInt permet d'extraire le chiffre ou nombre seulement ci ces derniers sont placé devant les lettres :"36kjdhkjdhd" devient 36 et jjkhkhkdd45 devient NaN


console.log("chaine de 4 fonctions :",items3.map(curryToDetermineABaseToArray(parseInt)(10)).map(multiply.bind(undefined, 2)).map(division.bind(undefined, 2)).map(addition.bind(undefined, 3)))
//ci dessus exemple de 4 chainages de fonction grâce à la methode .bind qui permet dnas ce cas precis de concerver une base 10 pour chaque functions (multiply ,division ,addition)




//ci dessous example de class avec utilisation d'un constructor 

const Object = class Rectangle {
    constructor(longeur, largeur) {
        this.longeur = longeur;
        this.largeur = largeur;
    }



// get ici fait reference a un getter (à aprofondir avec ce lien : https://www.youtube.com/watch?v=8fo-K7zRv0Y&ab_channel=codebubb
    get calcArea() {
        return this.largeur *
            this.longeur
    }
}
const rectangleArea = new Object(8, 10)

//console.log(rectangleArea.calcArea)


