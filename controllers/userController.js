import { StatusCodes } from "http-status-codes";
import Job from "../models/jobModel.js";
import User from "../models/UserModel.js";
export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};

// export const updateUser = async (req, res) => {
//   // console.log("waaakan", req.file);
//   const obj = { ...req.body };
//   delete obj.password;
//   //   console.log(obj);
//   const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj);
//   res.status(StatusCodes.OK).json({ msg: "user updated" });
// };

export const updateUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const obj = { ...req.body };
    delete obj.password;

    if (req.file) {
      // Convert image to base64 string
      const imageBuffer = req.file.buffer; // Get the image buffer from multer
      const base64Image = imageBuffer.toString("base64"); // Convert to base64 string

      // Set the base64 image to the avatar field
      obj.avatar = `data:${req.file.mimetype};base64,${base64Image}`;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, obj, {
      new: true,
      runValidators: true,
    });

    res.status(StatusCodes.OK).json({ msg: "User updated", user: updatedUser });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message });
  }
};
