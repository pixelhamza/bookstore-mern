const mongoose=require('mongoose'); 
const Bookschema = new mongoose.Schema({
    title:{ 
        type:String,
        required:[true,'Book title is required'], 
        trime:true,
        maxLength:[100,"Length cannot be more than 100"],
    },
    author:{ 
        type:String,
        required:[true,'Author name is required'], 
        trime:true,
    },
    genre:{
        type:String, 
        required:[true,'Genre name is required'],

    },
    year: {
        type:Number, 
        required:[true,'Year is required'],
        createdAt:{
            type:String, 
            default:Date.now,
        }

    }

}); 
module.exports=mongoose.model('Book',Bookschema);