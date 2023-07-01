import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Signup.css";
import profile from "../assets/profile.avif";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [image, setImage] = useState(null);
  const [uploadImg, setUploadImg] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);

  const validateImg = (e) => {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return alert("Maximum file size is 1mb");
    } else {
      setImage(file);
      setPreviewImg(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "dqoghr5i");
    try {
      setUploadImg(true);
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/disgpgolw/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const urlData = await res.json();
      setUploadImg(false);
      return urlData.url;
    } catch (err) {
      setUploadImg(false);
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please upload your profile picture");
    try {
      const url = await uploadImage(image);
      console.log(url);
    } catch(err) {
      console.log(err)
    }
  };

  return (
    <Container>
      <Row>
        <Col
          md={7}
          className="d-flex align-items-center justify-content-center flex-direction-column"
        >
          <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleSubmit}>
            <h1 className="text-center">Create account</h1>
            <div className="signup-profile-pic_container">
              <img src={previewImg || profile} className="signup-profile-pic" />
              <label htmlFor="image-upload" className="image-upload-label">
                <i className="fas fa-plus-circle add-picture-icon"></i>
              </label>
              <input
                type="file"
                id="image-upload"
                hidden
                accept="image/png"
                onChange={validateImg}
              />
            </div>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {uploadImg ? 'Signing you up...' : 'Signup'}
            </Button>

            <div className="py-4">
              <p className="text-center">
                Already have an account ? <Link to="/login">Login</Link>
              </p>
            </div>
          </Form>
        </Col>

        <Col md={5} className="signup__bg"></Col>
      </Row>
    </Container>
  );
};

export default Signup;
