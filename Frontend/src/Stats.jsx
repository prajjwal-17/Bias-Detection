import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const beforeMitigationImages = [
  "Image1.jpg", "Image2.jpg", "Image3.jpg", "Image4.jpg", "Image5.jpg"
];

const afterMitigationImages = [
  "Image6.jpg", "Image7.jpg", "Image8.jpg", "Image9.jpg", "Image10.jpg"
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 700,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};

const Stats = () => {
  return (
    <div className="bg-cream p-10 min-h-screen flex flex-col items-center justify-center space-y-16">
      {/* Before Mitigation Carousel */}
      <div className="flex flex-col justify-center items-center bg-[#76BA9D] p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Before Mitigation</h2>
        
        <div className="flex justify-center items-center gap-8">
          <div className="w-[50%] text-[24px] leading-relaxed">
            <p className="mb-4 font-semibold">
              <span className="font-bold underline">Raw Data Contains Bias</span> – The dataset is not preprocessed, meaning it may contain historical biases and imbalances in class distribution.
            </p>
            <p className="mb-4 font-semibold">
              <span className="font-bold underline">Unequal Treatment of Groups</span> – Metrics like demographic parity difference and equalized odds difference are used to detect bias, showing that certain groups receive different predictions unfairly.
            </p>
            <p className="mb-4 font-semibold">
              <span className="font-bold underline">Feature Influence Analysis</span> – SHAP and LIME techniques reveal that certain features disproportionately affect predictions.
            </p>
            <p className="mb-4 font-semibold">
              <span className="font-bold underline">Model Trained on Unprocessed Data</span> – Training a model without bias mitigation results in unfair outcomes that favor or disadvantage specific groups.
            </p>
            <p className="font-semibold">
              <span className="font-bold underline">Disparate Impact Observed</span> – Initial analysis may show that sensitive attributes (e.g., gender, ethnicity) significantly affect classification results.
            </p>
          </div>

          <div className="w-[50%] max-w-3xl">
            <Slider {...sliderSettings}>
              {beforeMitigationImages.map((image, index) => (
                <div key={index} className="p-4 bg-green-200 rounded-xl shadow-lg flex justify-center">
                  <img src={image} alt={`Before Mitigation ${index + 1}`} className="w-full h-auto rounded-lg" />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      {/* After Mitigation Carousel */}
      <div className="flex flex-col justify-center items-center bg-[#76BA9D] p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">After Mitigation</h2>

        <div className="flex justify-center items-center gap-8">
          <div className="w-[50%] max-w-3xl">
            <Slider {...sliderSettings}>
              {afterMitigationImages.map((image, index) => (
                <div key={index} className="p-4 bg-green-200 rounded-xl shadow-lg flex justify-center">
                  <img src={image} alt={`After Mitigation ${index + 6}`} className="w-full h-auto rounded-lg" />
                </div>
              ))}
            </Slider>
          </div>

          <div className="w-[50%] text-[24px] leading-relaxed">
            <p className="mb-4 font-semibold">
              <span className="font-bold underline">Fairness Constraints Applied</span> – Techniques like Reweighing, Disparate Impact Remover, and Adversarial Debiasing are used to adjust data and models to reduce bias.
            </p>
            <p className="mb-4 font-semibold">
              <span className="font-bold underline">Improved Parity Metrics</span> – Demographic parity difference and equalized odds difference values decrease, indicating reduced unfair treatment across groups.
            </p>
            <p className="mb-4 font-semibold">
              <span className="font-bold underline">Balanced Feature Influence</span> – SHAP and LIME show a more uniform impact of features, ensuring no single group is disproportionately affected.
            </p>
            <p className="mb-4 font-semibold">
              <span className="font-bold underline">Fair Model Predictions</span> – The classifier (Random Forest/XGBoost) now produces less biased predictions after preprocessing and post-processing bias mitigation techniques.
            </p>
            <p className="font-semibold">
              <span className="font-bold underline">Reduced Disparate Impact</span> – The model’s decision-making is less dependent on sensitive attributes, leading to more equitable outcomes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
