import React from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import about_us_1 from "../../assets/images/about-us-img-1.jpg";
import about_us_2 from "../../assets/images/about-us-img-2.png";
import about_us_3 from "../../assets/images/about-us-img-3.png";
import { Link } from 'react-router-dom';

export default function AboutUs() {
    return (
        <>
            <Header />
            <div className="bg-light">
                <div className="container py-5">
                    <div className="row h-100 align-items-center py-5">
                        <div className="col-lg-6">
                            <h1 className="display-6">About Nice HomeStay</h1>
                            <p className=" text-muted mb-0">Nice HomeStay is a technology platform created to connect rental needs between: organizations/individuals specializing in home rental business and organizations/individuals wishing to rent houses for vacation purposes. different services, in order to improve the service experience.</p>
                        </div>
                        <div className="col-lg-6 d-none d-lg-block"><img src={about_us_1} alt="" className="img-fluid" /></div>
                    </div>
                </div>
            </div>

            <div className="bg-white py-5">
                <div className="container py-5">

                    <div className="row align-items-center">
                        <div className="col-lg-5 px-5 mx-auto"><img src={about_us_2} alt="" className="img-fluid mb-4 mb-lg-0" /></div>
                        <div className="col-lg-6">
                            <h2 className="font-weight-light">Our Website</h2>
                            <p className="font-italic text-muted mb-4">Our beautifully designed, easy-to-use web app brings Nice HomeStay travel content closer to you and enhances your experience.</p>
                            <Link to="/" className="btn btn-light px-5 rounded-pill shadow-sm">Discover Now</Link>
                        </div>
                    </div>
                    <div className="row align-items-center mb-5">
                        <div className="col-lg-6 order-2 order-lg-1">
                            <h2 className="font-weight-light">Our HomeStay</h2>
                            <p className="font-italic text-muted mb-4">We have a lot of information about rental properties in popular destinations at great prices</p>
                            <Link to="/houses-filter" className="btn btn-light px-5 rounded-pill shadow-sm">Discover Now</Link>
                        </div>
                        <div className="col-lg-5 px-5 mx-auto order-1 order-lg-2"><img src={about_us_3} alt="" className="img-fluid mb-4 mb-lg-0" /></div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}
