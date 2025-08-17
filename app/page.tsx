import Link from 'next/link'
import { Building2, MapPin, Heart, TrendingUp } from 'lucide-react'
import CitySelector from '@/components/CitySelector'
import FeaturedProjects from '@/components/FeaturedProjects'
import DonationCTA from '@/components/DonationCTA'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              Building Communities Through Real Estate
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              BEAM Real Estate NGO transforms communities by developing sustainable housing 
              and commercial spaces that create lasting impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/projects" className="btn-primary text-lg px-8 py-3">
                View Projects
              </Link>
              <Link href="/donate" className="btn-secondary text-lg px-8 py-3">
                Make a Donation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* City Selector */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your City
            </h2>
            <p className="text-lg text-gray-600">
              Select a city to explore our projects and make an impact in your community
            </p>
          </div>
          <CitySelector />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">25+</h3>
              <p className="text-gray-600">Projects Completed</p>
            </div>
            <div className="text-center">
              <div className="bg-success-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-success-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">$2.5M+</h3>
              <p className="text-gray-600">Funds Raised</p>
            </div>
            <div className="text-center">
              <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">3</h3>
              <p className="text-gray-600">Cities Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600">
              See how your donations are making a difference
            </p>
          </div>
          <FeaturedProjects />
        </div>
      </section>

      {/* Donation CTA */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <DonationCTA />
        </div>
      </section>
    </div>
  )
}
