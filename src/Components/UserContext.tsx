import React, { createContext, useContext, useState } from "react";

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
interface UserInfo extends UserInfoProps {
  _id: string;
}
interface AuthContextType {
  signUp(userInfo: UserInfoProps): Promise<void>;
  login(loginInfo: LoginInfoProps): Promise<void>;
  user: UserInfo | {};
  setUser: React.Dispatch<React.SetStateAction<UserInfo | {}>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType>({
  signUp: async () => {},
  login: async () => {},
  user: {},
  setUser: () => {},
  loading: false,
  setLoading: () => {},
});
const UserContext = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<LoginInfoProps | UserInfoProps | {}>({});
  const [loading, setLoading] = useState<boolean>(false);
  const signUp = async (userInfo: UserInfoProps) => {
    try {
      const response = await fetch(
        "https://cipher-school-server-ecru.vercel.app/user/signup",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userInfo),
        }
      );
      const user = await response.json();
      setUser(user);
      setLoading(false);

      if (user._id) {
        localStorage.setItem("email", user.email);
        await Toast.fire({
          icon: "success",
          title: "User Registration successful",
          iconColor: "green",
        });
      } else {
        setLoading(false);
        await Toast.fire({
          icon: "error",
          title: `${user.message}`,
          iconColor: "red",
        });
      }
      return user;
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const login = async (loginInfo: LoginInfoProps) => {
    try {
      const response = await fetch(
        "https://cipher-school-server-ecru.vercel.app/user/login",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(loginInfo),
        }
      );
      const user = await response.json();
      setUser(user);
      setLoading(false);

      if (user._id) {
        localStorage.setItem("email", user.email);
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
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const authInfo = { signUp, login, user, setUser, loading, setLoading };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default UserContext;
