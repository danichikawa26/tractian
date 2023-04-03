import { Card, Col, Row } from "antd"
import React from "react"
import { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router-dom"
import { IAsset } from "../../interfaces/asset"
import { IUnit } from "../../interfaces/unit"
import { getCompanyById } from "../../services/companyService"
import { getUnitById } from "../../services/unitService"

const UnitDetail = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [unitData, setUnitData] = useState<IUnit>()
  const [unitAssets, setUnitAssets] = useState<IAsset[]>([])
  const [companyName, setCompanyName] = useState<string>('')
  const { unitId } = useParams()

  useEffect(() => {
    const fetchUnitData = async () => {
      setIsLoading(true)
      if (unitId) {
        const unitResponse = await getUnitById(parseInt(unitId))
        setUnitData(unitResponse)
        setIsLoading(false)
      }
    }
    fetchUnitData()
  }, [unitId])

  useEffect(() => {
    const allAssets: IAsset[] = JSON.parse(localStorage.getItem('assets') || '{}')
    if (unitId) {
      setUnitAssets(allAssets.filter(asset => asset.unitId === parseInt(unitId)))
    }
    const fetchCompanyName = async () => {
      if (unitData) {
        const company = await getCompanyById(unitData.companyId)
        setCompanyName(company.name)
      }
    }
    fetchCompanyName()
  }, [unitData])

  const renderUnitData = useCallback(() => {
    return (
      <Card title={unitData?.name} bordered={false} style={{ margin: "32px" }}>
        <Row justify="start" gutter={8}>
          <Col span={20}>
            <Row gutter={16}>
              <Col span={6}>Company</Col>
              <Col span={18}>{companyName}</Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>Assets</Col>
              <Col span={18}>
                <Row>{unitAssets.map((asset, index) => {
                  return <React.Fragment key={index}>
                    <Col span={6}>{asset.name}</Col>
                    <Col span={18}>
                      <Row gutter={16}>
                        <Col span={8}>Healthscore</Col>
                        <Col span={16}>{asset.healthscore}</Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={8}>Status</Col>
                        <Col span={16}>{asset.status}</Col>
                      </Row>
                    </Col>
                  </React.Fragment>
                })}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card >
    )
  }, [unitId, unitData, companyName])

  return (
    <>
      {!isLoading && renderUnitData()}
    </>
  )
}

export default UnitDetail
