"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

export default function Home() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJoke = async () => {
      try {
        const response = await axios.get(
          "https://v2.jokeapi.dev/joke/Programming?type=single"
        );

        console.log(response.data);

        if (response.data && response.data.joke) {
          setJoke(response.data.joke);
        } else if (
          response.data &&
          response.data.jokes &&
          response.data.jokes.length > 0
        ) {
          setJoke(response.data.jokes[0].joke);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching joke", error);
        setLoading(false);
      }
    };

    fetchJoke();
  }, []);

  return (
    <main className=" bg-[url('/bg.png')] bg-contain relative h-screen w-full flex flex-col justify-center items-center">
      <div className=" bg-[rgba(255,255,255,0.9)] rounded-t-2xl shadow-2xl h-[40%] w-[90%] md:w-[50%] flex flex-col items-center justify-center p-6 text-center overflow-y-scroll break-words">
        {loading ? (
          <Image
            src="/loading.svg"
            width={0}
            height={0}
            priority={true}
            alt="Loading..."
            className=" w-auto h-[50vw] md:h-[20vw] object-cover animate-spin rounded-full"
          />
        ) : (
          <div className=" w-full h-full flex flex-col text-center items-center justify-center">
            <Image
              src="/logo.png"
              width={500}
              height={500}
              alt="Logo"
              className="w-auto max-h-[40%] object-center"
            />

            <p className=" font-bold text-black">
              {joke ? joke : "No joke available at the moment."}
            </p>
          </div>
        )}
      </div>
      <div className=" w-[90%] h-[10%] md:w-[50%] bg-[rgba(255,255,255,0.9)] rounded-b-2xl flex justify-center items-center">
        <button
          onClick={() => window.location.reload()}
          className=" bg-blue-950 p-4 text-white rounded-xl cursor-pointer hover:opacity-80"
        >
          Joke Me Again
        </button>
      </div>
      <p className=" font-bold text-black rounded-lg p-2 bg-[rgba(255,255,255,0.9)] absolute bottom-4 left-4 text-lg">
        !JokesDev by Kenneth Manuel
      </p>
    </main>
  );
}
