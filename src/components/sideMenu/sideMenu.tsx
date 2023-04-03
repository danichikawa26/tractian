import { Menu } from "antd";
import { MenuItem } from "../../interfaces/menuItem";
interface IProps {
  menuItems: MenuItem[];
}

const SideMenu = (props: IProps) => {
  const { menuItems } = props;
  return <Menu theme="dark" mode="inline" items={menuItems} />;
};

export default SideMenu;
