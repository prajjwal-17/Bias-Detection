
import amazon from "./amazon.jpg";
import Compas from "./Compas-2.jpg";
import Google from "./Google.jpg";
import Bias from "./Bias.jpg";
export default function Blog() {
  return (
    <div className="bg-[#FCF5E5] h-full  w-full pb-2 mt-10">
      <div className="flex flex-col gap-12 ">
        <div className="flex justify-center items-center">
          <div className="w-[95%] rounded-[20px] bg-[#76BA9D] flex justify-center items-center p-2 ">
            <div className=" w-[70%] flex flex-col gap-2 p-10">
              {/* main heading  */}
              {/* text-[#567C8D] */}
              <div className="font-mono-Roboto text-[30px] font-bold text-[#EDEADE]">
                Unmasking the Algorithm: A Profound Exploration of AI Bias and
                Its Widespread Real-World Consequences
              </div>
              {/* small */}
              <div className="font-mono-Roboto text-[20px]  text-[#EDEADE]">
                AI bias has significantly influenced critical decision-making
                processes across various sectors, including hiring, criminal
                justice, healthcare, and finance. From biased hiring algorithms
                that favor certain demographics over others to predictive
                policing models that disproportionately target marginalized
                communities, AI systems often reflect and amplify existing
                societal inequalities. This blog takes a deep dive into the
                origins of AI bias, how it manifests in real-world applications,
                and the far-reaching consequences it has on individuals and
                society as a whole. We will also explore potential solutions,
                including ethical AI development practices, bias detection
                techniques, and regulatory frameworks designed to create fairer
                and more accountable AI systems. By understanding these
                challenges and actively working toward mitigating bias, we can
                harness the power of AI for more equitable and just outcomes.
              </div>
            </div>
            <div>
              <img
                src={Bias}
                alt="Picture of Bias"
                className="rounded-[10px]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex items-center justify-center w-[95%] pt-2  ">
            <div className="w-1/2 h-[1px] bg-black"></div>
            <span className="text-black mx-4 text-lg font-semibold">
              Articles
            </span>
            <div className="w-1/2 h-[1px] bg-black"></div>
          </div>
        </div>

        {/* continue here */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-[90%]">
            {/* Article 1 */}
            <div className="bg-[#76BA9D]  rounded-[20px] p-6 text-white font-mono-Roboto">
              <div className="relative">
                <img
                  src={amazon}
                  alt="Article 1"
                  className="rounded-[10px] w-full"
                />
              </div>
              <h2 className="mt-6 text-xl font-bold">
                Amazon’s AI Recruiting Tool (2018)
              </h2>
              <p className="text-sm opacity-80 mt-2">
                Amazon developed an AI-based hiring tool to automate
                recruitment, but it showed bias against women. The model was
                trained on resumes submitted over ten years, mostly from men,
                leading it to favor male candidates. It downgraded resumes
                containing words like “women’s,” such as in “women’s chess
                club.” The bias extended to prioritizing resumes from
                male-dominated fields while overlooking equally qualified female
                candidates. Even after adjustments, the bias persisted,
                prompting Amazon to discontinue the tool in 2018 due to fairness
                concerns and the risk of discrimination.
              </p>
            </div>

            {/* Article 2 */}
            <div className="bg-[#76BA9D]  rounded-[20px] p-6 text-white font-mono-Roboto">
              <div className="relative">
                <img
                  src={Compas}
                  alt="Article 2"
                  className="rounded-[10px] w-full"
                />
              </div>
              <h2 className="mt-6 text-xl font-bold">
                COMPAS Algorithm for Criminal Risk Assessment (2016)
              </h2>
              <p className="text-sm opacity-80 mt-2">
                The COMPAS tool, used in the U.S. to assess the likelihood of a
                defendant reoffending, was found to be biased against Black
                defendants. Studies showed it falsely labeled Black individuals
                as high risk at a much higher rate than white individuals.
              </p>
            </div>

            {/* Article 3 */}
            <div className="bg-[#76BA9D]  rounded-[20px] p-6 text-white font-mono-Roboto">
              <div className="relative">
                <img
                  src={Google}
                  alt="Article 3"
                  className="rounded-[10px] w-full"
                />
              </div>
              <h2 className="mt-6 text-xl font-bold">
                Google Photos Image Labeling Bias (2015)
              </h2>
              <p className="text-sm opacity-80 mt-2">
                Google Photos' AI mistakenly labeled Black individuals as
                "gorillas," demonstrating racial bias in image recognition
                models. The issue arose due to biased training data that lacked
                sufficient diversity, causing the model to misclassify darker
                skin tones. Users reported the offensive mistake on social
                media, prompting Google to investigate. In response, Google
                apologized and quickly removed the "gorilla" label from its
                image classification system while working to improve fairness in
                AI recognition.
              </p>
            </div>
          </div>
        </div>



      </div>
    </div>
  );
}