import PropTypes from 'prop-types';
import cn from 'classnames';
import './GoodList.scss';

const GoodList = ({data, onToggleModal, onToggleFav, favorites, items, RenderItemComponent, inCart}) => {
    const cards = data?.map(card => <RenderItemComponent key={card.article} card={card} onToggleModal={onToggleModal} onToggleFav={onToggleFav} favorites={favorites} items={items}/>);

    return ( 
        <div className={cn('container', {"container-cart": inCart})}>
            {cards.length ? (
                <ul className={cn('list', {"goods-list": !inCart})}>
                    {cards}
                </ul>
            ) : (
                <div className="no-items">
                    <p>No items have been added.</p>
                </div>
            )}
        </div>
    );
}

GoodList.propTypes = {
    data: PropTypes.array.isRequired,
    onToggleModal: PropTypes.func,
}
 
export default GoodList;