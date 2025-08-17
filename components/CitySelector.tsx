'use client'

import { useState } from 'react'
import { MapPin } from 'lucide-react'

const cities = [
  { id: 'orlando', name: 'Orlando', state: 'FL', description: 'Sunshine State Development Hub' },
  { id: 'atlanta', name: 'Atlanta', state: 'GA', description: 'Peach State Innovation Center' },
  { id: 'nashville', name: 'Nashville', state: 'TN', description: 'Music City Community Growth' },
]

export default function CitySelector() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cities.map((city) => (
          <button
            key={city.id}
            onClick={() => setSelectedCity(city.id)}
            className={`card cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedCity === city.id 
                ? 'ring-2 ring-primary-500 bg-primary-50' 
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="text-center">
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {city.name}, {city.state}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{city.description}</p>
              <div className="text-primary-600 font-medium">
                {selectedCity === city.id ? 'Selected' : 'Select City'}
              </div>
            </div>
          </button>
        ))}
      </div>
      
      {selectedCity && (
        <div className="mt-8 text-center">
          <a
            href={`/projects?city=${selectedCity}`}
            className="btn-primary inline-flex items-center gap-2"
          >
            <MapPin className="w-5 h-5" />
            View Projects in {cities.find(c => c.id === selectedCity)?.name}
          </a>
        </div>
      )}
    </div>
  )
}
