
const otpTemplate = (otp) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your ApplyFlow OTP</title>
    </head>

    <body style="
        margin: 0;
        padding: 0;
        background-color: #f5f5f7;
        font-family: Arial, Helvetica, sans-serif;
    ">

        <div style="
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        ">

            <!-- Header -->
            <div style="
                padding: 28px 32px;
                border-bottom: 1px solid #eeeeee;
                text-align: center;
            ">
                <h1 style="
                    margin: 0;
                    font-size: 28px;
                    color: #111111;
                    letter-spacing: -0.5px;
                ">
                    ApplyFlow
                </h1>

                <p style="
                    margin: 8px 0 0;
                    color: #777777;
                    font-size: 14px;
                ">
                    Your modern job application tracker
                </p>
            </div>

            <!-- Content -->
            <div style="padding: 40px 32px;">

                <h2 style="
                    margin: 0 0 16px;
                    color: #111111;
                    font-size: 22px;
                ">
                    Verify your email
                </h2>

                <p style="
                    margin: 0 0 24px;
                    color: #555555;
                    font-size: 15px;
                    line-height: 1.6;
                ">
                    Use the verification code below to continue setting up
                    your ApplyFlow account.
                </p>

                <!-- OTP -->
                <div style="
                    text-align: center;
                    margin: 30px 0;
                ">
                    <div style="
                        display: inline-block;
                        padding: 16px 28px;
                        background-color: #f4f4f5;
                        border-radius: 12px;
                        color: #111111;
                        font-size: 32px;
                        font-weight: 700;
                        letter-spacing: 8px;
                    ">
                        ${otp}
                    </div>
                </div>

                <p style="
                    margin: 0;
                    color: #777777;
                    font-size: 14px;
                    line-height: 1.6;
                    text-align: center;
                ">
                    This code will expire in <strong>5 minutes</strong>.
                </p>

                <p style="
                    margin: 28px 0 0;
                    color: #999999;
                    font-size: 13px;
                    line-height: 1.6;
                ">
                    If you didn't request this code, you can safely ignore
                    this email. Your account remains secure.
                </p>

            </div>

            <!-- Footer -->
            <div style="
                padding: 20px 32px;
                background-color: #fafafa;
                border-top: 1px solid #eeeeee;
                text-align: center;
            ">
                <p style="
                    margin: 0;
                    color: #999999;
                    font-size: 12px;
                ">
                    © ${new Date().getFullYear()} ApplyFlow. All rights reserved.
                </p>
            </div>

        </div>

    </body>
    </html>
    `;
};

module.exports = otpTemplate;

