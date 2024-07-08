const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

// Send OTP
exports.sendOTP = async (req, res) => {
  try {
    // Fetch Email From Request Ki Body
    const { email } = req.body;

    // Check If User Already Exists
    checkUserPresent = await User.findOne({ email });

    // If True Then return Response
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User Already Exists",
      });
    }

    // Generate OTP
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("OTP GENERATED : ", otp);
    // Check For Unique OTP
    const result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    const otpPayload = { email, otp };
    // Creating Entry In OTP
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    // Return Successful Response
    res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
      otp,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Sign Up
exports.signUp = async (req, res) => {
  try {
    // Fetching The Data
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
      return res.status(403).json({
        success: false,
        message: "All Fields Are Required",
      });
    }

    // Password Matching
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password And Confirm Password Does Not Match",
      });
    }

    // User Check if Already Existing
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({
            success:false,
            message:"User Already Registered",
        });
    }

    // Finding Latest OTP
    const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
    console.log(recentOtp);
    if(recentOtp.length == 0){
        return res.status(400).json({
            success:true,
            message:"OTP Not Found",
        })
    }else if(otp !== recentOtp.otp){
        return res.status(400).json({
            success:false,
            message:"INVALID OTP",
        })
    }

    // Hashing The Password
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create the user
        let approved = ""
        approved === "Instructor" ? (approved = false) : (approved = true)
    
        // Create the Additional Profile For User
        const profileDetails = await Profile.create({
          gender: null,
          dateOfBirth: null,
          about: null,
          contactNumber: null,
        })
        const user = await User.create({
          firstName,
          lastName,
          email,
          contactNumber,
          password: hashedPassword,
          accountType: accountType,
          approved: approved,
          additionalDetails: profileDetails._id,
          image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastName}`,
        })

  } catch (error) {
    console.error(error)
    // Return 500 Internal Server Error status code with error message
    return res.status(500).json({
      success: false,
      message: `SignUp Failure Please Try Again`,
    })
  }
};

// Login 
// Login controller for authenticating users
exports.login = async (req, res) => {
    try {
      // Get email and password from request body
      const { email, password } = req.body
  
      // Check if email or password is missing
      if (!email || !password) {
        // Return 400 Bad Request status code with error message
        return res.status(400).json({
          success: false,
          message: `Please Fill up All the Required Fields`,
        })
      }
  
      // Find user with provided email
      const user = await User.findOne({ email }).populate("additionalDetails")
  
      // If user not found with provided email
      if (!user) {
        // Return 401 Unauthorized status code with error message
        return res.status(401).json({
          success: false,
          message: `User is not Registered with Us Please SignUp to Continue`,
        })
      }
  
      // Generate JWT token and Compare Password
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { email: user.email, id: user._id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          }
        )
  
        // Save token to user document in database
        user.token = token
        user.password = undefined
        // Set cookie for token and return success response (Expire In 3 Days)
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        }
        res.cookie("token", token, options).status(200).json({
          success: true,
          token,
          user,
          message: `User Logged In Successfully !`,
        })
      } else {
        return res.status(401).json({
          success: false,
          message: `Password is incorrect`,
        })
      }
    } catch (error) {
      console.error(error)
      // Return 500 Internal Server Error status code with error message
      return res.status(500).json({
        success: false,
        message: `Login Failure Please Try Again`,
      })
    }
  }


// Change Passwword
exports.changePassword = async (req, res) => {
  try {
    // Get user data from req.user
    const userDetails = await User.findById(req.user.id)

    // Get old password, new password, and confirm new password from req.body
    const { oldPassword, newPassword } = req.body

    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    )
    if (!isPasswordMatch) {
      // Password not Match
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" })
    }

    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10)
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    )

    // Send notification email
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Password Successfully Updated",
        passwordUpdated(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      )
      console.log("Email sent successfully:", emailResponse.response)
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending (Updated Password) email:", error)
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      })
    }

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" })
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error)
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    })
  }
}