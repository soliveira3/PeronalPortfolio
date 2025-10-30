import { Link } from "react-router"
import { ArrowRightIcon } from "lucide-react"
import cowImage from "../images/cow.png"


function Projects() {
    return (
        <section id="projects" data-theme="forest" className="py-20 px-4 bg-base-100">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <h1 className="text-6xl font-bold text-center mb-20">Academic Projects</h1>

                {/* Projects */}
                <div className="flex justify-center items-stretch gap-8">

                    {/* Artificial Intelligence*/}
                    <Link target="_blank" to='https://github.com/soliveira3/AcademicProjects' className="w-full max-w-2xl">
                        <div className="card bg-neutral  shadow-xl hover:shadow-2xl transition-shadow h-full">
                            <div className="card-body">
                                <h2 className="card-title">Artificial Intelligence</h2>
                                <p>
                                    Handwritten digit classifier with Neural Networks and with Naive Bayes, Face Recognition with PCA & CRC, Linear & Logistic Regression models
                                </p>
                                <div className="card-actions justify-end">
                                    <div className="btn btn-outline">Check out the GitHub!<ArrowRightIcon className="size-5"/></div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Bio-Informatics*/}
                    <Link target="_blank" to='https://github.com/soliveira3/AcademicProjects' className="w-full max-w-2xl">
                        <div className="card bg-neutral  shadow-xl hover:shadow-2xl transition-shadow h-full">
                            <div className="card-body">
                                <h2 className="card-title">Bio-Informatics</h2>
                                <p>
                                    Distance-Based Phylogeny Problem, Pattern Finding with KMP, Finding Motifs with Gibbs Sampler, Genome reconstruction using De Bruin graphs, Local+Global Alignment Problems
                                </p>
                                <div className="card-actions justify-end">
                                    <div className="btn btn-outline">Check out the GitHub!<ArrowRightIcon className="size-5"/></div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Social Network Analysis */}
                    <Link target="_blank" to='https://github.com/soliveira3/AcademicProjects' className="w-full max-w-2xl">
                        <div className="card bg-neutral  shadow-xl hover:shadow-2xl transition-shadow h-full">
                            <div className="card-body">
                                <h2 className="card-title">Social Network Analysis</h2>
                                <p>
                                    Presentation and Analysis on the American Food Ingredient Network and its implications using Web Scrapers and Gephi
                                </p>
                                <div className="card-actions justify-end">
                                    <div className="btn btn-outline">Check out the GitHub!<ArrowRightIcon className="size-5"/></div>
                                </div>
                            </div>
                        </div>
                    </Link>

                </div>


            </div>
        </section>
    );
}

export default Projects