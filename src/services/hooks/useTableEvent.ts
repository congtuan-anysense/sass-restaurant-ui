import { useDispatch } from "react-redux";
import { deleteTable, updateTable } from "store/modules/tableModule";
import { TablePropsType } from "store/modules/tableModule/type";

export const useTableEvent = (table: TablePropsType, isPresent: boolean) => {
  const dispatch = useDispatch();
  const handleMouseUp = (e) => {
    e.preventDefault();
    const container = document.getElementById("table-container");
    container.removeEventListener("mousemove", handleMouseMove);
  };
  const handleMouseDown = (e) => {
    e.preventDefault();
    if (isPresent) return;
    const container = document.getElementById("table-container");
    container.addEventListener("mousemove", handleMouseMove);
  };
  const handleDragStart = (e) => {
    e.preventDefault();
    return false;
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    handleMoveAt(e.clientX, e.clientY);
  };

  const handleMoveAt = (pageX, pageY) => {
    const tableEle = document.getElementById(`${table.type}__${table.id}`);
    const container = document.getElementById("table-container");
    const boundingContainer = container.getBoundingClientRect();
    const boundingTable = tableEle.getBoundingClientRect();
    const left = pageX - boundingContainer.left - tableEle.clientWidth / 2;
    const top = pageY - boundingContainer.top - tableEle.clientHeight / 2;
    const maxTop = boundingContainer.height - boundingTable.height;
    const maxLeft = boundingContainer.width - boundingTable.width;
    const finalLeft = left < 0 ? 0 : left > maxLeft ? maxLeft : left;
    const finalTop = top < 0 ? 0 : top > maxTop ? maxTop : top;
    tableEle.style.left = finalLeft + "px";
    tableEle.style.top = finalTop + "px";
  };
  const handleRotate = (table: TablePropsType) => {
    dispatch(updateTable(table));
  };
  const handleRemove = () => {
    dispatch(deleteTable(table.id));
  };

  return {
    handleMouseUp,
    handleMouseDown,
    handleDragStart,
    handleMouseMove,
    handleMoveAt,
    handleRotate,
    handleRemove,
  };
};
