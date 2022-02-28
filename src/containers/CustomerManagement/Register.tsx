import PlusIcon from "assets/images/icons/plus-dark.svg";
import BreadcrumbsBar from "components/templates/breadcrumbs/BreadcrumbsBar";
import BaseButton from "components/templates/buttons/BaseButton";
import CheckBoxInput from "components/templates/inputs/CheckBoxInput";
import SelectInput from "components/templates/inputs/SelectInput";
import TextInput from "components/templates/inputs/TextInput";
import React, { useState } from "react";
import styled from "styled-components";

type UsageHistory = {
  date: string;
  isChecked: boolean;
  numberOfPeople: number;
};

const useageHistoryInitiate = [
  {
    date: "1970/10/10",
    isChecked: true,
    numberOfPeople: 3,
  },
];

const ListCustomers: React.FC<{}> = () => {
  const [usageHistories, setUsageHistories] = useState<Array<UsageHistory>>(
    useageHistoryInitiate
  );
  const [sex, setSex] = useState<string>("");
  return (
    <Wrapper>
      <BreadcrumbsBar
        categoryTree={[
          {
            title: "顧客管理",
            href: "/customer-management",
          },
          {
            title: "顧客登録",
          },
        ]}
      />
      <div className="container">
        <h1 className="font-bold mb-30">顧客情報 </h1>
        <div className="flex mb-30 align-center">
          <h2 className="text-14 w-150-px">お客様番号</h2>
          <div className="flex w-full">
            <TextInput
              id="customer-id"
              onChange={(e) => {
                console.log(e.target.value);
              }}
              className="w-half px-20"
              defaultValue="登録後に自動反映"
            />
          </div>
        </div>
        <div className="flex mb-30 align-center">
          <h2 className="text-14 w-150-px">
            氏名 <span className="text-required">（必須）</span>
          </h2>
          <div className="flex w-full">
            <TextInput
              id="customer-id"
              onChange={(e) => {
                console.log(e.target.value);
              }}
              className="w-half px-20"
              defaultValue="山本"
            />
            <TextInput
              id="customer-id"
              onChange={(e) => {
                console.log(e.target.value);
              }}
              className="w-half px-20"
              defaultValue="太郎"
            />
          </div>
        </div>
        <div className="flex mb-30 align-center">
          <h2 className="text-14 w-150-px">
            氏名<span className="text-required">（必須）</span>
          </h2>
          <div className="flex w-full">
            <TextInput
              id="customer-id"
              onChange={(e) => {
                console.log(e.target.value);
              }}
              className="w-half px-20"
              defaultValue="ヤマモト"
            />
            <TextInput
              id="customer-id"
              onChange={(e) => {
                console.log(e.target.value);
              }}
              className="w-half px-20"
              defaultValue="タロウ"
            />
          </div>
        </div>
        <div className="flex mb-30 align-center">
          <h2 className="text-14 w-150-px">顧客タイプ</h2>
          <div className="flex w-full">
            <div className="flex justify-between px-20 w-half align-center">
              <SelectInput
                onChange={(e) => {
                  console.log(e.target.value);
                }}
                id="customer-type"
              />
              <label htmlFor="customer-company-name">会社名</label>
            </div>
            <TextInput
              id="customer-company-name"
              onChange={(e) => {
                console.log(e.target.value);
              }}
              className="w-half px-20"
            />
          </div>
        </div>
        <div className="flex mb-30">
          <h2 className="text-14 w-150-px">
            電話番号<span className="text-required">（必須）</span>
          </h2>
          <div className="flex w-full">
            <TextInput
              id="customer-id"
              onChange={(e) => {
                console.log(e.target.value);
              }}
              className="w-half px-20"
            />
          </div>
        </div>
        <div className="flex mb-30 align-center">
          <h2 className="text-14 w-150-px">電話番号</h2>
          <div className="flex w-full align-center">
            <TextInput
              id="customer-id"
              onChange={(e) => {
                console.log(e.target.value);
              }}
              className="px-20"
              defaultValue="1000001"
            />
            <BaseButton
              label="住所検索"
              background="#FFA300"
              className="text-16 address-btn"
            />
          </div>
        </div>
        <div className="flex mb-30 align-center">
          <h2 className="text-14 w-150-px">都道府県</h2>
          <div>
            <SelectInput
              onChange={(e) => {
                console.log(e.target.value);
              }}
              id="customer-type"
            />
          </div>
        </div>
        <div className="flex mb-30 align-center">
          <h2 className="text-14 w-150-px">市区町村</h2>
          <TextInput
            id="customer-id"
            onChange={(e) => {
              console.log(e.target.value);
            }}
            className="px-20 w-full"
            defaultValue="品川区南大井"
          />
        </div>
        <div className="flex mb-30 align-center">
          <h2 className="text-14 w-150-px">番地以降</h2>
          <TextInput
            id="customer-id"
            onChange={(e) => {
              console.log(e.target.value);
            }}
            className="px-20 w-full"
            defaultValue="6丁目22番"
          />
        </div>
        <div className="flex mb-30 align-center">
          <h2 className="text-14 w-150-px">建物名・号数 </h2>
          <TextInput
            id="customer-id"
            onChange={(e) => {
              console.log(e.target.value);
            }}
            className="px-20 w-full"
            defaultValue="大森ベルポート E館 15階"
          />
        </div>
        <div className="flex mb-30 align-center">
          <h2 className="text-14 w-150-px">生年月日</h2>
          <div className="w-full flex px-20">
            <TextInput
              id="customer-id"
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex mb-30">
          <h2 className="text-14 w-150-px">性別</h2>
          <div className="flex align-center mr-30">
            <CheckBoxInput
              id="male"
              onChange={(e) => {
                setSex("male");
              }}
              checked={sex === "male"}
            />
            <label htmlFor="male">男性</label>
          </div>
          <div className="flex align-center">
            <CheckBoxInput
              id="female"
              onChange={() => {
                setSex("female");
              }}
              checked={sex === "female"}
            />
            <label htmlFor="female">女性</label>
          </div>
        </div>
        <div className="flex mb-30 align-center">
          <h2 className="text-14 w-150-px">メールアドレス</h2>
          <div className="w-full flex px-20">
            <TextInput
              id="customer-id"
              onChange={(e) => {
                console.log(e.target.value);
              }}
              className="w-half"
              defaultValue="yamamoto@free.com"
            />
          </div>
        </div>
        <div className="flex mb-30">
          <h2 className="text-14 w-150-px">備考</h2>
          <div className="w-full px-20">
            <textarea cols={30} className="w-full" rows={10}></textarea>
          </div>
        </div>
        <div className="px-30">
          <h1 className="font-bold mb-30">利用履歴 </h1>

          {usageHistories.map((item: UsageHistory, index) => {
            return (
              <div
                key={index}
                className="flex w-full align-center justify-evenly mb-20"
              >
                <p>日付</p>
                <div className="flex align-center">
                  <TextInput id="" onChange={() => {}} value={item.date} />
                  <input
                    type="checkbox"
                    onChange={() => {}}
                    checked={item.isChecked}
                  />
                </div>
                <div className="flex align-center">
                  <label htmlFor="number-of-people" className="mr-30">
                    人数
                  </label>
                  <TextInput
                    id=""
                    value={item.numberOfPeople.toString()}
                    onChange={() => {}}
                  />
                </div>
                <button>
                  <img src={PlusIcon} alt="add-history-usage-icon" />
                </button>
              </div>
            );
          })}

          <div className="flex justify-center mt-50">
            <BaseButton
              label="キャンセル"
              className="history-btn text-16 mr-10 py-8"
            />
            <BaseButton
              label="登録"
              className="history-btn text-16 ml-10 py-8"
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .container {
    padding: 25px 45px;
  }
  .w-150-px {
    width: 150px;
  }
  textarea {
    border: 1px solid #c4c4c4;
    border-radius: 3px;
  }
  .address-btn {
    width: 110px;
    height: 40px;
    line-height: 40px;
  }
  .history-btn {
    width: 100px;
    background: #ffffff;
    color: #000000;
    border: 1px solid #000000;
    border-radius: 4px;
    height: 40px;
  }
`;
export default ListCustomers;
