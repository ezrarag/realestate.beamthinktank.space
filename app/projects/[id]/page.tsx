'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Building2, MapPin, Calendar, DollarSign, Users, ArrowLeft, Heart } from 'lucide-react'
import Link from 'next/link'
import MilestoneTracker from '@/components/MilestoneTracker'

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
  longDescription: string
  deadline: string
  status: 'active' | 'funded' | 'completed'
  teamSize: number
  timeline: string
  impact: string[]
  updates: ProjectUpdate[]
}

interface ProjectUpdate {
  id: number
  date: string
  title: string
  content: string
  type: 'milestone' | 'update' | 'news'
}

const projectData: Project[] = [
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
    longDescription: `Sunset Gardens is a transformative affordable housing project that will provide 48 units of high-quality, energy-efficient housing for low-income families in Orlando. The development includes modern amenities, community spaces, and sustainable design features that will serve as a model for future affordable housing projects in the region.

    The project addresses the critical need for affordable housing in Orlando's growing metropolitan area, where housing costs have risen significantly in recent years. By providing stable, affordable housing, we're helping families build stronger futures and contributing to the overall economic health of the community.`,
    deadline: '2024-06-15',
    status: 'active',
    teamSize: 12,
    timeline: '18 months',
    impact: [
      '48 affordable housing units for families',
      'Creation of 25+ construction jobs',
      'Improved neighborhood stability',
      'Reduced housing insecurity',
      'Enhanced community infrastructure'
    ],
    updates: [
      {
        id: 1,
        date: '2024-01-15',
        title: 'Construction Phase Begins',
        content: 'Exciting news! We\'ve broken ground on the Sunset Gardens project. The foundation work is now underway.',
        type: 'milestone'
      },
      {
        id: 2,
        date: '2024-01-10',
        title: '75% Funding Milestone Reached',
        content: 'We\'ve reached 75% of our funding goal! Thank you to all our generous donors.',
        type: 'milestone'
      },
      {
        id: 3,
        date: '2024-01-05',
        title: 'Building Permits Approved',
        content: 'All necessary permits have been approved by the city. We\'re ready to begin construction.',
        type: 'update'
      }
    ]
  }
]

export default function ProjectDetailPage() {
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'updates' | 'impact'>('overview')

  useEffect(() => {
    const projectId = parseInt(params.id as string)
    const foundProject = projectData.find(p => p.id === projectId)
    setProject(foundProject || null)
  }, [params.id])

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">Project not found</h2>
          <Link href="/projects" className="text-primary-600 hover:text-primary-700">
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  project.status === 'active' ? 'bg-blue-100 text-blue-800' :
                  project.status === 'funded' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {project.status}
                </span>
                <span className="text-sm text-gray-600">{project.type}</span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h1>
              
              <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{project.city}, {project.state}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Team: {project.teamSize} people</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span>Timeline: {project.timeline}</span>
                </div>
              </div>
            </div>
            
            <div className="lg:w-80">
              <MilestoneTracker 
                currentFunding={project.currentFunding}
                fundingGoal={project.fundingGoal}
                projectId={project.id}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'updates', label: 'Updates' },
                { id: 'impact', label: 'Impact' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">About This Project</h3>
                  <p className="text-gray-700 leading-relaxed">{project.longDescription}</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Project Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-medium text-gray-900">Funding Goal</div>
                      <div className="text-2xl font-bold text-primary-600">
                        ${project.fundingGoal.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-medium text-gray-900">Current Funding</div>
                      <div className="text-2xl font-bold text-success-600">
                        ${project.currentFunding.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'updates' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Project Updates</h3>
                <div className="space-y-4">
                  {project.updates.map((update) => (
                    <div key={update.id} className="border-l-4 border-primary-500 pl-4 py-2">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-gray-500">
                          {new Date(update.date).toLocaleDateString()}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          update.type === 'milestone' ? 'bg-success-100 text-success-800' :
                          update.type === 'update' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {update.type}
                        </span>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-1">{update.title}</h4>
                      <p className="text-gray-700">{update.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'impact' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Community Impact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.impact.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-primary-50 rounded-lg">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-primary-900">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Donation CTA */}
        <div className="mt-8 text-center">
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-primary-900 mb-4">
              Support This Project
            </h3>
            <p className="text-primary-800 mb-6">
              Help us reach our funding goal and make this project a reality for the community.
            </p>
            <Link 
              href={`/donate?project=${project.id}`}
              className="btn-primary text-lg px-8 py-3 inline-flex items-center gap-2"
            >
              <Heart className="w-5 h-5" />
              Donate Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
