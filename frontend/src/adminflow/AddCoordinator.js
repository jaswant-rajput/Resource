import React , { useState,useEffect } from "react";
import { register } from "./../actions/authActions"
import TextField from "@mui/material/TextField";
import DashboardRibbon from "./DashboardRibbon";
import { ProtectRoute } from "../manageroutes/protectRoutes";

const AddCoordinator = () => {
    
    const [userData,setUserData] = useState({
        firstName : "",
        middleName : "",
        lastName : "",
        email: "",
        department: "",
        password : "",
        error : "",
        errorMessage : ""
    })

    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)

    useEffect(() => {
        if (showSuccess) {
            const successTimer = setTimeout(() => {
                setShowSuccess(false);
            }, 2000);

            return () => clearTimeout(successTimer);
        }
    }, [showSuccess]);

    useEffect(() => {
        if (showError) {
            const errorTimer = setTimeout(() => {
                setShowError(false);
            }, 2000);

            return () => clearTimeout(errorTimer);
        }
    }, [showError]);

    const {
        error,
        errorMessage
    } = userData;

    // onChange functions
    const handleUserChange = (e) => {
        setUserData(prevData => ({...prevData, error: '', errorMessage:'' , [e.target.name]:e.target.value}))
    }
    
    //registration functions
    const handleCoordinatorRegistration = (e, data) => {
        e.preventDefault()
        if(data.firstName === "" || data.middleName==="" || data.lastName==="" || data.email==="" || data.department===""){
            setUserData({ ...userData, error: 'userForm', errorMessage: '* Required Field ' })
        }
        else if (!validateEmail(data.email)){
            setUserData({ ...userData, error: 'userFormEmail', errorMessage: 'Invalid Email Format. Please Enter a valid' })
        }
        else{
            register(data).then(responseData => {
                responseData.json().then(user =>{
                    console.log(user)
                    if(user.success){   
                        setUserData({
                            firstName: '',
                            middleName: '',
                            lastName: '',
                            email: '',
                            department: '',
                            password : '',
                            error: '',
                            errorMessage: ''
                        });
                        setShowSuccess(true);
                    }
                    else if(user.message === "User already exists"){
                        setUserData({ ...userData, error: 'userFormEmail', errorMessage: user.message + ". Please Enter another" })
                    }
                    else if(!user.success){
                        setShowError(true);
                    }
                    return user
                })
            })
        }
    };
    
    //to validate email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return(
        <ProtectRoute>
            <DashboardRibbon />
            <div className="container col-md-6 col-11 mt-5 p-5">
                <h2 className='text-danger text-center mb-4'>Add Coordinator</h2>
                    {showSuccess ?
                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                            Coordinator Added Successfully
                        </div>

                        : ""}
                    {showError ?
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            Failed to Add Coordinator
                        </div>
                        : ""}
                <form>
                    <div className="mb-3">
                        <TextField
                            className="col-12"
                            error={error === "userForm" ? true : false}
                            id="outlined-basic"
                            label={error === 'userForm' ? `${errorMessage} First Name` : "First Name"}
                            value={userData.firstName}
                            name = "firstName"
                            variant="outlined"
                            onChange={(e)=>handleUserChange(e)} />
                    </div>
                    <div className="mb-3">
                        <TextField
                            className="col-12"
                            error={error === "userForm" ? true : false}
                            id="outlined-basic"
                            label={error === 'userForm' ? `${errorMessage} Middle Name` : "Middle Name"}
                            value={userData.middleName}
                            name = "middleName"
                            variant="outlined"
                            onChange={(e)=>handleUserChange(e)} />
                    </div>
                    <div className="mb-3">
                        <TextField
                            className="col-12"
                            error={error === "userForm" ? true : false}
                            id="outlined-basic"
                            label={error === 'userForm' ? `${errorMessage} Last Name` : "Last Name"}
                            value={userData.lastName}
                            name = "lastName"
                            variant="outlined"
                            onChange={(e)=>handleUserChange(e)} />
                    </div>
                    <div className="mb-3">
                        <TextField
                            className="col-12"
                            error={error === "userForm" || error === "userFormEmail" ? true : false}
                            id="outlined-basic"
                            label={error === "userForm" || error === "userFormEmail" ? `${errorMessage} Email Id` : "Email Id"}
                            value={userData.email}
                            name = "email"
                            variant="outlined"
                            onChange={(e)=>handleUserChange(e)} />
                    </div>
                    <div className="mb-3">
                        <TextField
                            className="col-12"
                            error={error === "userForm" || error === "userFormDepartment" ? true : false}
                            id="outlined-basic"
                            label={error === "userForm" || error === "userFormDepartment" ? `${errorMessage} Department` : "Department"}
                            value={userData.department}
                            name = "department"
                            variant="outlined"
                            onChange={(e)=>handleUserChange(e)} />
                    </div>
                    <div className='d-grid gap-2 text-center mt-4'>
                        <button type="submit" className="btn btn-danger px-4 text-center" onClick={(e) => handleCoordinatorRegistration(e,userData)}>
                            Register Coordinator
                        </button>
                    </div>  
                </form>
            </div>
        </ProtectRoute>
    );
};

export default AddCoordinator;