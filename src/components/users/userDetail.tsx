import { Card, Col, Row,} from "antd"
import React from "react"
import { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router-dom"
import { IAsset } from "../../interfaces/asset"
import { IUser } from "../../interfaces/user"
import { getUnitById } from "../../services/unitService"
import { getUserById } from "../../services/userService"

const UserDetail = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userData, setUserData] = useState<IUser>()
  const [userAssets, setUserAssets] = useState<IAsset[]>([])
  const [unitName, setUnitName] = useState<string>('')
  const { userId } = useParams()

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true)
      if (userId) {
        const userResponse = await getUserById(parseInt(userId))
        setUserData(userResponse)
        setIsLoading(false)
      }
    }
    fetchUserData()
  }, [userId])

  useEffect(() => {
    const allAssets: IAsset[] = JSON.parse(localStorage.getItem('assets') || '{}')
    if (userId) {
      setUserAssets(allAssets.filter(asset => {
        return (asset.assignedUserIds.indexOf(parseInt(userId)) >= 0)
      }))
    }
    const fetchUnitName = async () => {
      if (userData) {
        const unit = await getUnitById(userData.unitId)
        setUnitName(unit.name)
      }
    }
    fetchUnitName()
  }, [userData])

  const renderUserData = useCallback(() => {
    return (
      <Card title={userData?.name} bordered={false} style={{ margin: "32px" }}>
        <Row justify="start" gutter={8}>
          <Col span={20}>
            <Row gutter={16}>
              <Col span={6}>Email</Col>
              <Col span={18}>{userData?.email}</Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>Unit</Col>
              <Col span={18}>{unitName}</Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>Assets assigned</Col>
              <Col span={18}>
                <Row>{userAssets.length > 0 ? userAssets.map((asset, index) => {
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
                }) : "none"}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card >
    )
  }, [userId, userData, unitName, userAssets])

  return (
    <>
      {!isLoading && renderUserData()}
    </>
  )
}

export default UserDetail
