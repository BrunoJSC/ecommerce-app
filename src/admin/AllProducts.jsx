import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Col, Container, Row } from "reactstrap";
import { useGetData } from "../custom-hooks/useGetData";
import { db } from "../firebase.config";
export const AllProducts = () => {
  const { data: productsData, loading } = useGetData("products");

  console.log(productsData);

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    toast.success("Product deleted successfully");
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <table className="table">
              <thead>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Action</th>
              </thead>

              <tbody>
                {loading ? (
                  <h4 className="py-5 text-center fw-bold">Loading...</h4>
                ) : (
                  productsData.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img src={item.imgUrl} alt="" />
                      </td>
                      <td>{item.title}</td>
                      <td>{item.category}</td>
                      <td>{item.price}</td>
                      <td>
                        <button
                          onClick={() => deleteProduct(item.id)}
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
          </Col>
        </Row>
      </Container>
    </section>
  );
};
