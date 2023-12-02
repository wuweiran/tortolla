import { Persona } from "@fluentui/react-components";
import { currentUser } from "../containers/user.ts";

const Explore = () => {
  const user = currentUser();
  return (
    user && <Persona
      name={user.username}
      secondaryText={user.fullName}
      presence={{ status: "available" }}
    >
      {user && new Date(user.createdTime).toLocaleString()}
    </Persona>
  );
};

export default Explore;
