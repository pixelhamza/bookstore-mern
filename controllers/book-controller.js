const Book=require('../models/Book');

const getAllBooks=async(req,res)=>{ 
    try{
        const findBooks=await Book.find({});
            res.status(200).json({
                success:true,
                message:"List Sent successfully",
                data:findBooks
            });
    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        });
    }



};

const getBookById=async(req,res)=>{ 
    try{
        const bookId=req.params.id;
        const singleBook=await Book.findById(bookId); 

        if(!singleBook){
            return res.status(404).json({
                success:false,
                message:`Book with id ${bookId} does not exist`, 

            })
        }
        res.status(200).json( {
            success:true, 
            data:singleBook
        });

    }catch(error){
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
        res.status(500).json({
        success:false,
        message:"Failed to create book"
    });
    }

    
}; 

const updateBook=async(req,res)=>{
    try{
    const updatedData=req.body; 
    const Bookid=req.params.id;
    const updatedBook= await Book.findByIdAndUpdate(
    Bookid,updatedData,
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
        return res.status(404).json({
            success:false, 
            message:"Unable to delete Book, Book does not exist"
        })
    }
    res.status(200).json({
        success:true,
        message:"Book Deleted Successfully"
    })
    }catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

};

const getBooksBySearch = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required"
      });
    }

    const books = await Book.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { author: { $regex: q, $options: "i" } }
      ]
    });

    res.status(200).json({
      success: true,
      data: books
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


module.exports={getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
    createBook,
    getBooksBySearch
}