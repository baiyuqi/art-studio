
import { useRouter } from "next/router";
import { ethers } from "ethers";
import MyErc721 from "../../artifacts/contracts/NFT.sol/MyErc721.json";
import Link from 'next/link';
import Connect from "./Connect";
import Test from "./Test";

import styles from './TopLayout.module.css';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';

import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

function TopLayout({ children }) {

  return (
    <Layout>
      <Header className="header">
        <div className={styles.logo} />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item><Link href="/">首页</Link></Menu.Item>
          <Menu.Item><Link href="/mintor">铸币</Link></Menu.Item>
          <Menu.Item><Link href="/mynft">我的藏品</Link></Menu.Item>
          <Menu.Item><Connect /></Menu.Item>
          <Menu.Item> <Test /></Menu.Item>
        </Menu>
        
       
      </Header>





      <div>{children}</div>
    </Layout>

  )
}

export default TopLayout
