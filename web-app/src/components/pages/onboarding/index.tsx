import { Outlet } from "react-router";

const OnboardingLayout = () => {
  return (
    <div className="w-[100vw] h-[100vh]">
      <p>This</p> <Outlet />
    </div>
  );
};
export default OnboardingLayout;
