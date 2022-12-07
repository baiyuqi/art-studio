import { ethers } from "ethers";
import { connect } from '../service/connection-service'
import {NotificationContainer} from "react-notifications"
import 'react-notifications/lib/notifications.css';


import 'react-notifications-component/dist/theme.css'

function Connect({ children }) {
    const connectWallet = async () => {
        await connect();
    }
  return (
    <div>
 
 
            <a href="javascript:void(0);" onClick={connectWallet}>
              connect
            </a>


    </div>

  )
}

export default Connect
