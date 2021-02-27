var exp=require('express')
var app=exp()

app.use(exp.static(__dirname+ "/public"));

app.listen(3000,function()
{
    console.log("Shavej mast hai")
});