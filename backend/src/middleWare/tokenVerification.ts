import jwt, { decode } from "jsonwebtoken";
import express from "express";

interface JwtPayload {
    userid: string;
  }

export const tokenVerification = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {  
    const accessToken  = req.headers["x-access-token"] as string;
    const secretKey :string = process.env.ACCESS_TOKEN;
    if (!secretKey) {
      return res.status(500).json({ message: "Unauthorized" });
    }
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN) as JwtPayload;
      req.body.userid=decoded.userid;
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "unauthorized" });
    }
  };