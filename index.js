import mongoose, { Schema } from 'mongoose';
import express from "express"
import 'dotenv/config'

const app = express()

app.use(express.json())

const port = process.env.PORT

mongoose.connect(process.env.DB_SECRET_KEY)
.then(() => console.log('Connected!'))
.catch(err=>console.log(err.message))

app.listen(port,()=>{
  console.log(`PORT is Running ${port}`)
})

const productsSchema = new Schema({
  username: String,
  email: String,
  Password: String,
  Age: Number,
  isMarried: Boolean
});

const productModel = mongoose.model("products", productsSchema)

app.post("/", async (req,res)=>{
  try{
    const {username, email, Password,Age,isMarried} = req.body
    const newProduct = new productModel({username, email, Password,Age,isMarried})
    await newProduct.save()
    res.send("created")
  }catch(error) {
    res.send("")
  }
}
)


app.get("/", async (req,res)=>{
  try{
    const {username, email, Password,Age,isMarried} = req.body
    const product = await productModel.find({})
    res.send(product)
  }catch(error) {
    res.send("")
  }
})

app.get("/:id", async (req,res)=>{
  
    const {id} = req.params
    const product = await productModel.findById(id)
    res.send(product)
  
})

app.delete("/:id", async (req,res)=>{
  
  const {id} = req.params
  const product = await productModel.findByIdAndDelete(id)
  res.send(product)

})

app.put("/:id", async (req,res)=>{
  try{
    const {id} = req.params
    const {username, email, Password,Age,isMarried} = req.body
    const product = await productModel.findByIdAndUpdate(id,{username, email, Password,Age,isMarried})
    res.send(product)
  }catch(error) {
    res.send("")
  }
  
})