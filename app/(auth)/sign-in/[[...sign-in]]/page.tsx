import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="flex items-center w-full h-screen justify-center">
      <SignIn />
    </div>
  );
};

export default SignInPage;
