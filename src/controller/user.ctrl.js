const userModel = require('../model/user.model');
const bcrypt = require('bcrypt');
exports.registration = async(req,res)=>{
try {
    const data = await userModel.findOne({email:req.body.email})
    if(data){
        res.status(409).json({
            message:"already exist..!!",
            status:409
        })
    }
    else{
        const userData = new userModel({
            name:req.body.name,
            email:req.body.email,
            password:bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)
        })
        const saveData = await userData.save()
        res.status(200).json({
            data:saveData,
            message:"inserted....!!!!",
            status:200
        })
    }
} catch (error) {
    console.log("err",error);
    res.status(500).json({
        message:"something went wrong...!!!",
        status:500
    })
}
}

exports.login = async(req,res)=>{
try {
    const data = await userModel.findOne({email:req.body.email})
    if(data){
        const token = await data.generateauthtoken()
        console.log(token);
        res.cookie("jwt",token,{
            expires: new Date(Date.now() + 300000 * 3),
            httpOnly: true
        })
        
        const updateToken = await userModel.findOneAndUpdate({email:req.body.email},
            {
                $set : {
                    token : token
                }
            })
        bcrypt.compare(req.body.password, data.password, (err, data) => {
            // if (err) than throw error
            if (err) throw err

            //if both match than you can do anything
            if (data) {
                return res.status(200).json({
                    msg: "Login success",
                    status: 200,
                    token: token
                })
            } else {
                return res.status(401).json({ msg: "Invalid credencial" })
            }

        })
    }
    else{
        res.status(404).json({
            message:"not found...!!!",
            status:404
        })
    }
} catch (error) {
    console.log("err",error);
    res.status(500).json({
        message:"something went wrong...!!!",
        status:500
    })
}
}