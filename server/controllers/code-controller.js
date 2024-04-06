const { Types } = require("mongoose")
const Code = require("../models/code-model")

const createCode = async (req, res) => {
    const { html, css, js, roomId } = req.body
    if (!Types.ObjectId.isValid(roomId)) {
        return res.status(400).json({
            success: false,
            data: {
                statusCode: 400,
                message: "please provide correct roomId"
            }
        })
    }
    try {
        const codeFound = await Code.findOne({ roomId })
        if (codeFound) {
            return res.status(400).json({
                success: false,
                data: {
                    statusCode: 400,
                    message: "Code with this roomId already exists"
                }
            })
        }
        const codeCreated = await Code.create({ html, css, js, roomId })
        const codeCreatedFound = await Code.findById(codeCreated._id)
        if (!codeCreatedFound) {
            return res.status(500).json({
                success: false,
                data: {
                    statusCode: 500,
                    message: "Failed to create code"
                }
            })
        }
        return res.status(201).json({
            success: true,
            data: {
                statusCode: 201,
                message: "Code created successfully",
                value: codeCreatedFound
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: {
                statusCode: 500,
                message: error || "Internal server error"
            }
        })
    }
}

module.exports = { createCode }