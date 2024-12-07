import React, { useState } from 'react';
import main from './main';
import './Game.css';

const Game = ({ level }) => {
    const [gamestarted, setGameStarted] = useState(false)
    const handleStartGame = () => {
        setGameStarted(true)
        main(level);
    };

    return (
        <div
            id="game-container"
            className="bg-black flex flex-col items-center justify-center"
            style={{
                width: '1000px',
                height: gamestarted ? '0px' : '700px',
            }}
        >
            {!gamestarted && (
                <>
                    <button onClick={handleStartGame} className="mb-16">
                        <img src="/game/sprites/arrow.png" alt="Start Game" id="start" className="w-16 h-16" />
                    </button>
                    <p className="custom-font text-white text-4xl">Start Game</p>
                </>
            )}
        </div>
    );
};

export default Game;