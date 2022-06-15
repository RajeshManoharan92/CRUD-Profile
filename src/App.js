import React, { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import './index.css';
import Grid from '@mui/material/Grid';
import { Button, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import OutlinedInput from '@mui/material/OutlinedInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import CardMedia from '@mui/material/CardMedia'
import { FaRupeeSign } from 'react-icons/fa';
import { Formik } from "formik";
import { ReactDOM } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import { Input } from "@mui/material";



export default function App() {
  return (

    // Router used for navigation through pages

    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Listuser />} />
          <Route path="/createusers" element={<Createuser />} />
          <Route path="/userprofile" element={<Profie />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/Editusers" element={<Editusers />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}


// Function for Create user

function Createuser() {

  const Navigate = useNavigate();

  const [formvalue, setformvalue] = useState({
    Firstname: "",
    LastName: "",
    Email: "",
    MobileNo: ""
  })

  // Formik Error Validation

  const validate = (formData) => {
    var errors = {};
    if (formData.Firstname == "") errors.Firstname = "First Name is Required";
    if (formData.LastName == "") errors.LastName = "Last Name is Required";
    if (formData.Email == "") errors.Email = "E_mail is Required";
    if (formData.MobileNo == "") errors.MobileNo = "MobileNo is Required";
    return errors;
  }

  // On Submit Function

  var Register = async (formData) => {
    var response = await axios.post("https://62053f31161670001741b6db.mockapi.io/CRUD", {
      Firstname: formData.Firstname,
      Lastname: formData.LastName,
      Email: formData.Email,
      MobileNo: formData.MobileNo,
    })

    await setformvalue({ Firstname: "", LastName: "", Email: "", MobileNo: "" })

    if (response.statusText === "Created") {
      alert("Registered Successfully")
      Navigate('/')
    }
    else if (response.data === "User Already Exist. Please Login") {
      alert("User Already Exist. Please Login")
      setformvalue({ First_Name: "", Last_Name: "", E_mail: "", Password: "" })
    }
  }


  return (
    <>

      {/* Top Grid */}

      <div class="container   text-center">
        <div class="row TopGrid  align-items-center ">
          <div class="col-md-3 col-sm-3 text-nowrap  mx-auto">
            <div >
              <button class="btn btn-primary btn-sm " onClick={() => Navigate('/')}> List Of Users </button>
            </div>
          </div>
          <div class="col-md-3 col-sm-3  text-nowrap mx-auto">
            <div >
              <button class="btn btn-primary btn-sm" onClick={() => Navigate('/createusers')}> Create Users </button>
            </div>
          </div>
          <div class="col-md-3 col-sm-3 text-nowrap mx-auto ">
            <div >
              <button class="btn btn-primary btn-sm" onClick={() => Navigate('/Editusers')}> Edit Users </button>
            </div>
          </div>
          <div class="col-md-3 col-sm-3 text-nowrap mx-auto">
            <div >
              <button class="btn btn-primary btn-sm" onClick={() => Navigate('/userprofile')}> Users Profile </button>
            </div>
          </div>
        </div>
      </div> <br></br>

      <div class="container   text-center">
        <div class="row TopGrid  align-items-center ">
          <div class="col-xs-12">
            <div >
              Register Your Details
            </div>
          </div>
        </div>
      </div> <br></br>

      <Formik
        enableReinitialize
        initialValues={formvalue}
        validate={(formData) => validate(formData)}
        onSubmit={(formData) => Register(formData)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>

            {/* First_Name Input */}

            <div class="container datas text-center">

              <div class="row FirstName rheight align-items-center justify-content-center">
                <div class="col-md-4 col-sm-6 text   ">
                  <label for="firstname">First Name</label>
                </div>
                <div class="col-md-4 col-sm-6 text   ">
                  <input type="text" class="form-control" placeholder="Enter your Firstname" name="Firstname" onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.Firstname}></input>
                  <span className="errors">{errors.Firstname && touched.Firstname && errors.Firstname}</span>
                </div>
              </div> <br></br>

              {/* Last_Name Input */}

              <div class="row LastName  rheight align-items-center justify-content-center">
                <div class="col-md-4 col-sm-6 text  ">
                  <label for="LastName">LastName</label>
                </div>
                <div class="col-md-4 col-sm-6 text  ">
                  <input type="text" class="form-control" placeholder="Enter your LastName" name="LastName" onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.LastName}></input>
                  <span className="errors">{errors.LastName && touched.LastName && errors.LastName}</span>
                </div>
              </div> <br></br>

              {/* Email Input */}

              <div class="row Email rheight align-items-center justify-content-center">
                <div class="col-md-4 col-sm-6 text  ">
                  <label for="Email">Email</label>
                </div>
                <div class="col-md-4 col-sm-6 text  ">
                  <input type="email" class="form-control" placeholder="Enter your Email" name="Email" onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.Email}></input>
                  <span className="errors">{errors.Email && touched.Email && errors.Email}</span>
                </div>
              </div> <br></br>

              {/* MobileNo Input */}

              <div class="row MobileNo rheight align-items-center justify-content-center">
                <div class="col-md-4 col-sm-6 text  ">
                  <label for="MobileNo">MobileNo</label>
                </div>
                <div class="col-md-4 col-sm-6 text  ">
                  <input type="number" class="form-control" placeholder="Enter your MobileNo" name="MobileNo" onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.MobileNo}></input>
                  <span className="errors">{errors.MobileNo && touched.MobileNo && errors.MobileNo}</span>
                </div>
              </div> <br></br>

              {/* submit Input */}

              <div class="row MobileNo rheight align-items-center justify-content-center">
                <div class="col-md-4 col-sm-6 text  ">
                  <button type="submit" class="btn btn-primary">submit</button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  )
}

// function for listing the overall users

function Listuser() {

  const Navigate = useNavigate();

  const [array, setarray] = useState({ Product: [] })

  useEffect(
    () => {
      cartcount();
    }, [])

  var cartcount = async () => {
    var response = await axios.get('https://62053f31161670001741b6db.mockapi.io/CRUD')
    setarray({ Product: response.data })
  }

  return (
    <>

      {/* Top Grid */}

      <div class="container   text-center">
        <div class="row TopGrid  align-items-center ">
          <div class="col-md-3 col-sm-3 text-nowrap  mx-auto">
            <div >
              <button class="btn btn-primary btn-sm " onClick={() => Navigate('/')}> List Of Users </button>
            </div>
          </div>
          <div class="col-md-3 col-sm-3  text-nowrap mx-auto">
            <div >
              <button class="btn btn-primary btn-sm" onClick={() => Navigate('/createusers')}> Create Users </button>
            </div>
          </div>
          <div class="col-md-3 col-sm-3 text-nowrap mx-auto ">
            <div >
              <button class="btn btn-primary btn-sm" onClick={() => Navigate('/Editusers')}> Edit Users </button>
            </div>
          </div>
          <div class="col-md-3 col-sm-3 text-nowrap mx-auto">
            <div >
              <button class="btn btn-primary btn-sm" onClick={() => Navigate('/userprofile')}> Users Profile </button>
            </div>
          </div>
        </div>
      </div> <br></br>

      <div class="container   text-center">
        <div class="row TopGrid  align-items-center ">
          <div class="col-xs-12">
            <div >
              List Of Users
            </div>
          </div>
        </div>
      </div> <br></br>

      {/* Table */}

      <div class="container   text-center">
        <div class="row Table  align-items-center ">
          <div class="col-xs-12 table-responsive">
            <Table striped bordered hover table-responsive class="table" border='1'>
              <thead>
                <tr>
                  <td> Id </td>
                  <td> First Name </td>
                  <td> Last Name </td>

                </tr>
              </thead>
              <tbody>
                {array.Product.map((row) => (
                  <tr key={row.id}>
                    <td> {row.id} </td>
                    <td>  {row.Firstname}   </td>
                    <td>  {row.Lastname}   </td>

                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}

// function for editing user profile

function EditProfile() {

  const Navigate = useNavigate();

  const [formvalue, setformvalue] = useState({
    Id: "",
    Firstname: "",
    LastName: "",
    Email: "",
    MobileNo: "",
  })

  // Formik Error Validation

  const validate = (formData) => {
    var errors = {};
    if (formData.Id == "") errors.Id = "Id is Required";
    if (formData.Firstname == "") errors.Firstname = "First Name is Required";
    if (formData.LastName == "") errors.LastName = "Last Name is Required";
    if (formData.Email == "") errors.Email = "E_mail is Required";
    if (formData.MobileNo == "") errors.MobileNo = "MobileNo is Required";
    return errors;
  }

  // On Submit Function

  var Register = async (formData) => {
    var response = await axios.put(`https://62053f31161670001741b6db.mockapi.io/CRUD/${formData.Id}`, {

      Firstname: formData.Firstname,
      Lastname: formData.LastName,
      Email: formData.Email,
      MobileNo: formData.MobileNo,
    })

    console.log(response)

    await setformvalue({ Id: "", Firstname: "", LastName: "", Email: "", MobileNo: "" })

    if (response.statusText === "Created") {
      alert("Registered Successfully")
      Navigate('/')
    }

    else if (response.data === "User Already Exist. Please Login") {
      alert("User Already Exist. Please Login")
      setformvalue({ First_Name: "", Last_Name: "", E_mail: "", Password: "" })
    }
  }
  return (
    <>

      {/* Top Grid */}

      <div class="container   text-center">
        <div class="row TopGrid  align-items-center ">
          <div class="col-md-3 col-sm-3 text-nowrap  mx-auto">
            <div >
              <button class="btn btn-primary btn-sm " onClick={() => Navigate('/')}> List Of Users </button>
            </div>
          </div>
          <div class="col-md-3 col-sm-3  text-nowrap mx-auto">
            <div >
              <button class="btn btn-primary btn-sm" onClick={() => Navigate('/createusers')}> Create Users </button>
            </div>
          </div>
          <div class="col-md-3 col-sm-3 text-nowrap mx-auto ">
            <div >
              <button class="btn btn-primary btn-sm" onClick={() => Navigate('/Editusers')}> Edit Users </button>
            </div>
          </div>
          <div class="col-md-3 col-sm-3 text-nowrap mx-auto">
            <div >
              <button class="btn btn-primary btn-sm" onClick={() => Navigate('/userprofile')}> Users Profile </button>
            </div>
          </div>
        </div>
      </div> <br></br>

      <div class="container   text-center">
        <div class="row TopGrid  align-items-center ">
          <div class="col-xs-12">
            <div >
              Edit Your Details
            </div>
          </div>
        </div>
      </div> <br></br>

      <Formik
        enableReinitialize
        initialValues={formvalue}
        validate={(formData) => validate(formData)}
        onSubmit={(formData) => Register(formData)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>

            {/* Id Input */}

            <div class="container datas text-center">

              <div class="row FirstName rheight align-items-center justify-content-center">
                <div class="col-md-4 col-sm-6 text   ">
                  <label for="Id">Id</label>
                </div>
                <div class="col-md-4 col-sm-6 text   ">
                  <input type="text" class="form-control" placeholder="Enter your Id" name="Id" onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.Id}></input>
                  <span className="errors">{errors.Id && touched.Id && errors.Id}</span>
                </div>
              </div> <br></br>

              {/* First_Name Input */}

              <div class="row FirstName rheight align-items-center justify-content-center">
                <div class="col-md-4 col-sm-6 text   ">
                  <label for="firstname">First Name</label>
                </div>
                <div class="col-md-4 col-sm-6 text   ">
                  <input type="text" class="form-control" placeholder="Enter your Firstname" name="Firstname" onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.Firstname}></input>
                  <span className="errors">{errors.Firstname && touched.Firstname && errors.Firstname}</span>
                </div>
              </div> <br></br>

              {/* Last_Name Input */}

              <div class="row LastName  rheight align-items-center justify-content-center">
                <div class="col-md-4 col-sm-6 text  ">
                  <label for="LastName">LastName</label>
                </div>
                <div class="col-md-4 col-sm-6 text  ">
                  <input type="text" class="form-control" placeholder="Enter your LastName" name="LastName" onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.LastName}></input>
                  <span className="errors">{errors.LastName && touched.LastName && errors.LastName}</span>
                </div>
              </div> <br></br>

              {/* Eamil Input */}

              <div class="row Email rheight align-items-center justify-content-center">
                <div class="col-md-4 col-sm-6 text  ">
                  <label for="Email">Email</label>
                </div>
                <div class="col-md-4 col-sm-6 text  ">
                  <input type="email" class="form-control" placeholder="Enter your Email" name="Email" onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.Email}></input>
                  <span className="errors">{errors.Email && touched.Email && errors.Email}</span>
                </div>
              </div> <br></br>

              {/* Mobile No Input */}

              <div class="row MobileNo rheight align-items-center justify-content-center">
                <div class="col-md-4 col-sm-6 text  ">
                  <label for="MobileNo">MobileNo</label>
                </div>
                <div class="col-md-4 col-sm-6 text  ">
                  <input type="number" class="form-control" placeholder="Enter your MobileNo" name="MobileNo" onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.MobileNo}></input>
                  <span className="errors">{errors.MobileNo && touched.MobileNo && errors.MobileNo}</span>
                </div>
              </div> <br></br>

              {/* submit button */}

              <div class="row MobileNo rheight align-items-center justify-content-center">
                <div class="col-md-4 col-sm-6 text  ">
                  <button type="submit" class="btn btn-primary">submit</button>
                </div>

              </div>

            </div>
          </form>
        )}
      </Formik><br></br>

    </>
  )
}

