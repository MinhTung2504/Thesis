import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { Slider, TextField } from "@material-ui/core";
import "./FilterHouses.css";
// import { destinations } from "../../utils";
import { getAllHouses } from "../../actions/house";
import { useParams } from "react-router-dom";
import HouseItem from "../HouseItem/HouseItem";
import { getAllDestinations } from "../../actions/destination";
import Footer from "../Footer/Footer";

export default function FilterHouses() {
  const pageNumber = useParams().pageNumber || 1;
  // console.log(pageNumber);
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(pageNumber);
  const [pages, setPages] = useState(1);
  const [sort, setSort] = useState("");
  const [numGuests, setNumGuests] = useState("");
  const [city, setCity] = useState("");
  const [sliderMax, setSliderMax] = useState(20000000);
  const [filter, setFilter] = useState("");
  const [priceRange, setPriceRange] = useState([0, 20000000]);
  const [destinations, setDestinations] = useState([]);
  const [numBedrooms, setNumBedrooms] = useState("")
  const [numBathrooms, setNumBathrooms] = useState("")

  useEffect(() => {
    loadAllHouses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, city, sort, numGuests, priceRange, numBedrooms, numBathrooms]);

  useEffect(() => {
    loadAllDes();
  }, []);

  const loadAllDes = async () => {
    const des = await getAllDestinations();

    setDestinations(des.data);
  };

  const loadAllHouses = async () => {
    setLoading(true);
    try {
      const res = await getAllHouses(page, city, sort, numGuests, filter, numBedrooms, numBathrooms);
      setPages(res.data.pages);
      setHouses(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Some Error Occured");
    }
  };
  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const onSliderCommitHandler = (e, newValue) => {
    buildRangeFilter(newValue);
  };

  const buildRangeFilter = (newValue) => {
    const urlFilter = `price[gte]=${newValue[0]}&price[lte]=${newValue[1]}`;

    setFilter(urlFilter);
  };

  return (
    <>
      <Header type="" />
      <div className="container-fluid">
        <div className="filter">
          <button
            className="btnFilter btnFilter-default"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mobile-filter"
            aria-expanded="false"
            aria-controls="mobile-filter"
            aria-label="Toggle navigation"
          >
            Filters<span className="fa fa-filter pl-1"></span>
          </button>
        </div>
        <div id="mobile-filter">
          <div className="border-bottom pb-2 ml-2">
            <h4 id="burgundy">Filters</h4>
          </div>
          <div className="py-2 border-bottom ml-3">
            <h6 className="font-weight-bold">Price</h6>
            <div id="orange">
              <span className="fa fa-minus"></span>
            </div>
            <Slider
              min={0}
              max={sliderMax}
              value={priceRange}
              disabled={loading}
              onChange={(e, newValue) => setPriceRange(newValue)}
              onChangeCommitted={onSliderCommitHandler}
              step={100000}
            />

            <div className="form-group">
              <TextField
                size="small"
                id="lower"
                label="Min Price"
                variant="outlined"
                disabled
                type="number"
                value={priceRange[0]}
                className="form-control"
              />

              <TextField
                size="small"
                id="upper"
                label="Max Price"
                variant="outlined"
                type="number"
                disabled
                value={priceRange[1]}
                className="form-control mt-3"
              />
            </div>
          </div>
          <div className="py-2 ml-3">
            <h6 className="font-weight-bold">Destinations</h6>
            <div id="orange">
              <span className="fa fa-minus"></span>
            </div>
            <div className="form-group">
              <label htmlFor="cities">Choose A Destination:</label>

              <select
                id="cities"
                name="cities"
                value={city}
                onChange={handleCity}
                className="form-control"
              >
                <option>All Destinations</option>
                {destinations.map((des) => (
                  <option key={des._id} value={"city=" + des.city}>
                    {des.city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="py-2 ml-3">
            <h6 className="font-weight-bold">Others</h6>
            <div id="orange">
              <span className="fa fa-minus"></span>
            </div>

            <div className="form-group">
              <label htmlFor="max_guests">Choose No. Max Guests:</label>
              <select
                name="numGuest"
                id="numGuest"
                value={numGuests}
                onChange={(e) => setNumGuests(e.target.value)}
                className="form-control"
              >
                <option value="">All</option>
                <option value="max_guests=1">1</option>
                <option value="max_guests=2">2</option>
                <option value="max_guests=3">3</option>
                <option value="max_guests=4">4</option>
                <option value="max_guests=5">5</option>
                <option value="max_guests=6">6</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="numBedrooms">Choose No. Bedrooms:</label>
              <select
                name="numBedrooms"
                id="numBedrooms"
                value={numBedrooms}
                onChange={(e) => setNumBedrooms(e.target.value)}
                className="form-control"
              >
                <option value="">All</option>
                <option value="num_bedrooms=1">1</option>
                <option value="num_bedrooms=2">2</option>
                <option value="num_bedrooms=3">3</option>
                <option value="num_bedrooms=4">4</option>
                <option value="num_bedrooms=5">5</option>
                <option value="num_bedrooms=6">6</option>
                <option value="num_bedrooms=7">7</option>
                <option value="num_bedrooms=8">8</option>
                <option value="num_bedrooms=9">9</option>
                <option value="num_bedrooms=10">10</option>
                <option value="num_bedrooms=11">11</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="numBathrooms">Choose No. Bathrooms:</label>
              <select
                name="numBathrooms"
                id="numBathrooms"
                value={numBathrooms}
                onChange={(e) => setNumBathrooms(e.target.value)}
                className="form-control"
              >
                <option value="">All</option>
                <option value="num_bathrooms=1">1</option>
                <option value="num_bathrooms=2">2</option>
                <option value="num_bathrooms=3">3</option>
                <option value="num_bathrooms=4">4</option>
                <option value="num_bathrooms=5">5</option>
                <option value="num_bathrooms=6">6</option>
                <option value="num_bathrooms=7">7</option>
                <option value="num_bathrooms=8">8</option>
                <option value="num_bathrooms=9">9</option>
                <option value="num_bathrooms=10">10</option>
                <option value="num_bathrooms=11">11</option>
              </select>
            </div>
          </div>
        </div>

        <section
          id="sidebar"
          style={{ position: "sticky", height: "max-content" }}
        >
          <div className="border-bottom pb-2 ml-2">
            <h4 id="burgundy">Filters</h4>
          </div>
          <div className="py-2 border-bottom ml-3">
            <h6 className="font-weight-bold">Price</h6>
            <div id="orange">
              <span className="fa fa-minus"></span>
            </div>
            <Slider
              min={0}
              max={sliderMax}
              value={priceRange}
              disabled={loading}
              onChange={(e, newValue) => setPriceRange(newValue)}
              onChangeCommitted={onSliderCommitHandler}
              step={100000}
            />

            <div className="form-group">
              <TextField
                size="small"
                id="lower"
                label="Min Price"
                variant="outlined"
                disabled
                type="number"
                value={priceRange[0]}
                className="form-control"
              />

              <TextField
                size="small"
                id="upper"
                label="Max Price"
                variant="outlined"
                type="number"
                disabled
                value={priceRange[1]}
                className="form-control mt-3"
              />
            </div>
          </div>
          <div className="py-2 ml-3">
            <h6 className="font-weight-bold">Destinations</h6>
            <div id="orange">
              <span className="fa fa-minus"></span>
            </div>

            <div className="form-group">
              <label htmlFor="cities">Choose A Destination:</label>

              <select
                id="cities"
                name="cities"
                value={city}
                onChange={handleCity}
                className="form-control"
              >
                <option>All Destinations</option>
                {destinations.map((des) => (
                  <option key={des._id} value={"city=" + des.city}>
                    {des.city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="py-2 ml-3">
            <h6 className="font-weight-bold">Others</h6>
            <div id="orange">
              <span className="fa fa-minus"></span>
            </div>

            <div className="form-group">
              <label htmlFor="max_guests">Choose No. Max Guests:</label>
              <select
                name="numGuest"
                id="numGuest"
                value={numGuests}
                onChange={(e) => setNumGuests(e.target.value)}
                className="form-control"
              >
                <option value="">All</option>
                <option value="max_guests=1">1</option>
                <option value="max_guests=2">2</option>
                <option value="max_guests=3">3</option>
                <option value="max_guests=4">4</option>
                <option value="max_guests=5">5</option>
                <option value="max_guests=6">6</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="numBedrooms">Choose No. Bedrooms:</label>
              <select
                name="numBedrooms"
                id="numBedrooms"
                value={numBedrooms}
                onChange={(e) => setNumBedrooms(e.target.value)}
                className="form-control"
              >
                <option value="">All</option>
                <option value="num_bedrooms=1">1</option>
                <option value="num_bedrooms=2">2</option>
                <option value="num_bedrooms=3">3</option>
                <option value="num_bedrooms=4">4</option>
                <option value="num_bedrooms=5">5</option>
                <option value="num_bedrooms=6">6</option>
                <option value="num_bedrooms=7">7</option>
                <option value="num_bedrooms=8">8</option>
                <option value="num_bedrooms=9">9</option>
                <option value="num_bedrooms=10">10</option>
                <option value="num_bedrooms=11">11</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="numBathrooms">Choose No. Bathrooms:</label>
              <select
                name="numBathrooms"
                id="numBathrooms"
                value={numBathrooms}
                onChange={(e) => setNumBathrooms(e.target.value)}
                className="form-control"
              >
                <option value="">All</option>
                <option value="num_bathrooms=1">1</option>
                <option value="num_bathrooms=2">2</option>
                <option value="num_bathrooms=3">3</option>
                <option value="num_bathrooms=4">4</option>
                <option value="num_bathrooms=5">5</option>
                <option value="num_bathrooms=6">6</option>
                <option value="num_bathrooms=7">7</option>
                <option value="num_bathrooms=8">8</option>
                <option value="num_bathrooms=9">9</option>
                <option value="num_bathrooms=10">10</option>
                <option value="num_bathrooms=11">11</option>
              </select>
            </div>
          </div>
        </section>
        <section id="products">
          <div className="container">
            <div className="d-flex flex-row">
              <div className="ml-auto mr-lg-4">
                <div id="sorting" className="border rounded p-1 m-1">
                  <span className="text-muted">Sort by</span>
                  <select
                    name="sort"
                    id="sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="">Newest</option>
                    <option value="sort=oldest">Oldest</option>
                    <option value="sort=-price">Price: Hight-Low</option>
                    <option value="sort=price">Price: Low-Hight</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="container listItem">
                {loading ? (
                  <h3 className="loading-text">Loading...</h3>
                ) : error ? (
                  <h3 className="error-text">{error}</h3>
                ) : (
                  <>
                    <div className="row row-cols-1 row-cols-lg-3 g-4">
                      {houses.map((h) => (
                        <HouseItem key={h._id} h={h} />
                      ))}
                    </div>

                    <div>
                      {houses.length < 9 ? (
                        ""
                      ) : (
                        <>
                          {page > 1 && (
                            <button onClick={() => setPage(page - 1)}>
                              Previous
                            </button>
                          )}
                          <button onClick={() => setPage(page + 1)}>
                            Next
                          </button>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <Footer />
        </section>
      </div>

    </>
  );
}
