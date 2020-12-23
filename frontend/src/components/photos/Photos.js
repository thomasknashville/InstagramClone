import { useEffect, useState } from "react";
import { fetchPics, API_BASE_URL, uploadPic, fetchPicSize } from "../../api";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Modal } from "react-bootstrap";
import Container from "react-bootstrap/Container";

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

  const resetForm = () => {
    const form = document.querySelector(".form");
    form.value = "";
  };

  const submitForm = async (event) => {
    try {
      event.preventDefault();
      await uploadPic(selectedFile);
      await reFecthPhotos();
      setUploadStatus("Success!");
      resetForm();
    } catch {
      setUploadStatus("Unable to upload photo");
      resetForm();
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
    setShow(!show);
  };

  const handleImgClick = async (e) => {
    setModalSrc(e.target.src);
    setModalName(e.target.name.substring(9));
    const picSize = await fetchPicSize(e);
    setModalFileSize(picSize);
    handleModal();
  };

  return (
    <Container className="photoGallery fx-margin">
      {fectchStatusError && <p>{fectchStatusError}</p>}
      {uploadStatus && <p>{uploadStatus}</p>}
      <form onSubmit={submitForm}>
        <input className="form" type="file" name="photo" onChange={onSelectFile} />
        <Button type="submit">Upload</Button>
      </form>
      <div className="gallery">
        {photos.map((pic) => (
          <Modal show={show}>
            <Modal.Header className='modalText'>{modalName}</Modal.Header>
            <Modal.Body>
              <Card className='modalImageHolder'>
                <Card.Img src={modalSrc} />
              </Card>
            </Modal.Body>
            <Modal.Footer className='modalText'>
              <p>{modalFileSize}</p>
              <Button onClick={() => handleModal()}>Close</Button>
            </Modal.Footer>
          </Modal>
        ))}
        {photos.map((pic) => (
          <Card src={`${API_BASE_URL}${pic}`}>
            <Card.Img src={`${API_BASE_URL}${pic}`} name={pic} onClick={(e) => handleImgClick(e)} />
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default Photos;
