import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  get_product_request,
  product_filter,
  product_search,
} from "../Redux/ProductConstant";
import "../Styles/styles.css";
import SingleProductCard from "./SingleProductCard";
import cart from "/cart.svg";
import search from "/search.svg";
export default function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartData } = useSelector((state) => state.CartReducer);
  const { fetchedData, filterData, loading, error } = useSelector(
    (state) => state.productReducer
  );
  const mappingData = filterData.length ? filterData : fetchedData;
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState([]);

  const selectCategoryHandler = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setSelectedCategory([...selectedCategory, value]);
    } else {
      setSelectedCategory([...selectedCategory.filter((e) => e != value)]);
    }
  };
  const searchDataHandler = (e) => {
    setSearchInput(e.target.value);
    const newData = [];
    mappingData.map((elem) => {
      if (elem.name.toLowerCase().includes(searchInput.toLowerCase())) {
        newData.push(elem);
      }
    });
    setData(newData);
  };

  useEffect(() => {
    dispatch(product_filter(selectedCategory));
  }, [selectedCategory]);

  useEffect(() => {
    dispatch(get_product_request());
  }, []);
  return (
    <div>
      <nav id="navBar">
        <div className="menu">
          <h3>TeeRex Store</h3>
          <div style={{ display: "flex", position: "relative" }}>
            <img
              width={"30px"}
              src={cart}
              alt="cart-svg"
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/cart");
              }}
            />
            <span id="cart_item_count">{cartData ? cartData.length : ""}</span>
          </div>
        </div>
      </nav>
      <div className="searchDiv">
        <input
          type="text"
          placeholder="Search for products..."
          onChange={searchDataHandler}
        />
        <div className="searchIconDiv">
          <img width={"30px"} src={search} alt="search" />
        </div>
      </div>

      <div className="contentDiv">
        <div className="filter_div">
          {/* color filter box */}
          <div className="checkBoxDiv">
            <h4>Color</h4>
            <div className="check_box">
              <input
                type="checkbox"
                name=""
                onChange={selectCategoryHandler}
                value={"Red"}
              />{" "}
              <label htmlFor="">Red</label>
            </div>
            <div className="check_box">
              <input
                type="checkbox"
                name=""
                onChange={selectCategoryHandler}
                value={"Blue"}
              />{" "}
              <label htmlFor="">Blue</label>
            </div>
            <div className="check_box">
              <input
                type="checkbox"
                name=""
                onChange={selectCategoryHandler}
                value={"Green"}
              />{" "}
              <label htmlFor="">Green</label>
            </div>
          </div>
          {/* gender filter box */}
          <div className="checkBoxDiv">
            <h4>Gender</h4>
            <div className="check_box">
              <input
                type="checkbox"
                name=""
                onChange={selectCategoryHandler}
                value={"Men"}
              />{" "}
              <label htmlFor="">Men</label>
            </div>
            <div className="check_box">
              <input
                type="checkbox"
                name=""
                onChange={selectCategoryHandler}
                value={"Women"}
              />{" "}
              <label htmlFor="">Women</label>
            </div>
          </div>
          {/* price filter box */}
          <div className="checkBoxDiv">
            <h4>Price</h4>
            <div className="check_box">
              <input
                type="checkbox"
                name=""
                onChange={selectCategoryHandler}
                value={"250"}
              />{" "}
              <label htmlFor="">₹ 0 - 250</label>
            </div>
            <div className="check_box">
              <input
                type="checkbox"
                name=""
                onChange={selectCategoryHandler}
                value={"251"}
              />{" "}
              <label htmlFor="">₹ 251-450</label>
            </div>
            <div className="check_box">
              <input
                type="checkbox"
                name=""
                onChange={selectCategoryHandler}
                value={"450"}
              />{" "}
              <label htmlFor="">₹ 450</label>
            </div>
          </div>
          {/* type filter div */}
          <div className="checkBoxDiv">
            <h4>Type</h4>
            <div className="check_box">
              <input
                type="checkbox"
                name=""
                onChange={selectCategoryHandler}
                value={"Polo"}
              />{" "}
              <label htmlFor="">Polo</label>
            </div>
            <div className="check_box">
              <input
                type="checkbox"
                name=""
                onChange={selectCategoryHandler}
                value={"Hoodie"}
              />{" "}
              <label htmlFor="">Hoodie</label>
            </div>
            <div className="check_box">
              <input
                type="checkbox"
                name=""
                onChange={selectCategoryHandler}
                value={"Basic"}
              />{" "}
              <label htmlFor="">Basic</label>
            </div>
          </div>
        </div>
        <div className="product_list_div">
          {loading ? (
            <div>
              <h1>Loading...</h1>
            </div>
          ) : error ? (
            <div>
              <h1>Something Went Wrong...</h1>
            </div>
          ) : data.length > 0 ? (
            data.map((item) => {
              return <SingleProductCard item={item} key={item.id} />;
            })
          ) : (
            mappingData.map((item) => {
              return <SingleProductCard item={item} key={item.id} />;
            })
          )}
        </div>
      </div>
    </div>
  );
}
