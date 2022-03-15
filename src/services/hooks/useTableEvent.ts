import { useDispatch } from "react-redux";
import { deleteTable, updateTable } from "store/modules/tableModule";
import { TableType } from "store/modules/tableModule/type";

export const useTableEvent = (id: number, isPresent: boolean, type: string) => {
  const dispatch = useDispatch();
  const handleMouseUp = (e) => {
    e.preventDefault();
    console.log("mouse up");
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
    const table = document.getElementById(`${type}__${id}`);
    const container = document.getElementById("table-container");
    const boundingContainer = container.getBoundingClientRect();
    const boundingTable = table.getBoundingClientRect();
    const left = pageX - boundingContainer.left - table.clientWidth / 2;
    const top = pageY - boundingContainer.top - table.clientHeight / 2;
    const maxTop = boundingContainer.height - boundingTable.height;
    const maxLeft = boundingContainer.width - boundingTable.width;
    table.style.left = (left < 0 ? 0 : left > maxLeft ? maxLeft : left) + "px";
    table.style.top = (top < 0 ? 0 : top > maxTop ? maxTop : top) + "px";
  };
  const handleRotate = (table: TableType) => {
    dispatch(updateTable(table));
  };
  const handleRemove = () => {
    dispatch(deleteTable(id));
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
