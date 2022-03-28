import React, { useState } from "react";
import styled from "styled-components";
import DownIcon from "assets/images/icons/down.svg";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authModuleSelector } from "store/modules/authModule";
import { clearSession } from "services/utils/auth";
import { PUBLIC_ROUTES } from "router/helpers/publicRoutes";
const BaseHeader: React.FC<{}> = () => {
  const { data } = useSelector(authModuleSelector);
  const [isShowModal, setShowModal] = useState<boolean>(false);
  const history = useHistory();
  const handleLogout = () => {
    clearSession();
    history.push(PUBLIC_ROUTES.login);
  };
  return (
    <Wrapper>
      <div></div>
      <div className="user flex">
        <button
          className="text-18 font-400 text-white"
          onClick={() => {
            setShowModal(!isShowModal);
            setTimeout(() => {
              document.getElementById("user-modal").focus();
            }, 0);
          }}
        >
          {data?.name}
        </button>
        <img src={DownIcon} alt="down-icon" />
        {isShowModal && (
          <div
            tabIndex={1}
            id="user-modal"
            onBlur={() => {
              setShowModal(false);
            }}
            className="user-modal absolute"
          >
            <div>
              <button onMouseDown={handleLogout} className="w-full">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  width: 100%;
  height: 80px;
  background-color: #000000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 22px;
  .user {
    color: #ffffff;
    font-size: 18px;
    font-weight: 400;
    position: relative;
    .user-modal {
      background: #ffffff;
      padding: 10px;
      width: 100px;
      color: #000000;
      border: 1px solid #dff9fb;
      box-shadow: 0 0 0 0;
      border-radius: 5px;
      top: 30px;
      z-index: 1;
      button {
        padding: 10px;
        border-bottom: 1px solid #000000;
        &:hover {
          border-radius: 5px;
          background-color: #30336b;
          color: #fff;
        }
      }
    }
  }
  .flex {
    display: flex;
  }
  .justify-between {
    justify-content: space-between;
  }
  .justify-center {
    justify-content: center;
  }
  .text-18 {
    font-size: 18px;
  }
  .text-white {
    color: #fff;
  }
`;

export default BaseHeader;
