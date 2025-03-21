
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StarIcon } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      company: 'GrowthMakers',
      avatar: '/placeholder.svg',
      content: 'CompetitorFinder has completely transformed how we analyze our market. We discovered 3 competitors we didn't even know existed!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'E-commerce Owner',
      company: 'UrbanStyle',
      avatar: '/placeholder.svg',
      content: 'The insights I gained in just minutes would have taken weeks to compile manually. Absolutely essential for any business owner.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      role: 'Startup Founder',
      company: 'NexGen Solutions',
      avatar: '/placeholder.svg',
      content: 'I use this tool before launching any new product. It's saved us from making several costly positioning mistakes.',
      rating: 4,
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-brand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">What Our Users Are Saying</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Join thousands of businesses that use CompetitorFinder to stay ahead of the competition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="glass-card rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 border-2 border-brand-100">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <h4 className="font-semibold text-neutral-900">{testimonial.name}</h4>
                    <p className="text-sm text-neutral-500">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-neutral-700 italic">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
