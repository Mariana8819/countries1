const { Router } = require("express");
const {Country, Activity} = require("../db");


const router = Router();

router.get("/", async(req, res)=>{
    try {
        let activities = await Activity.findAll({include: Country});
        if(activities.length > 0){
            activities = activities.map( (activity)=>{
                return{
                    id: activity.id,
                    name: activity.name,
                    difficulty: activity.difficulty,
                    duration: activity.duration,
                    season: activity.season,
                    countries: activity.countries.length ? 
                    activity.countries.map( (ctry)=>{
                        return{
                            name: ctry.name,
                            image: ctry.image
                        }
                    }) :
                        "Not country find with this activity"                        
                }
            })
        };
        return res.status(200).json(activities);
        
    } catch (error) {
        res.status(400).json(`Not info in Data Base:${error.message}`);
    }
});

module.exports = router;