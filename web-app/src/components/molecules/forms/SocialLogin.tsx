import Button from "@/components/atoms/buttons/Button";

interface LoginProp {
  loginType: string;
}

export default function SocialLogin({ loginType }: LoginProp) {
  return (
    <form className="flex flex-col gap-2 w-full">
      <Button
        variant="solid"
        color="white"
        name="action"
        type="submit"
        value="google"
        text={`${loginType} with Google`}
        className="font-bold"
      />
      <Button
        variant="solid"
        color="white"
        name="action"
        type="submit"
        value="github"
        text={`${loginType} with GitHub`}
        className="font-bold"
      />
    </form>
  );
}
