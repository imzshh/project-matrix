import { type Rock } from "@ruiapp/move-style";
import type { ExtraCountRockConfig } from "./extra-count-type";
import ExtraCountMeta from "./ExtraCountMeta";
import { sumBy } from "lodash";

export default {
  Renderer(context, props) {
    const { palletCount, palletWeight, transfers } = props?.form.getFieldsValue();
    const palletWeightSum = sumBy(transfers, "palletWeight") ? sumBy(transfers, "palletWeight") : 0;
    const res = (palletCount || 0) * (palletWeight || 0) + palletWeightSum;
    return (
      <div style={{ display: "flex", alignItems: "start" }}>
        <div style={{ marginRight: 10 }}>数量：{res}</div>
        <div>托数：{palletWeight || 0}</div>
      </div>
    );
  },

  ...ExtraCountMeta,
} as Rock<ExtraCountRockConfig>;