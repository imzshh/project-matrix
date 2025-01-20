import { type Rock } from "@ruiapp/move-style";
import type { ExtraCountRockConfig } from "./extra-count-type";
import ExtraCountMeta from "./ExtraCountMeta";
import { sumBy } from "lodash";

export default {
  Renderer(context, props) {
    const { palletCount, palletWeight, transfers } = props?.form.getFieldsValue();
    const palletWeightTransferSum = sumBy(transfers, "palletWeight") ? sumBy(transfers, "palletWeight") : 0;
    const palletWeightSum = palletCount + (transfers?.length || 0);
    const res = (palletCount || 0) * (palletWeight || 0) + palletWeightTransferSum || 0;

    const toFixed = (value: number) => value.toFixed(2);
    return (
      <div style={{ display: "flex", alignItems: "start" }}>
        <div style={{ marginRight: 10 }}>数量：{toFixed(res || palletWeight || 0)}</div>
        <div>托数：{toFixed(palletWeightSum || 0)}</div>
      </div>
    );
  },

  ...ExtraCountMeta,
} as Rock<ExtraCountRockConfig>;
