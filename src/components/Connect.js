import { ethers } from "ethers";
import { connect } from '../service/ConnectionService'
import {NotificationContainer} from "react-notifications"
import 'react-notifications/lib/notifications.css';
function Connect({ children }) {
    const connectWallet = async () => {
        await connect();
    }
  return (
    <div>
            <NotificationContainer />
            <a href="javascript:void(0);" onClick={connectWallet}>
              connect
            </a>


    </div>

  )
}

export default Connect
