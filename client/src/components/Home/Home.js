import React from "react";
import { Carousel } from "react-bootstrap";
import image1 from "../../assets/images/carousel-1.jpg";
import image2 from "../../assets/images/carousel-2.jpg";
import image3 from "../../assets/images/carousel-3.jpg";

export default function Home() {
  return (
    <>
      {/* <div className="container-fluid p-5 text-center">
        <h1>All hotels</h1>
      </div> */}
      <Carousel fade>
        <Carousel.Item
          style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            objectFit: "contain",
          }}
        >
          <img
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
            src={image1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item
          style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            objectFit: "contain",
          }}
        >
          <img
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
            src={image2}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item
          style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            objectFit: "contain",
          }}
        >
          <img
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
            src={image3}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}
