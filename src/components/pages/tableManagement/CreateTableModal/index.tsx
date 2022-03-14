import SelectInput from "components/templates/inputs/SelectInput";
import TextInput from "components/templates/inputs/TextInput";
import React, { useState } from "react";
import { Wrapper } from "./style";

type Props = {
  setShowCreateModal: (isShow: boolean) => void;
  addTables: (tables: any[]) => void;
};

type TableProps = {
  type: string;
  minSize: number;
  maxSize: number;
  clones: number;
};

const InitiateValue = {
  type: null,
  minSize: null,
  maxSize: null,
  clones: null,
};

const CreateTableModal: React.FC<Props> = ({
  setShowCreateModal,
  addTables,
}) => {
  const [table, setTable] = useState<TableProps>(InitiateValue);
  return (
    <Wrapper>
      <div className="modal">
        <div className="flex align-center justify-between mb-35">
          <label className="modal-label" htmlFor="shape">
            テーブル形
          </label>
          <div className="w-75-pc">
            <SelectInput
              className="input-w-full"
              id="shaple"
              onChange={(value) => {
                setTable({ ...table, type: value });
              }}
              activeValue="選択してください"
              options={[
                { label: "長方形", value: "rectangle" },
                {
                  label: "カウンター",
                  value: "counter",
                },
              ]}
            />
          </div>
        </div>
        <div className="flex align-center justify-between mb-35">
          <label className="modal-label">可能人数</label>
          <div className="flex justify-between w-75-pc align-center">
            <div>
              <TextInput
                type="number"
                onChange={(e) => {
                  setTable({ ...table, minSize: Number(e.target.value) });
                }}
                id="minSize"
                className="text-input"
              />
            </div>
            <p>〜</p>
            <div>
              <TextInput
                type="number"
                id="maxSize"
                onChange={(e) => {
                  setTable({ ...table, maxSize: Number(e.target.value) });
                }}
                className="text-input"
              />
            </div>
          </div>
        </div>
        <div className="flex align-center justify-between mb-35">
          <label className="modal-label">可能人数</label>
          <div className="flex justify-between w-75-pc align-center">
            <TextInput
              onChange={(e) => {
                setTable({ ...table, clones: Number(e.target.value) });
              }}
              type="number"
              id="clones"
              className="w-full"
            />
          </div>
        </div>
        <footer className="flex justify-center">
          <button
            className="btn-hover mr-15 footer-btn"
            onClick={() => setShowCreateModal(false)}
          >
            キャンセル
          </button>
          <button
            className="btn-hover ml-15 footer-btn"
            onClick={() => {
              for (let field in table) {
                if (!table[field]) return;
              }
              const tables = Array(table.clones).fill({
                seat: table.maxSize,
                type: table.type,
              });
              addTables(tables);
            }}
          >
            追加
          </button>
        </footer>
      </div>
      <div
        className="backdrop"
        onClick={() => {
          setShowCreateModal(false);
        }}
      ></div>
    </Wrapper>
  );
};

export default CreateTableModal;
