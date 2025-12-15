const Book=require('../models/Book');

const getAllBooks=async(req,res)=>{ 
    try{
        const findBooks=await Book.find({});
        if(findBooks.length>0){
            res.status(200).json({
                success:true,
                message:"List Sent successfully",
                data:findBooks
            });
        }else{
            res.status(404).json({
                success:false,
                message:"Unable to fetch books,no books available"
            })
        }

    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Something went wrong"
        })
    }



};

const getBookById=async(req,res)=>{ 
    try{
        const bookId=req.params.id;
        const singleBook=await Book.findById(bookId); 

        if(!singleBook){
            return res.json({
                success:false,
                message:`Book with id ${bookId} does not exist`, 

            })
        }
        res.json( {
            success:true, 
            data:singleBook
        })

    }catch(e){
        res.status(500).json({
            success: false,
            message: error.message
        });

    }

    
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
    try{
    const updatedData=req.body; 
    const Bookid=req.params.id;
    const updatedBook= await Book.findByIdAndUpdate(
    bookId,updateBook,
    {new:true,}
    );
       if (!updatedBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        res.status(200).json({
            success: true,
            data: updatedBook
        });
    }catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

};
const deleteBook=async(req,res)=>{
    try{
    const bookId=req.params.id; 
    const bookToBeDeleted=await Book.findByIdAndDelete(bookId);
    if(!bookToBeDeleted){
        res.status(400).json({
            success:false, 
            message:"Unable to delete Book, Book does not exist"
        })
    }
    }catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

};

const getBookbyQuery=async(req,res)=>{
    // to be implmented later
}

module.exports={getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
    createBook
}