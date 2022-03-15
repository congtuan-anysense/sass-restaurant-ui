import CreateTableModal from "components/pages/tableManagement/CreateTableModal";
import CounterTable from "components/templates/tables/CounterTable";
import RectangleTable from "components/templates/tables/RectangleTable";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTables,
  tableModuleSelector,
  updatePresentStatus,
} from "store/modules/tableModule";
import styled from "styled-components";

const TableManagement = () => {
  const [isShowCreateModal, setShowCreateModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { tables, isPresent } = useSelector(tableModuleSelector);
  const handleAddTables = (tabs) => {
    let startPosition = 0;
    let lastId = tables[tables.length - 1].id;
    const targetTables = tabs.map((table) => {
      const res = {
        ...table,
        top: startPosition,
        left: startPosition,
        id: ++lastId,
        rotate: 0,
      };
      startPosition += 20;
      return res;
    });
    dispatch(addTables(targetTables));
    setShowCreateModal(false);
  };
  const togglePresent = () => {
    dispatch(updatePresentStatus(!isPresent));
  };
  return (
    <Wrapper>
      <h1 className="font-bold text-36 text-center">レイアウト登録</h1>
      <div className="flex justify-end">
        <button
          onClick={() => {
            setShowCreateModal(true);
          }}
          className="btn-hover bd-blue bg-none pd-12 radius-4 mb-5 text-blue"
        >
          ＋ テーブル追加
        </button>
      </div>
      <div className="layout-box" id="table-container">
        {tables.map((table, index) => {
          switch (table?.type) {
            case "rectangle":
              return <RectangleTable {...table} key={index}></RectangleTable>;
            case "counter":
              return <CounterTable {...table} key={index}></CounterTable>;
          }
        })}

        <div className="payment-box flex justify-center align-center">
          <p className="text-36">レージ</p>
        </div>
        {isShowCreateModal && (
          <CreateTableModal
            addTables={handleAddTables}
            setShowCreateModal={setShowCreateModal}
          />
        )}
      </div>
      <footer className="footer flex justify-center mt-80">
        <button className="btn-hover mr-15 footer-btn">戻る</button>
        <button className="btn-hover ml-15 mr-15 footer-btn">次へ</button>
        <button className="btn-hover ml-15 footer-btn" onClick={togglePresent}>
          プレビュー
        </button>
      </footer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;

  padding: 80px;

  .bd-blue {
    border: 1px solid #2f80ed;
  }
  .bg-none {
    background: none;
  }
  .pd-12 {
    padding: 12px;
  }
  .radius-4 {
    border-radius: 4px;
  }
  .mb-5 {
    margin-bottom: 5px;
  }
  .mr-25 {
    margin-right: 25px;
  }
  .mb-35 {
    margin-bottom: 35px;
  }
  .layout-box {
    position: relative;
    overflow: scroll;
    background: rgba(216, 215, 215, 0.52);
    border: none;
    width: 100%;
    height: auto;
    min-height: 720px;
    .payment-box {
      width: 238px;
      height: 147px;
      background: #ffffff;
      border: 1px solid #000000;
      box-sizing: border-box;
      position: absolute;
      bottom: 15px;
      left: 15px;
    }
  }
  .footer-btn {
    width: 100px;
    border: 1px solid #000000;
    border-radius: 4px;
    padding: 10px 0;
  }
  .mt-80 {
    margin-top: 80px;
  }
  .btn-hover {
    &:hover {
      background: #30336b;
      color: #ffffff;
      transform: 0.2s;
    }
  }
`;
export default TableManagement;
