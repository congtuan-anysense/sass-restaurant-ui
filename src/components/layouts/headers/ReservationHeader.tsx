import React, { useState } from "react";
import styled from "styled-components";
import DownIcon from "assets/images/icons/down.svg";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authModuleSelector } from "store/modules/authModule";
import { clearSession } from "services/utils/auth";
import { PUBLIC_ROUTES } from "router/helpers/publicRoutes";
import RefreshIcon from "assets/images/icons/refresh.png";
const ReservationHeader: React.FC<{}> = () => {
  const { data } = useSelector(authModuleSelector);
  const [isShowModal, setShowModal] = useState<boolean>(false);
  const history = useHistory();
  const handleLogout = () => {
    clearSession();
    history.push(PUBLIC_ROUTES.login);
  };
  return (
    <Wrapper className="flex justify-between">
      <div className="flex justify-center align-center">
        <span className="font-bold text-30">RESTAURANT</span>
      </div>
      <div className="flex">
        <div className="refresh">
          <button className="flex justify-center align-center refresh-button">
            <img
              src={RefreshIcon}
              className="radius-50 mr-5"
              alt="refresh"
              width="20"
              height="20"
            />
            更新
          </button>
        </div>
        <div className="date flex align-center">
          <div>
            <button>{"<"}</button>
          </div>
          <div>2022年1月1日</div>
          <div>すべて</div>
          <div>
            <button>{">"}</button>
          </div>
        </div>
      </div>
      <div className="user">
        <span>{data?.name.split("")[0].toString().toUpperCase()}</span>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  padding: 10px 20px;
  .user {
    width: 50px;
    height: 50px;
    background-color: #a29bfe;
    border-radius: 50%;
    line-height: 50px;
    text-align: center;
    color: #81ecec;
    cursor: pointer;
    &:hover {
      background-color: #81ecec;
      color: #a29bfe;
      transition: 0.5s;
    }
  }
  .refresh {
    .refresh-button {
      padding: 10px;
      background-color: #f7f1e3;
      border-radius: 4px;
      height: 50px;
      color: #b33939;
      margin-right: 10px;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      &:hover {
        background-color: #706fd3;
        color: #f7f1e3;
        transition: 0.5s;
      }
    }
  }
  .date {
    background-color: #f7f1e3;
    padding: 10px;
    height: 50px;
    line-height: 30px;
    border-radius: 4px;
    color: #b33939;
    margin-left: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    > div {
      border-right: 1px solid #b33939;
      padding: 0 10px;
      &:last-child {
        border-right: none;
      }
      > button {
        color: #b33939;
        font-weight: bold;
        width: 30px;
        &:hover {
          color: #706fd3;
        }
      }
    }
  }
`;

export default ReservationHeader;
