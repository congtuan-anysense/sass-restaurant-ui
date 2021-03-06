import { getPrefecturesAPI, getZipcodeDetailAPI } from "apis/master";
import PlusIcon from "assets/images/icons/plus-dark.svg";
import BreadcrumbsBar from "components/templates/breadcrumbs/BreadcrumbsBar";
import BaseButton from "components/templates/buttons/BaseButton";
import InputRadio from "components/templates/inputs/InputRadio";
import SelectInput from "components/templates/inputs/SelectInput";
import TextInput from "components/templates/inputs/TextInput";
import { CUSTOMER_TYPE } from "config/const";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { PROTECTED_ROUTES } from "router/helpers/protectedRoutes";
import {
  customerModuleSelector,
  getCustomer,
  resetCurrentCustomer,
  upsertCustomer,
} from "store/modules/customerModule";
import {
  FIELDS,
  InitiateValue,
  UpsertCustomerFormInputs,
  VALIDATIONS,
} from "./form";
import { Wrapper } from "./style";
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

const DEFAULT_CHECKED_GENDER = "male";

const UpsertCustomer: React.FC<{}> = () => {
  const [listPrefecture, setListPrefecture] = useState([]);
  const prefectureRef = useRef(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    customer: { current: data },
  } = useSelector(customerModuleSelector);
  const { id } = useParams();
  const { control, setValue, getValues, handleSubmit, reset } =
    useForm<UpsertCustomerFormInputs>({
      mode: "onSubmit",
      reValidateMode: "onChange",
      defaultValues: {
        [FIELDS.GENDER]: id ? "" : "male",
        [FIELDS.ID]: id,
      },
    });

  useEffect(() => {
    if (id) {
      dispatch(
        getCustomer(id, ({ customer: { current } }) => {
          setValue(FIELDS.GENDER, current.attributes.gender);
          document
            .getElementById(`customer-gender__${current.attributes.gender}`)
            .click();
        })
      );
    } else {
      document
        .getElementById(`customer-gender__${DEFAULT_CHECKED_GENDER}`)
        .click();
    }
    // get Master data
    getPrefecturesAPI()
      .then(({ data: { data } }) => {
        setListPrefecture(() => {
          return data?.prefectures.map((prefecture) => ({
            label: prefecture,
            value: prefecture,
          }));
        });
      })
      .catch((error) => console.log(error));

    return () => {
      dispatch(resetCurrentCustomer());
    };
  }, []);

  useEffect(() => {
    if (!id) {
      reset(InitiateValue);
    }
  }, [data?.id]);

  const onSubmit = useCallback((data) => {
    const payloadData = {
      customer: data,
    };
    dispatch(
      upsertCustomer(payloadData, (res) => {
        if (res.data.success) {
          const actionName = id ? "updated" : "created";
          alert(`Customer: ${data.name} was ${actionName} successfully!`);
          alert("redirecting to the list customers page!");
          history.push(PROTECTED_ROUTES.customers_management__list.path);
        }
      })
    );
  }, []);

  const getZipcodeDetail = () => {
    const zipcodeId = getValues("postcode");
    getZipcodeDetailAPI(zipcodeId)
      .then(({ data: { data } }) => {
        setValue(FIELDS.PREFECTURE, data.prefecture);
        prefectureRef.current.updateSelectedValue(data.prefecture);
      })
      .catch((err) => console.log(err));
  };

  const customerType = useMemo(() => {
    if (!id) return "??????????????????";
    for (const type of CUSTOMER_TYPE) {
      if (type.value === data?.attributes?.customerType) return type.label;
    }
    return "??????????????????";
  }, [data]);

  if (id && !data?.id) {
    return null;
  }

  const setGenderEvent = (e: any) => {
    setValue(FIELDS.GENDER, e.target.dataset.gender);
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
        <h1 className="font-bold mb-30">???????????? </h1>
        <div className="flex mb-30 align-center">
          <h2 className="text-14 w-150-px">???????????????</h2>
          <div className="flex w-full">
            <TextInput
              id="customer-id"
              className="w-half px-20"
              value={data?.attributes?.id.toString() ?? "????????????????????????"}
              disabled
            />
          </div>
        </div>
        <div className="flex mb-30 align-center">
          <h2 className="text-14 w-150-px">
            ?????? <span className="text-required">????????????</span>
          </h2>
          <div className="flex w-full">
            <Controller
              control={control}
              name={FIELDS.NAME}
              defaultValue={data?.attributes?.name ?? ""}
              rules={VALIDATIONS[FIELDS.NAME]}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextInput
                  id="customer-name"
                  onChange={onChange}
                  className="w-half px-20"
                  value={value}
                  error={error?.message ?? ""}
                />
              )}
            />
            <TextInput
              id="customer-name_"
              onChange={(e) => {
                console.log(e.target.value);
              }}
              className="w-half px-20"
            />
          </div>
        </div>
        <div className="flex mb-30 align-center">
          <h2 className="text-14 w-150-px">
            ??????(??????)<span className="text-required">????????????</span>
          </h2>
          <div className="flex w-full">
            <Controller
              control={control}
              name={FIELDS.KANA}
              defaultValue={data?.attributes?.nameKana ?? ""}
              rules={VALIDATIONS[FIELDS.KANA]}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextInput
                  id="customer-name-kana"
                  onChange={onChange}
                  className="w-half px-20"
                  value={value}
                  error={error?.message ?? ""}
                />
              )}
            />
            <TextInput
              id="customer-name-kana_"
              onChange={(e) => {
                console.log(e.target.value);
              }}
              className="w-half px-20"
            />
          </div>
        </div>
        <div className="flex mb-30 align-center">
          <h2 className="text-14 w-150-px">???????????????</h2>
          <div className="flex w-full">
            <div className="flex justify-between px-20 w-half align-center">
              <SelectInput
                onChange={(value) => {
                  setValue(FIELDS.TYPE, value);
                }}
                id="customer-type"
                options={CUSTOMER_TYPE}
                activeValue={customerType}
              />
              <label htmlFor="customer-company-name">?????????</label>
            </div>
            <Controller
              control={control}
              name={FIELDS.COMPANY_NAME}
              defaultValue={data?.attributes?.companyName ?? ""}
              rules={VALIDATIONS[FIELDS.COMPANY_NAME]}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  id="customer-company-name"
                  onChange={onChange}
                  className="w-half px-20"
                  value={value}
                />
              )}
            />
          </div>
        </div>
        <div className="flex mb-30">
          <h2 className="text-14 w-150-px">
            ????????????<span className="text-required">????????????</span>
          </h2>
          <div className="flex w-full">
            <Controller
              control={control}
              name={FIELDS.PHONE}
              defaultValue={data?.attributes?.phone ?? ""}
              rules={VALIDATIONS[FIELDS.PHONE]}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextInput
                  id="customer-phone"
                  onChange={onChange}
                  className="w-half px-20"
                  value={value}
                  error={error?.message ?? ""}
                  // type="number"
                />
              )}
            />
          </div>
        </div>
        <div className="flex mb-30 align-center">
          <h2 className="text-14 w-150-px">????????????</h2>
          <div className="flex w-full align-center">
            <Controller
              control={control}
              name={FIELDS.POST_CODE}
              defaultValue={data?.attributes?.postcode ?? ""}
              rules={VALIDATIONS[FIELDS.POST_CODE]}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextInput
                  id="customer-post-code"
                  onChange={onChange}
                  className="px-20"
                  value={value}
                  error={error?.message ?? ""}
                />
              )}
            />
            <BaseButton
              label="????????????"
              background="#FFA300"
              className="text-16 address-btn"
              onClick={getZipcodeDetail}
            />
          </div>
        </div>
        <div className="flex mb-30 align-center">
          <h2 className="text-14 w-150-px">????????????</h2>
          <div>
            <SelectInput
              onChange={(value) => {
                setValue(FIELDS.PREFECTURE, value);
              }}
              id="customer-type"
              activeValue={data?.attributes?.prefecture || "Select prefecture"}
              options={listPrefecture}
              shared={prefectureRef}
            />
          </div>
        </div>
        <div className="flex mb-30 align-center">
          <h2 className="text-14 w-150-px">????????????</h2>
          <Controller
            control={control}
            name={FIELDS.MUNICIPALITY}
            defaultValue={data?.attributes?.municipality ?? ""}
            rules={VALIDATIONS[FIELDS.MUNICIPALITY]}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextInput
                id="customer-id"
                onChange={onChange}
                className="px-20 w-full"
                value={value}
              />
            )}
          />
        </div>
        <div className="flex mb-30 align-center">
          <h2 className="text-14 w-150-px">????????????</h2>

          <Controller
            control={control}
            name={FIELDS.ADDRESS}
            defaultValue={data?.attributes?.address ?? ""}
            rules={VALIDATIONS[FIELDS.ADDRESS]}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextInput
                id="customer-address"
                onChange={onChange}
                className="px-20 w-full"
                value={value}
              />
            )}
          />
        </div>
        <div className="flex mb-30 align-center">
          <h2 className="text-14 w-150-px">?????????????????? </h2>
          <Controller
            control={control}
            name={FIELDS.BUILDING_ADDRESS}
            defaultValue={data?.attributes?.buildingAddress ?? ""}
            rules={VALIDATIONS[FIELDS.BUILDING_ADDRESS]}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextInput
                id="customer-building-address"
                onChange={onChange}
                className="px-20 w-full"
                value={value}
              />
            )}
          />
        </div>
        <div className="flex mb-30 align-center">
          <h2 className="text-14 w-150-px">????????????</h2>
          <div className="w-full flex px-20">
            <Controller
              control={control}
              name={FIELDS.BIRTH_DATE}
              defaultValue={data?.attributes?.dateOfBirth ?? ""}
              rules={VALIDATIONS[FIELDS.BIRTH_DATE]}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextInput
                  id="customer-birth-date"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>
        <div className="flex mb-30">
          <h2 className="text-14 w-150-px">??????</h2>
          <div className="flex align-center mr-30">
            <InputRadio
              id="customer-gender__male"
              name="customer-gender"
              data-gender="male"
              onChange={setGenderEvent}
            />
            <label htmlFor="male">??????</label>
          </div>
          <div className="flex align-center">
            <InputRadio
              name="customer-gender"
              id="customer-gender__female"
              onChange={setGenderEvent}
              data-gender="female"
            />
            <label htmlFor="female">??????</label>
          </div>
        </div>
        <div className="flex mb-30 align-center">
          <h2 className="text-14 w-150-px">?????????????????????</h2>
          <div className="w-full flex px-20">
            <Controller
              control={control}
              name={FIELDS.EMAIL}
              defaultValue={data?.attributes?.email ?? ""}
              rules={VALIDATIONS[FIELDS.EMAIL]}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextInput
                  id="customer-email"
                  onChange={onChange}
                  className="w-half"
                  value={value}
                />
              )}
            />
          </div>
        </div>
        <div className="flex mb-30">
          <h2 className="text-14 w-150-px">??????</h2>
          <div className="w-full px-20">
            <Controller
              control={control}
              name={FIELDS.REMARK}
              defaultValue={data?.attributes?.remarks ?? ""}
              rules={VALIDATIONS[FIELDS.REMARK]}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <textarea
                  rows={10}
                  value={value}
                  className="w-full"
                  onChange={onChange}
                ></textarea>
              )}
            />
          </div>
        </div>
        <div className="px-30">
          <h1 className="font-bold mb-30">???????????? </h1>

          {useageHistoryInitiate.map((item: UsageHistory, index) => {
            return (
              <div
                key={index}
                className="flex w-full align-center justify-evenly mb-20"
              >
                <p>??????</p>
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
                    ??????
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
        </div>
        <div className="flex justify-center mt-50">
          <BaseButton
            label="???????????????"
            className="history-btn text-16 mr-10 py-8"
          />
          <BaseButton
            label={id ? "??????" : "??????"}
            className="history-btn text-16 ml-10 py-8"
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default UpsertCustomer;
