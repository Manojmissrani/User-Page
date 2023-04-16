import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {CreatePost, AdminApproval,Emailverification, ForgotPassword, Home,Login,PostDetails,Profile,Signup, Rejected } from '../../pages'
// import AdminApproval from '../../pages/adminverification'
const RouterNavigation = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/SignUp' element={<Signup />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/Forgot-Password' element={<ForgotPassword />} />
                <Route path='/Emailverification' element={<Emailverification />} />
                <Route path='/Profile' element={<Profile />} />
                <Route path='/Create-Post' element={<CreatePost />} />
                <Route path='/Waitingforapproval' element={<AdminApproval />} />
                <Route path='/Rejected' element={<Rejected />} />
                <Route path="/Post-Details/:id" element={<PostDetails />}/>
            </Routes>
        </BrowserRouter>
    )
}
export default RouterNavigation