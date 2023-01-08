// prototype en javascript 



log =  console.log;

const hello = 'hello how can i help ?';
const goodBye = 'have a nice day, see you ...';

String.prototype.countAllSelectedCaracteres = function(caractere){

     let letterCount = 0;
    for(let i=0; i < this.length; i++){
        if(this.charAt(i).toUpperCase() == caractere.toUpperCase()){
letterCount++
        }
    }
    
return letterCount
}


log(goodBye.countAllSelectedCaracteres('e'))



const textTest = "text to count all caracters without any loop for"

String.prototype.countAllCaracteres = function (caracteres){

  var regexp = /[a]/ 
  for (i=0 ; i < this.match(regexp).length ; i++){

    console.log(i)
  }
   
}

textTest.countAllCaracteres()

