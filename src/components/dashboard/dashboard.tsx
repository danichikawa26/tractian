import React, { useState, useEffect, useMemo, useCallback } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { IAsset } from "../../interfaces/asset";
import { getAssets, getAssetById } from "../../services/assetService";
import { Card } from "antd";

const Dashboard: React.FC = () => {
  const [assets, setAssets] = useState<IAsset[]>([]);

  const assetService = useMemo(() => {
    return {
      getAll: getAssets,
      getById: getAssetById
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const assetsResponse = await assetService.getAll();
      setAssets(assetsResponse);
    };
    fetchData();
  }, []);

  const getGraphData = useCallback(() => {
    const data = assets.map(asset => ({
      name: asset.name,
      y: asset.healthscore
    }));
    return {
      chart: {
        type: "column"
      },
      title: {
        text: "Healthscore per Asset"
      },
      xAxis: {
        type: "category"
      },
      yAxis: {
        title: {
          text: "Healthscore"
        },
        max: 100,
        min: 0
      },
      series: [
        {
          name: "Healthscore",
          data: data
        }
      ]
    };
  }, [assets]);

  return (
    <Card title="Graphs" bordered={false} style={{ margin: "32px" }}>
      <HighchartsReact highcharts={Highcharts} options={getGraphData()} />
    </Card>
  );
};

export default Dashboard;
