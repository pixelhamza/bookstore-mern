const Book=require('../models/Book');

const getAllBooks=async(req,res)=>{ 



};

const getBookById=async(req,res)=>{ 

    
}; 
const createBook=async(req,res)=>{ 
    try{ 
        const newBook=await Book.create(req.body);
        if(newBook){
            res.status(201).json({
                success:true,
                message:"Book added successully",
                data:newBook,
            });
        }

    }catch(e){
        console.log(e);
    }

    
}; 

const updateBook=async(req,res)=>{

};

const deleteBook=async(req,res)=>{

};

module.exports={getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
    createBook
}