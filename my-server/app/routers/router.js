const { Router } = require("express");
const { uploadController } = require("../controllers/uploadController");
const {imageUpload} = require('../../../my-app/utils/multer');
const { stringToArray } = require("../../../my-app/utils/helperFunctions");
const { RegisterController } = require("../controllers/registerController");
const router = Router()


router.get('/' , (req, res , next)=>{
    res.send('hi')
})

router.post('/addPoster' ,imageUpload.array('images' , 3) , uploadController.addPoster)
router.patch("/updatePoster/:id" , imageUpload.array('images' , 3) , uploadController.updatePoster)
router.post("/register" , RegisterController.signUp)


module.exports = {
    allRoutes : router
}  