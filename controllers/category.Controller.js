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



// Update Category Controller
const updateCategory = async (req, res) => {
  try {

    const { categoryId } = req.params;

    const { name, type } = req.body;

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        message: "Category not found.",
      });
    }

    // Check if category belongs to logged user
    if (category.owner.toString() !== req.payload._id) {
      return res.status(403).json({
        message: "Not authorized.",
      });
    }

    category.name = name;
    category.type = type;

    await category.save();

    res.status(200).json(category);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Something went wrong.",
    });

  }
};

//delete category controller
const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const deletedCategory = await Category.findOneAndDelete({
            _id: categoryId,
            owner: req.payload._id,
        });

        if (!deletedCategory) {
            return res.status(404).json({
                message: "Category not found.",
            });
        }

        res.status(200).json({
            message: "Category deleted successfully.",
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Something went wrong.",
        });
    }

}

export { createCategory, getCategories, updateCategory, deleteCategory };