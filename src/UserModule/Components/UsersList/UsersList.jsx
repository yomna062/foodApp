import React, { useEffect, useState } from 'react';
import Header from '../../../Shared/Components/Header/Header';
import headerimg2 from '../../../assets/images/header2.png';
import NoData from '../../../Shared/Components/NoData/NoData';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from '../../../Shared/Components/DeleteConfirmation/DeleteConfirmation';
import { toast } from 'react-toastify';

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);     
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setSelectedUser(null);
  };
  const handleShow = (user) => {
    setSelectedUser(user);
    setShow(true);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://upskilling-egypt.com:3006/api/v1/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        console.log("Fetched users data:", response.data);

        setUsers(response.data.data || []);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async () => {
    if (!selectedUser) return;

    try {
      await axios.delete(`https://upskilling-egypt.com:3006/api/v1/users/${selectedUser.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(users.filter(u => u.id !== selectedUser.id));
    
      toast.success(` ${selectedUser.userName}User deleted successfully`);
      handleClose();
    } catch (error) {
      console.log("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  return (
    <>
      {/* Modal Section ============================ */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <DeleteConfirmation deleteItem='User' name={selectedUser.userName} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ================================= */}

      <Header
        title="Users"
        subtitle="List"
        description="You can now add your items that any user can order it from the Application and you can edit"
        imgUrl={headerimg2}
        minHeight="200px"
        imgWidth="50"
      />

      <div className="mt-4">
       <table className="table table-striped">
            <thead > 
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Country</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.country}</td>
                  <td>{user.group?.name || '-'}</td>
                  <td>
                    <div className="dropdown">
                      <i className="fa-solid fa-ellipsis" data-bs-toggle="dropdown" style={{ cursor: 'pointer' }}></i>
                      <ul className="dropdown-menu">
                        <li><button className="dropdown-item">View</button></li>
                        <li>
                          <button className="dropdown-item text-danger" onClick={() => handleShow(user)}>
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  <NoData />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
