"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, CheckCircle, XCircle, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function VerifyEmailPage() {
  // In a real app, you would get this from the URL query params
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "success" | "expired">("pending")
  const [email, setEmail] = useState("user@example.com")
  const [resending, setResending] = useState(false)

  const handleResendVerification = () => {
    setResending(true)
    // Simulate API call
    setTimeout(() => {
      setResending(false)
    }, 2000)
  }

  const handleVerify = () => {
    // Simulate verification process
    setTimeout(() => {
      setVerificationStatus("success")
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-4">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2">
        <Calendar className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold">EventFlow</span>
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Email Verification</CardTitle>
          <CardDescription className="text-center">
            {verificationStatus === "pending" && "Verify your email address to complete your registration"}
            {verificationStatus === "success" && "Your email has been successfully verified"}
            {verificationStatus === "expired" && "Your verification link has expired"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4">
          {verificationStatus === "pending" && (
            <>
              <div className="rounded-full bg-primary/10 p-3">
                <RefreshCw className="h-8 w-8 text-primary animate-spin" />
              </div>
              <div className="text-center space-y-2">
                <p>We sent a verification link to:</p>
                <p className="font-medium">{email}</p>
                <p className="text-sm text-muted-foreground">
                  Click the link in the email to verify your account. If you don't see the email, check your spam
                  folder.
                </p>
              </div>
              <Button variant="outline" className="w-full" onClick={handleVerify}>
                I've already clicked the link
              </Button>
            </>
          )}

          {verificationStatus === "success" && (
            <>
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-center space-y-2">
                <p className="font-medium">Your email has been verified!</p>
                <p className="text-sm text-muted-foreground">
                  You can now access all features of your EventFlow account.
                </p>
              </div>
              <Link href="/signin" className="w-full">
                <Button className="w-full">Continue to Sign In</Button>
              </Link>
            </>
          )}

          {verificationStatus === "expired" && (
            <>
              <div className="rounded-full bg-red-100 p-3">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <div className="text-center space-y-2">
                <p className="font-medium">Verification link expired</p>
                <p className="text-sm text-muted-foreground">
                  The verification link has expired or is invalid. Please request a new verification link.
                </p>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          {verificationStatus !== "success" && (
            <div className="text-center text-sm">
              Didn't receive the email?{" "}
              <Button
                variant="link"
                className="p-0 h-auto font-normal"
                onClick={handleResendVerification}
                disabled={resending}
              >
                {resending ? "Sending..." : "Resend verification email"}
              </Button>
            </div>
          )}
          <div className="text-center text-sm">
            <Link href="/signin" className="text-primary hover:underline">
              Back to Sign In
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

