import type { JwtPayload } from "jsonwebtoken";
import type Request from 'express';

declare global {
    namespace Express{
        interface Request{
            user?: JwtPayload;
        }
    }
}