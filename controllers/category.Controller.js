import Category from "../models/category.model.js";

// Create Category Controller
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


// Get Categories Controller
const getCategories = async (req, res) => {

    try{

        const categories = await Category.find({
            owner: req.payload._id,
        });

        res.status(200).json(categories);
    }catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Something went wrong.",
        });
    }
}

export { createCategory, getCategories };