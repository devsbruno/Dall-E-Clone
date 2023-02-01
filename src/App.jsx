import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageSize, setImageSize] = useState("1024x1024");

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setIsLoading(true);
    const res = await openai.createImage({
      prompt: prompt,
      n: 7,
      size: imageSize,
    });

    setResult(res.data.data);
    setIsLoading(false);
  };

  return (
    <div className="app-main">
      <h1>Generate an Image using Open AI API</h1>
      <input
        className="app-input"
        placeholder="Type something to Generate an Image.."
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="select-container">
        <h3 className="select-title">Select Image Size:</h3>
        <select className="select-size" onChange={(e) => setImageSize(e.target.value)}>
          <option value="1024x1024">1024x1024</option>
          <option value="512x512">512x512</option>
          <option value="256x256">256x256</option>
        </select>
      </div>
      <button className="generate-button" onClick={generateImage}>
        {isLoading ? "Loading..." : "Generate an Image"}
      </button>

      {result.length > 0 ? (
        result.map((item) => (
          <img key={item.id} className="result-image" src={item.url} alt="result" />
        ))
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
