import cowImage from '../images/cow.png'
import pieceImage from '../images/pieceItTogether.png'
import { Link } from "react-router"
import { ArrowRightIcon } from "lucide-react"


function Projects() {
    return (
        <section id="projects" data-theme="forest" className="py-20 px-4 bg-base-100">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <h1 className="text-6xl font-bold text-center mb-20">Featured Projects</h1>

                {/* Projects */}
                <div className="flex justify-center items-stretch gap-8">

                    {/* CowBasic Demo */}
                    <Link to='/cowbasic' className="w-full max-w-2xl">
                        <div className="bg-black card card-side shadow-xl hover:shadow-2xl transition-shadow h-full">
                            <figure className="w-64 flex-shrink-0">
                                <img src={cowImage} className="w-full h-full object-cover" alt="Cow-BASIC" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">Cow-BASIC</h2>
                                <p>
                                    The Cow-BASIC compiler is a high-performance interpreter that uses matrix exponentiation to efficiently simulate variable updates in multiple nested loops.
                                    A user can input multiple additive expressions inside multiple nested loops using the "Cow-BASIC" language. The compiler will ensure that code that would typically take years to run will now run in just a few seconds or less.
                                </p>

                                <div className="card-actions justify-start mb-10">
                                    <div className="badge badge-outline">C++</div>
                                    <div className="badge badge-outline">React</div>
                                    <div className="badge badge-outline">Matrix-Exponentiation</div>
                                </div>

                                <div className="card-actions justify-end">
                                    <div className="btn btn-neutral">Try It!<ArrowRightIcon className="size-5"/></div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Piece It Together Demo */}
                    <Link to='/pieceItTogether' className="w-full max-w-2xl">
                        <div className="bg-black card card-side shadow-xl hover:shadow-2xl transition-shadow h-full">
                            <figure className="w-64 flex-shrink-0">
                                <img src={pieceImage} className="w-full h-full object-cover" alt="Piece It Together" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">Piece It Together</h2>
                                <p>
                                    This program is an interactive grid tool for placing black and white tiles where a 2-SAT validator checks whether or not the user's configuration can be constructed using only L-shaped trominoes.
                                    An L-shaped trominoe is a tiling where there is one black square with one white square above it and one to its right. The trominoe can be rotated.
                                </p>

                                <div className="card-actions justify-start mb-16">
                                    <div className="badge badge-outline">C++</div>
                                    <div className="badge badge-outline">React</div>
                                    <div className="badge badge-outline">2-SAT Validation</div>
                                </div>

                                <div className="card-actions justify-end">
                                    <div className="btn btn-neutral">Try It!<ArrowRightIcon className="size-5"/></div>
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