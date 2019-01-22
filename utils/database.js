import mongoose from "mongoose"

export default function () {
    mongoose.connect("mongodb://localhost:27017").then(() => {
        console.log('connected to db')
    })
}