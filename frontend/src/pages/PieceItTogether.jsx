import { useState } from 'react';
import { ArrowLeftIcon, Play, Trash2 } from 'lucide-react'
import { Link } from "react-router"

function ChessProblemSolver() {
    const [boardSize, setBoardSize] = useState(8);
    const initialPattern = [
        '........',
        '.W......',
        '.BW.....',
        '.....W..',
        '...BWBW.',
        '...WBW..',
        '..WBW...',
        '...W....',
    ];
    const parsePattern = (pattern) => pattern.map(row => row.split('').map(ch => ch === '.' ? null : (ch === 'W' ? 'white' : 'black')));
    const [board, setBoard] = useState(() => parsePattern(initialPattern));
    const [result, setResult] = useState(null);
    const [time, setTime] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [error, setError] = useState(null);

    const handleCellClick = (row, col) => {
        const newBoard = board.map(r => [...r]);
        if (newBoard[row][col] === null)
            newBoard[row][col] = 'white';
        else if (newBoard[row][col] === 'white')
            newBoard[row][col] = 'black';
        else
            newBoard[row][col] = null;

        setBoard(newBoard);
    };

    const clearBoard = () => {
        setBoard(Array(boardSize).fill().map(() => Array(boardSize).fill(null)));
        setResult(null);
        setTime(null);
        setError(null);
    };

    const runSolver = async () => {
        setIsRunning(true);
        setError(null);
        setResult(null);

        try {
            const formattedBoard = board.map(row =>
                row.map(cell => {
                    if (cell === 'white') return 'W';
                    if (cell === 'black') return 'B';
                    return '.';
                })
            );

            const codeString = [
                boardSize.toString(),
                boardSize.toString(),
                ...formattedBoard.map(row => row.join(''))
            ].join('\n');

            const response = await fetch('/api/pieceItTogether', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: codeString }),
            });

            const data = await response.json();
            if (response.ok) {
                setResult(data.output);
                setTime(data.time);
            } else {
                setError(data.error || 'Solver failed');
            }

        } catch (err) {
            console.log(err);
            setError('Failed to connect to server');
        } finally {
            setIsRunning(false);
        }
    };

    const getCellColor = (row, col) => {
        const piece = board[row][col];
        if (piece === 'white') return 'bg-slate-100';
        if (piece === 'black') return 'bg-slate-900';
        return (row + col) % 2 === 0 ? 'bg-emerald-200' : 'bg-emerald-400';
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
                    <h1 className="text-5xl font-bold mb-12">Piece It Together</h1>
                </div>


                {/* How it works */}
                <div className='card outline outline-secondary bg-neutral-950 shadow-xl mb-8'>
                    <h1 className="ml-5 text-3xl font-bold mt-4 mb-5">How it Works</h1>
                    <p className='ml-10 mb-5'>
                        This program is an interactive grid tool for placing black and white tiles where a 2-SAT validator checks whether or not the user's configuration can be constructed using only L-shaped trominoes.
                        An L-shaped trominoe is a tiling where there is one black square with one white square above it and one to its right. The trominoe can be rotated.
                    </p>
                    <p className='ml-10 mb-5'>
                        To use the program, click on a grid cell to change from blank, to white, to black. Once you are done adding tiles, press the "Run Solver" button to check if the arrangement can be created using L-shaped trominoes
                    </p>
                </div>


                {/* Main Section */}
                <div className="grid lg:grid-cols-[300px_1fr] gap-6">

                    {/* Configurations Panel */}
                    <div className="card self-start bg-neutral-950 shadow-xl">
                        <div className="card-body">

                            <div className="space-y-5">
                                {/* Board Size Modification */}
                                <div>
                                    <label className="block text-xl font-bold mb-3">Board Size</label>
                                    <input
                                        type="range" min="2" max="15" className="range range-xs range-success" value={boardSize}

                                        onChange={(e) => {
                                            const size = parseInt(e.target.value) || 8;
                                            setBoardSize(size);
                                            setBoard(Array(size).fill().map(() => Array(size).fill(null)));
                                        }}
                                    />
                                </div>

                                <div className="alert alert-success">
                                    <a className="text-xs"> Click any cell to cycle through:<br/>
                                    <a className='text-xs font font-bold'>Empty - White - Black</a></a>
                                </div>
                            </div>
                        </div>


                        {/* Control Section */}
                        <div className="space-y-4 p-6 mb-5">
                            <button
                                onClick={runSolver}
                                disabled={isRunning}
                                className="btn btn-primary btn-md w-full">

                                {isRunning ? (
                                    <> Compiling <span className="loading loading-dots loading-md"></span></>
                                ) : (
                                    <><Play className="w-5 h-5" />Run Solver</>
                                )}
                            </button>

                            <button
                                onClick={clearBoard}
                                className="btn btn-error btn-md w-full mt-5 mb-2">
                                <Trash2 className="w-5 h-5" />
                                Clear Board
                            </button>

                            {/* Error Display */}
                            {error && (<div className="alert alert-error mt-4"> <span className="text-xs">{error}</span> </div>)}
                        </div>


                        <div>
                            {/* Result Display */}
                            {result !== null && time != null && (
                                <div className="min-w-full mt-5 max-w-xs mx-auto mb-16">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold mb-2">Result: {result}</div>
                                    <div className="text-base">{time}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col items-center space-y-4">
                        <div
                            className="bg-neutral p-4 rounded-lg shadow-2xl border-4 border-secondary"
                            style={{ display: 'inline-block' }}
                        >
                            <div
                                className="grid gap-0"
                                style={{ gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`, }}
                            >
                                {board.map((row, i) =>
                                    row.map((cell, j) => (
                                        <button
                                            key={`${i}-${j}`}
                                            onClick={() => handleCellClick(i, j)}
                                            className={`w-12 h-12 sm:w-14 sm:h-14 border border-secondary flex items-center justify-center text-2xl font-bold transition-all hover:opacity-90 ${getCellColor(i, j)}`}
                                        >
                                            {cell === 'white' && 'W'}
                                            {cell === 'black' && 'B'}
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChessProblemSolver;