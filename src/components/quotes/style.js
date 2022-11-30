import { default as styled } from "styled-components";

export const QuotesContainer = styled.div`
  padding: 0px 0px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 15px;
    border-bottom: 1px solid #e1e1e1;

    -webkit-box-shadow: 0 8px 6px -6px #e1e1e1;
    -moz-box-shadow: 0 8px 6px -6px #e1e1e1;
    box-shadow: 0 8px 6px -6px #e1e1e1;
    color: #001529;
    .secondary-header-container {
      display: flex;
      align-items: center;
      gap: 15px;

      .back-button {
        cursor: pointer;
        transition: all 0.3s;

        :hover {
          transform: scale(1.3);
        }
      }
    }

    .btns {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    @media (max-width: 596px) {
      flex-direction: column;
      align-items: center;
      padding: 0px 0px 10px 0px;
    }
  }
  .primary-content-container {
    display: flex;
    align-items: center;
    /* justify-content: center; */
    flex-wrap: wrap;
    gap: 20px 60px;
    /* row-gap: 10px; */
    padding: 10px 30px;
    width: 100%;
    height: calc(100vh - 150px);
    overflow: auto;

    @media (max-width: 1095px) {
      justify-content: center;
    }

    .secondary-content-container {
      display: flex;
      flex-direction: column;
      gap: 30px;
      align-items: center;
      justify-content: center;
      width: 300px;
      height: 200px;
      box-shadow: 1px 2px 4px #8d8d8d, inset -1px -1px 3px #e1e1e1;
      padding: 10px;

      .data-holder {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 35px;
      }
    }
  }
`;
