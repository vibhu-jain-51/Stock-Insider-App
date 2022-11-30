import React from "react";
import { Button, Table } from "antd";
import { useApplicationContext } from "../../context/applicationContext";
import { generatePath, useNavigate } from "react-router-dom";
import { StocksContainer } from "./style";
import { routes } from "../../constants/routes";

const Stocks = () => {
  const { tableColumn, dupTableValues } = useApplicationContext();
  const navigate = useNavigate();

  const handleGoToQuotesPage = (symbol) => {
    let path = generatePath(routes.quotes, { symbol: symbol });
    navigate(path);
  };

  const columnsCreator = () => {
    let tempArray = [];
    tableColumn.forEach((item, index) => {
      let tempObj = {
        title: item,
        dataIndex: item.toLowerCase(),
        key: item.toLowerCase(),

        render: (text) =>
          item === "Symbol" ? (
            <Button
              type="primary"
              onClick={() => {
                handleGoToQuotesPage(text);
              }}
            >
              {text}
            </Button>
          ) : (
            text
          ),
      };
      tempArray.push(tempObj);
    });
    return tempArray;
  };

  const tableValueCreators = () => {
    let tempArray = [];
    dupTableValues.map((item, index) => {
      let tempObj = {
        key: index,
        symbol: item.symbol,
        name: item.name,
        sector: item.sector,
        validtill: item.validTill,
      };
      tempArray.push(tempObj);
    });
    return tempArray;
  };

  const dataSource = tableValueCreators();
  const columns = columnsCreator();

  return (
    <StocksContainer>
      <div className="primary-container">
        <Table
          className="table"
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 7 }}
        />
      </div>
    </StocksContainer>
  );
};

export default Stocks;
