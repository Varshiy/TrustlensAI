import { useState } from "react";

function UploadSection() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setResult("");

      window.pendo?.track("image_uploaded", {
        fileName: selectedFile.name,
        fileType: selectedFile.type,
        fileSize: selectedFile.size,
      });
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please upload an image first!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "https://trustlens-ai-c637a165-production.up.railway.app/predict",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Server Error");
      }

      const data = await response.json();

      window.pendo?.track("image_analysis_completed", {
        prediction: data.prediction,
        confidence: data.confidence,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
      });

      setResult(
        `Prediction: ${data.prediction}
Confidence: ${data.confidence}%`
      );
    } catch (error) {
      console.log(error);

      window.pendo?.track("image_analysis_failed", {
        errorMessage: error instanceof Error ? error.message : "Unknown error",
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
      });

      alert("Error connecting to backend!");
    }

    setLoading(false);
  };

  const handleReset = () => {
    setFile(null);
    setFileName("");
    setResult("");
    setLoading(false);
  };

  return (
    <section className="upload">
      <div className="upload-box">

        <h2>Analyze an Image</h2>
        <p>Drag & Drop your image here</p>

        <input
          type="file"
          id="fileUpload"
          hidden
          onChange={handleChange}
        />

        {!fileName && (
          <label
            htmlFor="fileUpload"
            className="drop-area"
          >
            📁
            <br />
            Drag & Drop
            <br />
            or Click to Upload
          </label>
        )}

        {fileName && (
          <p className="filename">
            ✅ {fileName}
          </p>
        )}

        {!result && (
          <button
            className="analyze-btn"
            onClick={handleAnalyze}
            disabled={loading}

          >
            {loading ? "🔍 AI is analyzing... Please wait" : "Analyze"}
          </button>
        )}

        {result && (
          <>
            <div
              style={{
                marginTop: "20px",
                color: "#00ff99",
                fontSize: "20px",
                fontWeight: "bold",
                whiteSpace: "pre-line",
              }}
            >
              {result}
            </div>

            <button
              className="analyze-btn"
              onClick={handleReset}
              style={{ marginTop: "20px" }}
            >
              Analyze Another Image
            </button>
          </>
        )}

      </div>
    </section>
  );
}

export default UploadSection;