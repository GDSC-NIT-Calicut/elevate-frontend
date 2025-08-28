"use client";

import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import { GoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestAuthPage() {
  const { user, login, logout, loading, isAuthenticated } = useGoogleAuth();

  const handleLoginSuccess = async (res: any) => {
    console.log("Google login success:", res);
    if (res.credential) {
      const result = await login(res.credential);
      console.log("Login result:", result);
    }
  };

  const handleLoginError = (error: any) => {
    console.error("Google login error:", error);
  };

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <div className="max-w-md mx-auto">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-green-900">
              Google OAuth Test
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-green-700 mb-4">
                Test the Google OAuth authentication
              </p>
            </div>

            {loading && (
              <div className="text-center">
                <div className="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-green-700">Authenticating...</p>
              </div>
            )}

            {isAuthenticated && user ? (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-medium text-green-800 mb-2">Authenticated User:</h3>
                  <div className="text-sm text-green-700 space-y-1">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    {user.roll_number && <p><strong>Roll Number:</strong> {user.roll_number}</p>}
                    {user.department && <p><strong>Department:</strong> {user.department}</p>}
                    {user.programme && <p><strong>Programme:</strong> {user.programme}</p>}
                  </div>
                </div>
                
                <Button 
                  onClick={logout}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={() => {console.log("Google login error")}}
                    theme="outline"
                    size="large"
                    text="signin_with"
                    shape="rectangular"
                    locale="en"
                    useOneTap={false}
                    context="signin"
                  />
                </div>
                
                <div className="text-center">
                  <p className="text-xs text-green-600">
                    Use your NITC email address to test
                  </p>
                </div>
              </div>
            )}

            <div className="border-t pt-4">
              <h4 className="font-medium text-green-800 mb-2">Environment Variables:</h4>
              <div className="text-xs text-green-600 space-y-1">
                <p><strong>NEXT_PUBLIC_GOOGLE_CLIENT_ID:</strong> {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ? 'Set' : 'Not set'}</p>
                <p><strong>NEXT_PUBLIC_API_URL:</strong> {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000 (fallback)'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
