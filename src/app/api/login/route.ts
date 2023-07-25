// pages/api/login.ts

import { withIronSessionApiRoute } from "iron-session/next";


  export async function GET(req, res) {
    // get user from database then:
    req.session.user = {
      id: 230,
      admin: true,
    };
    await req.session.save();
    res.send({ ok: true });
  }
  
