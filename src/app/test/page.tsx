import Image from "next/image";
import SocialAuth from "../../components/SocialAuth";

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Top Right Auth */}
      <div className="absolute top-4 right-4">
        <SocialAuth />
      </div>

      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🧪 Test Page - Social Login
            </h1>
            <p className="text-lg text-gray-600">
              Testing AWS Cognito with social identity providers
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Side - Info */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Social Authentication Test
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Google OAuth Integration</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Facebook Login</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Amazon Sign-In</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Email/Password Login</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">How to Test:</h3>
                <ol className="text-sm text-blue-800 space-y-1">
                  <li>1. Click any social login button in the top right</li>
                  <li>2. Complete authentication with the provider</li>
                  <li>3. You'll be redirected back here</li>
                  <li>4. Your profile will show in the top right</li>
                </ol>
              </div>
            </div>

            {/* Right Side - Visual */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center">
              <Image
                src="/next.svg"
                alt="Next.js logo"
                width={200}
                height={41}
                priority
                className="mb-8"
              />
              
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Powered by AWS Cognito
                </h3>
                <p className="text-gray-600 mb-6">
                  Secure, scalable authentication with social identity providers
                </p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="font-semibold text-gray-900">Secure</div>
                    <div className="text-gray-600">OAuth 2.0 & OpenID</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="font-semibold text-gray-900">Scalable</div>
                    <div className="text-gray-600">AWS Infrastructure</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="font-semibold text-gray-900">Fast</div>
                    <div className="text-gray-600">Instant Login</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="font-semibold text-gray-900">Free</div>
                    <div className="text-gray-600">50k Users</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="text-center mt-12">
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 bg-white text-gray-700 rounded-lg shadow hover:shadow-md transition-shadow border"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}