import models from "models/index";

/*
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
GET LIST OF CATEGORIES OR PRODUCTS FOR HOME PAGE
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
*/

exports.index = async (req, res, next) => {
    const categories = await models.Category.find({});
    const products = await models.Product.find({});
    return res.status(200).json({"success": true, "categories": categories, "products": products});
}




    


