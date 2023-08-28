const { Router } = require("express");
const {getAllCountries} = require("../controllers/getAllCountries");

const router = Router();

router.use("/", async (req, res)=>{
    try {
        const countries = await getAllCountries();
        res.status(200).json(countries)
        
    } catch (error) {
        res.status(400).json(`el error esta en :${error.message}`);
    }
} )

module.exports = router;