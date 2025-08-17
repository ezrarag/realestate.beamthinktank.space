'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Building2, MapPin, DollarSign, Calendar, Filter } from 'lucide-react'
import Link from 'next/link'

interface Project {
  id: number
  title: string
  city: string
  state: string
  type: string
  fundingGoal: number
  currentFunding: number
  progress: number
  description: string
  deadline: string
  status: 'active' | 'funded' | 'completed'
}

const allProjects: Project[] = [
  {
    id: 1,
    title: 'Sunset Gardens Affordable Housing',
    city: 'Orlando',
    state: 'FL',
    type: 'Residential',
    fundingGoal: 500000,
    currentFunding: 375000,
    progress: 75,
    description: 'Modern affordable housing complex with community amenities and green spaces.',
    deadline: '2024-06-15',
    status: 'active'
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
    description: 'Mixed-use development featuring office spaces, retail, and community facilities.',
    deadline: '2024-08-20',
    status: 'active'
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
    description: 'Cultural and community center promoting local arts and neighborhood engagement.',
    deadline: '2024-05-10',
    status: 'active'
  },
  {
    id: 4,
    title: 'Riverside Apartments',
    city: 'Orlando',
    state: 'FL',
    type: 'Residential',
    fundingGoal: 400000,
    currentFunding: 400000,
    progress: 100,
    description: 'Waterfront affordable housing with modern amenities.',
    deadline: '2024-03-01',
    status: 'funded'
  },
  {
    id: 5,
    title: 'Tech Corridor Office Complex',
    city: 'Atlanta',
    state: 'GA',
    type: 'Commercial',
    fundingGoal: 1200000,
    currentFunding: 850000,
    progress: 71,
    description: 'State-of-the-art office complex for growing tech companies.',
    deadline: '2024-09-30',
    status: 'active'
  },
  {
    id: 6,
    title: 'Historic District Renovation',
    city: 'Nashville',
    state: 'TN',
    type: 'Heritage',
    fundingGoal: 600000,
    currentFunding: 450000,
    progress: 75,
    description: 'Preservation and renovation of historic buildings for community use.',
    deadline: '2024-07-15',
    status: 'active'
  }
]

const cities = ['All', 'Orlando', 'Atlanta', 'Nashville']
const projectTypes = ['All', 'Residential', 'Commercial', 'Community', 'Heritage']

export default function ProjectsPage() {
  const searchParams = useSearchParams()
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(allProjects)
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || 'All')
  const [selectedType, setSelectedType] = useState('All')
  const [sortBy, setSortBy] = useState<'progress' | 'deadline' | 'funding'>('progress')

  useEffect(() => {
    let filtered = allProjects

    if (selectedCity !== 'All') {
      filtered = filtered.filter(project => project.city === selectedCity)
    }

    if (selectedType !== 'All') {
      filtered = filtered.filter(project => project.type === selectedType)
    }

    // Sort projects
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'progress':
          return b.progress - a.progress
        case 'deadline':
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
        case 'funding':
          return b.currentFunding - a.currentFunding
        default:
          return 0
      }
    })

    setFilteredProjects(filtered)
  }, [selectedCity, selectedType, sortBy])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800'
      case 'funded':
        return 'bg-green-100 text-green-800'
      case 'completed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Projects
          </h1>
          <p className="text-xl text-gray-600">
            Discover how your donations are building sustainable communities across the country
          </p>
        </div>

        {/* Filters */}
        <div className="card mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="font-medium text-gray-700">Filters:</span>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {projectTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'progress' | 'deadline' | 'funding')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="progress">Sort by Progress</option>
                <option value="deadline">Sort by Deadline</option>
                <option value="funding">Sort by Funding</option>
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="card hover:shadow-lg transition-shadow duration-200">
              <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <Building2 className="w-16 h-16 text-gray-400" />
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{project.city}, {project.state}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
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

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link 
                  href={`/projects/${project.id}`}
                  className="btn-primary w-full text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more projects.</p>
          </div>
        )}
      </div>
    </div>
  )
}
