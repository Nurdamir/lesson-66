import React from 'react';
import DishForm from "../../components/DishForm/DishForm";
import {ApiDish} from "../../types";
import {useNavigate} from "react-router-dom";
import axiosApi from "../../axiosApi";


const NewDish: React.FC = () => {
  const navigate = useNavigate(); // 1

  const createDish = async (dish: ApiDish) => {
    await axiosApi.post('/dishes.json', dish); // 2
    navigate('/'); // 3
  };

  return (
    <div className="row mt-2">
      <div className="col">
        <DishForm onSubmit={createDish}/> {/* 4 */}
      </div>
    </div>
  );
};



export default NewDish;