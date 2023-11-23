"use client";
import Image from "next/image";
import "./page.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [file, setFile] = useState<File>();
  const [fileName, setFileName] = useState<string>();

  const handleSubmitImage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      alert("Please select a picture");
      return;
    }

    const formData = new FormData();
    formData.append("snake_image", file);

    const response = await fetch("http://127.0.0.1:5000/upload", {
      method: "POST",
      mode: "cors",
      body: formData,
    });

    const responseJson = await response.json();

    router.push(`/upload?fileName=${fileName}`);
  };

  const handleUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target.files?.[0];
    if (fileInput) {
      setFile(fileInput);
      setFileName(fileInput.name);
    }
  };

  return (
    <>
      <nav>
        <h1 className="logo-text">Detect Venomous Snake</h1>
      </nav>
      <main>
        <section className="camera-section">
          <div className="box-img">
            <Image
              height={150}
              width={150}
              src="/img/snake.png"
              alt="snake icon"
            />
          </div>
          <div className="box-text">
            <div className="text-desc">
              <h2>Turn on your camera</h2>
              <p>Use your webcam to detect the venomous snake</p>
            </div>
            <button className="btn-red">Turn on camera</button>
          </div>
        </section>
        <section className="upload-section">
          <div className="box-img">
            <Image
              height={150}
              width={150}
              src="/img/upload.png"
              alt="upload icon"
            />
          </div>
          <div className="box-text">
            <div className="text-desc">
              <h2>Upload Picture</h2>
              <p>Detect venomous snake from picture</p>
            </div>
            <form className="file-form" onSubmit={handleSubmitImage}>
              <label htmlFor="snake_image" className="btn-blue">
                Upload picture
              </label>
              <input
                required
                id="snake_image"
                name="snake_image"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                className="fileinput"
                onChange={handleUploadImage}
              />
              <p id="showFile">{fileName}</p>
              <button type="submit">Detect</button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
