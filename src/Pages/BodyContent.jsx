import Search from "./Search"
import Veggie from "./Veggie"

const BodyContent = () => {
    return ( 
        <div className="body-content">
            <div className="item1">
                <Search />
            </div>
            <div className="item2" style={{overflowY: 'auto', height: '350px'}}>
                <Veggie />
            </div>   
                     
        </div>
    )
}
 
export default BodyContent