import {connect} from '@/dbconfig/dbConfig';
import {NextResponse} from 'next/server';
import User from '../../../../models/userModel';
import { sendEmail } from '@/helpers/mailers';

connect();


export async function POST(request) {
    try {
        const reqbody = await request.json();
        const { email } = reqbody;
        console.log(reqbody, 'Here');

        const user = await User.findOne({email: email});

        if(user) {
            console.log(user, "user exists");
        } else {
            return NextResponse.json({error: "Incorrect Email supplied"}, {status: 400});
        };

        await sendEmail({email, emailType: "RESET", userId: user._id})

        return NextResponse.json({message: 'success', success: true});
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}