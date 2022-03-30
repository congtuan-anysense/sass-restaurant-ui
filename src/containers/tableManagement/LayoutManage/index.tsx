import CreateTableModal from "components/pages/tableManagement/CreateTableModal";
import CounterTable from "components/templates/tables/CounterTable";
import RectangleTable from "components/templates/tables/RectangleTable";
import {
  INIT_FLOOR_ID,
  INIT_TABLE_ID,
  TABLE_ADDITION_ID_PREFIX,
} from "config/const";
import { MIN_ERROR_TABLE_POSITION } from "config/style";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTables,
  getFloorDetail,
  tableModuleSelector,
  updateLocalTablesData,
  updatePresentStatus,
  updateTables,
} from "store/modules/tableModule";
import { Wrapper } from "./style";

const LayoutManage = () => {
  const [isShowCreateModal, setShowCreateModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const {
    floor: { tables },
    isPresent,
  } = useSelector(tableModuleSelector);
  useEffect(() => {
    dispatch(getFloorDetail(INIT_FLOOR_ID));
  }, []);
  const handleAddTables = (tabs) => {
    let startPosition = 0;
    let lastId = tables[tables.length - 1]?.id ?? INIT_TABLE_ID;
    let lastIdStr = lastId.toString();
    if (lastIdStr.includes(TABLE_ADDITION_ID_PREFIX)) {
      lastId = Number(lastIdStr.split(TABLE_ADDITION_ID_PREFIX)[1]);
    }
    const targetTables = tabs.map((table) => {
      const res = {
        customerCapacity: table.seat,
        properties: {
          ...table,
          top: startPosition + MIN_ERROR_TABLE_POSITION,
          left: startPosition,
          id: TABLE_ADDITION_ID_PREFIX + ++lastId,
          rotate: 0,
        },
      };
      startPosition += MIN_ERROR_TABLE_POSITION;
      return res;
    });
    dispatch(addTables(targetTables));
    setShowCreateModal(false);
    setPresent(false);
  };
  const setPresent = (value = !isPresent) => {
    dispatch(updatePresentStatus(value));
  };
  const handleNext = () => {
    dispatch(updateLocalTablesData(tables));
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
        {tables?.map((table, index) => {
          if (table?._destroy) return null;
          switch (table?.properties?.type) {
            case "rectangle":
              return (
                <RectangleTable
                  {...table.properties}
                  key={index}
                ></RectangleTable>
              );
            case "counter":
              return (
                <CounterTable {...table.properties} key={index}></CounterTable>
              );
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
        {!isPresent && tables.length > 0 && (
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
