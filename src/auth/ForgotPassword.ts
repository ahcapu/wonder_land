import { randomBytes, createHash } from "crypto";
import sendGrid from "@sendgrid/mail";
export class ForgotPassword {
  static createUserPasswordResetToken = async (user: any) => {
    try {
      const resetToken = randomBytes(32).toString("hex");
      user.passwordResetToken = createHash("sha256")
        .update(resetToken)
        .digest("hex");

      user.passwordResetExpires = Date.now() + 864000 * 1000; // 10 days milliseconds

      return resetToken;
    } catch (error) {
      return error;
    }
  };

  static sendEmailWithSendGrid = (to: any, subject: any, text: any) => {

    sendGrid.setApiKey(process.env.SEND_GRID_API as any);

    const msg = { to, from: process.env.EMAIL_FROM, subject, html: text };
    
    // sendGrid.send(msg, (err: any, r: any) => {})
    // sendGrid.send(msg, function (err, resuly) {
    //   if (err) {
    //     console.log("email could not sent");
    //   }
    // });
  };
}
