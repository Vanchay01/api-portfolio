const expressAsyncHandler = require("express-async-handler")
const profileModel = require("../model/profileModel");


const addProfile = expressAsyncHandler(async(req, res) => {
    const {username, name, phone, email, address, about, date, password} = req.body;
    console.log(username)
    const image = req.file ? req.file.filename : null

    const result = await profileModel.save({username: username, name: name, phone: phone, email: email, address: address, about: about, date: date, password: password, image: image})

    if(result.length == 0){
        return res.json({
            message: "Not found..",
            status: false
        })
    }
    return res.json({
        message: "Find profile successfully",
        status: true,
        data: result,
    })
}) 

const getProfile = expressAsyncHandler(async (req, res) => {
    const result = await profileModel.find()
    if(result.length == 0){
        return res.json({
            message: "Profile not found",
            status: false
        })
    }
    return res.json({
        message: "Find profile successfully",
        status: true,
        data: result,
    })
})

const editProfile = expressAsyncHandler(async (req, res) => {
    const id = req.params.id
    const {name, username, phone, email, address, about, date, passsword, image} = req.body
    console.log("eiditProfile:", phone)
    const result = await profileModel.updateOne(name, username, phone, email, address, about, date, passsword, image, id)
    if(result.length == 0){
        return res.json({
            message: "Nothing Change",
            status: false
        })
    }
    return res.json({
        message: "Updated profile successfully",
        status: true,
        data: result
    })
})

module.exports = { getProfile, editProfile, addProfile }