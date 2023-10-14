import GoodList from "../../components/GoodsList/GoodList";
import CardItem from '../../components/CardItem/CardItem';
import CartItem from '../../components/CartItem/CartItem';
import { useLocation } from "react-router-dom";
import filterData from "../../helpers/filterData";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { ViewContex } from "../../contexts/ViewContext";

const Category = () => {
    const {view} = useContext(ViewContex);
    const goods = useSelector(state => state.goods.goods);
    const {pathname} = useLocation();

    const filteredData = filterData(pathname, goods);

    const renderedComponent = view === "cards" ? CardItem : CartItem;

    return <GoodList data={filteredData || goods} RenderItemComponent={renderedComponent}/>
}
 
export default Category;