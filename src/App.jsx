import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { modalData } from './sources/dataBase';
import sendRequest from './helpers/sendRequest';
import Modal from './components/Modal/Modal';
import ActionButtons from './components/ActionButtons/ActionButtons';
import Shop from './pages/Shop/Shop';
import MenShop from './pages/MenShop/MenShop';
import WomenShop from './pages/WomenShop/WomenShop';
import NoPage from './pages/NoPage/NoPage';
import './App.css';


function App() {
  const [goods, setGoods] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState({});
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('items')) || []);
  const [currItem, setCurrItem] = useState(null);

  const increaseFav = () => {
    const favs = favorites.filter(({article}) => article === currItem.article);

    if (!favs.length) {
      localStorage.setItem('favorites', JSON.stringify([...favorites, currItem]));
      setFavorites([...favorites, currItem]);
    }
  };

  const increaseItem = () => {
    localStorage.setItem('items', JSON.stringify([...items, currItem]));
    setItems([...items, currItem]);
  };

  const handleOpenModal = () => setIsOpen(!isOpen);

  const handleToggleFirstModal = (id) => {
    setIsOpen(!isOpen);
    setModal(modalData.firstModal);

    const item = goods.filter(item => item.article === id);
    setCurrItem(...item);
  };

  const handleToggleSecondModal = (e, id) => {
    if (e.target || e.target.closest('.favorite-btn')) {
      setIsOpen(!isOpen);
      setModal(modalData.secondModal);
      
      const item = goods.filter(item => item.article === id);
      setCurrItem(...item);
    }
  };

  useEffect(() => {
    sendRequest('./goods-db.json')
      .then(data => setGoods(data));
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<Shop data={goods} onOpenFirstModal={handleToggleFirstModal} onOpenSecondModal={handleToggleSecondModal} favorites={favorites} items={items}/>} />
        <Route path='/shop' element={<Shop data={goods} onOpenFirstModal={handleToggleFirstModal} onOpenSecondModal={handleToggleSecondModal} favorites={favorites} items={items}/>} />
        <Route path='/men' element={<MenShop data={goods} onOpenFirstModal={handleToggleFirstModal} onOpenSecondModal={handleToggleSecondModal} favorites={favorites} items={items}/>} />
        <Route path='/women' element={<WomenShop data={goods} onOpenFirstModal={handleToggleFirstModal} onOpenSecondModal={handleToggleSecondModal} favorites={favorites} items={items}/>} />
        <Route path='*' element={<NoPage />} />
      </Routes>
      {isOpen && (
        <Modal header={modal.header} text={modal.text} closeButton onCloseModal={handleOpenModal}>
          <ActionButtons confirmBtn='Ok' closeBtn='Cancel' increaseFav={increaseFav} increaseItem={increaseItem} modal={modal}/>
        </Modal>
      )}
    </>
  )
}

export default App;