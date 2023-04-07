import React, { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-right",
  iconColor: "blue",
  width: "22rem",
  background: "black",
  color: "white",
  padding: "5px",
  customClass: {
    popup: "colored-toast",
  },
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

interface UserInfoProps {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
interface LoginInfoProps {
  email: string;
  password: string;
}
interface UserInfro extends UserInfoProps {
  _id: string;
}
interface AuthContextType {
  signUp(userInfo: UserInfoProps): Promise<void>;
  login(loginInfo: LoginInfoProps): Promise<void>;
  user: UserInfro | {};
  setUser: React.Dispatch<React.SetStateAction<UserInfro | {}>>;
}

export const AuthContext = createContext<AuthContextType>({
  signUp: async () => {},
  login: async () => {},
  user: {},
  setUser: () => {},
});
const UserContext = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<LoginInfoProps | UserInfoProps | {}>({});
  const [loading, setLoading] = useState<boolean>(true);
  const signUp = async (userInfo: UserInfoProps) => {
    try {
      const response = await fetch("http://localhost:8000/user/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      const user = await response.json();
      setUser(user);
      localStorage.setItem("email", user.email);
      if (user._id) {
        await Toast.fire({
          icon: "success",
          title: "User Registration successful",
          iconColor: "green",
        });
      } else {
        await Toast.fire({
          icon: "error",
          title: `${user.message}`,
          iconColor: "red",
        });
      }
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };

  const login = async (loginInfo: LoginInfoProps) => {
    try {
      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const user = await response.json();
      setUser(user);
      localStorage.setItem("email", user.email);
      if (user._id) {
        await Toast.fire({
          icon: "success",
          title: "Sucessfully loggedIn",
          iconColor: "green",
        });
      } else {
        await Toast.fire({
          icon: "error",
          title: `${user.message}`,
          iconColor: "red",
        });
      }
      console.log(user);
    } catch (err) {}
  };
  const email = localStorage.getItem("email");
  console.log(email);
  console.log(user);
  const authInfo = { signUp, login, user, setUser };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default UserContext;
