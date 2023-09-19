import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
// import Caraousel from "../components/Caraousel"; // we cant use carousel as component as it was implemented using bootstrap and when we use carousel-search it refreshes our page that is a problem in react so we will write code directly in home page and use hooks so implement search as carousel is only being used once

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    let response = await fetch("http://localhost:4000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();
    // console.log(response[0], response[1]);

    setFoodCat(response[1]);
    setFoodItem(response[0]);
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="myCarousel"
          className="carousel slide carousel-fade "
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-caption" style={{ zIndex: "2" }}>
            {" "}
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button
                className="btn btn-outline-light text-white bg-success"
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              >
                Search
              </button>
            </div>
          </div>
          <div className="carousel-inner" id="carousel">
            {" "}
            <ol className="carousel-indicators">
              <li
                data-target="#myCarousel"
                data-slide-to="0"
                className="active"
              ></li>
              <li data-target="#myCarousel" data-slide-to="1"></li>
              <li data-target="#myCarousel" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  className="d-block w-100 "
                  src="https://source.unsplash.com/random/900x700/?burger"
                  alt="burger"
                  style={{ filter: "brightness(30%)" }}
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src="https://source.unsplash.com/random/900x700/?noodles"
                  style={{ filter: "brightness(30%)" }}
                  alt="noodles"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  style={{ filter: "brightness(30%)" }}
                  src="https://source.unsplash.com/random/900x700/?pizza"
                  alt="pizza"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src="https://source.unsplash.com/random/900x700/?biryani"
                  style={{ filter: "brightness(30%)" }}
                  alt="biryani"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src="https://source.unsplash.com/random/900x700/?icecream"
                  style={{ filter: "brightness(30%)" }}
                  alt="icecream"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src="https://source.unsplash.com/random/900x700/?frenchfries"
                  style={{ filter: "brightness(30%)" }}
                  alt="momos"
                />
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#myCarousel"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#myCarousel"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
      <div className="container">
        {foodCat !== [] // this is condition ? will implement if its true else : will execute
          ? foodCat.map((data) => {
              return (
                <div className="  row mb-2  ">
                  <div key={data._id} className="fs-3 m-3 color-success">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem !== [] ? (
                    foodItem
                      .filter(
                        (item) =>
                          item.CategoryName === data.CategoryName &&
                          item.name
                            .toLowerCase()
                            .includes(search.toLocaleLowerCase())
                      )
                      .map((filterItems) => {
                        return (
                          <div
                            key={filterItems._id}
                            className="col-12 col-md-6 col-lg-3"
                          >
                            <Card
                              // foodName={filterItems.name}
                              foodItem={filterItems}
                              options={filterItems.options[0]}
                              // img={filterItems.img}
                            ></Card>
                          </div>
                        );
                      })
                  ) : (
                    <div>No such data </div>
                  )}
                </div>
              );
            })
          : ""}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
