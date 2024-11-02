import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    //TODO: toggle like on video
    if(!isValidObjectId(videoId)) {
        throw new ApiError(400,"Invalid Video Id")
    }

    const user = req.user._id;

    const likedVideo = await Like.findOne({
        $and:[
            {
                video:videoId
            },
            {
                likedBy:user
            }
        ]
    })
    
    if(!likedVideo) {
        const like = await Like.create({
            video: videoId,
            likedBy: user
        })

        if(!like) {
            throw new ApiError(500,"Error while liking the video")
        }
        return res.status(200).json(
            new ApiResponse(200,like,"User Liked the video")
        )
    }
    
    const unlikeVideo = await Like.findByIdAndDelete(likedVideo._id);

    if(!unlikeVideo) {
        throw new ApiError(500,"Error while disliking the video")
    }
    return res.status(200,unlikeVideo,"User Unliked the Video")
    
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    //TODO: toggle like on comment

})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    //TODO: toggle like on tweet
}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}