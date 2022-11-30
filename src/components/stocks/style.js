import { default as styled } from "styled-components";

export const StocksContainer = styled.div`
  /* height: 100%; */
  overflow: auto;
  padding: 10px;
  margin-bottom: 10px;
  .primary-container {
    border: 1px solid #cdcdcd;
    box-shadow: 5px 1px 8px #9a9a9a;
    overflow: auto;
    .table {
      overflow: auto;
    }
  }
`;
