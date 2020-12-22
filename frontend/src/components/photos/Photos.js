import { useEffect, useState } from "react";
import { fetchPics, API_BASE_URL, uploadPic, fetchPicSize } from "../../api";
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
  const [modalName, setModalName] = useState("");
  const [modalFileSize, setModalFileSize] = useState("0");

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
    // console.log(modalSrc);

    setShow(!show);
  };

  const handleImgClick = (e) => {
    setModalSrc(e.target.src);
    setModalName(e.target.name.substring(9));
    const picSize = `${fetchPicSize(e)}`;
    setModalFileSize(picSize);
    handleModal();
  };

  return (
    <div className="photoGallery">
      {fectchStatusError && <p>{fectchStatusError}</p>}
      {uploadStatus && <p>{uploadStatus}</p>}
      <form onSubmit={submitForm}>
        <input type="file" name="photo" onChange={onSelectFile} />
        <Button type="submit">Upload</Button>
      </form>
      {photos.map((pic) => (
        <Modal show={show}>
          <Modal.Header>{modalName}</Modal.Header>
          <Modal.Body>
            <Card>
              <Card.Img src={modalSrc} />
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <p>{modalFileSize}</p>
            <Button onClick={() => handleModal()}>Close Modal</Button>
          </Modal.Footer>
        </Modal>
      ))}
      {photos.map((pic) => (
        // <Button onClick={() => handleImgClick()} >
        <Card src={`${API_BASE_URL}${pic}`}>
          <Card.Img src={`${API_BASE_URL}${pic}`} name={pic} onClick={(e) => handleImgClick(e)} />
          {/* <img key={pic} src={`${API_BASE_URL}${pic}`} alt={pic} width={"150px"} height={"150px"} /> */}
        </Card>
        // </Button>
      ))}
    </div>
  );
};

export default Photos;
