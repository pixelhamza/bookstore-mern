const Borrow=require("../models/Borrow");
const Book=require("../models/Book"); 


//borrow book
const borrowBook=async (req,res)=>{
    try{ 
        const userId= req.user.userId;
        const bookId= req.params.bookId; 

        const book=await Book.findById(bookId); 

        if(!book){
            return res.status(404).json({
                success:false, 
                message:"Book does not exist",
            });
        }
        const existingBorrow=await Borrow.findOne({
            userId,
            bookId,
            status:"borrowed"
        });

        if(existingBorrow){
            return res.status(400).json({ 
                success:false, 
                message:"Cannot borrow same book twice",
            });
        }

        const borrow= await Borrow.create({ 
            userId,
            bookId,
            status:"borrowed"
        });
        res.status(201).json({
            success:true, 
            message:"Successfully borrowed",
            data:borrow
        })


    }catch(error){
        res.status(500).json({ message: error.message });

    }
}

//return book

const returnBook=async (req,res)=>{
    try {
        const userId=req.user.userId;
        const borrowId=req.params.borrowId;


        const borrow= await Borrow.findOne({
            _id:borrowId,
            userId,
            status:"borrowed"
        });
        if(!borrow){
            return res.status(404).json({
                  message: "Active borrow not found"
            });
        }
        borrow.status="returned"; 
        borrow.returnedAt=new Date(); 
        await borrow.save(); 

        res.status(200).json({ 
            success:true, 
            message:"Book returned successfully"
        }); 

    } catch (error) {
        res.status(500).json({success:false, message: error.message });
        
    }
}

//fetch all borrows

const getMyBorrows=async (req,res) => {
    try {
        const userId=req.user.userId;

        const borrows= await Borrow.find({userId}).populate("bookId").sort({borrowedAt:-1});

        res.json({
            success:true,
            data:borrows
        });

        
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
};

module.exports={borrowBook,returnBook,getMyBorrows};