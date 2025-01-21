import React from 'react';
import { GamepadIcon, Brain, Fingerprint, Wind, Flower, Focus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const games = [
  {
    id: '1',
    title: 'Breath Journey',
    description: 'Follow the expanding and contracting circle to regulate your breathing pattern. Customize the rhythm to match your comfort level.',
    icon: Wind,
    color: 'indigo',
    benefits: ['Stress reduction', 'Better focus', 'Anxiety relief'],
    duration: '5-10 minutes',
    difficulty: 'Easy',
     href: '/breath_game'
  },
  {
    id: '2',
    title: 'Memory Garden',
    description: 'Cultivate mindfulness by matching pairs of peaceful nature symbols. Each match reveals a calming meditation tip.',
    icon: Brain,
    color: 'indigo',
    benefits: ['Memory improvement', 'Concentration', 'Mindful awareness'],
    duration: '10-15 minutes',
    difficulty: 'Medium',
    href: '/memorygarden_game'
  },
  {
    id: '3',
    title: 'Zen Patterns',
    description: 'Create beautiful mandala patterns through gentle finger movements. A meditative experience that combines art and mindfulness.',
    icon: Fingerprint,
    color: 'indigo',
    benefits: ['Creativity', 'Relaxation', 'Emotional balance'],
    duration: '15-20 minutes',
    difficulty: 'Easy',
    href : '/zen_patterns'
   
  },
//   {
//     id: '4',
//     title: 'Focus Flow',
//     description: 'Guide a glowing orb through a serene landscape while avoiding distractions. A game that teaches sustained attention.',
//     icon: Focus,
//     color: 'indigo',
//     benefits: ['Enhanced focus', 'Mental clarity', 'Stress management'],
//     duration: '10 minutes',
//     difficulty: 'Medium',
//     href: '/focus_flow'
//   },
//   {
//     id: '5',
//     title: 'Mindful Quest',
//     description: 'Embark on a peaceful journey , collecting wisdom and practicing different mindfulness techniques.',
//     icon: Flower,
//     color: 'indigo',
//     benefits: ['Meditation skills', 'Self-awareness', 'Inner peace'],
//     duration: '20 minutes',
//     difficulty: 'Hard'
//   }
];

const GameSection = () => {
    const navigate = useNavigate()
    
    function handleButton(link)  {
        navigate(link)
    }
  return (
    <section id="games" className="bg-gradient-to-b from-violet-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GamepadIcon className="w-8 h-8 text-violet-600" />
            <h2 className="text-3xl font-bold text-gray-900">Mindful Games</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of interactive mindfulness games designed to enhance your mental well-being through engaging and peaceful gameplay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => {
            const Icon = game.icon;
            return (
              <div
                key={game.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className={`bg-${game.color}-50 p-6`}>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-${game.color}-100 text-${game.color}-600`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{game.title}</h3>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-4">{game.description}</p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Benefits:</h4>
                      <div className="flex flex-wrap gap-2">
                        {game.benefits.map((benefit) => (
                          <span
                            key={benefit}
                            className={`px-3 py-1 text-xs font-medium text-${game.color}-700 bg-${game.color}-50 rounded-full`}
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Duration:</span>
                        <span className="font-medium text-gray-900">{game.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Difficulty:</span>
                        <span className={`font-medium ${
                          game.difficulty === 'Easy' ? 'text-green-600' :
                          game.difficulty === 'Medium' ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {game.difficulty}
                        </span>
                      </div>
                    </div>

                    <button
                      className={`w-full py-3 px-4 rounded-lg bg-${game.color}-600 text-white font-semibold hover:bg-${game.color}-700 transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-${game.color}-500 focus:ring-offset-2`}
                      onClick={() => handleButton(game.href)}
                   >
                      Start Game
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GameSection;
