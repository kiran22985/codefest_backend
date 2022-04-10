const mongoose= require("mongoose");

mongoose.connect('mongodb+srv://riyaranjit:riyaranjit@cluster0.06bjt.mongodb.net/urbancompany?retryWrites=true&w=majority', { 
    useNewUrlParser: true, 
    useUnifiedTopology : true 

}) 