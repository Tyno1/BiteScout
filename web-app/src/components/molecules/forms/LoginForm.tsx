
import React, { useState } from "react";

import {
  AlertCircle,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircleIcon,
} from "lucide-react";
import Input from "@/components/atoms/inputs/Input";
import Button from "@/components/atoms/buttons/Button";
import { useNavigate } from "react-router";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const NavTo = (route: string) => {
    navigate(route);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      // const response: any = await doCrednentialLogin(formData);
      const response = {
        id: "",
        error: {
          message: "Invalid credentials",
        },
      };

      if (!!response?.error) {
        setError(response.error.message);
      } else {
        setLoading(false);
        console.log("Login successful");
        NavTo("/login/loading");
      }
    } catch (error) {
      console.log(error);
      setError("Check your credentials");
      setLoading(false);
    }
  };

  return (
    <form
      action="post"
      className="w-full flex flex-col space-y-4"
      onSubmit={handleSubmit}
    >
      {error && (
        <div className="flex gap-2 items-center">
          <AlertCircleIcon size={20} className="text-red" />
          <div className="text-red text-sm">
            Check your credentials and try again.
          </div>
        </div>
      )}
      <Input
        required
        id="email"
        name="email"
        label="Email"
        type="email"
        icon={<Mail />}
        placeholder="Email"
        fullWidth={true}
        iconStyle="text-red"
      />
      <Input
        required
        id="password"
        name="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        icon={<Lock />}
        placeholder="Password"
        fullWidth={true}
        iconStyle="text-red"
        rightButton={showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
        rightButtonStyle="text-gray-700"
        rightButtonOnClick={() => setShowPassword(!showPassword)}
      />

      <Button
        variant="solid"
        color="primary"
        type="submit"
        text={loading ? "Loading..." : " Credential Login"}
      />
    </form>
  );
}
