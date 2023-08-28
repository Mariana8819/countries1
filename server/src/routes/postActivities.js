const {Router} = require("express");
const {Country, Activity} = require("../db");

const router = Router();

router.post("/" , async(req, res)=>{
    try {
        let {name, difficulty, duration, season, countries} = req.body;
        if(name && difficulty && duration && season && countries){
        name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

        const activityDB = await Activity.findOne({
            where:{
                name,
                difficulty,
                duration,
                season
            }
        })
        if(!activityDB){
            const activityAdd = Activity.create({
                name,
                difficulty,
                duration,
                season
            })
            
            const countriesDB = await Country.findAll({
                where:{
                    name: countries,
                }
            });

            const result = await activityAdd.addCountries(countriesDB);

            return res.status(200).json(result);
        }else{
          //Busco pais que coincida para conectar la actividad existente..
          const countryMatch = await Country.findAll({
            where:{
                name:countries,
            }
          });
          const result = await activityDB.addCountries(countryMatch);
          return res.status(200).json(result);
    }
}else{
    return res.status(400).json("Missing data in the request");
}
    } catch (error) {
        res.status(400).json(`Not info in Db: ${error.message}`)
    }
})

module.exports = router;