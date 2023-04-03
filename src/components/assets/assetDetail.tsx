import { Card, Col, Image, Row, Tag } from "antd"
import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { IAsset } from "../../interfaces/asset"
import { ICompany } from "../../interfaces/company"
import { IUnit } from "../../interfaces/unit"
import { getAssetById } from "../../services/assetService"
import { getCompanyById } from "../../services/companyService"
import { getUnitById } from "../../services/unitService"

const AssetDetail = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [assetData, setAssetData] = useState<IAsset>()
  const [unit, setUnit] = useState<IUnit>()
  const [company, setCompany] = useState<ICompany>()
  const { assetId } = useParams()

  useEffect(() => {
    const fetchAssetData = async () => {
      setIsLoading(true)
      if (assetId) {
        const assetResponse = await getAssetById(parseInt(assetId))
        setAssetData(assetResponse)
        setIsLoading(false)
      }
    }

    fetchAssetData()
  }, [assetId])

  useEffect(() => {
    const fetchCompanyUnit = async () => {
      if (assetData) {
        const [companyResponse, unitResponse] = await Promise.all([getCompanyById(assetData.companyId), getUnitById(assetData.unitId)])
        setUnit(unitResponse)
        setCompany(companyResponse)
      }
    }
    fetchCompanyUnit()
  }, [assetData])

  const renderAssetDataTable = useCallback(() => {
    return (
      <Card title={assetData?.name} bordered={false} style={{margin: "32px"}}>
      <Row justify="space-around" gutter={8}>
        <Col span={8}><Image src={assetData?.image} /></Col>
          <Col span={16} style={{ width: "100%" }}>
            <Row gutter={16}>
              <Col span={6}>Model</Col>
              <Col span={18}>{assetData?.model}</Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>Healthscore</Col>
              <Col span={18}>{assetData?.healthscore}</Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>Status</Col>
              <Col span={18}>{assetData?.status}</Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>Sensors</Col>
              <Col span={18}>{assetData?.sensors.map((sensor, index) => <Tag color="cyan" key={index}>{sensor}</Tag> )}</Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>Specification</Col>
              <Col span={18}>
                <Row gutter={8}>
                    <Col span={8} style={{ width: "100%" }}>Max Temperature</Col>
                    <Col span={16}>{assetData?.specifications.maxTemp}</Col>
                    <Col span={8}>Power</Col>
                    <Col span={16}>{assetData?.specifications.power}</Col>
                    <Col span={8}>RPM</Col>
                    <Col span={16}>{assetData?.specifications.rpm}</Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>Metrics</Col>
              <Col span={18}>
                <Row gutter={8}>
                  <Col span={8}>Last uptime at</Col>
                  <Col span={16}>{assetData && assetData?.metrics.lastUptimeAt.split("T")[0]}</Col>
                  <Col span={8}>Total collections uptime</Col>
                  <Col span={16}>{assetData?.metrics.totalCollectsUptime}</Col>
                  <Col span={8}>Total uptime</Col>
                  <Col span={16}>{assetData && Math.round(assetData?.metrics.totalUptime)}</Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>Company</Col>
              <Col span={18}>{company?.name}</Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>Unit</Col>
              <Col span={18}>{unit?.name}</Col>
            </Row>
          </Col>
        </Row>
      </Card >
    )
  }, [assetData, company, unit])

  return (
    <>
      {!isLoading && renderAssetDataTable()}
    </>
  )
}

export default AssetDetail
