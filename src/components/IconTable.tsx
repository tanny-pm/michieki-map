import {
  FaBaby,
  FaCampground,
  FaChargingStation,
  FaCoffee,
  FaGasPump,
  FaHandsHelping,
  FaHotTub,
  FaHotel,
  FaInfo,
  FaMoneyBillWave,
  FaMountain,
  FaShoppingBag,
  FaShower,
  FaTree,
  FaUtensils,
  FaWheelchair,
  FaWifi,
} from "react-icons/fa";
import {
  MdLocalCafe,
  MdLocalGasStation,
  MdLocalLaundryService,
  MdOutlineMuseum,
} from "react-icons/md";

const IconTable = () => {
  return (
    <div>
      <table style={{ borderCollapse: "collapse", margin: "16px" }}>
        <thead>
          <tr>
            <th>単語</th>
            <th>アイコン</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ATM</td>
            <td>
              <FaMoneyBillWave />
            </td>
          </tr>
          <tr>
            <td>ベビーベッド</td>
            <td>
              <FaBaby />
            </td>
          </tr>
          <tr>
            <td>レストラン</td>
            <td>
              <FaUtensils />
            </td>
          </tr>
          <tr>
            <td>軽食・喫茶</td>
            <td>
              <FaCoffee />
              <MdLocalCafe />
            </td>
          </tr>
          <tr>
            <td>宿泊施設</td>
            <td>
              <FaHotel />
            </td>
          </tr>
          <tr>
            <td>温泉施設</td>
            <td>
              <FaHotTub />
            </td>
          </tr>
          <tr>
            <td>キャンプ場等</td>
            <td>
              <FaCampground />
            </td>
          </tr>
          <tr>
            <td>公園</td>
            <td>
              <FaTree />
            </td>
          </tr>
          <tr>
            <td>展望台</td>
            <td>
              <FaMountain />
            </td>
          </tr>
          <tr>
            <td>美術館・博物館</td>
            <td>
              <MdOutlineMuseum />
            </td>
          </tr>
          <tr>
            <td>ガソリンスタンド</td>
            <td>
              <FaGasPump />
              <MdLocalGasStation />
            </td>
          </tr>
          <tr>
            <td>EV充電施設</td>
            <td>
              <FaChargingStation />
            </td>
          </tr>
          <tr>
            <td>無線LAN</td>
            <td>
              <FaWifi />
            </td>
          </tr>
          <tr>
            <td>シャワー</td>
            <td>
              <FaShower />
              <MdLocalLaundryService />
            </td>
          </tr>
          <tr>
            <td>体験施設</td>
            <td>
              <FaHandsHelping />
            </td>
          </tr>
          <tr>
            <td>観光案内</td>
            <td>
              <FaInfo />
            </td>
          </tr>
          <tr>
            <td>身障者トイレ</td>
            <td>
              <FaWheelchair />
            </td>
          </tr>
          <tr>
            <td>ショップ</td>
            <td>
              <FaShoppingBag />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default IconTable;
