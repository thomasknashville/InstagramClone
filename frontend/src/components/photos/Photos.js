import { useEffect, useState } from "react";
import { fetchPics, API_BASE_URL, uploadPic } from "../../api";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Modal } from "react-bootstrap";
import Navigation from "../navigation/Naviagtion";

export const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [fectchStatusError, setFetchStatusError] = useState(null);
  const [show, setShow] = useState(false);
  const [modalSrc, setModalSrc] = useState("no path!");
  useEffect(() => {
    async function getPhotos() {
      setPhotos(await fetchPics());
    }
    getPhotos();
  }, []);

  const reFecthPhotos = async () => {
    try {
      setFetchStatusError(null);
      setPhotos(await fetchPics());
    } catch {
      setFetchStatusError("Unable to fetch photos");
    }
  };

  const submitForm = async (event) => {
    try {
      event.preventDefault();
      await uploadPic(selectedFile);
      await reFecthPhotos();
      setUploadStatus("Success!");
    } catch {
      setUploadStatus("Unable to upload photo");
    } finally {
      setTimeout(() => {
        setUploadStatus(null);
      }, 3000);
    }
  };

  const onSelectFile = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleModal = (event) => {
    console.log(modalSrc);

    setShow(!show);
  };

  // needs work, image not dsiplaying in Modal component
  const handleSrc = (event) => {
    setModalSrc(event.currentTarget.src);
  };

  const handleImgClick = (event) => {
    handleModal();
    // handleSrc(event);
  };
  return (
    <div className="photoGallery">
      <Modal show={show}>
        <Modal.Header>Photo name</Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Img src={`${modalSrc}`} />
            Photo size
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleModal()}>Close Modal</Button>
        </Modal.Footer>
      </Modal>
      {fectchStatusError && <p>{fectchStatusError}</p>}
      {uploadStatus && <p>{uploadStatus}</p>}
      <form onSubmit={submitForm}>
        <input type="file" name="photo" onChange={onSelectFile} />
        <Button type="submit">Upload</Button>
      </form>
      {photos.map((pic) => (
        <Button onClick={() => handleImgClick()}>
          <Card>
            <Card.Img src={`${API_BASE_URL}${pic}`} />
            {/* <img key={pic} src={`${API_BASE_URL}${pic}`} alt={pic} width={"150px"} height={"150px"} /> */}
          </Card>
        </Button>
      ))}
    </div>
  );
};

export default Photos;
