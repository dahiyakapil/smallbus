import validator from "validator"


export const validateSignupData = (req) => {
    const { name,  email } = req.body;

    if (!name) {
        throw new Error("Name is required")
    } else if(name.length<4 || name.length>50) {
        throw new Error("Name length should be between 4 to 50")
    }
     else if (!validator.isEmail(email)) {
        throw new Error("EMail is not valid");
    }
}



