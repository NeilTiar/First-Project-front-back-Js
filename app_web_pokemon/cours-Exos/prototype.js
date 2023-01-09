// prototype en javascript 
//tuto + bonus scope this etc ..... : https://www.youtube.com/watch?v=_Ilj_unoqvA&ab_channel=FormationVid%C3%A9o





log =  console.log;

const hello = 'hello how can i help ?';
const goodBye = 'have a nice day, see you ...';

//ci dessous la fonction countAllSelectedCaracters ,precédé de String permetant la manipulation ou le fromatage du texte
//prototype permet de ....... suivi du nom de la fonction 
// le tout est egale à une IFFE  (Immediately Invoked Function Expression)afin d'ajouter un atribu( parametre ) a cet fonction


//ci dessous "String" est un  constructeur String 
// il est utilisé pour créer un nouvel objet String . Lorsqu'il est appelé à la place en tant que fonction, il effectue une conversion de type en une chaîne primitive, ce qui est généralement plus utile.



String.prototype.countAllSelectedCaracteres = function(caractere){//prototype permet de d'ajouter des propriétés ,fonctions ou méthode a une classe 

     let letterCount = 0;// variable initialliser à 0 pour comptabiliser le nombre de caracteres de notre text
    for(let i=0; i < this.length; i++){ // variable i initialisé à 0, puis comparer à (caracteres) l'instance courante et ainsi concaténer  la valeur de i si  i < au text renseigner 
        if(this.charAt(i).toUpperCase() == caractere.toUpperCase()){  //charAt() func native de JS permet de retourner le caracter pour un index spécifié ,
          
    //la  condition ci dessu permet de comparer  chacune des lettres qui constitu le texte au texte globale afin de determiner le nombre de caracteres correspondant
    //chaque fois que qu'un caractere appelé par la fonction charAt(i) correspond à une lettre du texte global , la variable letterCount prend +1 envaleur
    //d'ou la presence de letterCount++
letterCount++
        }
    }
    
return letterCount //renvoie le nb de caracteres à l'appel de la fonction counAllSelectedCaracters('avec une lettre a spécifier ici')
}





 log(goodBye.countAllSelectedCaracteres('e'))// ici le 'e' correspond à caractere en parametre de la fonction countAllSelectedCaracteres() et renvoi 4  


//les problemes avec la methode ci dessus sont les suivant :
// 1- on doit faire appel a une variable pour indexer chaque lettre avec i = 0
// 2- la boucle for peux ammené certain effet de bord à eviter pour un code plus stable de plus la maintenabilité reste plus complexe dans ce cas d'utilisation 



//exo :en utilisant prototype pour ajouter une fonction avec stringConstructor() ,
//calculer le nombre de fois ou un caractere selectionné apparait dans un text sans utiliser la boucle for.

//j'ai touvé 2 facons pour procéder à cela 
//1 methode :

const textTest = "this text to cReate array from this"

String.prototype.countAllCaracteres = function (text,letterToFind){ //la fonction prend 2 parametres ,le texte ainsi que la lettre que l'on cherche


 const stringToArray = [...this] /*stocker un tableau avec chaque caracteres qui constitu le texte grace au spread operator
 
 log(stringToArray) // [

    't', 'h', 'i', 's', ' ', 't', 'e',
    'x', 't', ' ', 't', 'o', ' ', 'c',
    'R', 'e', 'a', 't', 'e', ' ', 'a',
    'r', 'r', 'a', 'y', ' ', 'f', 'r',
    'o', 'm', ' ', 't', 'h', 'i', 's'
  ]*/



const countEqalString = stringToArray.map(letterText => letterText == letterToFind) /*grace à .map() on compare chaque lettre du text ,à la lettre séléctionné(letterToFind)
//cela renvoi un nouveau tableau true pour chaque correspondance et false pour les différences , 

log("countEqualString" ,countEqalString) => countEqualString [

  false, false, false, false, false,
  false, false, false, false, false,
  false, false, false, false, false,
  false, false, false, false, false,
  false, true,  true,  false, false,
  false, false, true,  false, false,
  false, false, false, false, false
]*/




const resultForSearchingLetter = countEqalString.filter(result => result == true) /*puis un .filter() pour retourner un nouveau tableau avec les valeurs true
log("resultats :" ,resultForSearchingLetter) => resultats : [ true, true, true ]  et finalement resutForSearchingLetter.length renvoie le nombre de lettre correspondante( plus précisement = true )*/




//methode 2 :

const countItAnotherWay = stringToArray.filter(letter =>letter == letterToFind ) // bien plus simple, on compare directement le tableau stringToArray à une lettre selectionné
    
// .filter renvoie un nouveau tableau avec les lettres correspondantes ,log(countAnotherWay) => [ 'a', 'a', 'a' ]
//finalement countItAnotheWay.length renvoie le nb de correspondances

log(`the letter ${letterToFind } appear : `,countItAnotherWay.length +" "+ "time(s)")

}

textTest.countAllCaracteres("","a")

//piste afin de conter le nombre de fois ou un caracteres apparait dans la chaine de caractere :
//https://www.delftstack.com/fr/howto/javascript/convert-string-to-array-javascript/#utilisez-lexpression-array.from-pour-convertir-une-cha%25C3%25AEne-en-un-tableau