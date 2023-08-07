import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import { db, storage } from "../firebase.config";

export const AddProducts = () => {
  const [enterTitle, setEnterTitle] = useState("");
  const [enterShortDesc, setShortDesc] = useState("");
  const [enterDescription, setEnterDescription] = useState("");
  const [enterCategory, setEnterCategory] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [enterProductImg, setEnterProductImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    toast.success("Product Added Successfully");

    try {
      const docRef = await collection(db, "products");
      const storageRef = await ref(
        storage,
        `productImages/${Date.now() + enterProductImg.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, enterProductImg);
      uploadTask.on(
        () => {
          toast.error("image not uploaded");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(docRef, {
              productName: enterTitle,
              shortDesc: enterShortDesc,
              description: enterDescription,
              category: enterCategory,
              price: enterPrice,
              imgUrl: downloadURL,
            });
          });
        }
      );
      setLoading(false);
      toast.success("Product Added Successfully");
      navigate("/dashboard/all-products");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="mb-5"> Add Product</h4>
            {loading ? (
              <h4>Loading....</h4>
            ) : (
              <Form onSubmit={addProduct}>
                <FormGroup className="form__group">
                  <span>Product title</span>
                  <input
                    type="text"
                    placeholder="Double sofa"
                    onChange={(e) => setEnterTitle(e.target.value)}
                    value={enterTitle}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <span>Short Description</span>
                  <input
                    type="text"
                    placeholder="lorem...."
                    onChange={(e) => setShortDesc(e.target.value)}
                    value={enterShortDesc}
                    required
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <span>Description</span>
                  <input
                    type="text"
                    placeholder="Description....."
                    onChange={(e) => setEnterDescription(e.target.value)}
                    value={enterDescription}
                    required
                  />
                </FormGroup>

                <div className="d-flex align-items-center justify-content-between gap-5">
                  <FormGroup className="form__group w-100">
                    <span>Price</span>
                    <input
                      type="number"
                      placeholder="$100"
                      onChange={(e) => setEnterPrice(e.target.value)}
                      value={enterPrice}
                      required
                    />
                  </FormGroup>

                  <FormGroup className="form__group w-50">
                    <span>Category</span>
                    <select
                      className="w-100 p-2"
                      onChange={(e) => setEnterCategory(e.target.value)}
                      value={enterCategory}
                    >
                      <option>Select category</option>
                      <option value="chair">Chair</option>
                      <option value="mobile">Mobile</option>
                      <option value="watch">Watch</option>
                      <option value="wireless">Wireless</option>
                    </select>
                  </FormGroup>
                </div>

                <div>
                  <FormGroup className="form__group">
                    <span>Product Image</span>
                    <input
                      type="file"
                      onChange={(e) => setEnterProductImg(e.target.files[0])}
                      required
                    />
                  </FormGroup>
                </div>

                <button type="submit" className="buy__btn">
                  Add Product
                </button>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};
