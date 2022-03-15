import CreateTableModal from "components/pages/tableManagement/CreateTableModal";
import CounterTable from "components/templates/tables/CounterTable";
import RectangleTable from "components/templates/tables/RectangleTable";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTables,
  tableModuleSelector,
  updateLocalTablesData,
  updatePresentStatus,
  updateTables,
} from "store/modules/tableModule";
import { Wrapper } from "./style";

const LayoutManage = () => {
  const [isShowCreateModal, setShowCreateModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { tables, isPresent } = useSelector(tableModuleSelector);
  const handleAddTables = (tabs) => {
    let startPosition = 0;
    let lastId = tables[tables.length - 1]?.id ?? 1;
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
  const setPresent = (value = !isPresent) => {
    dispatch(updatePresentStatus(value));
  };
  const handleNext = () => {
    const tablesData = tables.map((table) => {
      const tableEle = document.getElementById(`${table.type}__${table.id}`);
      const tableStyleComputed = getComputedStyle(tableEle);
      const top = Number(tableStyleComputed.top.split("px")[0]);
      const left = Number(tableStyleComputed.left.split("px")[0]);
      return { ...table, top: top, left: left };
    });
    updateLocalTablesData(
      tablesData,
      () => {
        dispatch(updateTables(tablesData));
      },
      (error) => console.log(error)
    );
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
        <button
          className="btn-hover mr-15 footer-btn"
          onClick={() => setPresent(false)}
        >
          戻る
        </button>
        <button
          className="btn-hover ml-15 mr-15 footer-btn"
          onClick={handleNext}
        >
          次へ
        </button>
        {!isPresent && (
          <button
            className="btn-hover ml-15 footer-btn"
            onClick={() => setPresent()}
          >
            プレビュー
          </button>
        )}
      </footer>
    </Wrapper>
  );
};

export default LayoutManage;
