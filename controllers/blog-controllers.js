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

const getBlogById = async(req, res)=>{
    try{
        const getCurrentBlogId = req.params.id;
        const blogDetailsById = await Blog.findById(getCurrentBlogId);

        if(!blogDetailsById){
            return res.status(404).json({
                success : false,
                message : `Blog with current ID: ${getCurrentBlogId} not found. Please try with a different ID`
            })
        }

        res.status(200).json({
            success : true,
            data : blogDetailsById
        })

    }catch(error){
        console.log('Error', e);
        res.status(500).json({
            success : false,
            message: 'Something went wrong! Please try again'
        });
    }
};

const updateBlog = async(req, res)=>{
    try{
        // Get the userId from the decoded JWT (from the authMiddleware)
        const userId = req.userInfo.userId;

        // Get the updated blog data from the request body
        const updateBlogFormData = req.body;

        // Get the blog ID from the URL params
        const getCurrentBlogId = req.params.id;

        // Find the current blog by its ID
        const blog = await Blog.findById(getCurrentBlogId);

        // Check if the logged-in user is the author of the blog
        if (blog.author.toString() !== userId) {
            return res.status(403).json({
                success :false,
                message : 'You are not authorzed to update this blog. Only the author can modify it.'
            })
        }

        // Update the blog if the user is the author
        const updateBlog = await Blog.findByIdAndUpdate(
            getCurrentBlogId,
            updateBlogFormData,
            {
                new : true,
            }
        );

        // Return success response with updated blog data
        res.status(200).json({
            success: true,
            message: 'Blog updated successfully',
            data: updateBlog
        });

    }catch(error){
        console.log('Error', error);
        res.status(500).json({
            success : false,
            message: 'Something went wrong! Please try again'
        });
    }
};

const deleteBlog =async(req, res)=>{
    try{

        // Get the userId from the decoded JWT (from the authMiddleware)
        const userId = req.userInfo.userId;

        // Get the blog ID from the URL params
        const getBlogId = req.params.id;

        // Find the current blog by its ID
        const blog = await Blog.findById(getBlogId);

        if(!blog) {
            res.status(404).json({
                success: false,
                message: `No Blog with ID: ${getBlogId} found in the database`
            })
        }

        // Check if the logged-in user is the author of the blog
        if (blog.author.toString() !== userId) {
            return res.status(403).json({
                success :false,
                message : 'You are not authorzed to delete this blog. Only the author can delete it.'
            });
        }

        const deleteBlog = await Blog.findByIdAndDelete(getBlogId);
        res.status(200).json({
            success : true,
            message: "Blog is deleted successfully",
            data : deleteBlog
        });

    }catch(error){
        console.log('Error', error);
        res.status(500).json({
            success : false,
            message: 'Something went wrong! Please try again'
        });
    };
    
};


module.exports = {
    fetchAllBlogs, 
    addBlog, 
    getBlogById, 
    updateBlog, 
    deleteBlog 
}