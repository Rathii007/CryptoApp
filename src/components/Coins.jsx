import React, { useState, useEffect } from "react";
import { Loader } from "./Loader";
import axios from "axios";
import { BaseUrl } from "./baseUrl";
import Header from "./Header";
import { Link } from "react-router-dom";
import "./Coins.css";

const Coins = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState("inr");
  const [search, setSearch] = useState(""); // Corrected line
  const currencySymbol = currency === "inr" ? "₹" : "$";

  useEffect(() => {
    const getCoinsData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${BaseUrl}/coins/markets?vs_currency=${currency}`,
          params: {
            callback: "callback",
          },
        });

        console.log(response.data);
        setCoins(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Axios Error:", error);
        setLoading(false);
      }
    };

    getCoinsData();
  }, [currency]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Your Coins"
              style={{
                height: "2rem",
                width: "20rem",
                position: "absolute",
                top: "19%",
                left: "1%",
                paddingLeft: "5px",
              }}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="btns">
            <button onClick={() => setCurrency("inr")}>INR</button>
            <button onClick={() => setCurrency("usd")}>USD</button>
          </div>
          <div className="coin-cards-container">
            {coins
              .filter((data) => {
                if (search === "") {
                  return true;
                } else {
                  return data.name.toLowerCase().includes(search.toLowerCase());
                }
              })
              .map((coindata, i) => (
                <CoinCard
                  key={i}
                  coindata={coindata}
                  id={coindata.id}
                  i={i}
                  currencySymbol={currencySymbol}
                />
              ))}
          </div>
        </>
      )}
    </>
  );
};

const CoinCard = ({ coindata, i, currencySymbol, id }) => {
  const profit = coindata.price_change_percentage_24h > 0;
  return (
    <Link
      to={`/coins/${id}`}
      style={{ color: "black", textDecoration: "none" }}
    >
      <div key={i} className="ex-cards">
        <div className="image">
          <img height="70px " src={coindata.image} alt="" />
        </div>
        <div className="name">{coindata.name}</div>
        <div className="price">
          {currencySymbol}
          {coindata.current_price.toFixed(0)}
        </div>
        <div
          style={profit ? { color: "green" } : { color: "red" }}
          className="rank"
        >
          {profit
            ? "+" + coindata.price_change_percentage_24h.toFixed(2)
            : coindata.price_change_percentage_24h.toFixed(2)}
        </div>
      </div>
    </Link>
  );
};

export default Coins;
