import { Persona } from "@fluentui/react-components";
import { loginUser } from "../containers/user.ts";

const Explore = () => {
  const user = loginUser();
  return (
    <Persona
      name={user.username}
      secondaryText={user.fullName}
      presence={{ status: "available" }}
    >
      {user && new Date(user.createdTime).toLocaleString()}
    </Persona>
  );
};

export default Explore;
