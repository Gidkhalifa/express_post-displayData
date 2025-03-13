const express=require("express");
const app=express()
const port=3000;
const fs=require("fs");
const path=require("path")
const dataFile=path.join(__dirname,"data","file.json")
let data;
try{
   data= JSON.parse(fs.readFileSync(dataFile,"utf8"));
}catch(err){
console.error(err.message)
data=[];
}

app.use(express.urlencoded({extended:true}))


app.set("view engine","ejs")


app.get("/",(req,res)=>{
res.render("display",{data})
})
app.get("/postd",(req,res)=>{
    res.render("postd")
})
app.post("/myinfo",(req,res)=>{
    const mydata=req.body;
    console.log(mydata)
    data.push(mydata)
    console.log(data)
    fs.writeFile(dataFile,JSON.stringify(data),(err)=>{
        if(err){
            return console.log("errror writing file")
        }
        res.redirect("/")
    })
    
})

app.listen(port,(error)=>{
    if(error){
        console.log("error running server");
        return;
    }
    console.log(`server running on port ${port}`)
})