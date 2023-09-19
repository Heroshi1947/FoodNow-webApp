import React, { useState, useEffect, useRef } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  // code for managing dropdown buttons
  let data = useCart();
  let dispatch = useDispatchCart();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty, setqty] = useState(1);
  const [size, setSize] = useState("");

  const priceRef = useRef();

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
        });
        return;
      }
      return;
    }
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
  };

  // formula for final price
  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  return (
    <div className="d-flex justify-content-center">
      <div
        className="card mt-3 "
        style={{
          width: "18rem",
          Height: "340px",
        }}
      >
        <img
          className="card-img-top"
          // src={`https://source.unsplash.com/random/?${props.foodName}`}
          src={props.foodItem.img}
          alt="Card image cap"
          style={{ maxHeight: "180px", objectFit: "fill" }}
        />
        <div className="card-body ">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <hr />
          <div className="container w-100">
            {/* select + option will create dropdown button*/}
            <select
              className=" h-100  bg-success rounded"
              onChange={(e) => {
                setqty(e.target.value);
              }}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {" "}
                    {i + 1}{" "}
                  </option>
                );
              })}
            </select>

            <select
              className="m-2 h-100 bg-success rounded"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100 fs-6">
              &nbsp; &nbsp;₹{finalPrice}/-
            </div>
          </div>
        </div>
        <button
          className={"btn btn-success justify-center ms-2 "}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
