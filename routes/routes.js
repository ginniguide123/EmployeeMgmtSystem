const router        = require("express").Router();
const adminRoutes   = require("../modules/admin/routes")

// admin APIS
router.use("/admin",adminRoutes);


module.exports = router;
