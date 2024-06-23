import React, { useEffect, useState } from "react";
import { ProtectRoute } from "../manageRoutes/protectRoutes";
import TextField from '@mui/material/TextField'
import { useLocation, useNavigate } from "react-router-dom";
import { updateCoordinator } from "../actions/authActions";
// import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
// import Autocomplete from '@mui/material/Autocomplete';
import DashboardRibbon from "./DashboardRibbon";

const UpdateCoordinator = () => {

    const [userData, setUserData] = useState({
        _id: "",
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        password: "password",
        error: "",
        errorMessage: "",
        isActive: true,
        role: 0,
        department: ""
    })

    const {
        error,
        errorMessage
    } = userData;

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const { from } = location.state
        console.log(from)
        if (from === null || from === undefined) {
            return navigate('/dashboard')
        }
        setUserData({
            ...userData,
            _id: from._id,
            firstName: from.firstName,
            middleName: from.middleName,
            lastName: from.lastName,
            email: from.email,
            department: from.department,
            isActive: from.isActive
        })
    }, [])
    // console.log(from)

    // onChange functions
    const handleUserChange = name => e => {
        setUserData(prevData => ({ ...prevData, error: '', errorMessage: '', [name]: e.target.value }))
    }

    //registration functions
    const handleRegistrationUser = (e, data) => {
        e.preventDefault()
        //console.log(data)
        if (data.firstName === "" || data.middleName === "" || data.lastName === "" || data.email === "" || data.department === "" ||
            data.firstName === undefined || data.middleName === undefined || data.lastName === undefined || data.email === undefined || data.department === undefined) {
            setUserData(prevData => ({ ...prevData, error: 'userForm', errorMessage: '* Required Field ' }))
        }
        else if (!validateEmail(data.email)) {
            setUserData(prevData => ({ ...prevData, error: 'userFormEmail', errorMessage: 'Invalid Email Format. Please Enter a valid' }))
        }
        else {
            updateCoordinator(userData._id, data).then(responseData => {
                // console.log(responseData)
                if (responseData.success === true) {
                    navigate('/coordinators/list')
                }
            })
        }
    };

    //to validate email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <ProtectRoute>
            <DashboardRibbon />
            <div className="container-fluid d-flex flex-wrap justify-content-around">
                <div className="col-md-5 col-10 d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
                    <div className="col-12">
                        <h2 className='text-danger text-center'>Update Coordinator Details</h2>
                        {/* {JSON.stringify(userData.selectQuery)} */}
                        <div>
                            <div className="py-2">
                                <div className="mb-3">
                                    <TextField
                                        className="col-12"
                                        error={error === "userForm" ? true : false}
                                        id="outlined-basic"
                                        label={error === 'userForm' ? `${errorMessage} First Name` : "First Name"}
                                        value={userData.firstName}
                                        variant="outlined"
                                        onChange={handleUserChange('firstName')} />
                                </div>

                                <div className="mb-3">
                                    <TextField
                                        className="col-12"
                                        error={error === "userForm" ? true : false}
                                        id="outlined-basic"
                                        label={error === 'userForm' ? `${errorMessage} Middle Name` : "Middle Name"}
                                        value={userData.middleName}
                                        variant="outlined"
                                        onChange={handleUserChange('middleName')} />
                                </div>

                                <div className="mb-3">
                                    <TextField
                                        className="col-12"
                                        error={error === "userForm" ? true : false}
                                        id="outlined-basic"
                                        label={error === 'userForm' ? `${errorMessage} Last Name` : "Last Name"}
                                        value={userData.lastName}
                                        variant="outlined"
                                        onChange={handleUserChange('lastName')} />
                                </div>

                                <div className="mb-3">
                                    <TextField
                                        className="col-12"
                                        error={error === "userForm" || error === "userFormEmail" ? true : false}
                                        id="outlined-basic"
                                        label={error === 'userForm' || error === "userFormEmail" ? `${errorMessage} Email` : "Email"}
                                        value={userData.email}
                                        variant="outlined"
                                        onChange={handleUserChange('email')} />
                                </div>

                                <div className="mb-3">
                                    <TextField
                                        className="col-12"
                                        error={error === "userForm" ? true : false}
                                        id="outlined-basic"
                                        label={error === 'userForm' ? `${errorMessage} Department` : "Department"}
                                        value={userData.department}
                                        variant="outlined"
                                        onChange={handleUserChange('department')} />
                                </div>
                            </div>
                            <div className='d-grid gap-2 text-center'>
                                <button type="submit" className="btn btn-danger px-4 text-center" onClick={(e) => handleRegistrationUser(e, userData)}>
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-5 col-10 d-flex justify-content-center align-items-center">
                    <div className="col-12 p-2">
                        <p>Name: {userData.firstName} {userData.middleName} {userData.lastName}</p>
                        <p>Email: {userData.email}</p>
                        <p>Department: {userData.department}</p>
                    </div>
                </div>
            </div>
        </ProtectRoute>
    );
};

export default UpdateCoordinator;