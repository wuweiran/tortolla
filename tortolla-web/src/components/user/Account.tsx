import {
  Avatar,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components";
import { currentUser, signOut } from "../../containers/user.ts";
import SignInOrSignUp from "./SignInOrSignUp.tsx";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Account = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = currentUser();
  return (
    <div>
      {user ? (
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <Avatar name={user.username} badge={{ status: "available" }} />
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem onClick={() => navigate("/user-info")}>
                {t("user.user info")}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  signOut();
                  window.location.reload();
                }}
              >
                {t("user.sign out")}
              </MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      ) : (
        <SignInOrSignUp />
      )}
    </div>
  );
};

export default Account;
