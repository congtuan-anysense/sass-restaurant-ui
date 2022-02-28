import styled from "styled-components";

export const Wrapper = styled.div`
  display: block;
  .search-box {
    > .inputs {
      display: flex;
      flex-wrap: wrap;
      .search-box__item {
        width: 50%;
      }
    }
  }
  .w-195px {
    width: 195px;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    text-align: center;
  }

  th {
    border-bottom: 1px solid #979a9c;
    padding: 8px;
  }
  td {
    border-bottom: 0.5px solid #979a9c;
    padding: 8px;
  }
  .pd-34 {
    padding: 34px;
  }
  .export-btn {
    background: #f2f2f2;
    border: 1px solid #c4c4c4;
    box-sizing: border-box;
    border-radius: 3px;
    width: 140px;
    height: 25px;
  }
  .add-mem-btn {
    color: #2f80ed;
    font-size: 16px;
    background: #ffffff;
    border: 1px solid #2f80ed;
    border-radius: 4px;
    padding: 14px 20px;
  }
  .w-300px {
    width: 300px;
  }
`;
