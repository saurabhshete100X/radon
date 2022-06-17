let axios = require("axios")


let getStates = async function(req, res) {

    try {
        let options = {
            method: 'get',
            url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let getDistricts = async function(req, res) {
    try {
        let id = req.params.stateId
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getByPin = async function(req, res) {
    try {
        let pin = req.query.pincode
        let date = req.query.date
        console.log(`query params are: ${pin} ${date}`)
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getOtp = async function(req, res) {
    try {
        let blahhh = req.body

        console.log(`body is : ${blahhh} `)
        var options = {
            method: "post",
            url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
            data: blahhh
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}
const getDistrictId = async function(req, res) {
    try {
        let distId = req.query.district_id
        let date = req.query.date
        let option = {
            method: 'get',
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${distId}&date=${date}`
        }
        let result = await axios(option)
        console.log(result.data)
        res.status(201).send({ msg: result.data })
    } catch (err) {
        res.status(500).send({ Error: err.message })
    }
}
const getWhether = async function(req, res) {
    try {
        let appid = req.query.appid
        let q = req.query.q
        let option = {
            method: 'get',
            url: `http://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${appid}`
        }
        let result = await axios(option)
        res.status(201).send({ msg: result.data })

    } catch (err) {
        res.status(500).send({ Error: err.message })

    }
}
const getWeatherList = async function(req, res) {
    try {
        let cities = ["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"],
            tempArray = []
        for (i = 0; i < cities.length; i++) {
            let result = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appId=d34e67a9cb3aca44a5527b898b0f6889`)
            tempArray[i] = { city: cities[i], temp: result.data.main.temp }
        }
        let sortedCities = tempArray.sort(function(a, b) {
            return a.temp - b.temp
        })
        res.status(200).send({ status: true, data: sortedCities })
    } catch (x) {
        res.status(400).send({ msg: x.message })
    }

}
const getMeme = async function(req, res) {
    try {
        let option = {
            method: "get",
            url: `https://api.imgflip.com/get_memes`
        }
        let result = await axios(option)
        res.status(201).send({ msg: result.data })
    } catch (err) {
        res.status(500).send({ Error: err.message })

    }

}
const createMeme = async function(req, res) {
    try {
        let template_id = req.query.template_id
        let text0 = req.query.text0
        let text1 = req.query.text1
        let username = req.query.username
        let password = req.query.password
        let option = {
            method: "post",
            url: `https://api.imgflip.com/caption_image?template_id=${template_id}&text0=${text0}&text1=${text1}&username=${username}&password=${password}`
        }
        let result = await axios(option)
        res.status(201).send({ msg: result.data })
    } catch (err) {
        res.status(500).send({ Error: err.message })
    }
}
let confrimOtp = async function(req, res) {
    try {
        let OTP = req.body

        console.log(`body is : ${OTP} `)
        var options = {
            method: "post",
            url: `https://cdn-api.co-vin.in/api//v2/auth/public/confirmOTP`,
            data: OTP
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

module.exports.getStates = getStates
module.exports.getDistricts = getDistricts
module.exports.getByPin = getByPin
module.exports.getOtp = getOtp
module.exports.getDistrictId = getDistrictId
module.exports.getWhether = getWhether
module.exports.getWeatherList = getWeatherList
module.exports.getMeme = getMeme
module.exports.createMeme = createMeme
module.exports.confrimOtp = confrimOtp