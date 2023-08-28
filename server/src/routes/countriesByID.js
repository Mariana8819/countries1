const { Router } = require("express");
const {Country, Activity} = require("../db");

const router = Router();

router.use("/:id", async (req, res)=>{
    try {
        let {id} = req.params;
        id = id.toUpperCase();
        
        if(id.length > 0){
            const idFind = await Country.findByPk(id, {include: Activity});
            
            if(idFind){
                const result={                //Si hay resultado, se crea un modelo con los datos para detalles...
                id: idFind.id,
                name: idFind.name,
                image: idFind.image,
                continent: idFind.continent,
                capital: idFind.capital,
                subregion: idFind.subregion,
                area: idFind.area,
                population: idFind.population,
                activities: idFind.activities.map((activity)=>{
                    return{
                        id: activity.id,
                        name: activity.name,
                        difficulty: activity.difficulty,
                        duration: activity.duration,
                        season: activity.season,
                    }
                })
            };
            return  res.status(200).json(result);
        }else{ 
            return res.status(400).json({error:"not find result by id"})
        } 
      }      
        
    } catch (error) {
       return res.status(400).json("not find by id");
    }
} )

module.exports = router;