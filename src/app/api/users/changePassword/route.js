import {connect} from '@/dbconfig/dbConfig';
import {NextResponse} from 'next/server';
import User from '../../../../models/userModel';

connect();


export async function POST(request) {
    try{
        const reqBody = await request.json()
        const { token, password } = reqBody;
        console.log(token);

        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}})

        if(!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400});
        }
        console.log(user);

        // user.isVerfied = true;
        user.password = password
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Password changed successfully",
            success: true
        })
    } catch {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
