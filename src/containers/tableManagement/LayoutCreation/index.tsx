import React, { useRef, useState } from "react";
import styled from "styled-components";
const LayoutCreation: React.FC<{}> = ({}) => {
  const [items, setItems] = useState([
    { id: 1, top: 100, left: 100, width: 50, height: 50 },
    { id: 2, top: 300, left: 300, width: 50, height: 50 },
  ]);
  const draggingItem = useRef(null);

  const handleDragStart = (e) => {
    e.stopPropagation();
    const item = items.find((item) => item.id == e.target.id);
    draggingItem.current = item;
  };
  const handleDragEnd = (e) => {
    setTimeout(() => {
      e.target.classList.remove("empty");
      const rect = e.target.getBoundingClientRect();
    }, 0);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragEnter = (e) => {
    e.preventDefault();
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.add("empty");
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const box = document.querySelector(".box");
    const boxBounding = box.getBoundingClientRect();
    const lastItem = items[items.length - 1];
    const newItem = {
      id: lastItem.id + 1,
      left: e.clientX - boxBounding.left,
      top: e.clientY - boxBounding.top,
      width: 50,
      height: 50,
    };
    const newItems = items.filter((item) => item.id != draggingItem.current.id);
    setItems([...newItems, newItem]);
  };
  return (
    <Wrapper className="flex justify-between">
      <div className="layout-container">
        <div
          className="box"
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {items.map((item, index) => {
            return (
              <BoxItem
                key={index}
                top={item.top}
                left={item.left}
                draggable
                id={item.id}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              ></BoxItem>
            );
          })}
        </div>
      </div>
      <div className="table-info">
        <h1 className="font-bold text-center">TABLE INFORMATION</h1>
        <div className="form-control">
          <label htmlFor="name">Table Name</label>
          <div>
            <input
              className="input-control"
              id="name"
              type="text"
              defaultValue="A12"
            />
          </div>
        </div>
        <div className="form-control">
          <label htmlFor="name">Type</label>
          <div>
            <input
              className="input-control"
              type="text"
              defaultValue="Pentry"
            />
          </div>
        </div>
        <div className="form-control">
          <label htmlFor="name">Color</label>
          <div>
            <input className="input-control" type="text" defaultValue="Brown" />
          </div>
        </div>
        <div className="form-control">
          <label htmlFor="name">Maximum size(person)</label>
          <div>
            <input className="input-control" type="text" defaultValue="20" />
          </div>
        </div>
        <div className="form-control flex justify-end">
          <button className="submit-btn">Create</button>
        </div>
      </div>
    </Wrapper>
  );
};

export default LayoutCreation;

const Wrapper = styled.div`
  background-color: rgb(245, 245, 245);
  .invisible {
    invisible: hidden;
  }
  .empty {
    display: inline-block;
    background: white;
  }
  .layout-container {
    width: 100%;
    padding: 20px;
    height: auto;
    > .box {
      position: relative;
      background-color: #ffffff;
      border: 1px solid #ffffff;
      height: 100%;
      border-radius: 4px;
    }
  }

  .table-info {
    background-color: #ffffff;
    width: 300px;
    height: auto;
    border: 1px solid #ffffff;
    border-top: none;
    border-right: none;
    //border-radius: 0 0 0 15px;
    box-shadow: 0 0 3px 0 rgb(0 0 0 / 6%);
    padding: 20px;
  }
  .form-control {
    margin: 30px 0;
    > label {
      color: #2c3e50;
      font-weight: bold;
    }
    .input-control {
      border: none;
      border-bottom: 2px solid #ebebeb;
      color: #2f3640;
      padding: 5px 10px;
      width: -webkit-fill-available;
    }
  }
  .submit-btn {
    background-color: #273c75;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    color: #fff;
    &:hover {
      background-color: #40739e;
    }
  }
`;

const BoxItem = styled.div<{ top: number; left: number }>`
  position: absolute;
  width: 50px;
  height: 50px;
  background: #2980b9;
  border: none;
  top: ${(prop) => prop.top}px;
  left: ${(prop) => prop.left}px;
  transform: translate(-50%, -50%);
`;
