import models from "models/index";


/*
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
CREATE NEW PRODUCT
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
*/
exports.store = async (req, res, next) => {
    try {

        const imgs = [];
        for(let i = 0; i < req.files.length; i++)
        {
            imgs[i] = `/products/`+req.files[i].originalname
        }
        
        await models.Product.create({
            title       : req.body.title,
            tagline     : req.body.tagline,
            desc        : req.body.desc,
            category_id : req.body.category_id,
            images      : imgs,
            price       : req.body.price,
            discount    : req.body.discount,
        
        });
        
        return res.status(201).json({message : "Product successfully stored"});
    } catch (err) {
        return res.status(500).json(`ERROR: ${err.message}`);
    }
    

}



/*
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
GET LIST OF PRODUCTS
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
*/

exports.index = async (req, res, next) => {
    const products = await models.Product.find({}).populate({
        path:'category_id',
        select: 'title'
    });
    return res.status(200).json({"products": products});
}


exports.show = async (req, res, next) => {
    try{
        const product = await models.Product.findById({_id: req.params.id});
        if(!product){
            throw new Error('Product not found', 404);
        }
        return res.status(200).json({"product": product});
    }catch(err){
        return res.status(err.status || 500).json({error : `${err.message}`});
    }
}

exports.productsByCategory = async (req, res, next) => {
    try{
        
        const products = await models.Product.find({category_id: req.params.id});
        // const product = await models.Product.aggregate([
        //     {
        //         $match :{category_id: "6305f3ac9c1a8f33e443f2b4"}
        //     }
        // ]);
    
        return res.status(200).json({"products": products});
    }catch(err){
        return res.json({error : `${err.message}`})
    }
}

    


