import React, { useEffect, useState } from "react";
import { Layout, Input } from "antd";
import { HomeContainer } from "./style";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import allApiServices from "../../api-client/services";
import Papa from "papaparse";
import { useApplicationContext } from "../../context/applicationContext";
import Stocks from "../../components/stocks";
import Fuse from "fuse.js";

const { Header, Content } = Layout;

const Home = () => {
  const [loading, setLoading] = useState(false);
  const { setTableColumn, setTableValues, tableValues, setDupTableValues } =
    useApplicationContext();
  // const [tempTableValues, setTempTableValues] = useState([...tableValues]);

  useEffect(() => {
    getAllInstruments();
  }, []);

  const options = {
    keys: [
      "name",
      {
        name: "symbol",
        weight: 10,
      },
    ],
    // includeScore: true,
    // includeMatches: true,
    threshold: 0.3,
  };
  const fuse = new Fuse(tableValues, options);

  const onSearch = (e) => {
    genericHandleSearching(e.target.value);
  };

  function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  const handleChangeInput = debounce((e) => onSearch(e));

  const genericHandleSearching = (value) => {
    if (value === "") {
      setDupTableValues(tableValues);
    } else {
      const searchResult = fuse.search(value);
      let tempArray = [];
      searchResult.forEach((value) => {
        tempArray.push(value.item);
      });
      setDupTableValues(tempArray);
    }
  };

  const getAllInstruments = async () => {
    setLoading(true);
    try {
      const response = await allApiServices.getInstruments();
      if (response) {
        setLoading(false);
        let parseData = Papa.parse(response, { skipEmptyLines: true });
        setTableColumn(parseData.data[0]);
        createTableValues(parseData.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createTableValues = (parseData) => {
    let tempArray = [];
    parseData.forEach((item, index) => {
      if (index === 0) {
        return;
      }
      let [symbol, name, sector, validTill] = item;
      let obj = { symbol, name, sector, validTill };
      tempArray.push(obj);
    });
    setTableValues(tempArray);
  };

  return (
    <HomeContainer>
      {loading ? (
        <div className="loader-container">
          <LoadingOutlined style={{ color: "red" }} />
        </div>
      ) : (
        ""
      )}

      <Layout>
        <Header className="primary-header-container">
          <div>STOCK INSIDER</div>

          <Input
            className="search-box"
            type="text"
            placeholder="Search for name or symbol"
            prefix={<SearchOutlined />}
            // onChange={onSearch}
            onKeyUp={handleChangeInput}
          />
        </Header>
        <Content className="primary-content-container">
          <Stocks />
        </Content>
      </Layout>
    </HomeContainer>
  );
};

export default Home;
