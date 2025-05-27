import { useNavigate } from "@remix-run/react";
import { RockEvent, RockInstanceContext, type Rock } from "@ruiapp/move-style";
import { useDebounceFn } from "ahooks";
import { Button, Form, Input, InputNumber, Space, Table } from "antd";
import { memo, useState } from "react";
import rapidApi from "~/rapidApi";
import { PlusOutlined } from "@ant-design/icons";
import { renderRock } from "@ruiapp/react-renderer";
import { forEach, isEmpty, last, pick } from "lodash";
import dayjs from "dayjs";
import { decimalSum } from "~/utils/decimal";

const LotSelect = memo<{
  operationType: string;
  businessType: string;
  customerId: string;
  warehouseId?: string;
  record: Record<string, any>;
  recordIndex: number;
  context: RockInstanceContext;
  onChange(v: string): void;
}>((props) => {
  const { operationType, businessType, customerId, warehouseId, record: r, recordIndex: i, context } = props;

  if (operationType === "out" || operationType === "transfer") {
    return renderRock({
      context,
      rockConfig: {
        $id: i + "_lotnum",
        $type: "materialLotNumSelector",
        materialId: r.material?.id,
        warehouseId: warehouseId,
        customerId: customerId,
        materialCategoryId: r.material?.category?.id,
        businessTypeId: businessType,
        value: r.lotNum,
        onChange: [
          {
            $action: "script",
            script: (e: RockEvent) => {
              const val = e.args?.[0];
              props.onChange(val);
            },
          },
        ],
      },
    });
  }

  return (
    <Input
      placeholder="请输入"
      value={r.lotNum}
      onChange={(e) => {
        const val = e.target.value;
        props.onChange(val);
      }}
    />
  );
});

