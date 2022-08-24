import models from "models/index";

/*
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
CREATE NEW CATEGORY
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
*/
exports.store = async (req, res, next) => {
    try {


        const img = `/category/`+req.files[0].originalname
        
        await models.Category.create({
            title       : req.body.title,
            desc        : req.body.desc,
            image       : img
        });
        
        return res.status(201).json({"success" : true, message : "Category successfully created!"});
    } catch (err) {
        return res.status(500).json({"success" : false, message : `ERROR: ${err.message}`});
    }
    

}



/*
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
GET LIST OF CATEGORIES
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
*/

exports.index = async (req, res, next) => {
    const categories = await models.Category.aggregate([
        {
            $project: {
                created_at: { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } },
                title : 1,
                desc  : 1,
                image : 1
            }
        }
    ]);
    return res.status(200).json({"success": true, "categories": categories});
}



exports.update = async (req, res, next) => {
    return res.json('update method')
}


exports.show = async (req, res, next) => {
    return res.json('show method')
}

exports.destory = async (req, res, next) => {
    
    try {
        const removedCategory = await models.Category.findByIdAndDelete(req.params.id)
        return res.status(200).json({"success" : true, categoryId: removedCategory._id});
    } catch (err) {
        return res.status(500).json({"success" : false, message : `ERROR: ${err.message}`});
    }
}




    


