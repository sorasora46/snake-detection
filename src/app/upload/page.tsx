import Link from "next/link";
import "./page.css";
import Image from "next/image";

export const getPredictedImage = async (fileName: string | null) => {
  const response = await fetch(
    `http://127.0.0.1:5000/predict?fileName=${fileName}`,
    {
      method: "GET",
      mode: "cors",
    }
  );
  const responseJson = await response.json();
  return responseJson;
};

export default async function Upload({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const fileName = String(searchParams?.fileName);
  const predictedImage = await getPredictedImage(fileName);

  return (
    <>
      <nav className="nav-upload">
        <h1 className="logo-text">Detect Venomous Snake</h1>
        <Link href="/" className="go-back">
          Go back
        </Link>
      </nav>
      <main>
        <h1>Predicting Result</h1>
        <div className="result">
          <Image
            src={`data:image/png;base64,${predictedImage.result}`}
            alt="predicted image"
            width={predictedImage.width || 640}
            height={predictedImage.height || 640}
          />
        </div>
      </main>
    </>
  );
}
