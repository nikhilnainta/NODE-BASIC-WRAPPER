// Gathering of required modules:
// Express as web server
var express = require('express');
var otpRouter = express.Router();
const nodeUtil = require('util');
const request  = require('request');
var httpError = require('./httpError');

// endpoints to send the otp 
var otpUrl = 'http://www.myvaluefirst.com';
var response = {body:{}};
// Defition of the OTP Router -- Only the POST function
otpRouter.route('/api/v1/otp')

    .post(async function (req, res, next) {
		
		let otp = req.body.otp;
		let phone = req.body.phone;
		let message = otp+" is your OTP";
		
        // Check opt exist or not
        if (!otp && !phone) {

            // Throw an error in case
            var otpErrorDescription = 'Please provide all mandatory fields';
            return httpError.error400(otpErrorDescription, res);

        }
		
    const requestGet  = nodeUtil.promisify(request.get);
   
    [err, sendSmsResponse]  = await asyncAwaitError(requestGet({ url: getOtpUrl(phone, message)}));
    

    if(err || err == null){
		
		response.body['response'] = 1;
		response.body['result'] = sendSmsResponse.body;;
	 
		sendResponse(response.body,res);
       
        
    }else{
		
    
		response.body['response'] = 1;
		response.body['result'] = "Sms sent successfuly";
	 
		sendResponse(response.body,res);
    }


    });
	
	
const getOtpUrl = (mobileNo, message) => {
    return otpUrl+"&to=" + mobileNo +"&from=NIK&text=" + message + "&dlr-mask=19&dlr-url"
}	

const asyncAwaitError = promise => {
    return promise
            .then(data => {
                return [null, data];
            })
            .catch(err => {
		  [err]
		  var otpErrorDescription = 'error in sending message to user';
          return httpError.error400(otpErrorDescription, res);
				
			});
}

// Definition of helper functions to send the response or appropriate error
function sendResponse(data, res) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(200);
    res.send(JSON.stringify(data));
}

module.exports = otpRouter;
