const express=require('express'); 
const router=express.Router(); 
const{getAllBooks,getBookById,createBook,updateBook,deleteBook}=require('../controllers/book-controller')
const auth=require('../middleware/auth');
const admin=require('../middleware/admin');

router.get('/',auth,getAllBooks);
router.get('/:id',auth,getBookById);
router.post('/',auth,admin,createBook);
router.put('/:id',auth,admin,updateBook);
router.delete('/:id',auth,admin,deleteBook);

module.exports=router;