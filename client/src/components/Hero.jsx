import React from "react";

const Hero = () => {
  return (
    <>
      <div className="hero bg-base-200 min-h-[90vh]">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-emerald-500">Hello there</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn bg-emerald-600 text-white hover:bg-emerald-400 rounded-full px-10">Get Started</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
