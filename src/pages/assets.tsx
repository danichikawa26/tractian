import { useEffect, useState } from "react";
import { IAsset } from "../interfaces/asset";
import { getAssets } from "../services/assetService";

export const Assets = () => {
  const [assets, setAssets] = useState<IAsset[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [assetsResponse] = await Promise.all([getAssets()]);
      setAssets(assetsResponse);
    };
    fetchData();
  }, []);

  const renderAsset = (asset: IAsset) => {
    return (
      <div key={asset.id}>
        <h2>{asset.name}</h2>
        <p>{asset.model}</p>
      </div>
    );
  };

  return <div>{assets.map(asset => renderAsset(asset))}</div>;
};
