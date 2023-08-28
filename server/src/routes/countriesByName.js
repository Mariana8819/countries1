const { Router } = require("express");
const { getAllCountries} = require("../controllers/getAllCountries");

const router = Router();

router.use("/", async (req, res)=>{
    try {
        const {name} = req.query;
        const countries = await getAllCountries(name);
        if(name){
            const nameFind = await countries.filter((country)=>country.name.toLowerCase().includes(name.toLowerCase()));
            if(nameFind.length ===0){
                return res.status(400).json("No se encontro ese name");
            }
            return res.status(200).json(nameFind);
        }else{
            res.status(200).json(countries);
        }        
    } catch (error) {
        res.status(400).json(`no se encontro porque :${error.message}`);
    }
} );

module.exports = router;