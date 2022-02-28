import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "services/hooks/useQuery";
import styled from "styled-components";

const BasePagination: React.FC<{ total: number; totalPage: number }> = ({
  total,
  totalPage,
}) => {
  const query = useQuery();
  const page = Number.parseInt(query.get("page"));
  const [activePage, setActivePage] = useState<number>(() => {
    return isNaN(page) || !query.get("page") ? 1 : page;
  });
  useEffect(() => {
    let page = Number.parseInt(query.get("page"));
    page = isNaN(page) || !query.get("page") ? 1 : page;
    setActivePage(page);
  }, [query.get("page")]);

  return (
    <Wrapper>
      <p className="description text-center">全3件中3件表示</p>
      <div className="flex justify-center mt-15">
        <Link
          to={`${window.location.pathname}?page=${
            activePage > 1 ? activePage - 1 : 1
          }`}
          className="pagination-item decorate-none"
        >
          前
        </Link>
        {new Array(totalPage).fill("").map((item, index) => {
          return (
            <Link
              className={`pagination-item decorate-none ${
                index + 1 === activePage ? "active" : ""
              }`}
              key={index}
              to={`${window.location.pathname}?page=${index + 1}`}
            >
              {index + 1}
            </Link>
          );
        })}
        <Link
          to={`${window.location.pathname}?page=${
            activePage < totalPage ? activePage + 1 : 1
          }`}
          className="pagination-item decorate-none"
        >
          次
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .pagination-item {
    padding: 5px;
    width: 30px;
    height: 30px;
    font-size: 14px;
    color: #2f80ed;
    background: #fff;
    border: 1px solid #c4c4c4;
    border-right: none;
    box-sizing: border-box;
    text-align: center;
  }
  .pagination-item:first-child {
    border-radius: 3px 0px 0px 3px;
  }
  .pagination-item:last-child {
    border-radius: 0px 3px 3px 0px;
    border-right: 1px solid #c4c4c4;
  }
  .pagination-item.active {
    background: #2f80ed;
    color: #fff;
  }
  .pagination-item:hover {
    opacity: 0.75;
    transition: 0.2s;
  }
`;

export default BasePagination;
