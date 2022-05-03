// file for customize validation for user input details


//micro function for empty blank field of input
function isEmpty(value) {
    return !value || value.trim() == '';
}


//micro function user credential valid for email and password
function userCredentialsAreValid(email,password) {
    return (
        email && 
        email.includes('@') && 
        password && 
        password.trim().length >= 6
    );
}


//function for user details are valid checking
function userDetailsAreValid(email,password,name,street,postal,city){

    //pass the validation function here
    return (
        userCredentialsAreValid(email,password) &&
        !isEmpty(name) && 
        !isEmpty(street) &&
        !isEmpty(postal) &&
        !isEmpty(city)
    );
}

//check for email and confirm email
function emailIsConfirmed(email,confirmEmail){
    return email == confirmEmail;
}

module.exports = {
    userDetailsAreValid: userDetailsAreValid,
    emailIsConfirmed: emailIsConfirmed
};