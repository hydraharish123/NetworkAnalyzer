import { useState } from "react";
import styled from "styled-components";
import Heading from "../ui/Heading";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { useContext } from "react";
import { centralitiesContext } from "../contexts/CentralitiesContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const UploadBox = styled.div`
  background: #fff;
  padding: 30px 40px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 400px;
`;

const FileInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 2px dashed #007bff;
  border-radius: 8px;
  margin-bottom: 20px;
  margin-top: 20px;
  background-color: #f9f9f9;
  cursor: pointer;

  &:hover {
    background-color: #e9f5ff;
  }
`;

const allowedExtensions = new Set(["json", "xls", "xlsx", "sif"]);

const Message = styled.p`
  margin-top: 16px;
  font-size: 14px;
  color: ${({ success }) => (success ? "green" : "red")};
`;

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { setFileUploading } = useContext(centralitiesContext);

  const handleFileChange = (e) => {
    console.log(e);
    console.log(e.target.files[0].name);
    setFile(e.target.files[0]);
    const extension = e.target.files[0].name.split(".").pop();
    setFileName(extension);
    setMessage("");
  };

  const uploadFile = async () => {
    if (!file) {
      setMessage("Please select a file to upload.");
      setIsSuccess(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("extension", fileName);

    try {
      setFileUploading(true);
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",

        body: formData, // Send the formData (which includes the file)
      });
      if (!res.ok) throw new Error("Failed to send the file to the backend");
      const data = await res.json();
      console.log(data);
      navigate("/main");
    } catch (err) {
      console.error(err.message);
    } finally {
      setFileUploading(false);
    }
  };

  return (
    <Container>
      <UploadBox>
        <Heading as="h1">Upload Network File</Heading>
        <FileInput
          type="file"
          accept={allowedExtensions}
          onChange={handleFileChange}
        />
        <Button size="medium" variation="primary" onClick={uploadFile}>
          Upload
        </Button>
        {message && <Message success={isSuccess}>{message}</Message>}
      </UploadBox>
    </Container>
  );
};

export default FileUpload;