export default {
  $type: "inventoryModifyOperationForm",

  slots: {},

  propertyPanels: [],

  Renderer(context, props) {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [refreshKey, setRefreshKey] = useState<string | number>();
    const [operationType, setOperationType] = useState<string>();
    const [businessType, setBusinessType] = useState<string>();
    const [materialItems, setMaterialItems] = useState<any[]>([]);
    const [enabledBinNum, setEnabledBinNum] = useState<boolean>(false);
    const [warehouseId, setWarehouseId] = useState<string>();

    const { saveApplication, saving } = useSaveApplication((data) => {
      navigate(`/pages/mom_inventory_modify_application_details?id=${data.id}`);
    });

    let binNumColumn: ColumnProps<any> = {
      title: "托盘号",
      dataIndex: "binNum",
      width: 120,
      render: (_, r, i) => {
        let fixedFilters: any[] = [
          {
            field: "quantity",
            operator: "gt",
            value: 0,
          },
          {
            field: "state",
            operator: "eq",
            value: "normal",
          },
        ];
        if (r.material?.id) {
          fixedFilters.push({
            field: "material",
            operator: "exists",
            filters: [
              {
                field: "id",
                operator: "eq",
                value: r.material?.id,
              },
            ],
          });
        }
        if (r.lotNum) {
          fixedFilters.push({
            field: "lotNum",
            operator: "eq",
            value: r.lotNum,
          });
        }
        if (warehouseId) {
          fixedFilters.push({
            field: "warehouse_id",
            operator: "eq",
            value: warehouseId,
          });
        }

        return renderRock({
          context,
          rockConfig: {
            $type: "rapidTableSelect",
            $id: `${i}_${warehouseId}_${r.material?.id}_${r.lotNum}_binNum`,
            placeholder: "请选择",
            dropdownMatchSelectWidth: 500,
            mode: "multiple",
            listValueFieldName: "binNum",
            listTextFormat: "{{binNum}}",
            listFilterFields: ["binNum"],
            searchPlaceholder: "托盘号搜索",
            columns: [
              { title: "托盘号", code: "binNum", width: 100 },
              { title: "在库数量", code: "quantity", width: 100 },
              { title: "库位", code: "location.name", width: 100 },
            ],
            requestConfig: {
              url: "/mom/mom_goods/operations/find",
              method: "post",
              params: {
                properties: ["id", "material", "good", "binNum", "lotNum", "lot", "quantity", "location"],
                fixedFilters,
                orderBy: [
                  {
                    field: "location.code",
                  },
                ],
              },
            },
            value: (r.binNum || []).map((item: any) => item.binNum),
            onSelectedRecord: [
              {
                $action: "script",
                script: (e: RockEvent) => {
                  const records: any[] = e.args[1];
                  setMaterialItems((draft) => {
                    const binNumQuantity = (records || []).reduce((s, r) => decimalSum(s, r.quantity || 0), 0);
                    return draft.map((item, index) =>
                      i === index
                        ? {
                            ...item,
                            binNum: records,
                            quantity: binNumQuantity,
                          }
                        : item,
                    );
                  });
                },
              },
            ],
          },
        });
      },
    };

    return (
      <div style={{ padding: "24px 0 0" }}>
        <Form
          form={form}
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 5 }}
          onFinish={({ warehouse, ...restValues }) => {
            let applicationItems: any[] = [];
            forEach(materialItems, (item) => {
              if (isEmpty(item.binNum)) {
                applicationItems.push({
                  material: item.material?.id,
                  unit: item.unit?.id,
                  lotNum: item.lotNum,
                  quantity: item.quantity,
                  remark: item.remark,
                });
              } else {
                forEach(item.binNum, (binNumItem) => {
                  applicationItems.push({
                    material: item.material?.id,
                    unit: item.unit?.id,
                    lotNum: item.lotNum,
                    remark: item.remark,
                    quantity: binNumItem.quantity,
                    good: binNumItem.id,
                    binNum: binNumItem.binNum,
                  });
                });
              }
            });

            let warehouseInfo: Record<string, any> = {
              to: warehouse,
            };
            if (restValues.operationType === "out") {
              warehouseInfo = {
                from: warehouse,
              };
            }

            saveApplication({
              operationState: "pending",
              operationType: "in",
              state: "approved",
              source: "manual",
              ...restValues,
              ...warehouseInfo,
              items: applicationItems,
            });
          }}
          onValuesChange={(values) => {
            setRefreshKey(dayjs().unix());

            if (values.hasOwnProperty("warehouse")) {
              setWarehouseId(values.warehouse);
              setMaterialItems([]);
            }
          }}
        >
          <Form.Item required label="业务类型" name="businessType" rules={[{ required: true, message: "业务类型必填" }]}>
            {renderRock({
              context,
              rockConfig: {
                $type: "rapidTableSelect",
                $id: `${props.$id}_businessType`,
                placeholder: "请选择",
                columns: [{ title: "名称", code: "name" }],
                requestConfig: {
                  url: "/mom/mom_inventory_business_types/operations/find",
                  method: "post",
                  params: {
                    fixedFilters: [
                      {
                        field: "operationType",
                        operator: "in",
                        value: ["in", "out"],
                        itemType: "text",
                      },
                      {
                        field: "name",
                        operator: "in",
                        value: ["入库调整单", "出库调整单"],
                        itemType: "text",
                      },
                    ],
                  },
                },
                onSelectedRecord: [
                  {
                    $action: "script",
                    script: (e: RockEvent) => {
                      const record: any = e.args[0];

                      setBusinessType(record?.name);
                      setOperationType(record?.operationType);
                      setEnabledBinNum(record?.operationType === "out");

                      // 切换业务类型，如果为非出库操作，需要清空托盘号信息
                      if (record?.operationType !== "out") {
                        setMaterialItems(materialItems?.map(({ binNum, ...restItem }) => restItem));
                      }
                      form.setFieldValue("operationType", record?.operationType);
                    },
                  },
                ],
              },
            })}
          </Form.Item>
          <Form.Item hidden name="operationType" />
          <Form.Item label="申请人" name="applicant" rules={[{ required: true, message: "申请人必填" }]}>
            {renderRock({
              context,
              rockConfig: {
                $type: "rapidTableSelect",
                $id: `${props.$id}_applicant`,
                placeholder: "请选择",
                listFilterFields: ["name"],
                searchPlaceholder: "名称搜索",
                columns: [{ title: "名称", code: "name" }],
                requestConfig: {
                  url: "/app/oc_users/operations/find",
                  method: "post",
                  params: { orderBy: [{ field: "name" }] },
                },
              },
            })}
          </Form.Item>
          <Form.Item label="仓库" name="warehouse" rules={[{ required: true, message: "仓库必填" }]}>
            {renderRock({
              context,
              rockConfig: {
                $type: "rapidTableSelect",
                $id: `${props.$id}_warehouse`,
                placeholder: "请选择",
                listFilterFields: ["name", "code"],
                searchPlaceholder: "名称、编号搜索",
                columns: [
                  { title: "名称", code: "name" },
                  { title: "编号", code: "code" },
                ],
                requestConfig: {
                  url: "/app/base_locations/operations/find",
                  method: "post",
                  params: {
                    fixedFilters: [
                      {
                        field: "type",
                        operator: "eq",
                        value: "warehouse",
                      },
                    ],
                    orderBy: [{ field: "name" }],
                  },
                },
              },
            })}
          </Form.Item>

          {businessType && (
            <Form.Item label={businessType === "出库调整单" ? "出库日期" : "入库日期"} name="depositDate">
              {renderRock({
                context,
                rockConfig: {
                  $type: "rapidDatePicker",
                  $id: `${props.$id}_depositDate`,
                  placeholder: "请选择",
                },
              })}
            </Form.Item>
          )}

          <Form.Item
            label="物品明细"
            name="items"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            rules={[
              {
                validator: (r, val: any, cb) => {
                  let hasError = false;
                  let hasMultipleRecord = false;
                  let uniqueMap = new Map();
                  forEach(materialItems, (item) => {
                    if (!item.material) {
                      hasError = true;
                    } else {
                      let uniqueKey = `${item.material.id}_${item.lotNum || ""}`;
                      if (uniqueMap.get(uniqueKey)) {
                        hasMultipleRecord = true;
                      }
                      uniqueMap.set(uniqueKey, true);
                    }
                  });

                  if (hasError) {
                    cb("物品不可为空");
                    return;
                  }

                  if (hasMultipleRecord) {
                    cb("存在多条 “物料-批号” 相同的明细记录");
                    return;
                  }

                  cb();
                },
              },
            ]}
          >
            <Table
              size="middle"
              dataSource={materialItems}
              scroll={{ x: 740 }}
              columns={[
                {
                  title: "物品",
                  dataIndex: "material",
                  width: 180,
                  render: (_, r, i) => {
                    let fixedFilters: any[] = [];
                    if (operationType === "out" && warehouseId) {
                      fixedFilters.push({
                        field: "warehouse_id",
                        operator: "eq",
                        value: warehouseId,
                      });
                      return renderRock({
                        context,
                        rockConfig: {
                          $type: "rapidTableSelect",
                          $id: `${i}_warehouse_material`,
                          placeholder: "请选择",
                          dropdownMatchSelectWidth: 500,
                          listValueFieldName: "material.id",
                          listTextFormat: "{{material.code}}-{{material.name}}（{{material.specification}}）",
                          listFilterFields: [
                            {
                              field: "material",
                              operator: "exists",
                              filters: [
                                {
                                  operator: "or",
                                  filters: [
                                    {
                                      field: "name",
                                      operator: "contains",
                                    },
                                    {
                                      field: "code",
                                      operator: "contains",
                                    },
                                    {
                                      field: "specification",
                                      operator: "contains",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                          searchPlaceholder: "物品信息搜索",
                          columns: [
                            { title: "名称", code: "material.name", width: 100 },
                            { title: "编号", code: "material.code", width: 100 },
                            { title: "规格", code: "material.specification", width: 100 },
                            { title: "单位", code: "unit.name", width: 80 },
                          ],
                          requestConfig: {
                            url: "/mom/mom_material_warehouse_inventory_balances/operations/find",
                            method: "post",
                            params: {
                              fixedFilters,
                              properties: ["id", "material", "unit"],
                              relations: {
                                material: {
                                  properties: ["id", "code", "name", "specification", "category"],
                                  category: true,
                                },
                              },
                              // orderBy: [{ field: "code" }],
                            },
                          },
                          value: r.material?.id,
                          onSelectedRecord: [
                            {
                              $action: "script",
                              script: (e: RockEvent) => {
                                const record: any = e.args[0];
                                setMaterialItems((draft) => {
                                  return draft.map((item, index) =>
                                    i === index
                                      ? {
                                          ...item,
                                          material: record?.material,
                                          unit: record?.unit,
                                          lotNum: undefined,
                                          binNum: undefined,
                                        }
                                      : item,
                                  );
                                });
                              },
                            },
                          ],
                        },
                      });
                    }

                    return renderRock({
                      context,
                      rockConfig: {
                        $type: "rapidTableSelect",
                        $id: `${i}_material`,
                        placeholder: "请选择",
                        dropdownMatchSelectWidth: 500,
                        labelRendererType: "materialLabelRenderer",
                        listFilterFields: ["name", "code", "specification"],
                        searchPlaceholder: "物品信息搜索",
                        columns: [
                          { title: "名称", code: "name", width: 100 },
                          { title: "编号", code: "code", width: 100 },
                          { title: "规格", code: "specification", width: 100 },
                          { title: "单位", code: "defaultUnit.name", width: 80 },
                        ],
                        requestConfig: {
                          url: "/app/base_materials/operations/find",
                          method: "post",
                          params: {
                            fixedFilters,
                            properties: ["id", "code", "name", "specification", "defaultUnit", "category"],
                            orderBy: [{ field: "code" }],
                          },
                        },
                        value: r.material?.id,
                        onSelectedRecord: [
                          {
                            $action: "script",
                            script: (e: RockEvent) => {
                              const record: any = e.args[0];
                              setMaterialItems((draft) => {
                                return draft.map((item, index) =>
                                  i === index
                                    ? {
                                        ...item,
                                        material: record,
                                        unit: record?.defaultUnit,
                                        lotNum: undefined,
                                        binNum: undefined,
                                      }
                                    : item,
                                );
                              });
                            },
                          },
                        ],
                      },
                    });
                  },
                },
                {
                  title: "批号",
                  dataIndex: "lotNum",
                  width: 120,
                  render: (_, r, i) => {
                    return (
                      <LotSelect
                        context={context}
                        record={r}
                        recordIndex={i}
                        warehouseId={warehouseId}
                        customerId={form.getFieldValue("customer")}
                        operationType={operationType!}
                        businessType={form.getFieldValue("businessType")}
                        onChange={(val) => {
                          setMaterialItems((draft) => {
                            return draft.map((item, index) => (i === index ? { ...item, lotNum: val } : item));
                          });
                        }}
                      />
                    );
                  },
                },
                ...(enabledBinNum ? [binNumColumn] : []),
                {
                  title: "数量",
                  dataIndex: "quantity",
                  width: 120,
                  render: (_, r, i) => {
                    return (
                      <InputNumber
                        placeholder="请输入"
                        disabled={!isEmpty(r.binNum)}
                        style={{ width: "100%" }}
                        value={r.quantity}
                        onChange={(val) => {
                          setMaterialItems((draft) => {
                            return draft.map((item, index) => (i === index ? { ...item, quantity: val } : item));
                          });
                        }}
                      />
                    );
                  },
                },
                {
                  title: "单位",
                  dataIndex: "unit",
                  width: 120,
                  render: (_, r, i) => {
                    return renderRock({
                      context,
                      rockConfig: {
                        $type: "rapidTableSelect",
                        $id: `${i}_unit`,
                        placeholder: "请选择",
                        pageSize: 1000,
                        listFilterFields: [],
                        columns: [{ title: "名称", code: "name" }],
                        requestConfig: { url: "/app/base_units/operations/find", method: "post" },
                        value: r.unit?.id,
                        onSelectedRecord: [
                          {
                            $action: "script",
                            script: (e: RockEvent) => {
                              const record: any = e.args[0];
                              setMaterialItems((draft) => {
                                return draft.map((item, index) => (i === index ? { ...item, unit: record } : item));
                              });
                            },
                          },
                        ],
                      },
                    });
                  },
                },
                {
                  title: "备注",
                  dataIndex: "remark",
                  width: 200,
                  render: (_, r, i) => {
                    return (
                      <Input
                        placeholder="请输入"
                        value={r.remark}
                        onChange={(e) => {
                          const val = e.target.value;
                          setMaterialItems((draft) => {
                            return draft.map((item, index) => (i === index ? { ...item, remark: val } : item));
                          });
                        }}
                      />
                    );
                  },
                },
                {
                  width: 60,
                  render: (_, r, index) => {
                    return (
                      <span
                        style={{ cursor: "pointer", color: "red" }}
                        onClick={() => {
                          setMaterialItems(materialItems.filter((m, i) => i !== index));
                        }}
                      >
                        移除
                      </span>
                    );
                  },
                },
              ]}
              pagination={false}
            />
            <Button
              block
              type="dashed"
              onClick={() => {
                const newRecord = pick(last(materialItems), ["material", "unit"]);
                setMaterialItems([...materialItems, { ...newRecord }]);
              }}
            >
              <PlusOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
              添加
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 22, offset: 2 }} style={{ marginTop: 36 }}>
            <Space size={24}>
              <Button
                disabled={saving}
                onClick={() => {
                  navigate("/pages/mom_inventory_modify_application_list");
                }}
              >
                取消
              </Button>
              <Button
                type="primary"
                loading={saving}
                onClick={() => {
                  form.submit();
                }}
              >
                保存
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    );
  },
} as Rock<any>;

function useSaveApplication(onSuccess: (data: Record<string, any>) => void) {
  const [saving, setSaving] = useState<boolean>(false);

  const saveApplication = async (formData: Record<string, any>) => {
    if (saving) {
      return;
    }

    setSaving(true);
    await rapidApi
      .post("/mom/mom_inventory_applications", formData)
      .then((res) => {
        if (res.status >= 200 && res.status < 400) {
          onSuccess(res.data);
        }
      })
      .finally(() => {
        setSaving(false);
      });
  };

  const save = useDebounceFn(saveApplication, { wait: 300 });

  return { saveApplication: save.run, saving };
}
