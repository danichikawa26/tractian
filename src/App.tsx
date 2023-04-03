import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Layout } from "antd";
import {
  FileDoneOutlined,
  GoldOutlined,
  MenuOutlined,
  ShopOutlined,
  SmileOutlined
} from "@ant-design/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
import SideMenu from "./components/sideMenu/sideMenu";
import { IAsset } from "./interfaces/asset";
import { ICompany } from "./interfaces/company";
import { IUnit } from "./interfaces/unit";
import { IUser } from "./interfaces/user";
import { getAssets, getAssetById } from "./services/assetService";
import { getCompanies, getCompanyById } from "./services/companyService";
import { getUnits, getUnitById } from "./services/unitService";
import { getUsers, getUserById } from "./services/userService";
import { IItem, MenuItem } from "./interfaces/menuItem";
import { ReactComponent as TractianIcon } from "./assets/tractianLogo.svg";
import { IWorkOrder } from "./interfaces/workOrder";
import { getWorkOrderById, getWorkOrders } from "./services/workOrderService";

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem;
}

const { Header, Content, Sider } = Layout;

const App = (props: any) => {
  const navigate = useNavigate();
  const { children } = props;
  const [assets, setAssets] = useState<IAsset[]>([]);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [units, setUnits] = useState<IUnit[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [workOrders, setWorkOrders] = useState<IWorkOrder[]>([]);

  const assetService = useMemo(() => {
    return {
      getAll: getAssets,
      getById: getAssetById
    };
  }, []);

  const companyService = useMemo(() => {
    return {
      getAll: getCompanies,
      getById: getCompanyById
    };
  }, []);

  const unitService = useMemo(() => {
    return {
      getAll: getUnits,
      getById: getUnitById
    };
  }, []);

  const userService = useMemo(() => {
    return {
      getAll: getUsers,
      getById: getUserById
    };
  }, []);

  const workOrderService = useMemo(() => {
    return {
      getAll: getWorkOrders,
      getById: getWorkOrderById
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const [
        assetsResponse,
        companiesResponse,
        unitsResponse,
        usersResponse,
        workOrdersResponse
      ] = await Promise.all([
        assetService.getAll(),
        companyService.getAll(),
        unitService.getAll(),
        userService.getAll(),
        workOrderService.getAll()
      ]);

      setAssets(assetsResponse);
      localStorage.setItem("assets", JSON.stringify(assetsResponse));
      setCompanies(companiesResponse);
      setUnits(unitsResponse);
      setUsers(usersResponse);
      setWorkOrders(workOrdersResponse);
    };
    fetchData();
  }, []);

  const getItems: () => IItem[] = useCallback(() => {
    return [
      {
        key: "assets",
        label: "Assets",
        icon: <GoldOutlined />,
        children: assets.map(asset => {
          return {
            key: `asset-${asset.id}`,
            label: asset.name,
            to: `/tractian/assets/${asset.id}`,
            service: assetService
          };
        })
      },
      {
        key: "workorders",
        label: "Work Orders",
        icon: <FileDoneOutlined />,
        children: workOrders.map(workOrder => {
          return {
            key: `workOrder-${workOrder.id}`,
            label: workOrder.title,
            to: `/tractian/workorders/${workOrder.id}`,
            service: workOrderService
          };
        })
      },
      {
        key: "units",
        label: "Units",
        icon: <ShopOutlined />,
        children: units.map(unit => {
          return {
            key: `unit-${unit.id}`,
            label: unit.name,
            to: `/tractian/units/${unit.id}`,
            service: unitService
          };
        })
      },
      {
        key: "users",
        label: "Users",
        icon: <SmileOutlined />,
        children: users.map(user => {
          return {
            key: `user-${user.id}`,
            label: user.name,
            to: `/tractian/users/${user.id}`,
            service: userService
          };
        })
      }
    ];
  }, [assets, companies, units, users]);

  const getMenuItems = useCallback(() => {
    return getItems().map(({ key, label, icon, children }) =>
      getItem(
        label,
        key,
        icon,
        children.map(child =>
          getItem(
            <Link key={child.key} to={child.to}>
              <span>{child.label}</span>
            </Link>,
            child.key
          )
        )
      )
    );
  }, [getItems]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <MenuOutlined />
        <TractianIcon
          style={{
            width: "150px",
            cursor: "pointer"
          }}
          onClick={() => navigate("/tractian")}
        />
      </Header>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {}}
          onCollapse={(collapsed, type) => {}}
        >
          <SideMenu menuItems={getMenuItems()} />
        </Sider>
        <Content>
          {children} <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
