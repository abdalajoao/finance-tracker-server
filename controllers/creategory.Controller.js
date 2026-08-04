import Category from "../models/category.model.js";


const createCategory = async (req, res) => {

    try {
        const {name, type} = req.body;

        const owner = req.payload._id;

        const newCategory = await Category.create({
            name,
            type,
            owner
        });

        //return created category
        res.status(201).json(newCategory);

    } catch (error) { 
        
        console.log(error);

        res.status(500).json({
            message: "Something went wrong.",
        });
    }

};

export { createCategory };