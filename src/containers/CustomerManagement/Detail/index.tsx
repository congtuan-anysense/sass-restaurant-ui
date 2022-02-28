import GarbageIcon from "assets/images/icons/garbage-dark.svg";
import RightArrow from "assets/images/icons/right-arrow-dark.svg";
import BreadcrumbsBar from "components/templates/breadcrumbs/BreadcrumbsBar";
import BaseButton from "components/templates/buttons/BaseButton";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { PROTECTED_ROUTES } from "router/helpers/protectedRoutes";
import {
  customerModuleSelector,
  getCustomer,
  resetCurrentCustomer,
} from "store/modules/customerModule";
import { Wrapper } from "./style";

const CustomerDetail: React.FC<{}> = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    customer: { current: data },
  } = useSelector(customerModuleSelector);

  useEffect(() => {
    dispatch(getCustomer(id));
    return () => {
      dispatch(resetCurrentCustomer());
    };
  }, [id]);

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
            href: "/customer-management/customers",
          },
          {
            title: "顧客詳細",
          },
        ]}
      />
      <div className="container">
        <h1 className="font-bold mb-30">顧客情報 </h1>
        <div className="flex mb-30">
          <h2 className="text-14 w-150-px">お客様番号</h2>
          <p>{data?.attributes?.id}</p>
        </div>
        <div className="flex mb-30">
          <h2 className="text-14 w-150-px">
            氏名 <span className="text-required">（必須）</span>
          </h2>
          <p>{data?.attributes?.name}</p>
        </div>
        <div className="flex mb-30">
          <h2 className="text-14 w-150-px">
            氏名(カナ)<span className="text-required">（必須）</span>
          </h2>
          <p>{data?.attributes?.nameKana}</p>
        </div>
        <div className="flex mb-30">
          <h2 className="text-14 w-150-px">顧客タイプ</h2>
          <p className="mr-160">{data?.attributes?.customerType}</p>
          <p>
            会社名
            <span className="ml-30">{data?.attributes?.companyName}</span>
          </p>
        </div>
        <div className="flex mb-30">
          <h2 className="text-14 w-150-px">
            電話番号<span className="text-required">（必須）</span>
          </h2>
          <p>{data?.attributes?.phone}</p>
        </div>
        <div className="flex mb-30">
          <h2 className="text-14 w-150-px">郵便番号</h2>
          <p>{data?.attributes?.postcode}</p>
        </div>
        <div className="flex mb-30">
          <h2 className="text-14 w-150-px">都道府県</h2>
          <p>{data?.attributes?.prefecture}</p>
        </div>
        <div className="flex mb-30">
          <h2 className="text-14 w-150-px">市区町村</h2>
          <p>{data?.attributes?.municipality}</p>
        </div>
        <div className="flex mb-30">
          <h2 className="text-14 w-150-px">建物名・号数 </h2>
          <p>{data?.attributes?.buildingAddress}</p>
        </div>
        <div className="flex mb-30">
          <h2 className="text-14 w-150-px">生年月日</h2>
          <p>{data?.attributes?.dateOfBirth}</p>
        </div>
        <div className="flex mb-30">
          <h2 className="text-14 w-150-px">性別</h2>
          {data?.attributes?.gender === "male" && (
            <div>
              <input type="radio" checked onChange={() => {}} />
              <span>男性</span>
            </div>
          )}
          {data?.attributes?.gender === "female" && (
            <div>
              <input type="radio" checked onChange={() => {}} />
              <span>女性</span>
            </div>
          )}
        </div>
        <div className="flex mb-30">
          <h2 className="text-14 w-150-px">メールアドレス</h2>
          <p>{data?.attributes?.email}</p>
        </div>
        <div className="flex mb-30">
          <h2 className="text-14 w-150-px">備考</h2>
          <textarea
            cols={30}
            rows={10}
            placeholder="備考、メモ、。。"
            defaultValue={data?.attributes?.remarks}
            onChange={(e) => {}}
          ></textarea>
        </div>
        <div className="flex mb-30">
          <h2 className="text-14 w-150-px">利用履歴</h2>
          <div className="w-full">
            <div className="flex justify-between usage-history-item">
              <BaseButton
                label="来店待ち"
                textColor="#2F80ED"
                border="#2F80ED"
                background="#fff"
                className="btn-usage text-16"
              />
              <p>2022/02/01　16:00</p>
              <p>５名</p>
              <img src={RightArrow} alt="" />
            </div>
            <div className="flex justify-between usage-history-item">
              <BaseButton
                label="キャンセル"
                textColor="#fff"
                background="#F03A00"
                className="btn-usage text-16"
              />
              <p>2022/01/10　19:00</p>
              <p>５名</p>
              <img src={RightArrow} alt="" />
            </div>
            <div className="flex justify-between usage-history-item">
              <BaseButton
                label="来店済み"
                textColor="#000000"
                border="#000000"
                background="#fff"
                className="btn-usage text-16"
              />
              <p>2022/02/01　16:00</p>
              <p>５名</p>
              <img src={RightArrow} alt="" />
            </div>
            <div className="flex justify-center mt-30">
              <div className="w-half justify-end flex">
                <BaseButton
                  label="一覧に戻る"
                  textColor="#000000"
                  border="#000000"
                  background="#fff"
                  className="btn-footer mr-15 text-16"
                  onClick={() => {
                    history.push(
                      PROTECTED_ROUTES.customers_management__list.path
                    );
                  }}
                />
              </div>
              <div className="flex w-half">
                <BaseButton
                  label="編集"
                  textColor="#000000"
                  border="#000000"
                  background="#fff"
                  className="btn-footer ml-15 text-16"
                  onClick={() => {
                    history.push(
                      PROTECTED_ROUTES.customer_management__edit.pathWithId(id)
                    );
                  }}
                />
                <BaseButton label="" className="p-10" iconSrc={GarbageIcon} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default CustomerDetail;
