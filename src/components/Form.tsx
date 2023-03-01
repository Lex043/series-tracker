import { useState } from "react";
import uuid from "react-uuid";

interface Results {
  id: number;
  title: string;
  season: number;
  episode: number;
}

const Form = () => {
  const [text, setText] = useState("");
  const [series, setSeries] = useState([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const obj = {
      title: text,
      id: uuid(),
      season: 0,
      episode: 0,
    };
    setSeries((current): any => [obj, ...current]);
    setText("");
  };

  console.log(series);

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={onChange}
          type="text"
          placeholder="TYPE SERIES TITLE"
          className="w-full outline-black rounded-lg h-10 px-2 text-[#4a4a4a91] border-2 border-[#4a4a4a91]"
        />
        <button className="text-white bg-black px-4 py-2 mt-4 rounded-lg">
          ADD
        </button>
      </form>

      {series &&
        series.map((serie: Results) => (
          <div key={serie.id}>
            <p>{serie.title.toUpperCase()}</p>
            <p>Season {serie.season}</p>
            <p>Episode {serie.episode}</p>
          </div>
        ))}
    </section>
  );
};

export default Form;
