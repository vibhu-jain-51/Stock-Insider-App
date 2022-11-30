import styled from "styled-components";

export const HomeContainer = styled.div`
  height: 100vh;
  .primary-header-container {
    color: #ffffff;
    font-size: 24px;
    font-weight: 600;
    word-spacing: 5px;
    letter-spacing: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    transition: all 0.3s;
    .search-box {
      width: 400px;

      @media (max-width: 771px) {
        width: calc(100% - 300px);
      }
    }
    @media (max-width: 617px) {
      flex-direction: column;
      height: fit-content;
      padding-bottom: 20px;

      .search-box {
        width: 100%;
      }
    }
  }

  .primary-content-container {
    height: calc(100vh - 64px);
    background: #ffffff;
  }
  .loader-container {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 999;
    user-select: none;
    background: #5252524a;
    transition: all 0.3s;

    svg {
      font-size: 30px;
    }
  }
`;
