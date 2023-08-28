const axios = require ("axios");
const {Country, Activity} = require("../db");

const getAllCountries = async()=>{
    try {
        const infoDB = await Country.findAll({include: Activity});
        
        if (infoDB.length) return infoDB;
        
        let countriesApi = await axios.get('https://restcountries.com/v3/all');

        let countriesMap = countriesApi.data.map(country =>{
            return{
                id: country.cca3,
                name: country.name.common,
                image: country.flags[1]? country.flags[1] : "Not flag, sorry",
                continent: country.continents.toString(),
                capital: country.capital ? String(country.capital) : "Without capital",
                subregion: country.subregion ? country.subregion : "Without subregion",
                area: country.area,
                population: country.population
            }
        })

        countriesMap.forEach(async (country) => {
            await Country.findOrCreate({
                where:{ id: country.id},
                defaults:{
                    name: country.name,
                    image: country.image,
                    continent: country.continent,
                    capital: country.capital,
                    subregion: country.subregion,
                    area: country.area,
                    population: country.population
                }
            })            
        });
        
        const countries = await Country.findAll({include: Activity});
        return countries;
        
    } catch (error) {
        res.status(400).json("Not found data in DB");
    }
}

module.exports = {getAllCountries};