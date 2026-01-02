import React from "react";

//interface for props
interface AuthImagePatternProps {
  title: string;
  subtitle: string;
}

const AuthImagePattern: React.FC<AuthImagePatternProps> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-gray-500 mt-2">{subtitle}</p>
    </div>
  );
};

export default AuthImagePattern;
