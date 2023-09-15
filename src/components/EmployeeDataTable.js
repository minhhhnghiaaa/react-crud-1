import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import editIcon from "./../assets/edit.png";
import deleteIcon from "./../assets/delete.JPG";
import "../App.css";


const MerchantDataTable = () => {

  const navigate = useNavigate();
  const baseURL = "http://localhost:5052/api";
  const [merchant, setMerchant] = useState([]);

  const setMerchantData = () => {
    axios.get(baseURL + "/merchant").then((response) => {
      setMerchant(response.data);
    }).catch(error => {
      alert("Error Ocurred while loading data:" + error);
    });
  }

  useEffect(() => {
    setMerchantData();
  }, []);


  const removeEmployee = (id) => {
    axios.delete(baseURL + "/employee/" + id).then((response) => {
      alert("Employee record " + id + " deleted!");
      setMerchantData();
      navigate('/read')

    }).catch(error => {
      alert("Error Ocurred in removeEmployee:" + error);
    });
  }

  const removeAllEmployee = (id) => {
    axios.delete(baseURL + "/merchant").then((response) => {
      alert("All merchant deleted!");
      setMerchantData();
      navigate('/read')
    }).catch(error => {
      alert("Error Ocurred in removeEmployee:" + error);
    });
  }

  return (
    <div class="card-body">
      <br>
      </br>
      <nav>
        <button
          className="btn btn-primary nav-item active"
          onClick={() => navigate("/create")}>
          Create New Employee
        </button>
      </nav>


      <br></br>
      <div className="col-md-6">
        <h4>Merchant List</h4>

        <div class="container">
          <div class="row">
            <div class="col-12">
              <table class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>fullName</th>
                    <th>bankName</th>
                    <th>accountNumber</th>
                    <th>swiftCode</th>
                    <th>balance</th>
                    <th scope="col">Action</th>

                  </tr>
                </thead>
                <tbody>

                  {
                    merchant &&
                    merchant.map((merchant, index) => (

                      <tr>
                        <th scope="row">{merchant.merchantId}</th>
                        <td>{merchant.fullName}</td>
                        <td>{merchant.bankName}</td>
                        <td>{merchant.accountNumber}</td>
                        <td>{merchant.swiftCode}</td>
                        <td>{merchant.balance}</td>

                        <td >

                          <Link to={"/edit/" + merchant.id}><img src={editIcon} alt="Edit" width="50" height="30" title="Edit" />
                          </Link>


                          <button
                            onClick={() => removeEmployee(merchant.id)} className="button"
                          > <img src={deleteIcon} alt="Remove" title="Remove" width="30" height="30" />
                          </button>

                        </td>
                      </tr>

                    ))
                  }

                </tbody>
              </table>
            </div>
          </div>
        </div>
        <button className="btn btn-sm btn-danger"
          onClick={() => removeAllEmployee()}>
          Remove All
        </button>
      </div>

    </div>

  );
}
export default MerchantDataTable;