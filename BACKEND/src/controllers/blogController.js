"use strict"
/* ====================================================== */
/*                     BLOG API CONTROLLERS               */
/* ====================================================== */

// to catch if be able to async errors
require("express-async-errors")
const {BlogCategory,BlogPost,BlogComment}=require("../models/blog")

// CRUD + list operations for category and post
module.exports.BlogCategory={
    list:async (req,res)=>{
        const data = await BlogCategory.find()
        res.status(200).send({
            error:false,
            data
        })
    },
    create:async (req,res)=>{
        const data = await BlogCategory.create(req.body)
        res.status(201).send({
            error:false,
            body:req.body,
            data
        })
    },
    read:async (req,res)=>{
        const data = await BlogCategory.find({_id:req.params.categoryId})
        res.status(202).send({
            error:false,
            data
        })
    },
    update:async (req,res)=>{
        const data = await BlogCategory.updateOne({_id:req.params.categoryId},req.body)
        const newData = await BlogCategory.find({_id:req.params.categoryId})
        res.status(202).send({
            error:false,
            body:req.body,
            data,
            newData
        })
    },
    delete:async (req,res)=>{
        const data = await BlogCategory.deleteOne({_id:req.params.categoryId})
        res.sendStatus((data.deletedCount>=1) ? 204 : 404)
    },
}
module.exports.BlogPost={
    list:async (req,res)=>{
        const data = await BlogPost.find()
        res.status(200).send({
            error:false,
            data
        })
    },
    create:async (req,res)=>{
        const data = await BlogPost.create(req.body)
        res.status(201).send({
            error:false,
            body:req.body,
            data
        })
    },
    read:async (req,res)=>{
        const data = await BlogPost.find({_id:req.params.postId})
        res.status(202).send({
            error:false,
            data
        })
    },
    update:async (req,res)=>{
        const data = await BlogPost.updateOne({_id:req.params.postId},req.body)
        const newData = await BlogPost.find({_id:req.params.postId})
        res.status(202).send({
            error:false,
            body:req.body,
            data,
            newData
        })
    },
    delete:async (req,res)=>{
        const data = await BlogPost.deleteOne({_id:req.params.postId})
        res.sendStatus((data.deletedCount>=1) ? 204 : 404)
    },
}
module.exports.BlogComment={
    list:async (req,res)=>{
        const data = await BlogComment.find()
        res.status(200).send({
            error:false,
            data
        })
    },
    create:async (req,res)=>{
        const data = await BlogComment.create(req.body)
        res.status(201).send({
            error:false,
            body:req.body,
            data
        })
    },
    read:async (req,res)=>{
        const data = await BlogComment.find({_id:req.params.commentId})
        res.status(202).send({
            error:false,
            data
        })
    },
    update:async (req,res)=>{
        const data = await BlogComment.updateOne({_id:req.params.commentId},req.body)
        const newData = await BlogComment.find({_id:req.params.commentId})
        res.status(202).send({
            error:false,
            body:req.body,
            data,
            newData
        })
    },
    delete:async (req,res)=>{
        const data = await BlogComment.deleteOne({_id:req.params.commentId})
        res.sendStatus((data.deletedCount>=1) ? 204 : 404)
    },
}