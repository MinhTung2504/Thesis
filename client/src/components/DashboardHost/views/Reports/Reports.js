import React, { useEffect, useState } from 'react'
import { Card, Table, Container, Row, Col } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { countCompletedBookingYearByHost, countRevenueYearByHost } from '../../../../actions/statisticByHost';
import { ExportToExcel } from '../../components/ExportToExcel/ExportToExcel';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';

export default function Reports() {
    const { auth } = useSelector((state) => ({ ...state }));
    const { token } = auth;
    const [yearRevenue, setYearRevenue] = useState("2022");
    const [yearBooking, setYearBooking] = useState("2022");
    const [revenueStat, setRevenueStat] = useState([]);
    const [bookingStat, setBookingStat] = useState([]);

    useEffect(() => {
        loadBookingsStat();
        loadRevenueByHost();
    }, []);

    const loadBookingsStat = async () => {
        const res = await countCompletedBookingYearByHost(token, yearBooking);
        setBookingStat(res.data.data);
    };
    const loadRevenueByHost = async () => {
        const res = await countRevenueYearByHost(token, yearRevenue);
        console.log(res.data.data);
        setRevenueStat(res.data.data);
        // setYearArray(res.data.yearArray)
    };
    return (
        <>
            <div className="wrapper">
                <Sidebar />
                <div className="main-panel">
                    <Header />
                    <div className="content">
                        <Container fluid>
                            <Row>
                                <Col md="12">
                                    <Card className="striped-tabled-with-hover">
                                        <Row>
                                            <Col md="10">
                                                <Card.Header>
                                                    <Card.Title as="h4">Reports</Card.Title>
                                                    <p className="card-category">

                                                    </p>
                                                </Card.Header>
                                            </Col>
                                        </Row>
                                        {/* <Card.Body className="table-full-width table-responsive px-0"> */}
                                        <div className="table-responsive">
                                            <h3>Revenue and Booking</h3>
                                            <ExportToExcel revenueStat={revenueStat} bookingStat={bookingStat} />
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
        </>
    )
}
