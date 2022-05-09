import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getHostHouses } from "../../actions/house";
import { formatCurrency } from "../../utils";
import HouseItem from "../HouseItem/HouseItem";
import Pagination from "../Pagination/Pagination";
import { useSelector } from "react-redux";
// import "./HouseList.css";

export default function HouseListTable({ handleHouseDelete = (f) => f }) {
  const pageNumber = useParams().pageNumber || 1;
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  // console.log(pageNumber);
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(pageNumber);
  const [pages, setPages] = useState(1);
  // console.log(page);

  useEffect(() => {
    loadHostHouses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadHostHouses = async () => {
    setLoading(true);
    try {
      const res = await getHostHouses(token);
      console.log(res);
      // const { data, pages: totalPages } = await res.json();

      setPages(res.data.pages);
      // setHouses(res.data);
      setHouses(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Some Error Occured");
    }
  };

  return (
    // <div class="card-group">
    //   {houses.map((h) => (
    //     <HouseItem key={h._id} h={h} />
    //   ))}
    // </div>

    <div className="container listItem">
      {loading ? (
        <h3 className="loading-text">Loading...</h3>
      ) : error ? (
        <h3 className="error-text">{error}</h3>
      ) : (
        <>
          <ul className="listItem__room">
            <table class="table table-bordered">
              <thead>
                <tr className="text-center">
                  <th scope="col"></th>
                  <th scope="col">Image</th>
                  <th scope="col">House Title</th>
                  <th scope="col">Price</th>
                  <th scope="col">City</th>
                  <th scope="col">Max Guests</th>
                  <th scope="col">Number of Bedrooms</th>
                  <th scope="col">Property Size</th>
                  <th scope="col">Number of Beds</th>
                  {/* <th scope="col">Hidden/Show</th> */}
                  <th scope="col" colSpan={3}>
                    Actions
                  </th>
                </tr>
              </thead>
              {houses.map((h, index) => (
                <tbody key={h._id} className="text-center">
                  <tr key={h._id}>
                    <th scope="row">{index + 1}</th>
                    {/* <td>{h.country}</td> */}
                    <td>
                      <img
                        src={h.image}
                        key={h._id}
                        className="mw-100"
                        alt="ImageHouse"
                      />
                    </td>
                    <td>{h.title}</td>
                    <td>{formatCurrency(h.price)}</td>
                    <td>{h.city}</td>
                    <td>{h.max_guests}</td>
                    <td>{h.num_bedrooms}</td>
                    <td>{h.size} m2</td>
                    <td>{h.num_beds}</td>
                    {/* <td>
                      <button>Hidden</button>
                    </td> */}
                    <td>
                      <Link to={`/house/edit/${h._id}`}>
                        <button>Edit</button>
                      </Link>
                    </td>

                    <td>
                      <button
                        onClick={() => {
                          handleHouseDelete(h._id);
                          loadHostHouses();
                        }}
                        className="text-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </ul>
          <Pagination page={page} pages={pages} changePage={setPage} />
        </>
      )}
    </div>
  );
}
