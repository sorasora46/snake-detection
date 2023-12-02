import Link from "next/link";
import "./page.css";
import Image from "next/image";

export default async function Upload({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const fileName = String(searchParams?.fileName);
  const result = await getPredictedImage(fileName);

  function toFirstUpperCase(str: string): string {
    return str[0].toUpperCase() + str.substring(1);
  }

  function renderDetail() {
    if (result.success) {
      const nameArr = result.snake_name.split("_");
      const genus = nameArr[0];
      const species = nameArr[1];
      const type =
        nameArr[2] === "non" ? `${nameArr[2]}-${nameArr[3]}` : nameArr[2];
      const conf = result.conf;

      return (
        <>
          <p>
            <span>genus</span>: {toFirstUpperCase(genus)}
          </p>
          <p>
            <span>species</span>: {toFirstUpperCase(species)}
          </p>
          <p>
            <span>type</span>: {toFirstUpperCase(type)}
          </p>
          <p>
            <span>confidence</span>: {conf.toFixed(2)}%
          </p>
        </>
      );
    }

    return (
      <>
        <p>{result.snake_name}</p>
      </>
    );
  }

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
        <div className="result-detail">{renderDetail()}</div>
        <div className="result">
          <Image
            src={`data:image/png;base64,${result.result}`}
            alt="predicted image"
            width={640}
            height={640}
          />
        </div>
      </main>
    </>
  );
}

const getPredictedImage = async (fileName: string | null) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/predict?fileName=${fileName}`,
    {
      method: "GET",
      mode: "cors",
    }
  );
  const responseJson = await response.json();
  return responseJson;
};
