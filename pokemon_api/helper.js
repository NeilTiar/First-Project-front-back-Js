exports.success = (message, data) => {

    return { message, data }
};

 function testUrlToImg(url) {
    const regex = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/;
    if (!regex.test(err)) {
       
        return res.status(401).json({message :error,data : Error });
    } else {
        return true;
    }
};


exports.getUniqueId = (pokemons) => { //cette fonction etait utilisé avant la creation de notre BDD qui génére automatiquement un id avec auto incrément .

    const pokemonsId = pokemons.map(pokemon => pokemon.id); //permet de stocker tous le id dans la variable pokemonId
    const maxId = pokemonsId.reduce((a, b) => Math.max(a, b));//permet de comparer 2 elements du tableau pokemonsId, cette action est reitérer afin de comparer tout les id
    const uniqueId = maxId + 1; //permet de stocker une valeur egale a l'Id le plus grand +1 
    return uniqueId;
};

module.exports = testUrlToImg;