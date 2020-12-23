import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { fetchPics, uploadPic } from "../../api";

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [fectchStatusError, setFetchStatusError] = useState(null);

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

  return (
    <Container className="fx-margin">
      <h3>Welcome to Kenziegram!</h3>
      <h5>Select photos to upload photos and see your image gallery</h5>
      {fectchStatusError && <p>{fectchStatusError}</p>}
      {uploadStatus && <p>{uploadStatus}</p>}
      <form onSubmit={submitForm}>
        <input type="file" name="photo" onChange={onSelectFile} />
        <Button type="submit">Upload</Button>
      </form>
    </Container>
  );
};

export default Home;
