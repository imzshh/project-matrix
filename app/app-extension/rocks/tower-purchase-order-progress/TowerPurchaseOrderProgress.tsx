import type { Rock } from "@ruiapp/move-style";
import TowerPurchaseOrderProgressMeta from "./TowerPurchaseOrderProgressMeta";
import type { TowerPurchaseOrderProgressRockConfig } from "./tower-purchase-order-progress-types";
import { Steps } from "antd";
const { Step } = Steps;

export default {
  Renderer(context, props: TowerPurchaseOrderProgressRockConfig) {
    const { order } = props;

    return (
      <Steps current={1}>
        <Step title="订单确认" description="2024-12-03 09:00" />
        <Step title="生产" />
        <Step title="发货" />
        <Step title="结算" />
        <Step title="完成" />
      </Steps>
    );
  },

  ...TowerPurchaseOrderProgressMeta,
} as Rock;
