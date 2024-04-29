import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="flex items-center w-full h-screen justify-center">
      <SignUp />
    </div>
  );
};
export default SignUpPage;
