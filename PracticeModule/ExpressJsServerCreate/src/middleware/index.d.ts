// https://dev.to/kwabenberko/extend-express-s-request-object-with-typescript-declaration-merging-1nn5

// ei link e giye amra copy koreci


import type { JwtPayload } from "jsonwebtoken";
import { UserModel } from "../../src/user/user.model";

declare global{
    namespace Express {
        interface Request {
            user?: JwtPayload
        }
    }
}