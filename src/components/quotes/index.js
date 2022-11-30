import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import allApiServices from "../../api-client/services";
import { Radio } from "antd";
import { QuotesContainer } from "./style";
import { LeftCircleFilled } from "@ant-design/icons";

var interval;

const Quotes = () => {
  const { symbol } = useParams();
  const [quotes, setQuotes] = useState([]);
  // const [currentTime, setCurrentTime] = useState(new Date());
  const [indexArray, setIndexArray] = useState([]);
  const [value, setValue] = useState();

  useEffect(() => {
    if (symbol) {
      requestQuotes(symbol);
    }
  }, [symbol]);

  useEffect(() => {
    if (indexArray.length === 5) {
      setIndexArray([]);
      requestQuotes(symbol);
    }
  }, [indexArray]);

  const handleRadioChange = (e) => {
    setValue(e.target.value);
    sortData();
  };

  const handleBackButton = () => {
    clearInterval(interval);
    window.history.back();
  };

  const sortData = (tempVal = [...quotes]) => {
    if (value === 1) {
      let arr = [...tempVal];
      let x = arr.sort(function (a, b) {
        return new Date(b.valid_till) - new Date(a.valid_till);
      });

      setQuotes(x);
    } else {
      let arr = [...tempVal];
      let temp = arr.sort(function (a, b) {
        return new Date(a.valid_till) - new Date(b.valid_till);
      });

      setQuotes(temp);
    }
  };

  const requestQuotes = async (symbol) => {
    try {
      let response = await allApiServices.getQuotes(symbol);
      if (response.success) {
        setQuotes(response.payload[Object.keys(response.payload)]);
        clearInterval(interval);
        interval = setInterval(() => {
          continuousCall(response.payload[Object.keys(response.payload)]);
        }, 15000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const continuousCall = (data) => {
    let temp = [...indexArray];

    data.forEach((item, index) => {
      if (
        new Date(`${item.valid_till} UTC`).toLocaleString() <
        new Date().toLocaleString()
      ) {
        if (temp.includes(index)) {
          return;
        } else {
          temp.push(index);
        }
      } else return;
    });
    updateIndexArray(temp);
  };

  const updateIndexArray = (value) => {
    setIndexArray(value);
  };

  return (
    <QuotesContainer>
      <div className="header-container">
        <div className="secondary-header-container">
          <LeftCircleFilled
            className="back-button"
            onClick={handleBackButton}
          />
          <h1>{symbol}</h1>
        </div>
        <div className="btns">
          <b>Sort by TimeStamp</b>
          <Radio.Group onChange={handleRadioChange} value={value}>
            <Radio value={1}>Ascending</Radio>
            <Radio value={2}>Descending</Radio>
          </Radio.Group>
        </div>
      </div>

      <div className="primary-content-container">
        {quotes &&
          quotes.map((item, index) => {
            return (
              <div key={index} className="secondary-content-container">
                <div className="data-holder">
                  <b>Price:</b>
                  {item.price}&nbsp;Rs
                </div>
                <div className="data-holder">
                  <b>Time:</b>
                  {new Date(`${item.time} UTC`).toLocaleString()}
                </div>
                <div className="data-holder">
                  <b>Valid Till</b>
                  {new Date(`${item.valid_till} UTC`).toLocaleString()}
                </div>
              </div>
            );
          })}
      </div>
    </QuotesContainer>
  );
};

export default Quotes;
