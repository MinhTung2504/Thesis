import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import HouseList from "../HouseList/HouseList";
import { Slider, TextField } from "@material-ui/core";
import "./FilterHouses.css";
import { destinations } from "../../utils";
import { getAllHouses } from "../../actions/house";
import { useParams } from "react-router-dom";
import HouseItem from "../HouseItem/HouseItem";
import Pagination from "../Pagination/Pagination";

export default function FilterHouses() {
  const [sliderMax, setSliderMax] = useState(1000);
  const [filter, setFilter] = useState();
  const [priceRange, setPriceRange] = useState([200, 500]);
  const pageNumber = useParams().pageNumber || 1;
  // console.log(pageNumber);
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(pageNumber);
  const [pages, setPages] = useState(1);
  const [sort, setSort] = useState("");
  const [numGuests, setNumGuests] = useState(1);
  const [city, setCity] = useState("");

  useEffect(() => {
    loadAllHouses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, city, sort, numGuests]);

  const loadAllHouses = async () => {
    setLoading(true);
    try {
      const res = await getAllHouses(page, city, sort, numGuests);
      // console.log(res);
      // const { data, pages: totalPages } = await res.json();

      setPages(res.data.pages);
      // const finalData = res.data.data.filter((h) => (h.title = "Hello"));

      // setHouses(res.data.data);
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
    buildRangeFilter();
  };

  const buildRangeFilter = (newValue) => {
    const urlFilter = `?price[gte]=${newValue[0]}&price[lte]=${newValue[1]}`;

    setFilter(urlFilter);
  };

  console.log(city);
  return (
    <>
      <Header type="" />
      <div class="container-fluid">
        <div class="filter">
          <button
            class="btnFilter btnFilter-default"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mobile-filter"
            aria-expanded="false"
            aria-controls="mobile-filter"
            aria-label="Toggle navigation"
          >
            Filters<span class="fa fa-filter pl-1"></span>
          </button>
        </div>
        <div id="mobile-filter">
          <div class="border-bottom pb-2 ml-2">
            <h4 id="burgundy">Filters</h4>
          </div>
          <div class="py-2 border-bottom ml-3">
            <h6 class="font-weight-bold">Price</h6>
            <div id="orange">
              <span class="fa fa-minus"></span>
            </div>
            <Slider
              min={0}
              max={sliderMax}
              value={priceRange}
              valueLabelDisplay="auto"
              // disabled={loading}
              onChange={(e, newValue) => setPriceRange(newValue)}
              onChangeCommitted={onSliderCommitHandler}
            />

            <div className="">
              <TextField
                size="small"
                id="lower"
                label="Min Price"
                variant="outlined"
                type="number"
                disabled={loading}
                value={0}
                // onChange={(e) => handlePriceInputChange(e, "lower")}
                // onBlur={onTextfieldCommitHandler}
              />

              <TextField
                size="small"
                id="upper"
                label="Max Price"
                variant="outlined"
                type="number"
                disabled={loading}
                value={20}
                // onChange={(e) => handlePriceInputChange(e, "upper")}
                // onBlur={onTextfieldCommitHandler}
              />
            </div>
          </div>
          <div class="py-2 ml-3">
            <h6 class="font-weight-bold">Destinations</h6>
            <div id="orange">
              <span class="fa fa-minus"></span>
            </div>
            {destinations.map((des) => (
              <div class="form-group" key={des.id}>
                <input
                  type="checkbox"
                  // checked={checked.includes(des.id)}
                  // onChange={() => handleCheck(des.id)}
                />
                <label>{des.city}</label>
              </div>
            ))}
          </div>
        </div>

        <section
          id="sidebar"
          style={{ position: "sticky", height: "max-content" }}
        >
          <div class="border-bottom pb-2 ml-2">
            <h4 id="burgundy">Filters</h4>
          </div>
          <div class="py-2 border-bottom ml-3">
            <h6 class="font-weight-bold">Price</h6>
            <div id="orange">
              <span class="fa fa-minus"></span>
            </div>
            <Slider
              min={0}
              max={sliderMax}
              value={priceRange}
              valueLabelDisplay="auto"
              // disabled={loading}
              onChange={(e, newValue) => setPriceRange(newValue)}
              onChangeCommitted={onSliderCommitHandler}
            />

            <div className="">
              <TextField
                size="small"
                id="lower"
                label="Min Price"
                variant="outlined"
                type="number"
                disabled={loading}
                value={0}
                // onChange={(e) => handlePriceInputChange(e, "lower")}
                // onBlur={onTextfieldCommitHandler}
              />

              <TextField
                size="small"
                id="upper"
                label="Max Price"
                variant="outlined"
                type="number"
                disabled={loading}
                value={20}
                // onChange={(e) => handlePriceInputChange(e, "upper")}
                // onBlur={onTextfieldCommitHandler}
              />
            </div>
          </div>
          <div class="py-2 ml-3">
            <h6 class="font-weight-bold">Destinations</h6>
            <div id="orange">
              <span class="fa fa-minus"></span>
            </div>

            <div class="form-group">
              {/* <input
                  type="radio"
                  checked={checked.includes(des.city)}
                  onChange={() => handleCheck(des.city)}
                />
                <label>{des.city}</label> */}
              <label for="cities">Choose a destination:</label>

              <select
                id="cities"
                name="cities"
                value={city}
                onChange={handleCity}
              >
                <option>All Cities</option>
                {destinations.map((des) => (
                  <option value={"city=" + des.city}>{des.city}</option>
                ))}
              </select>
            </div>
          </div>

          <div class="py-2 ml-3">
            <h6 class="font-weight-bold">Others</h6>
            <div id="orange">
              <span class="fa fa-minus"></span>
            </div>

            <div class="form-group">
              {/* <input
                  type="radio"
                  checked={checked.includes(des.city)}
                  onChange={() => handleCheck(des.city)}
                />
                <label>{des.city}</label> */}
              <label for="max_guests">Choose a num guests:</label>
              <select
                name="numGuest"
                id="numGuest"
                value={numGuests}
                onChange={(e) => setNumGuests(e.target.value)}
                className="form-control"
              >
                <option value="">Number of Guests</option>
                <option value="max_guests=1">1</option>
                <option value="max_guests=2">2</option>
                <option value="max_guests=3">3</option>
                <option value="max_guests=4">4</option>
                <option value="max_guests=5">5</option>
                <option value="max_guests=6">6</option>
              </select>
            </div>
          </div>
        </section>
        <section id="products">
          <div class="container">
            <div class="d-flex flex-row">
              <div class="ml-auto mr-lg-4">
                <div id="sorting" class="border rounded p-1 m-1">
                  <span class="text-muted">Sort by</span>
                  <select
                    name="sort"
                    id="sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="popularity">Newest</option>
                    <option value="sort=oldest">Oldest</option>
                    <option value="sort=-price">Price: Hight-Low</option>
                    <option value="sort=price">Price: Low-Hight</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row">
              {/* <div class="row row-cols-1 row-cols-md-3 g-4"> */}
              {/* <HouseList checked={checked} /> */}
              {/* </div> */}
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
                    {/* <Pagination
                      page={page}
                      pages={pages}
                      changePage={setPage}
                    /> */}

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
        </section>
      </div>
    </>
  );
}
