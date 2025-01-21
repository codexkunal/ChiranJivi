import React, { useState, useEffect } from 'react';
import { Flower2, Leaf, Cloud, Sun, Moon, Stars, Rainbow } from 'lucide-react';

const symbols = [
  { icon: Flower2, tip: "Take a moment to appreciate life's simple beauties" },
  { icon: Leaf, tip: "Let go of thoughts like leaves in the wind" },
//   { icon: Tree, tip: "Stay grounded and grow stronger each day" },
  { icon: Cloud, tip: "Watch your thoughts float by without judgment" },
  { icon: Sun, tip: "Find warmth and light within yourself" },
  { icon: Moon, tip: "Embrace periods of rest and reflection" },
  { icon: Stars, tip: "You're capable of infinite possibilities" },
//   { icon: Rainbow, tip: "After every storm comes peace and beauty" }
];

const MemoryGarden = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [tip, setTip] = useState('');
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const shuffledDeck = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }));
    setCards(shuffledDeck);
  }, []);

  const handleClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped;

      if (cards[first].icon === cards[second].icon) {
        setMatched([...matched, first, second]);
        setTip(cards[first].tip);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Memory Garden</h1>
          <p className="text-gray-600">Moves: {moves}</p>
          {tip && (
            <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
              <p className="text-indigo-600 font-medium">{tip}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-4 gap-4">
          {cards.map((card, index) => {
            const Icon = card.icon;
            const isFlipped = flipped.includes(index) || matched.includes(index);

            return (
              <button
                key={index}
                onClick={() => handleClick(index)}
                className={`aspect-square rounded-xl transition-all duration-300 ${
                  isFlipped 
                    ? 'bg-white shadow-lg rotate-0'
                    : 'bg-gradient-to-br from-indigo-500 to-purple-600 rotate-180'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center transition-all duration-300 ${
                  isFlipped ? 'opacity-100' : 'opacity-0'
                }`}>
                  <Icon className="w-10 h-10 text-indigo-600" />
                </div>
              </button>
            );
          })}
        </div>

        {matched.length === cards.length && (
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-2">Congratulations!</h2>
            <p className="text-gray-600">You completed the game in {moves} moves</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryGarden;
