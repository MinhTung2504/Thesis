import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllHouses } from "../../actions/house";
import HouseItem from "../HouseItem/HouseItem";
import Pagination from "../Pagination/Pagination";
import "./HouseList.css";

export default function HouseList() {
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
  // console.log(page);
  useEffect(() => {
    loadAllHouses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadAllHouses = async () => {
    setLoading(true);
    try {
      // const res = await getAllHouses(page);
      const res = await getAllHouses(page, city, sort, numGuests);
      // console.log(res);
      // const { data, pages: totalPages } = await res.json();

      setPages(res.data.pages);
      setHouses(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Some Error Occured");
    }
  };

  return (
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
          <Pagination page={page} pages={pages} changePage={setPage} />
        </>
      )}
    </div>
  );
}
