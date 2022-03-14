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
    </Wrapper>
  );
};

export default LayoutCreation;

const Wrapper = styled.div`
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
