import React from 'react';
import { BookOpen, Star, ExternalLink } from 'lucide-react';
import Navigation from './wellness_navbar';

const books = [
  {
    id: '1',
    title: 'The Power of Now',
    author: 'Eckhart Tolle',
    description:
      'A guide to spiritual enlightenment and living in the present moment, helping readers find peace and reduce anxiety through mindfulness practices.',
    rating: 4.7,
    coverUrl:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
    amazonUrl:
      'https://www.amazon.com/Power-Now-Guide-Spiritual-Enlightenment/dp/1577314808',
    tags: ['Mindfulness', 'Spirituality', 'Self-Help']
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    description:
      'Learn how to build good habits and break bad ones through small changes that lead to remarkable results in mental wellness and personal growth.',
    rating: 4.8,
    coverUrl:
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800',
    amazonUrl:
      'https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299',
    tags: ['Habits', 'Personal Development', 'Psychology']
  },
  {
    id: '3',
    title: 'Think Like a Monk',
    author: 'Jay Shetty',
    description:
      'Drawing on ancient wisdom and his own experience as a monk, Jay Shetty reveals how to overcome negative thoughts and habits to access the calm within.',
    rating: 4.6,
    coverUrl:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800',
    amazonUrl:
      'https://www.amazon.com/Think-Like-Monk-Train-Purpose/dp/1982134488',
    tags: ['Mindfulness', 'Wisdom', 'Mental Peace']
  }
];

const BookSection = () => {
  return (
    <>
    <Navigation/>
    <section id="books" className="bg-gradient-to-b from-emerald-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="w-8 h-8 text-emerald-600" />
            <h2 className="text-3xl font-bold text-gray-900">Mindfulness Library</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover transformative books that will guide you on your journey to mental wellness and inner peace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-1 text-yellow-400 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(book.rating) ? 'fill-current' : 'opacity-50'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-white text-sm">{book.rating}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {book.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{book.title}</h3>
                <p className="text-sm text-emerald-600 mb-3">by {book.author}</p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {book.description}
                </p>

                <a
                  href={book.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
                >
                  View on Amazon
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>

  );
};

export default BookSection;
