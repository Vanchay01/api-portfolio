const expressAsyncHandler = require("express-async-handler")
const profileModel = require("../model/profileModel");

// add profile
const addProfile = expressAsyncHandler(async(req, res) => {
    const {username, name, phone, email, address, about, date, password} = req.body;
    const image = req.file ? req.file.filename : null

    const result = await profileModel.save({username: username, name: name, phone: phone, email: email, address: address, about: about, date: date, password: password, image: image})
    if(result.length == 0){
        return res.json({
            message: "Add user is failed...!",
            status: false
        })
    }
    return res.json({
        message: "Find profile successfully",
        status: true,
        data: result,
    })
}) 

// find profile
const getProfile = expressAsyncHandler(async (req, res) => {
    const result = await profileModel.find()
    if(result.length == 0){
        return res.json({
            message: "Profile record not found",
            status: false
        })
    }
    return res.json({
        message: "Find profile successfully",
        status: true,
        data: result,
    })
})

// find profile by id
const getProfileById = expressAsyncHandler(async(req, res) => {
    const id = req.params.id
    
    const result = await profileModel.findOne({id: id})
    if(!result.length > 0){
        return res.json({
            message: "Record profile not found..",
            status: false
        })
    }
    return res.json({
        message: "find one profile record successfully..",
        status: true,
        data: result
    })
})

// edit profile
const editProfile = expressAsyncHandler(async (req, res) => {
    const id = req.params.id
    const {name, username, phone, email, address, about, date} = req.body
    const image = req.file ? req.file.filename : null

    const result = await profileModel.updateOne(name, username, phone, email, address, about, date, image, id)
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

module.exports = { getProfile, editProfile, addProfile, getProfileById }