//Function for user profile

function Profie() {

  const Navigate = useNavigate();

  const [array, setarray] = useState({ Product: [] })

  const [disable, setdisable] = useState(true)

  const [formvalue, setformvalue] = useState({
    Id: "",
  })

  //  Formik Error Validation

  const validate = (formData) => {
    var errors = {};
    if (formData.Id == "") errors.Id = "Id is Required";
    return errors;
  }

  // On submit Function

  const Register = async (formData) => {
    var response = await axios.get(`https://62053f31161670001741b6db.mockapi.io/CRUD/${formData.Id}`)
    console.log(response)
    setarray({ Product: response.data })
    setformvalue({ Id: "" })
  }

  const enablebtn = () => {
    setdisable(false)
  }

  return (
    <>

      {/* Top Grid */}

      <div class="container   text-center">
        <div class="row TopGrid  align-items-center ">
          <div class="col-md-3 col-sm-3 text-nowrap  mx-auto">
            <div >
              <button class="btn btn-primary btn-sm " onClick={() => Navigate('/')}> List Of Users </button>
            </div>
          </div>
          <div class="col-md-3 col-sm-3  text-nowrap mx-auto">
            <div >
              <button class="btn btn-primary btn-sm" onClick={() => Navigate('/createusers')}> Create Users </button>
            </div>
          </div>
          <div class="col-md-3 col-sm-3 text-nowrap mx-auto ">
            <div >
              <button class="btn btn-primary btn-sm" onClick={() => Navigate('/Editusers')}> Edit Users </button>
            </div>
          </div>
          <div class="col-md-3 col-sm-3 text-nowrap mx-auto">
            <div >
              <button class="btn btn-primary btn-sm" onClick={() => Navigate('/userprofile')}> Users Profile </button>
            </div>
          </div>
        </div>
      </div> <br></br>

      <div class="container   text-center">
        <div class="row TopGrid  align-items-center ">
          <div class="col-xs-12">
            <div >
              User Profile
            </div>
          </div>
        </div>
      </div> <br></br>

      <Formik
        enableReinitialize
        initialValues={formvalue}
        validate={(formData) => validate(formData)}
        onSubmit={(formData) => Register(formData)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>

            {/* Id Input */}

            <div class="container datas text-center">

              <div class="row FirstName rheight align-items-center justify-content-center">
                <div class="col-md-4 col-sm-6 text   ">
                  <label for="Id">Id</label>
                </div>
                <div class="col-md-4 col-sm-6 text   ">
                  <input type="text" class="form-control" placeholder="Enter your Id" name="Id" onClick={() => enablebtn()} onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.Id}></input>
                  <span className="errors">{errors.Id && touched.Id && errors.Id}</span>
                </div>
              </div>

              {/* submit button */}

              <div class="row MobileNo rheight align-items-center justify-content-center">
                <div class="col-md-4 col-sm-6 text  ">
                  <button type="submit" class="btn btn-primary">submit</button>
                </div>
              </div>
              <br></br>
            </div>
          </form>
        )}
      </Formik><br></br>

      {/* Table */}

      <div class="container   text-center">
        <div class="row Table  align-items-center ">
          <div class="col-xs-12 table-responsive">
            <Table striped bordered hover table-responsive class="table" border='1'>
              <thead>
                <tr>
                  <td> ID </td>
                  <td> Firstname </td>
                  <td> Lastname </td>
                  <td> Email </td>
                  <td> MobileNo </td>
                </tr>
              </thead>
              <tbody>
                {array.Product.map((row) => (
                  <tr key={row.id}>
                    <td> {row.id} </td>
                    <td>  {row.Firstname}   </td>
                    <td>  {row.Lastname}   </td>
                    <td> {row.Email}  </td>
                    <td>  {row.MobileNo}  </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      {/* Edit Profile Button */}

      <div class="container text-center">
        <div class="row MobileNo rheight align-items-center justify-content-center">
          <div class="col-md-4 col-sm-6 text  ">
            <button type="submit" class="btn btn-primary" disabled={disable} onClick={() => Navigate('/editprofile')}>Edit Profile</button>
          </div>
        </div>
      </div>

    </>
  )
}

// Function for Edit users

function Editusers() {

  const Navigate = useNavigate();

  const [formvalue, setformvalue] = useState({
    Id: "",
    Firstname: "",
    LastName: ""
  })

  // Formik Error Validation

  const validate = (formData) => {
    var errors = {};
    if (formData.Id == "") errors.Id = "Id is Required";
    if (formData.Firstname == "") errors.Firstname = "First Name is Required";
    if (formData.LastName == "") errors.LastName = "Last Name is Required";
    return errors;
  }

  // On Submit Function

  var Register = async (formData) => {
    var response = await axios.put(`https://62053f31161670001741b6db.mockapi.io/CRUD/${formData.Id}`, {

      Firstname: formData.Firstname,
      Lastname: formData.LastName,
    })
    await setformvalue({ Id: "", Firstname: "", LastName: "" })

    Navigate('/')


  }
  return (
    <>

      {/* Top Grid */}

      <div class="container   text-center">
        <div class="row TopGrid  align-items-center ">
          <div class="col-md-3 col-sm-3 text-nowrap  mx-auto">
            <div >
              <button class="btn btn-primary btn-sm " onClick={() => Navigate('/')}> List Of Users </button>
            </div>
          </div>
          <div class="col-md-3 col-sm-3  text-nowrap mx-auto">
            <div >
              <button class="btn btn-primary btn-sm" onClick={() => Navigate('/createusers')}> Create Users </button>
            </div>
          </div>
          <div class="col-md-3 col-sm-3 text-nowrap mx-auto ">
            <div >
              <button class="btn btn-primary btn-sm" onClick={() => Navigate('/Editusers')}> Edit Users </button>
            </div>
          </div>
          <div class="col-md-3 col-sm-3 text-nowrap mx-auto">
            <div >
              <button class="btn btn-primary btn-sm" onClick={() => Navigate('/userprofile')}> Users Profile </button>
            </div>
          </div>
        </div>
      </div> <br></br>

      <div class="container   text-center">
        <div class="row TopGrid  align-items-center ">
          <div class="col-xs-12">
            <div >
              Edit Your Details
            </div>
          </div>
        </div>
      </div> <br></br>

      <Formik
        enableReinitialize
        initialValues={formvalue}
        validate={(formData) => validate(formData)}
        onSubmit={(formData) => Register(formData)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>

            {/* Id Input */}

            <div class="container datas text-center">

              <div class="row FirstName rheight align-items-center justify-content-center">
                <div class="col-md-4 col-sm-6 text   ">
                  <label for="Id">Id</label>
                </div>
                <div class="col-md-4 col-sm-6 text   ">
                  <input type="text" class="form-control" placeholder="Enter your Id" name="Id" onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.Id}></input>
                  <span className="errors">{errors.Id && touched.Id && errors.Id}</span>
                </div>
              </div> <br></br>

              {/* Firstname Input */}

              <div class="row FirstName rheight align-items-center justify-content-center">
                <div class="col-md-4 col-sm-6 text   ">
                  <label for="Firstname">First Name</label>
                </div>
                <div class="col-md-4 col-sm-6 text   ">
                  <input type="text" class="form-control" placeholder="Enter your Firstname" name="Firstname" onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.Firstname}></input>
                  <span className="errors">{errors.Firstname && touched.Firstname && errors.Firstname}</span>
                </div>
              </div> <br></br>

              {/* Lastname Input */}

              <div class="row LastName  rheight align-items-center justify-content-center">
                <div class="col-md-4 col-sm-6 text  ">
                  <label for="LastName">LastName</label>
                </div>
                <div class="col-md-4 col-sm-6 text  ">
                  <input type="text" class="form-control" placeholder="Enter your LastName" name="LastName" onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.LastName}></input>
                  <span className="errors">{errors.LastName && touched.LastName && errors.LastName}</span>
                </div>
              </div> <br></br>

              {/* submit button */}

              <div class="row MobileNo rheight align-items-center justify-content-center">
                <div class="col-md-4 col-sm-6 text  ">
                  <button type="submit" class="btn btn-primary">submit</button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik><br></br>
    </>
  )
}





