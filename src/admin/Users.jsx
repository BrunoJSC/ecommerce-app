import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Col, Container, Row } from "reactstrap";
import { useGetData } from "../custom-hooks/useGetData";
import { db } from "../firebase.config";

export const Users = () => {
  const { data: usersData, loading } = useGetData("users");

  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    toast.success("User deleted successfully");
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="fw-bold">Users</h4>
          </Col>

          <Col lg="12">
            <h4 className="pt-5">
              <table className="table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <h5 className="pt-5 fw-bold">Loading...</h5>
                  ) : (
                    usersData.map((user) => (
                      <tr key={user.uid}>
                        <td>
                          <img src={user.photoURL} alt="" />
                        </td>
                        <td>{user.displayName}</td>
                        <td>{user.email}</td>
                        <td>
                          <button
                            onClick={() => deleteUser(user.uid)}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </h4>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
