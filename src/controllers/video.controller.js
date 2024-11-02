import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    query = " ",
    sortBy,
    sortType,
    userId,
  } = req.query;
  //TODO: get all videos based on query, sort, pagination
  //   console.log("Query value:", query);

  const videos = await Video.aggregate([
    {
      $match: {
        $or: [
          {
            title: { $regex: query, $options: "i" },
          },
          {
            description: { $regex: query, $options: "i" },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "createdBy",
      },
    },
    {
      $unwind: "$createdBy",
    },
    {
      $project: {
        thumbnail: 1,
        videoFile: 1,
        title: 1,
        description: 1,
        createdBy: {
          fullName: 1,
          username: 1,
          avatar: 1,
        },
      },
    },
    {
      $sort: {
        [sortBy]: sortType === "asc" ? 1 : -1,
      },
    },
    {
      $skip: (page - 1) * limit,
    },
    {
      $limit: parseInt(limit),
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, videos, "Fetched All Videos"));
});

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  // TODO: get video, upload to cloudinary, create video
  if (!title || !description) {
    throw new ApiError(400, "All Fields are required");
  }

  const videoFileLocalPath = req.files?.videoFile[0]?.path;
  if (!videoFileLocalPath) {
    throw new ApiError(400, "No Video File Found");
  }

  const videoFile = await uploadOnCloudinary(videoFileLocalPath);

  if (!videoFile.url) {
    throw new ApiError(500, "Error while uploading video file to cloudinary");
  }

  const thumbnailLocalPath = req.files?.thumbnail[0]?.path;
  if (!thumbnailLocalPath) {
    throw new ApiError(400, "No Thumbnail found");
  }

  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
  if (!thumbnail.url) {
    throw new ApiError(400, "Error while uploading thumbnail");
  }

  const video = await Video.create({
    videoFile: videoFile.url,
    thumbnail: thumbnail.url,
    title,
    description,
    duration: videoFile.duration,
    owner: req.user._id,
  });

  if (!video) {
    throw new ApiError(500, "Error while Publishing the Video");
  }

  return res.status(200).json(new ApiResponse(200, video, "Video Published"));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: get video by id
  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid Video id");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(400, "No Video Found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video Fetched Successfully"));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail
  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid Video Id");
  }

  const { title, description } = req.body;
  const newThumbnailLocalPath = req.file?.path;

  if (!title || !description) {
    throw new ApiError(400, "Provide updated title and description");
  }

  if (!newThumbnailLocalPath) {
    throw new ApiError(400, "Provide Updated Thumbnail");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(400, "Video Not Found");
  }

  if (video.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to update this video");
  }

//   const deleteThumbnailResponse = await deleteFromCloudinary(video.thumbnail);
//   if (deleteThumbnailResponse.result !== "ok") {
//     throw new ApiError(
//       500,
//       "Error while deleting old thumbnail from cloudinary"
//     );
//   }

  const newThumbnail = await uploadOnCloudinary(newThumbnailLocalPath);
  if (!newThumbnail.url) {
    throw new ApiError(500, "Error while uploading new thumbnail");
  }

  const updateVideo = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: {
        title,
        description,
        thumbnail: newThumbnail.url,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updateVideo, "Video details updated"));
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete video
  if(!isValidObjectId(videoId)){
    throw new ApiError(400,"Invalid Video ID")
  }

  const video = await Video.findById(videoId);
  if(!video){
    throw new ApiError(400,"Video not found")
  }

  if(video.owner.toString() !== req.user._id.toString()){
    throw new ApiError(400,"You dont have access to delete the video")
  }

  const deleteVideo = await Video.findByIdAndDelete(video);
  if(!deleteVideo){
    throw new ApiError(400,"Error while deleting the video")
  }

  return res.status(200).json(new ApiResponse(200,{},"Video Deleted"))
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if(!isValidObjectId(videoId)){
    throw new ApiError(400,"Invalid Video Id")
  }

  const video = await Video.findById(videoId)
  if(!video) {
    throw new ApiError(400,"Cant get the video")
  }

  if(video.owner.toString() !== req.user._id.toString()){
    throw new ApiError(400,"You Dont have access")
  }

  const modifyVideoStatus = await Video.findByIdAndUpdate(
    videoId,
    {
        $set:{
            isPublished:!video.isPublished
        },
    },
    {new:true}
  )

  return res.status(200).json(new ApiResponse(200,modifyVideoStatus,"Video Publish status modified"))
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
