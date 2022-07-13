const businessCardModel = require("../model/businessCardModel")
const Aws = require("../AWS/aws")
const mongoose = require('mongoose');

// ............................validation functions............................

const isValidObjectId = (ObjectId) => {
    return mongoose.Types.ObjectId.isValid(ObjectId);
}
const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false

    return true;
}

// ............................1st API - create businessCard..............................

const createBusinessCard = async (req, res) => {
    try {
        const data = req.body;
        const file = req.files;

        // validation (for empty fields)

        if (!isValid(data.name)) {
            return res.status(400).send({ status: false, ERROR: "Name required" })
        }

        if (!isValid(data.designation)) {
            return res.status(400).send({ status: false, ERROR: "designation required" })
        }

        if (!isValid(data.company)) {
            return res.status(400).send({ status: false, ERROR: "company required" })
        }

        if (!isValid(data.phone)) {
            return res.status(400).send({ status: false, ERROR: "phone required" })
        }

        //checking for valid phone number
        if (!(/^[6789]\d{9}$/).test(data.phone.trim())) {
            return res.status(400).send({ status: false, message: 'The mobile number must be 10 digits and should be only Indian number' });
        }

        //checking for duplicate phone number
        let duplicateMobile = await businessCardModel.findOne({ phone: data.phone })
        if (duplicateMobile) {
            return res.status(400).send({ status: false, msg: "mobile number already exists" })
        }


        if (!isValid(data.email)) {
            return res.status(400).send({ status: false, ERROR: "email required" })
        }

        //checking for valid email address
        if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/).test(data.email.trim())) {
            return res.status(400).send({ status: false, message: 'Enter a valid Email Id' });
        }

        //checking for duplicate email address
        let isDuplicateEmail = await businessCardModel.findOne({ email: data.email })
        if (isDuplicateEmail) {
            return res.status(400).send({ status: false, msg: "email already exists" })
        }


        if (!isValid(data.website)) {
            return res.status(400).send({ status: false, ERROR: "website required" })
        }

        if (!isValid(data.social)) {
            return res.status(400).send({ status: false, ERROR: "social required" })
        }

        //uploading company logo in AWS
        if (file && file.length > 0) {

            //checking whether the file is image or not
            if (file[0].mimetype.indexOf('image') == -1) {
                return res.status(400).send({ status: false, message: 'Only image files are allowed !' })
            }
            const card_url = await Aws.uploadFile(file[0]); //creating url
            data.companyLogo = card_url;
        }
        else {
            return res.status(400).send({ status: false, message: 'Logo is required !' })
        }

        //card creation
        const dataRes = await businessCardModel.create(data);
        return res.status(201).send({ status: true, message: "card created successfully", data: dataRes });
    } catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

// .........................2ND API - GET businessCard.................................


const getBusinessCardById = async (req, res) => {
    try {
        const cardId = req.params.cardId;

        //checking for valid card-Id
        if (!isValid(cardId)) {
            return res.status(400).send({ status: false, ERROR: "business card Id required" })
        }

        if (!isValidObjectId(cardId.trim())) {
            return res.status(400).send({ status: false, message: 'Invalid ID !' });
        }

        //finding business card by card-Id
        const findCardById = await businessCardModel.findById(cardId);
        if (!findCardById) {
            return res.status(404).send({ status: false, message: 'Business card not found !' });
        }
        // sending response
        return res.status(200).send({ status: true, message: "Success", data: findCardById });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

module.exports.createBusinessCard = createBusinessCard
module.exports.getBusinessCardById = getBusinessCardById