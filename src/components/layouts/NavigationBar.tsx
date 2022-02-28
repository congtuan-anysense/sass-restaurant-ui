import React from "react";
import styled from "styled-components";
import DownIcon from "assets/images/icons/down-dark.svg";
import { Link } from "react-router-dom";
import { PROTECTED_ROUTES } from "router/helpers/protectedRoutes";

const NavigationTree = [
  {
    title: "ダッシュボード",
    href: "/",
    level: 1,
    hasChildren: false,
  },
  {
    title: "顧客管理",
    href: "/customer-management",
    level: 1,
    hasChildren: true,
  },
  {
    title: "顧客一覧",
    href: PROTECTED_ROUTES.customers_management__list.path,
    level: 2,
    hasChildren: false,
  },
  {
    title: "顧客登録",
    href: PROTECTED_ROUTES.customers_management__register.path,
    level: 2,
    hasChildren: false,
  },
  {
    title: "来店履歴",
    href: "/",
    level: 2,
    hasChildren: false,
  },
  {
    title: "予約管理",
    href: "/",
    level: 1,
    hasChildren: true,
  },
  {
    title: "予約一覧",
    href: "/",
    level: 2,
    hasChildren: false,
  },
  {
    title: "予約状況（カレンダー）",
    href: "/",
    level: 2,
    hasChildren: false,
  },
  {
    title: "テーブル管理",
    href: "/",
    level: 2,
    hasChildren: false,
  },
  {
    title: "予約登録",
    href: "/",
    level: 2,
    hasChildren: false,
  },
  {
    title: "メール送信",
    href: "/",
    level: 1,
    hasChildren: true,
  },
  {
    title: "設定",
    href: "/",
    level: 1,
    hasChildren: true,
  },
  {
    title: "権限設定",
    href: "/",
    level: 1,
    hasChildren: true,
  },
];

const NavigationItem: React.FC<{
  title: string;
  href: string;
  level: number;
  hasChildren: boolean;
}> = ({ title, href, level, hasChildren }) => {
  return (
    <NavigationItemWrapper className="flex justify-between">
      <Link
        className={`ml-${
          (level - 1) * 25
        } text-16 decorate-none text-dark hover-opacity`}
        to={href}
      >
        {title}
      </Link>
      {hasChildren && <img src={DownIcon} alt="down-icon" />}
    </NavigationItemWrapper>
  );
};

const NavigationItemWrapper = styled.div`
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #c4c4c4;
  border-right: 1px solid #c4c4c4;
  padding: 15px 30px;
  display: flex;
  align-items: center;
  .ml-25 {
    margin-left: 25px;
  }
  .text-16 {
    font-size: 16px;
  }
`;

const NavigationBar: React.FC<{}> = () => {
  return (
    <Wrapper>
      {NavigationTree.map((item, index) => {
        return (
          <NavigationItem
            key={index}
            title={item.title}
            href={item.href}
            level={item.level}
            hasChildren={item.hasChildren}
          />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 230px;
`;

export default NavigationBar;
