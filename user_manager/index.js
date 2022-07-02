const express = require("express")
const cors = require("cors")

const app = express()
const port = 8400
const baseURL = "/user_manager/api"
const create_user = require(__dirname + "/routes/create_user.js")
const expand_plan = require(__dirname + "/routes/expand_plan.js")
const get_info = require(__dirname + "/routes/get_info.js")
const login = require(__dirname + "/routes/login.js")

app.use(cors())
app.use(baseURL, create_user)
app.use(baseURL, expand_plan)
app.use(baseURL, get_info)
app.use(baseURL, login)

app.get(baseURL, (req, res) => {
    res.send("Hello my dear people!");
})

app.listen(port)