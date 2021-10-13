import express, { Request, Response } from 'express'
import { Post } from '../models/post'
import { Comment } from '../models/comment'

const router = express.Router()

router.get(`/api/${process.env.API_VERSION}/posts`, async  (req: Request, res: Response) => {
    const posts = await Post.find({
        
    })

    res.send(posts)
})

router.get(`/api/${process.env.API_VERSION}/comments`, async  (req: Request, res: Response) => {
    const comments = await Comment.find({
        
    })

    res.send(comments)
})


export { router as indexQueryRouter }