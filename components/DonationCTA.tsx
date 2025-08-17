'use client'

import { Heart, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function DonationCTA() {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
        <Heart className="w-10 h-10 text-primary-600" />
      </div>
      
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Make a Difference Today
      </h2>
      
      <p className="text-lg text-gray-600 mb-8">
        Your donation helps us build sustainable communities and provide affordable housing 
        for families in need. Every dollar counts towards creating lasting positive change.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link 
          href="/donate" 
          className="btn-primary text-lg px-8 py-3 inline-flex items-center gap-2"
        >
          Donate Now
          <ArrowRight className="w-5 h-5" />
        </Link>
        
        <Link 
          href="/projects" 
          className="btn-secondary text-lg px-8 py-3"
        >
          See Our Impact
        </Link>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
        <div>
          <div className="font-semibold text-gray-900 mb-1">100% Transparent</div>
          <div>See exactly how your donation is used</div>
        </div>
        <div>
          <div className="font-semibold text-gray-900 mb-1">Tax Deductible</div>
          <div>All donations are tax deductible</div>
        </div>
        <div>
          <div className="font-semibold text-gray-900 mb-1">Secure & Safe</div>
          <div>Your information is protected</div>
        </div>
      </div>
    </div>
  )
}
