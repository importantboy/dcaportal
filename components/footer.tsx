import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Department Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Department of Computer Application</h3>
            <p className="text-gray-300 mb-4">SVIET - Swami Vivekanand Institute of Engineering & Technology</p>
            <p className="text-gray-400 text-sm">
              Fostering innovation and excellence in computer applications since 2010.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="/courses" className="hover:text-blue-400 transition-colors">
                  Courses
                </a>
              </li>
              <li>
                <a href="/faculty" className="hover:text-blue-400 transition-colors">
                  Faculty
                </a>
              </li>
              <li>
                <a href="/notices" className="hover:text-blue-400 transition-colors">
                  Notices
                </a>
              </li>
              <li>
                <a href="/events" className="hover:text-blue-400 transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="/library" className="hover:text-blue-400 transition-colors">
                  Library
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Information</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Ramnagar, Banur, Punjab 140601</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <span className="text-sm">+91-1762-507000</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <span className="text-sm">dca@sviet.ac.in</span>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Mon-Fri: 9:00 AM - 5:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Department of Computer Application, SVIET. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
