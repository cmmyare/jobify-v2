import { StatusCodes } from "http-status-codes";
export const test = (req, res) => {
  res.status(200).json({ msg: "heloo test weeye" });
};
