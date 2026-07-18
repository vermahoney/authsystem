function generateotp(){
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function getotpHtml(otp){
    return '<!DOCTYPE html'>
    <html lang="en">
        <head>
            <meta charSet="UTF-8">
            <meta name ="viewport" content ="width=device-width, initial-scale=1.0">

            <tittle>otp verification </tittle>
            <style></style>

            body{
                font-family:Arial, sans-serif;
            }
        </head>
    </html>
}

export {generateotp}