import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const BreadcrumbsBar: React.FC<{
  categoryTree: Array<{
    title: string;
    href?: string;
  }>;
}> = React.memo(({ categoryTree }) => {
  return (
    <Wrapper className="flex">
      {categoryTree.map((item, index) => {
        return item.href ? (
          <div key={index}>
            <Link
              className="hover-opacity decorate-none text-dark mr-5"
              to={item.href}
            >
              {item.title}
            </Link>
            <span className="mr-5">{">"}</span>
          </div>
        ) : (
          <p key={index}>{item.title}</p>
        );
      })}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  height: 60px;
  width: 100%;
  padding: 15px 25px;
  background: #f2f2f2;
`;

export default BreadcrumbsBar;
