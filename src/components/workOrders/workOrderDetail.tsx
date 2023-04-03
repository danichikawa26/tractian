import { Card, Col, Row, Tag } from "antd"
import React from "react"
import { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router-dom"
import { IAsset } from "../../interfaces/asset"
import { IUser } from "../../interfaces/user"
import { IWorkOrder } from "../../interfaces/workOrder"
import { getAssetById } from "../../services/assetService"
import { getUserById } from "../../services/userService"
import { getWorkOrderById } from "../../services/workOrderService"

const WorkOrderDetail = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [workOrderData, setWorkOrderData] = useState<IWorkOrder>()
  const [assignedUsers, setAssignedUsers] = useState<IUser[]>()
  const [assetDetails, setAssetDetails] = useState<IAsset>()
  const { workOrderId } = useParams()

  useEffect(() => {
    const fetchWorkOrderData = async () => {
      setIsLoading(true)
      if (workOrderId) {
        const workOrderResponse = await getWorkOrderById(parseInt(workOrderId))
        setWorkOrderData(workOrderResponse)
        setIsLoading(false)
      }
    }
    fetchWorkOrderData()
  }, [workOrderId])

  useEffect(() => {
    const fetchAssignedUsers = async () => {
      if (workOrderData) {
        await Promise.all(workOrderData.assignedUserIds.map((id) => getUserById(id))).then((usersData) => {
          setAssignedUsers(usersData)
        })

      }
    }
    const fetchAssetDetails = async () => {
      if (workOrderData) {
        const assetDetailsResponse = await getAssetById(workOrderData.assetId)
        setAssetDetails(assetDetailsResponse)
      }
    }
    fetchAssignedUsers()
    fetchAssetDetails()
  }, [workOrderData])
  const renderWorkOrderCard = useCallback(() => {
    return (
      <Card title={workOrderData?.title} bordered={false} style={{ margin: "32px" }}>
        <Row justify="start" gutter={8}>
          <Col span={20}>
            <Row gutter={16}>
              <Col span={6}>Asset</Col>
              <Col span={18}>{assetDetails?.name} - Status: {assetDetails?.status}</Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>Description</Col>
              <Col span={18}>{workOrderData?.description}</Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>Status</Col>
              <Col span={18}>{workOrderData?.status}</Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>Priority</Col>
              <Col span={18}>{workOrderData?.priority}</Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>Checklist</Col>
              <Col span={18}>
                <Row>{workOrderData?.checklist.map((item, index) => {
                  return <React.Fragment key={index}>
                    <Col span={16}>{item.task}</Col>
                    <Col span={6}><Tag color={item.completed ? "green-inverse" : "red"}> {item.completed ? "completed" : "not completed"}</Tag></Col>
                  </React.Fragment>
                })}
                </Row>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>Assigned workers</Col>
              <Col span={18}>
                <Row>{assignedUsers?.map((user, index) => {
                  return <Col span={24} key={index}>{user.name} - {user.email}</Col>
                })}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card >
    )
  }, [workOrderData, assignedUsers])

  return (
    <>
      {!isLoading && renderWorkOrderCard()}
    </>
  )
}

export default WorkOrderDetail
