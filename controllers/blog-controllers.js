const Blog = require("../models/Blog");


const fetchAllBlogs = async(req, res)=>{
    try{

        const allBlogs = await Blog.find({});
        if(allBlogs?.length > 0){
            res.status(200).json({
                success : true,
                message : "List of Blogs fetched successfully",
                data: allBlogs
            })
        }else {
            res.status(200).json({
                success : false,
                message : "No Blog post found in collections"
            })
        }

    }catch(error){
        console.log('Error', error);
        res.status(500).json({
            success : false,
            message: 'Something went wrong! Please try again'
        })
    }
};

const addBlog = async(req, res)=> {
    try{
        const blogFormData = req.body;
        const newBlogCreated = await Blog.create(blogFormData);
        
        if(newBlogCreated){
            res.status(201).json({
                success : true,
                message : "Blog Created successfully",
                data : newBlogCreated
            })
        }

    }catch(error){
        console.log('Error', error);
        res.status(500).json({
            success : false,
            message: 'Something went wrong! Please try again'
        });
    }
};







module.exports = {fetchAllBlogs, addBlog}