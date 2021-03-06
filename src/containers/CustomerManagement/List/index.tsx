import GarbageIcon from "assets/images/icons/garbage-dark.svg";
import SearchIcon from "assets/images/icons/search-white.svg";
import BreadcrumbsBar from "components/templates/breadcrumbs/BreadcrumbsBar";
import BaseButton from "components/templates/buttons/BaseButton";
import SelectInput from "components/templates/inputs/SelectInput";
import TextInput from "components/templates/inputs/TextInput";
import BasePagination from "components/templates/pagination/BasePagination";
import { LIMIT_DEFAULT } from "config/app";
import { CUSTOMER_TYPE } from "config/const";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { PROTECTED_ROUTES } from "router/helpers/protectedRoutes";
import { useQuery } from "services/hooks/useQuery";
import { formatYMD } from "services/utils/datetime";
import {
  customerModuleSelector,
  deleteCustomer,
  getCustomers,
} from "store/modules/customerModule";
import { CustomerFilterType } from "store/modules/customerModule/type";
import { Wrapper } from "./style";
const ListCustomers: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { customer } = useSelector(customerModuleSelector);
  const query = useQuery();
  const history = useHistory();
  const perPage = query.get("limit") || LIMIT_DEFAULT;
  const page = Number(query.get("page") ?? 1);
  const [filterData, setFilterData] = useState<CustomerFilterType>({});
  useEffect(() => {
    getCustomerList();
  }, [page, perPage]);

  const getCustomerList = () => {
    let payload = {
      ...filterData,
      limit: Number(perPage),
      ...(page > 0 && { page: page }),
    };
    dispatch(getCustomers(payload));
  };

  const numberOfCustomersOnPage = () => {
    const { total, limit, page } = customer?.paging;
    if (total < limit) return total;
    const records = total - (page - 1) * limit;
    return records > limit ? limit : records;
  };

  const getPathWithPageValueDown = (currentPage: number): string => {
    const search = window.location.search;
    const newSearch = search.replace(
      `page=${currentPage}`,
      `page=${currentPage - 1}`
    );
    return window.location.pathname + newSearch;
  };

  const onDelete = (id: number) => {
    dispatch(
      deleteCustomer(id, async () => {
        if (numberOfCustomersOnPage() === 1) {
          history.push(getPathWithPageValueDown(page));
          return;
        } else {
          await getCustomerList();
        }
      })
    );
  };
  const getPathWithLimitChange = (limit: string): string => {
    const search = window.location.search;
    if (!search) {
      return `${window.location.pathname}?limit=${limit}`;
    }
    if (!search.includes("limit=")) {
      return `${window.location.pathname}${search}&limit=${limit}`;
    }
    const newSearch = search.replace(`limit=${perPage}`, `limit=${limit}`);
    return `${window.location.pathname}${newSearch}`;
  };

  const handleChangeLimit = (limit: string) => {
    history.push(getPathWithLimitChange(limit));
  };

  return (
    <Wrapper>
      <BreadcrumbsBar
        categoryTree={[
          {
            title: "????????????",
            href: "/",
          },
          {
            title: "????????????",
          },
        ]}
      />
      <div className="container">
        <div className="px-70 mt-50">
          <div className="search-box bg-gray px-55 py-20">
            <div className="inputs">
              <div className="search-box__item">
                <TextInput
                  label="????????????"
                  onChange={(e) => {
                    setFilterData({
                      ...filterData,
                      customerNumber: e.target.value,
                    });
                  }}
                  id="customer-id"
                  className="mb-25 w-300px"
                />
              </div>
              <div className="search-box__item">
                <SelectInput
                  label="???????????????"
                  options={CUSTOMER_TYPE}
                  onChange={(value) => {
                    setFilterData({ ...filterData, customerType: value });
                  }}
                  id="customer-type"
                  className="mb-25"
                />
              </div>
              <div className="search-box__item">
                <TextInput
                  label="??????"
                  onChange={(e) => {
                    setFilterData({ ...filterData, name: e.target.value });
                  }}
                  id="customer-full-name"
                  className="mb-25 w-300px"
                />
              </div>
              <div className="search-box__item">
                <TextInput
                  label="????????????"
                  onChange={(e) => {
                    setFilterData({ ...filterData, phone: e.target.value });
                  }}
                  id="customer-phone-number"
                  type="number"
                  className="mb-25 w-300px"
                />
              </div>
            </div>
            <div className="flex justify-center w-80 align-center">
              <div className="submit">
                <BaseButton
                  className="w-195px py-15 justify-evenly"
                  label="???????????????"
                  iconSrc={SearchIcon}
                  background="#FFA300"
                  onClick={getCustomerList}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="table-section pd-34">
          <div className="header flex justify-between align-center">
            <div className="flex align-center">
              <p className="text-14 line-height-14 mr-10">
                ???{numberOfCustomersOnPage()}??????
                {customer?.paging?.total || ""}?????????
              </p>
              <div className="filter">
                <select
                  className="px-10 py-5"
                  onChange={(e) => handleChangeLimit(e.target.value)}
                  defaultValue={perPage}
                >
                  <option value="10">10???</option>
                  <option value="20">20???</option>
                  <option value="30">30???</option>
                  <option value="40">40???</option>
                  <option value="50">50???</option>
                  <option value="60">60???</option>
                </select>
              </div>
            </div>
            <div className="export-section">
              <button className="export-btn">csv??????????????????</button>
            </div>
          </div>
          <div className="table-main">
            <table>
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>????????????</th>
                  <th>??????</th>
                  <th>????????????</th>
                  <th>????????????</th>
                  <th>???????????????</th>
                  <th>?????????</th>
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
              ??? ???????????????
            </Link>
          </div>
        </div>
        <BasePagination
          totalPage={Math.ceil(
            Number(customer?.paging?.total ?? 0) / Number(perPage)
          )}
        />
      </div>
    </Wrapper>
  );
};

export default ListCustomers;
