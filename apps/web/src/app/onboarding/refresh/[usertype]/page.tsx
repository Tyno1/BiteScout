"use client";

import { CheckCircle, LogIn, Sparkles } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/atoms";
import { Card } from "@/components/organisms";

export default function RefreshPage() {
  const { usertype } = useParams();
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  const getContent = () => {
    if (usertype === "owner") {
      return {
        icon: <Sparkles className="w-16 h-16 text-success" />,
        title: "Restaurant Created Successfully!",
        message: "Your restaurant has been created and is being set up. Please log in again to access your new restaurant dashboard and complete your profile setup.",
        buttonText: "Go to Login",
        details: [
          "Your restaurant profile is being configured",
          "You'll have full access to manage your restaurant",
          "Complete your profile setup after logging in"
        ]
      };
    } else if (usertype === "admin") {
      return {
        icon: <Sparkles className="w-16 h-16 text-success" />,
        title: "Access Granted Successfully!",
        message: "You have been granted access to the restaurant. Please log in again to access the restaurant dashboard and start managing your assigned restaurant.",
        buttonText: "Go to Login",
        details: [
          "Your access permissions are being configured",
          "You'll have access to restaurant management features",
          "Complete your profile setup after logging in"
        ]
      };
    } else {
      return {
        icon: <Sparkles className="w-16 h-16 text-success" />,
        title: "Setup Complete!",
        message: "Your account has been set up successfully. Please log in to access your dashboard.",
        buttonText: "Go to Login",
        details: [
          "Your account is ready to use",
          "Access your personalized dashboard",
          "Complete any remaining setup steps"
        ]
      };
    }
  };

  const content = getContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto text-center" padding="lg">
        <div className="space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            {content.icon}
          </div>

          {/* Title and Message */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-foreground">
              {content.title}
            </h1>
            <p className="text-medium text-muted-foreground leading-relaxed">
              {content.message}
            </p>
          </div>

          {/* Details List */}
          <div className="bg-background rounded-lg p-6 text-left">
            <h3 className="font-semibold text-foreground mb-4 text-center">
              What happens next?
            </h3>
            <ul className="space-y-3">
              {content.details.map((detail) => (
                <li key={detail} className="flex items-start gap-3 text-sm">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Button */}
          <div className="space-y-4 w-full">
            <Button
              variant="solid"
              size="sm"
              text={content.buttonText}
              onClick={handleLoginRedirect}
              IconBefore={<LogIn className="w-5 h-5" />}
              className="w-full sm:w-auto"
            />
            <p className="text-sm text-muted-foreground">
              You'll be redirected to the login page where you can sign in with your credentials.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}