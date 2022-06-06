import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { Slider, TextField } from "@material-ui/core";
import "./FilterHouses.css";
import { destinations } from "../../utils";
import { getAllHouses } from "../../actions/house";
import { useParams } from "react-router-dom";
import HouseItem from "../HouseItem/HouseItem";

export default function FilterHouses() {
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
  const [sliderMax, setSliderMax] = useState(20000000);
  const [filter, setFilter] = useState("");
  const [priceRange, setPriceRange] = useState([0, 20000000]);

  useEffect(() => {
    loadAllHouses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, city, sort, numGuests, priceRange]);

  const loadAllHouses = async () => {
    setLoading(true);
    try {
      const res = await getAllHouses(page, city, sort, numGuests, filter);
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
          <div class="py-2 ml-3">
            <h6 class="font-weight-bold">Destinations</h6>
            <div id="orange">
              <span class="fa fa-minus"></span>
            </div>
            <div class="form-group">
              <label for="cities">Choose a destination:</label>

              <select
                id="cities"
                name="cities"
                value={city}
                onChange={handleCity}
                className="form-control"
              >
                <option>All Cities</option>
                {destinations.map((des) => (
                  <option value={"city=" + des.city}>{des.city}</option>
                ))}
              </select>
            </div>
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
          <div class="py-2 ml-3">
            <h6 class="font-weight-bold">Destinations</h6>
            <div id="orange">
              <span class="fa fa-minus"></span>
            </div>

            <div class="form-group">
              <label for="cities">Choose a destination:</label>

              <select
                id="cities"
                name="cities"
                value={city}
                onChange={handleCity}
                className="form-control"
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
                    <option value="">Newest</option>
                    <option value="sort=oldest">Oldest</option>
                    <option value="sort=-price">Price: Hight-Low</option>
                    <option value="sort=price">Price: Low-Hight</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row">
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
        </section>
      </div>
    </>
  );
}
