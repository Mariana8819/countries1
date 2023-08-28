const { Router } = require("express");
const getCountries = require("./getCountries");
const getActivities = require("./getActivities");
const postActivities = require("./postActivities");
const countriesByID = require("./countriesByID");
const countriesByName = require("./countriesByName");

const router = Router();

router.use("/countries", countriesByID);
router.use("/countries", countriesByName);
router.use("/countries", getCountries);
router.use("/activities",getActivities);
router.use("/activities",postActivities);


module.exports = router;
