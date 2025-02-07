import {
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/CustomErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";
import { BadRequestError } from "../errors/CustomErrors.js";
export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authentication invalid");

  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === "67a5b684ffb084882b256b72";
    req.user = { userId, role, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};

export const authorizedPermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unaathorized to access this information");
    }
    next();
  };
};

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError("Demo User. Read Only!");
  }
  next();
};
