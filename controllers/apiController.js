// Importamos la función scraper de la carpeta utils
const { scrap } = require('../utils/scraper') // ---Descomenta esta línea---



const getTravels = async (req, res) => {

    console.log('getTravels')
    try {
        const travels = await scrap('https://www.holidayguru.es/semana-santa/');
        console.log(travels)
        res.status(200).json(travels);

    } catch (error) {
        res.status(404).json({})
    }

}


module.exports = {
    getTravels
}