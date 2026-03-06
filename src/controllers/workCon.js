import { workModel } from "../model/workModel";

const expressAsyncHandler = require("express-async-handler");

export const getAll = expressAsyncHandler(async(req, res) => {
    const result = await workModel.find()
    return result
})

