import { Application } from "express";
import userRoute from "./User/User.route";
import visitorRoute from "./Visitors/Visitor.route";

export function setup(app: Application) {
  app.use("/api/v1/users", userRoute);
  app.use("/api/v1/visitors", visitorRoute);
}
