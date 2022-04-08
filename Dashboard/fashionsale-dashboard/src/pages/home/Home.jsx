import InfoTop from "../../components/infotop/InfoTop"
import Widgetprodlast from "../../components/widgetprodlast/Widgetprodlast"
import Widgetuserlast from "../../components/widgetuserlast/Widgetuserlast"
import "./home.css"

export default function Home() {
  return (
    <div className = "home">
      <InfoTop/>
      <div className="homeWidgets">
        <Widgetuserlast/>
        <Widgetprodlast/>
      </div>
    </div>
  )
}
