'use client'

import { useState, useEffect } from 'react'
import { Trophy, Target, TrendingUp, CheckCircle } from 'lucide-react'

interface Milestone {
  id: number
  percentage: number
  amount: number
  title: string
  description: string
  achieved: boolean
  date?: string
}

interface MilestoneTrackerProps {
  currentFunding: number
  fundingGoal: number
  projectId: number
}

export default function MilestoneTracker({ currentFunding, fundingGoal, projectId }: MilestoneTrackerProps) {
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [recentMilestone, setRecentMilestone] = useState<Milestone | null>(null)

  useEffect(() => {
    // Generate milestones based on funding goal
    const milestonePercentages = [25, 50, 75, 100]
    const generatedMilestones: Milestone[] = milestonePercentages.map((percentage, index) => {
      const amount = Math.round((fundingGoal * percentage) / 100)
      const achieved = currentFunding >= amount
      
      return {
        id: index + 1,
        percentage,
        amount,
        title: `${percentage}% Funded`,
        description: `$${amount.toLocaleString()} raised`,
        achieved,
        date: achieved ? new Date().toISOString() : undefined
      }
    })

    setMilestones(generatedMilestones)

    // Check for recently achieved milestones
    const justAchieved = generatedMilestones.find(m => 
      m.achieved && currentFunding >= m.amount && currentFunding < m.amount + (fundingGoal * 0.05)
    )
    
    if (justAchieved) {
      setRecentMilestone(justAchieved)
      // Auto-hide after 5 seconds
      setTimeout(() => setRecentMilestone(null), 5000)
    }
  }, [currentFunding, fundingGoal])

  const progress = Math.min((currentFunding / fundingGoal) * 100, 100)

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Funding Progress</h3>
          <span className="text-2xl font-bold text-primary-600">{progress.toFixed(1)}%</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>${currentFunding.toLocaleString()} raised</span>
          <span>${fundingGoal.toLocaleString()} goal</span>
        </div>
      </div>

      {/* Milestones */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary-600" />
          Funding Milestones
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {milestones.map((milestone) => (
            <div
              key={milestone.id}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                milestone.achieved
                  ? 'border-success-300 bg-success-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {milestone.achieved ? (
                    <CheckCircle className="w-5 h-5 text-success-600" />
                  ) : (
                    <Target className="w-5 h-5 text-gray-400" />
                  )}
                  <span className={`font-medium ${
                    milestone.achieved ? 'text-success-800' : 'text-gray-700'
                  }`}>
                    {milestone.title}
                  </span>
                </div>
                <span className={`text-sm font-medium ${
                  milestone.achieved ? 'text-success-600' : 'text-gray-500'
                }`}>
                  ${milestone.amount.toLocaleString()}
                </span>
              </div>
              
              <p className={`text-sm ${
                milestone.achieved ? 'text-success-700' : 'text-gray-600'
              }`}>
                {milestone.description}
              </p>
              
              {milestone.achieved && milestone.date && (
                <div className="mt-2 text-xs text-success-600">
                  Achieved on {new Date(milestone.date).toLocaleDateString()}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Achievement Celebration */}
      {recentMilestone && (
        <div className="fixed top-4 right-4 bg-success-500 text-white p-4 rounded-lg shadow-lg z-50 animate-bounce">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6" />
            <div>
              <div className="font-semibold">Milestone Reached! 🎉</div>
              <div className="text-sm">{recentMilestone.title}</div>
            </div>
          </div>
        </div>
      )}

      {/* Next Milestone */}
      {progress < 100 && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-primary-600" />
            <h4 className="font-semibold text-primary-900">Next Milestone</h4>
          </div>
          
          {(() => {
            const nextMilestone = milestones.find(m => !m.achieved)
            if (nextMilestone) {
              const remaining = nextMilestone.amount - currentFunding
              return (
                <div className="text-primary-800">
                  <div className="font-medium">{nextMilestone.title}</div>
                  <div className="text-sm">
                    Just ${remaining.toLocaleString()} more needed to reach the next milestone!
                  </div>
                </div>
              )
            }
            return null
          })()}
        </div>
      )}
    </div>
  )
}
