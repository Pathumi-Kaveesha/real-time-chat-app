import express, { Request, Response } from "express";

export const signup = (req: Request, res: Response) => {
    const {fullName, email, password} = req.body;
    try{
        // hash password
        
    }catch(error){

    }
}

export const login = (req: Request, res: Response) => {
    res.send("Login route");
}

export const logout = (req: Request, res: Response) => {
    res.send("Logout route");
}