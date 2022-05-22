import { NextFunction, Request, Response } from "express";
import walletOpenApi from "../apis/walletopenapi";
import jwt from "jsonwebtoken";
import config from "../config/config";

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  // const { userName, password } = req.body;

  const user = {
    _id: "628868a55cf78f3849a88497",
  };

  const usr = await walletOpenApi.userLogin(req.body);

  if (!usr) {
    return res.status(400).json({
      message: "incorrect username or password",
    });
  }
  const token = jwt.sign({ _id: user._id }, config.auth.jwtTokenSecret);
  // res.header("auth-token", token).send(token);
  return res.status(200).send({ token });
};

const getUserInfo = async (req: any, res: Response, next: NextFunction) => {
  try {
    // console.log("req.user ", req.user);
    const userId = req.user._id;

    if (!userId) {
      return res.status(401).json({
        message: "please login",
      });
    }

    const user = await walletOpenApi.fetchUserInfo(userId);

    if (!user) {
      return res.status(500).json({
        message: "no users found",
      });
    }
    return res.status(200).send(user.data);
  } catch (error) {
    console.error("getUserInfo", error);
    throw error;
  }
};

const transferMoney = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { recipientId, amount, notes } = req.body;
    const userId = req.user._id;

    const payload = {
      senderId: userId,
      recipientId,
      amount,
      notes,
    };

    if (!payload) {
      return res.status(401).json({
        message: "please login",
      });
    }

    const trxn = await walletOpenApi.createWalletTransaction(payload);

    if (!trxn) {
      return res.status(500).json({
        message: "transaction failed",
      });
    }

    return res.status(200).send(trxn.data);
  } catch (error) {
    console.error("transferMoney", error);
    throw error;
  }
};

const getUserTransactions = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    // const userId = req.params.userId;
    const userId = req.user._id;

    if (!userId) {
      return res.status(401).json({
        message: "please login",
      });
    }

    const trxns = await walletOpenApi.fetchUserWalletTransactions(userId);

    if (!trxns) {
      return res.status(500).json({
        message: "no users found",
      });
    }

    const trxnz = trxns.data.transactions.map((tr: any) => {
      return {
        trId: tr._id,
        sender: {
          id: tr.senderId._id,
          name: tr.senderId.name,
        },
        recipient: {
          id: tr.recipientId._id,
          name: tr.recipientId._id,
        },
        amount: tr.amount,
        notes: tr.notes,
      };
    });

    return res.status(200).send({transactions: trxnz});
  } catch (error) {
    console.error("getUserTransactions", error);
    throw error;
  }
};

const isUserAuthenticated = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const bearerHeader = req.headers["authorization"];

    if (bearerHeader) {
      const bearer: any = bearerHeader?.split(" ");
      const bearerToken = bearer[1];
      const verified = jwt.verify(bearerToken, config.auth.jwtTokenSecret);
      req.user = verified;
      next();
    } else {
      return res.status(401).send("access denied");
    }
  } catch (error) {
    console.error("isUserAuthenticated --------", error);
    next(error);
  }
};

export default {
  loginUser,
  getUserInfo,
  transferMoney,
  getUserTransactions,
  isUserAuthenticated,
};
