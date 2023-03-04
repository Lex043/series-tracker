import { useState } from "react";
import uuid from "react-uuid";

interface Results {
  id: string;
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

  const increaseSeason = (id: string) => {
    setSeries((current: any) =>
      current.map((item: Results) =>
        item.id === id ? { ...item, season: item.season + 1 } : item
      )
    );
  };

  const decreaseSeason = (id: string) => {
    setSeries((current: any) =>
      current.map((item: Results) =>
        item.id === id
          ? {
              ...item,
              season: item.season <= 0 ? item.season : item.season - 1,
            }
          : item
      )
    );
  };

  const increaseEpisode = (id: string) => {
    setSeries((current: any) =>
      current.map((item: Results) =>
        item.id === id ? { ...item, episode: item.episode + 1 } : item
      )
    );
  };

  const decreaseEpisode = (id: string) => {
    setSeries((current: any) =>
      current.map((item: Results) =>
        item.id === id
          ? {
              ...item,
              episode: item.episode <= 0 ? item.episode : item.episode - 1,
            }
          : item
      )
    );
  };

  const deleteSeries = (id: string) => {
    setSeries((current) => current.filter((item: Results) => item.id !== id));
  };

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

      <section className="flex flex-wrap gap-10 mx-6 mt-16">
        {series &&
          series.map((serie: Results) => (
            <div
              key={serie.id}
              className="bg-white border-2 shadow-[#f0f0f0] shadow-sm py-6 px-4 rounded-md"
            >
              <p
                onClick={() => deleteSeries(serie.id)}
                className="text-end pb-6 cursor-pointer"
              >
                X
              </p>
              <div className="flex flex-col gap-2 items-center">
                <p className="font-mono">{serie.title.toUpperCase()}</p>
                <div className="flex items-center gap-2 py-2">
                  <button
                    onClick={() => decreaseSeason(serie.id)}
                    className="bg-[#4a4a4a91] font-semibold text-white rounded-full w-7 h-7"
                  >
                    -
                  </button>
                  <p>Season {serie.season}</p>
                  <button
                    onClick={() => increaseSeason(serie.id)}
                    className="bg-[#4a4a4a91] font-semibold text-white rounded-full w-7 h-7"
                  >
                    +
                  </button>
                </div>
                <div className="flex items-center gap-2 py-2">
                  <button
                    onClick={() => decreaseEpisode(serie.id)}
                    className="bg-[#4a4a4a91] font-semibold text-white rounded-full w-7 h-7"
                  >
                    -
                  </button>
                  <p>Episode {serie.episode}</p>
                  <button
                    onClick={() => increaseEpisode(serie.id)}
                    className="bg-[#4a4a4a91] font-semibold text-white rounded-full w-7 h-7"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
      </section>
    </section>
  );
};

export default Form;
