import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import Modal from "../Modal/Modal";
import {CartDish} from "../../types";
import CartDishes from "./CartDishes";

interface Props {
  cartDishes: CartDish[];
}

const Cart: React.FC<Props> = ({cartDishes}) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  let cart = (
    <div className="alert alert-primary">
      Cart is empty! Add something!
    </div>
  );
  const cancel = () => setShowModal(prev => !prev);

  if (cartDishes.length > 0) {
    cart = (
      <>
        <CartDishes cartDishes={cartDishes}/>
        <button
          className="w-100 btn btn-primary"
          onClick={cancel}
        >
          Order
        </button>
      </>
    );
  }

  return (
    <>
      <h4>Cart</h4>
      {cart}
      <Modal show={showModal} title="Order" onClose={cancel}>
        <div className="modal-body">
          <p>Do you want to continue to checkout?</p>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-danger"
            onClick={cancel}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/checkout')}
          >
            Continue
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Cart;