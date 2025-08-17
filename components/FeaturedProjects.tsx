'use client'

import { Building2, MapPin, DollarSign, Calendar } from 'lucide-react'
import Link from 'next/link'

const featuredProjects = [
  {
    id: 1,
    title: 'Sunset Gardens Affordable Housing',
    city: 'Orlando',
    state: 'FL',
    type: 'Residential',
    fundingGoal: 500000,
    currentFunding: 375000,
    progress: 75,
    image: '/api/placeholder/400/250',
    description: 'Modern affordable housing complex with community amenities and green spaces.',
    deadline: '2024-06-15'
  },
  {
    id: 2,
    title: 'Downtown Innovation Hub',
    city: 'Atlanta',
    state: 'GA',
    type: 'Commercial',
    fundingGoal: 800000,
    currentFunding: 520000,
    progress: 65,
    image: '/api/placeholder/400/250',
    description: 'Mixed-use development featuring office spaces, retail, and community facilities.',
    deadline: '2024-08-20'
  },
  {
    id: 3,
    title: 'Music Row Community Center',
    city: 'Nashville',
    state: 'TN',
    type: 'Community',
    fundingGoal: 300000,
    currentFunding: 280000,
    progress: 93,
    image: '/api/placeholder/400/250',
    description: 'Cultural and community center promoting local arts and neighborhood engagement.',
    deadline: '2024-05-10'
  }
]

export default function FeaturedProjects() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredProjects.map((project) => (
        <div key={project.id} className="card hover:shadow-lg transition-shadow duration-200">
          <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
            <Building2 className="w-16 h-16 text-gray-400" />
          </div>
          
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{project.city}, {project.state}</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{project.description}</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Funding Progress</span>
              <span className="font-medium">{project.progress}%</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                ${project.currentFunding.toLocaleString()} raised
              </span>
              <span className="text-gray-600">
                ${project.fundingGoal.toLocaleString()} goal
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <Link 
              href={`/projects/${project.id}`}
              className="btn-primary w-full text-center"
            >
              View Project Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
