import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';


export const sendEmail = async({email, emailType, userId}) => {
    try {
        console.log(email, emailType, userId, "okay");
        // create a hashed token
        const salt = await bcryptjs.genSalt(10);
        const hashedToken = await bcryptjs.hash(userId.toString(), salt);

        if(emailType === 'VERIFY') {
            await User.findByIdAndUpdate(
                userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                },
                // { new: true, runValidators: true }
            )
        } else if (emailType === 'RESET'){
            await User.findByIdAndUpdate(
                userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                },
                // { new: true, runValidators: true }
            )
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.NODEMAILER_USERNAME,
              pass: process.env.NODEMAILER_PASSWORD
            }
        });

        const mailOptions = {
            from: 'chizzyikemba@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: emailType === "VERIFY"
                ? `<p>Click on <a href="${process.env.domain}/verifyemail?token=${hashedToken}">here</a> to verify your email</p>`
                : `<p>Click on <a href="${process.env.domain}/changePassword?token=${hashedToken}">here</a> to reset your password</p>`
        }

        const mailresponse = await transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                // Handle error appropriately
            } else {
                console.log('Email sent:', info.response);
                // Handle successful email sending
            }
        });
        return mailresponse;

    } catch(error) {
        console.log(error, "here");
        throw new Error(error.message);
    }
}