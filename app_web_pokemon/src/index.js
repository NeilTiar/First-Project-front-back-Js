

const log = console.log;

const form = document.querySelector('.form')
const signup = document.querySelector('#signUp')
const iconCompte = document.querySelector(".icon-compte")
const signupForm = document.querySelector("#passwordForm")
const loginForm = document.querySelector("#loginForm")
const description = document.querySelector(".description")
const forms = document.querySelector('.forms')
const navBar = document.querySelector('nav')



//DomContentLoaded permet d'agir au chargement de l'app sur le navigateur
window.addEventListener("DOMContentLoaded", () => {


	loginForm.classList.add('hidden')// ajout de class hidden avec un diplay :none(css) au loginForm pour le cacher form au chargement du dom
	signupForm.classList.add('hidden')


	signup.addEventListener('click', displaySignupForm)

	iconCompte.addEventListener('click', displayLoginForm)

	//ci dessous ,un ecouteur d'evenement au click sur l'icon compte
	//afin de lancer la fonction handleLoginForm 

})


//iconCompte.addEventListener("click", displayLoginForm)



//la fonction ci dessous permet au click d'alterner entre les class 'hidden' et loginForm 
function displayLoginForm() {

	loginForm.classList.toggle('hidden'); //au click on bascule sur la class css
	//'hidden', comme cette class est defini par defaut ,le toggle vas retirer cette class
	//pour laisser apparaitre le loginForm a l'ecran 



	handleDisplayBlurWithForm()

}


function displaySignupForm() {

	signupForm.classList.toggle('hidden');

	//au click on bascule sur la class css
	//'hidden', comme cette class est defini par defaut ,le toggle vas retirer cette class au toggle
	//pour laisser apparaitre le loginForm a l'ecran 

	handleDisplayBlurWithForm()

}



function handleDisplayBlurWithForms() {

	//cette fonction renvoie true seulement si les 2 formulaires ont la classList 'form hidden'
	//à cette condition on enleve l'attibu ('down') qui permet l'effet  blur pour .description 

	const hiddenLoginForm = loginForm.classList.contains('hidden')
	const hiddenSignupForm = signupForm.classList.contains('hidden')
	const descriptionDown = description.getAttribute('down')



	if (loginForm.classList == 'form hidden' && signupForm.classList == 'form hidden') {

		description.removeAttribute('down')  //removeAttribute ,setAttribute et get Attribute ne fonctionnent qu'avec un HTMLelement
		console.log('no form on display')

	} else { //autrement on active l'effet blur sur description 

		log('form does appear')

		description.setAttribute("down", "")
	}

}


//ci desous permet au chargement de la page, d'appliquer la fonction handleFormSubmit en cas d'envoye de formulaire 
document.addEventListener('submit', handleFormSubmit);



const inputUser = document.querySelector('input#username'); //variable pour cibler l'input username afin de recuperer le username et ainsi aficher un message de bienvenu 

//form && form2.addEventListener('submit', handleFormSubmit); // un ecouteur d'evenement pour indiquer l'utilisation de la fonction "handleFormSubmit" en cas de submit



async function handleFormSubmit(event) { //fonction asynchrone prenant en parametre un evenement (click, submit, touche clavier etc .....) cette fonction permet de recuperer les infos renseigner par le client 

	if (event) {

		event.preventDefault();// permet d'eviter de reload la page en cas de submit .(comportement par defaut de submit)

		const currentForm = event.target;//permet de stocker dans cette variable le formulaire ( au format objet HTML car new FormData prend exclusivement se format en charge)  


		// on indique le formulaire en utilisant event.currentTarget ,qui cible la ou un evenement est déclanché

		const url = currentForm.action; // on indique l'url depuis l'atribut action de l'élément form (html)

		console.log('here the form.action :', url, 'and the form : ', currentForm)

		//ci dessus on pourait  directement ciblé un form avec queryselector par exemple , 
		//mais l'avantage ici reside dans la capacité de ciblé un form automatiquement des 
		//qu'un evenement (submit dans ce cas précis ) est executé 

		try {

			const formData = new FormData(currentForm);// la variable formData est une instance de notre formulaire ,new FormData(form) est une solution simple pour instancier un form avec un paire clé/valeur
			const responseData = await postFormDataAsJson({ url, formData });//reponseData attend la fonction postFormDataAsJson, await car interaction avec la base de donné
			//(voir ci dessous) auquel sont transmit l'url ,ainsi que formData (informations renseigner par le client dans le formulaire)
			return console.log({ responseData });

		} catch (error) {
			const message = "oui c'est ici catch (error)"
			console.error(message, error.message);
			throw new Error(error)
		}

	}

	const input = document.querySelector('input');
	const usernameInput = document.querySelector('#username2')
	const loginForm = document.querySelector('#loginForm')


	if (loginForm && input.value < 1) {

		const msgError = document.querySelector('.error-message');
		msgError.textContent = `cannot be blank !`
		return console.log("error")

	} else {
		const msgError = document.querySelector('.error-message');
		msgError.style.visibility = 'hidden';

	}

	//test ci dessus pour la gestion de message si input username = ''  (vide)


}


