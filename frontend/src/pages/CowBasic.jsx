import { Link } from "react-router"
import { useState } from 'react';
import toast from 'react-hot-toast';
import CowBasicEditor from '../components/CowBasicEditor';
import templateCode from '../components/templateCode.js'
import { ArrowLeftIcon, Play, Trash2 } from "lucide-react"

function CowBasic() {

    const [code, setCode] = useState(templateCode);
    const [result, setResult] = useState(null);
    const [time, setTime] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [error, setError] = useState(null);
    const MOD = 1000000007;

    const clearProgram = async () => {
        setCode('');
    }

    const runProgram = async () => {
        setIsRunning(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('http://localhost:5000/api/compile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code }),
            });

            const data = await response.json();
            if (response.ok) {
                setResult(data.output);
                setTime(data.time);
            } else {
                setError(data.error || 'Compilation failed');
                console.log(data.message)
            }

        } catch (err) {
            setError('Failed to connect to backend server: ' + err.message);
        } finally {
            setIsRunning(false);
        }
    };


    return (
        <div data-theme="forest" className="min-h-screen px-4 py-8">
            <div className="max-w-7xl mx-auto">

                {/* Back arrow */}
                <Link to={"/"} className="text-left btn bg-black">
                    <ArrowLeftIcon className="size-5" /> Back to Main Portfolio
                </Link>

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold mb-12">Cow-BASIC Compiler</h1>
                </div>


                {/* How it works */}
                <div className='card outline outline-secondary bg-neutral-950 shadow-xl mb-8'>
                    <h1 className="ml-5 text-3xl font-bold mt-4 mb-5">How it Works</h1>
                    <p className='ml-10 mb-5'>
                        The Cow-BASIC compiler is a high-performance C++ interpreter that executes a minimalist, arithmetically-focused, programming language designed for rapid nested loop computations.
                        Under the hood, the compiler transforms Cow-BASIC code into matrix transformations and uses matrix exponentiation to efficiently simulate variable updates in multiple nested “MOO” loops.
                    </p>
                    <p className='ml-10 mb-5 font-bold'>
                        The sample code given would normally run in about 4 months, but here, it will run in less than a second
                    </p>
                    <p className='ml-10 mb-5'>This program was inspired by this USA Olympiad problem:
                        <Link target="_blank" to="https://usaco.org/index.php?page=viewproblem2&cpid=746" className="underline ml-3 mb-1">Cow-BASIC - USACO</Link>
                    </p>
                </div>


                <div className="grid lg:grid-cols-[300px_1fr_250px] gap-6">
                    {/* Language Reference Section */}
                    <div className="self-start card bg-neutral-950 shadow-xl">
                        <div className="card-body">
                            <h2 className="text-3xl font-bold mb-3 text-center">Reference</h2>

                            <div className="space-y-5">
                                <div>
                                    <h3 className="text-2xl font-bold mb-3">Statements</h3>
                                    <ul className="space-y-2 text-sm">
                                        <li className="bg-base-200 p-2 rounded">
                                            <code>variable = expression</code>
                                        </li>
                                        <li className="bg-base-200 p-2 rounded">
                                            <code>Literal MOO &#123; exprs &#125;</code>
                                        </li>
                                        <li className="bg-base-200 p-2 rounded">
                                            <code>RETURN variable</code>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold mt-6 mb-3">Expressions</h3>
                                    <ul className="space-y-2 text-sm">
                                        <li className="bg-base-200 p-2 rounded">
                                            <code>LiteralValue</code>
                                        </li>
                                        <li className="bg-base-200 p-2 rounded">
                                            <code>variable</code>
                                        </li>
                                        <li className="bg-base-200 p-2 rounded">
                                            <code>(expr) + (expr)</code>
                                        </li>
                                    </ul>
                                </div>

                                <div className="alert alert-success">
                                    <span className="text-xs">Result is under modulo 10⁹+7</span>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Editor Section */}
                    <div className="space-y-4">
                        <CowBasicEditor code={code} setCode={setCode} />
                    </div>


                    {/* Controls & Results */}
                    <div className="space-y-4">
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <button
                                    onClick={runProgram}
                                    disabled={isRunning}
                                    className="btn btn-primary btn-md w-full"
                                >
                                    {isRunning ? (
                                        <> Compiling <span className="loading loading-dots loading-md"></span></>
                                    ) : (
                                        <><Play className="w-5 h-5" />Run Program</>
                                    )}
                                </button>

                                <button
                                    onClick={clearProgram}
                                    className="btn btn-warning btn-md w-full mt-5 mb-5">
                                    <Trash2 className="w-5 h-5" />
                                    Clear Program
                                </button>

                                {/* Error Display */}
                                {error && (<div className="alert alert-error mt-4"> <span className="text-xs">{error}</span> </div>)}

                                {/* Result Display*/}
                                {result !== null && time != null && (
                                    <div className="card bg-blue-950">
                                        <div className="card-body">
                                            <h2 className="text-2xl font-bold">{result}</h2>
                                            <p>{time}</p>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}


export default CowBasic;