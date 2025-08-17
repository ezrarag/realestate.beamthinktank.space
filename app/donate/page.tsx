'use client'

import { useState } from 'react'
import { Heart, CreditCard, Building2, MapPin, DollarSign } from 'lucide-react'

const donationAmounts = [25, 50, 100, 250, 500, 1000]
const projectOptions = [
  { id: 'general', name: 'General Fund', description: 'Support our overall mission' },
  { id: 'orlando', name: 'Orlando Projects', description: 'Fund projects in Orlando, FL' },
  { id: 'atlanta', name: 'Atlanta Projects', description: 'Fund projects in Atlanta, GA' },
  { id: 'nashville', name: 'Nashville Projects', description: 'Fund projects in Nashville, TN' },
]

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number>(100)
  const [customAmount, setCustomAmount] = useState<string>('')
  const [selectedProject, setSelectedProject] = useState<string>('general')
  const [isRecurring, setIsRecurring] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would integrate with your payment processor
    console.log('Donation submitted:', {
      amount: customAmount || selectedAmount,
      project: selectedProject,
      recurring: isRecurring
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-primary-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Make a Donation
          </h1>
          <p className="text-xl text-gray-600">
            Your contribution helps us build sustainable communities and provide affordable housing
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Donation Form */}
          <div className="card">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Donation Details
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Choose where your donation goes
                </label>
                <div className="space-y-3">
                  {projectOptions.map((project) => (
                    <label key={project.id} className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="project"
                        value={project.id}
                        checked={selectedProject === project.id}
                        onChange={(e) => setSelectedProject(e.target.value)}
                        className="mt-1 text-primary-600 focus:ring-primary-500"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{project.name}</div>
                        <div className="text-sm text-gray-600">{project.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amount Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select donation amount
                </label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {donationAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(amount)
                        setCustomAmount('')
                      }}
                      className={`py-3 px-4 rounded-lg border-2 font-medium transition-colors ${
                        selectedAmount === amount && !customAmount
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-300 hover:border-gray-400 text-gray-700'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value)
                      setSelectedAmount(0)
                    }}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              {/* Recurring Donation */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="recurring"
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="recurring" className="text-sm text-gray-700">
                  Make this a monthly recurring donation
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-primary w-full py-4 text-lg font-semibold"
              >
                <CreditCard className="w-5 h-5 inline mr-2" />
                Complete Donation
              </button>
            </form>
          </div>

          {/* Impact Information */}
          <div className="space-y-6">
            <div className="card bg-primary-50 border-primary-200">
              <h3 className="text-xl font-semibold text-primary-900 mb-4">
                Your Impact
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-primary-600" />
                  <span className="text-primary-800">
                    ${customAmount || selectedAmount} can help fund construction materials
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  <span className="text-primary-800">
                    Support projects in your chosen city
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-primary-600" />
                  <span className="text-primary-800">
                    Every dollar goes directly to community development
                  </span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Why Donate?
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>100% of donations go directly to project development</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Tax-deductible contributions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Transparent reporting on all projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Create lasting impact in communities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