function setErrorFor(input, message) {

	const form = input;
	const displayMessage = document.querySelector('.error-message');
	displayMessage.textContent = message; // !! textContent permet d'ajouter une chaine de caractere dans un element html 

}

async function postFormDataAsJson({ url, formData }) { //fonction prenant en patametre un url() et un formulaire , celle ci est destiné à envoyer les donnés à la BDD au format Json.


	// ci dessous nous ne pouvont pas passer l'instance de formData directement à fetch ,car cela formatera autamatiquement la requette du body en tant que
	// "multipart" et definira par la même occasion  le header en multipart/formdata or le format adapté pour post via fetch est application/json.

	const plainFormData = Object.fromEntries(formData.entries()); // Renvoie un objet créé par des entrées clés valeur  (dit autrement cela permet de creer un objet l'orsque le client renseigne un formulaire au submit)
	const formDataJsonString = JSON.stringify(plainFormData); // cette variable permet de convertir l'objet creer ci dessus au format json.


	// pour pallier au probleme exposé ci dessus nous allons convertir la reponse du body en objet simple (plain object), puis cet objet sera converti en JSON string
	// afin d'interagir avec l'api .

	const fetchOptions = { // cette variable pour parametrer l'utilisation de l'api fetch 

		method: "POST", // indique la methode utilisé (put,patch, get ,post etc....)

		headers: {
			"Content-Type": "application/json",  // second option possible => 'Content-Type': 'application/x-www-form-urlencoded' mais du fait de l'interaction avec l'api json est plus approrié dans ce cas précis,
			Accept: "application/json",  //Certains serveurs d'API peuvent fonctionner avec plusieurs formats : JSON, XML, etc. 
			//C'est pourquoi ces serveurs peuvent vous demander d'indiquer le format des données pour le header. ici "accept" permet d'indiquer le type de format attendu par le front .
			//ainsi le back prendra en compte cette attente dans la realisation de l'api web .
			//contrairement au body ,le headers est restraint dans son utilisation, pour ce projet le header est surtout utile pour faire transité des données entre l'api et la web app
			//concernant l'authentification. 
		},
		body: formDataJsonString, // !!indique que le body est alimenté par un objet representant les données d'un formulaire , converti au format Json.
	}

	const response = await fetch(url, fetchOptions) // renvoi une promise de fetch avec en parametre l'url ,ainsi que la variable fetchOptions représentant les parametres contenu dans la variable du même nom.
	const inputPassword = document.querySelector('input#password');
	const msgErrPassword = document.querySelector(".error-message2")
	const description = document.querySelector('.description')




	/*switch(inputPassword.value ){

		case "" :
	msgErrPassword.textContent ="password cannot be blank"
	break;
	}case true:
	
	msgErrPassword.textContent = "ok" 
	break;*/

	if (!response.ok) { //gestion de non reponse
		const errorMessage = await response.text()
		console.log("errorMessage")
		throw new Error(errorMessage);

	} if (response) {
		const conexionTxt = document.querySelector(".text-acount")
		const loginForm = document.querySelector('#loginForm')
		const hiddenLoginForm = loginForm.classList.add('hidden')
		const hiddenConexionTxt = conexionTxt.classList.add('hidden')
		const username = document.querySelector('#usernameLog')
		const msgConexion = document.querySelector('.conexion-msg');

		msgConexion.textContent = `welcome , ${username.value}`;
		msgConexion ? hiddenLoginForm && hiddenConexionTxt : null

	}




	return response.json(); // renvoi la reponse au format json() vers l'api. (post)




}



////////////////////////////////////////////////////////Formulaire sous la nav ci dessous ,   src : https://www.youtube.com/watch?v=OVPPAaFq6Gc&ab_channel=DevDrawer/////////////////////////////////////////////////////////////////////////////////////



