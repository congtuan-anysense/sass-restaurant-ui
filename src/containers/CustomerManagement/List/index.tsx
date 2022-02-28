import GarbageIcon from "assets/images/icons/garbage-dark.svg";
import SearchIcon from "assets/images/icons/search-white.svg";
import BreadcrumbsBar from "components/templates/breadcrumbs/BreadcrumbsBar";
import BaseButton from "components/templates/buttons/BaseButton";
import SelectInput from "components/templates/inputs/SelectInput";
import TextInput from "components/templates/inputs/TextInput";
import BasePagination from "components/templates/pagination/BasePagination";
import { LIMIT_DEFAULT } from "config/app";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PROTECTED_ROUTES } from "router/helpers/protectedRoutes";
import { useQuery } from "services/hooks/useQuery";
import { formatYMD } from "services/utils/datetime";
import {
  customerModuleSelector,
  deleteCustomer,
  getCustomers,
} from "store/modules/customerModule";
import styled from "styled-components";
const ListCustomers: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { customer } = useSelector(customerModuleSelector);
  const query = useQuery();

  useEffect(() => {
    getCustomerList();
  }, [query.get("page")]);

  const getCustomerList = async () => {
    const page = Number(query.get("page"));
    await dispatch(
      getCustomers({
        page: !isNaN(page) && page > 0 ? page : 1,
        limit: LIMIT_DEFAULT,
      })
    );
  };

  const onDelete = useCallback((id: number) => {
    dispatch(deleteCustomer(id));
  }, []);

  return (
    <Wrapper>
      <BreadcrumbsBar
        categoryTree={[
          {
            title: "顧客管理",
            href: "/customer-management",
          },
          {
            title: "顧客一覧",
          },
        ]}
      />
      <div className="container">
        <div className="px-70 mt-50">
          <div className="search-box bg-gray px-55 py-20">
            <div className="inputs">
              <div className="search-box__item">
                <TextInput
                  label="顧客番号"
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                  id="customer-id"
                  className="mb-25 w-300px"
                />
              </div>
              <div className="search-box__item">
                <SelectInput
                  label="顧客タイプ"
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                  id="customer-type"
                  className="mb-25"
                />
              </div>
              <div className="search-box__item">
                <TextInput
                  label="氏名"
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                  id="customer-full-name"
                  className="mb-25 w-300px"
                />
              </div>
              <div className="search-box__item">
                <TextInput
                  label="電話番号"
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                  id="customer-phone-number"
                  className="mb-25 w-300px"
                />
              </div>
            </div>
            <div className="flex justify-center w-80 align-center">
              <div className="submit">
                <BaseButton
                  className="w-195px py-15 justify-evenly"
                  label="顧客を検索"
                  iconSrc={SearchIcon}
                  background="#FFA300"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="table-section pd-34">
          <div className="header flex justify-between align-center">
            <div className="flex align-center">
              <p className="text-14 line-height-14 mr-10">全4件中4件表示</p>
              <div className="filter">
                <select className="px-10 py-5">
                  <option value="50件">50件</option>
                  <option value="60件">60件</option>
                </select>
              </div>
            </div>
            <div className="export-section">
              <button className="export-btn">csvダウンロード</button>
            </div>
          </div>
          <div className="table-main">
            <table>
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>顧客番号</th>
                  <th>氏名</th>
                  <th>電話番号</th>
                  <th>来店回数</th>
                  <th>前回来店日</th>
                  <th>タイプ</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {customer?.customers?.map((customer, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>{customer.attributes.id}</td>
                      <td>
                        <Link
                          className="text-blue"
                          to={PROTECTED_ROUTES.customers_management__detail.pathWithId(
                            customer.attributes.id
                          )}
                        >
                          {customer.attributes.name}
                        </Link>
                      </td>
                      <td>{customer.attributes.phone}</td>
                      <td>{customer.attributes.numberOfVisits}</td>
                      <td>{formatYMD(customer.attributes.lastVisitedDate)}</td>
                      <td>{customer.attributes.customerType}</td>
                      <td>
                        <button
                          onClick={() => {
                            onDelete(customer.attributes.id);
                          }}
                        >
                          <img src={GarbageIcon} alt="garbage" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-15 flex justify-end">
            <Link
              to={PROTECTED_ROUTES.customers_management__register.path}
              className="add-mem-btn decorate-none"
            >
              ＋ 顧客を登録
            </Link>
          </div>
        </div>
        <BasePagination
          totalPage={Math.ceil(
            Number(customer?.paging?.total ?? 0) / LIMIT_DEFAULT
          )}
          total={customer?.paging?.total ?? 0}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: block;
  .search-box {
    > .inputs {
      display: flex;
      flex-wrap: wrap;
      .search-box__item {
        width: 50%;
      }
    }
  }
  .w-195px {
    width: 195px;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    text-align: center;
  }

  th {
    border-bottom: 1px solid #979a9c;
    padding: 8px;
  }
  td {
    border-bottom: 0.5px solid #979a9c;
    padding: 8px;
  }
  .pd-34 {
    padding: 34px;
  }
  .export-btn {
    background: #f2f2f2;
    border: 1px solid #c4c4c4;
    box-sizing: border-box;
    border-radius: 3px;
    width: 140px;
    height: 25px;
  }
  .add-mem-btn {
    color: #2f80ed;
    font-size: 16px;
    background: #ffffff;
    border: 1px solid #2f80ed;
    border-radius: 4px;
    padding: 14px 20px;
  }
  .w-300px {
    width: 300px;
  }
`;
export default ListCustomers;
