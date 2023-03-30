const puppeteer = require('puppeteer')

const extractTravelData = async (url, browser) => {

    try {

        // creamos un objeto donde almacenaremos la información de cada viaje
        const travelData = {}
        //abrimos una nueva pestaña en chromium
        const page = await browser.newPage()

        //Accedemos al link de cada viaje que recibimos cómo argumento
        await page.goto(url)

        //Obtenemos los datos de la página u los añadimos al objeto travelData

        travelData['title'] = await page.$eval('h1.hg-title', title => title.innerText)
        travelData['subtitle'] = await page.$eval('p.hg-subtitle', subtitle => subtitle.innerText)
        travelData['location'] = await page.$eval('.location-button span', location => location.innerText)
        travelData['price'] = await page.$eval('.price-span', price => price.innerText)
        travelData['description'] = await page.$eval('.hg-editor-content .ProseMirror p', description => description.innerText)

        console.log(travelData)


        // Devuelve el objeto con los datos del viaje
        return travelData

    } catch (error) {
        //mostramos el error
        console.log({ error: error })
        // return { error: error }
    }



}



const scrap = async (url) => {

    // Creamos un array vacío scrapedData donde almacenaremos la información obtenida del scraping
    const scrapedData = []

    try {

        //lanzar el navegador
        const browser = await puppeteer.launch({ headless: true })

        //Abrimos una nueva pestaña en el navegador creando una instancia con el método newPage() a la que llamaremos page
        const page = await browser.newPage()

        //// Indicamos la url que debe cargarse en la pestaña con page.goto(url)
        await page.goto(url)

        console.log(`Navegando a ${url}...`)

        //Creamos un array con todas las urls
        const tmpurls = await page.$$eval('div.rating-hook a', data => data.map(a => a.href))
        //console.log(tmpurls.length)

        //quitamos las urls duplicadas
        const urls = await tmpurls.filter((link, index) => { return tmpurls.indexOf(link) === index })
        // console.log(urls)

        //nos quedamos sólo con los 5 primeros resultados
        const urls2 = urls.slice(0, 5)

        // Iteramos el array de urls y ejecutamos la promesa extractProductData por cada link en el array. Luego pusheamos el resultado a scrapedData
        for (travelLink of urls) {
            const travels = await extractTravelData(travelLink, browser)

            if (travels) {
                scrapedData.push(travels)
            }


        }

        //console.log({ scrapedData })

        // cerramos el browser con el método browser.close
        await browser.close();

        return scrapedData;

    } catch (error) {
        console.log("Error:", error)
    }


}


module.exports = {
    scrap
}


//scrap('https://www.holidayguru.es/semana-santa/').then((data) => console.log(data))
