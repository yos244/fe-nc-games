import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";


export const LoggedUser = () => {
    const { username, setUsername } = useContext(UserContext);
    return (
        <p className='top-stuff'>Logged in as: {username}</p>
    );
  };