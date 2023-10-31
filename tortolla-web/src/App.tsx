import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import {
  Home24Regular,
  News24Regular,
  CompassNorthwest24Regular,
  Add24Regular,
  Person24Regular,
  Info24Regular,
  Star24Regular,
  SignOut24Regular,
  DismissRegular,
} from "@fluentui/react-icons";
import {
  Button,
  Image,
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarGroup,
  MessageBarTitle,
  Skeleton,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import SignIn from "./components/signin/SignIn.tsx";
import Home from "./components/Home.tsx";
import Explore from "./components/Explore.tsx";
import CreatePost from "./components/post/CreatePost.tsx";
import Latest from "./components/Latest.tsx";
import UserInfo from "./components/UserInfo.tsx";
import { isLogin, loginUser, logout } from "./containers/user.ts";
import siteLogo from "./assets/site-logo.png";
import Language from "./components/Language.tsx";
import { useTranslation } from "react-i18next";
import * as msg from "./containers/message.ts";

const useStyles = makeStyles({
  messageBarGroup: {
    paddingLeft: tokens.spacingHorizontalMNudge,
    paddingRight: tokens.spacingHorizontalMNudge,
    paddingTop: tokens.spacingVerticalMNudge,
    paddingBottom: tokens.spacingVerticalMNudge,
    display: "flex",
    flexDirection: "column",
    marginTop: "10px",
    height: "300px",
  },
});

const App = () => {
  const styles = useStyles();
  const { t } = useTranslation();

  const handleSelect = (e) => {
    switch (e.key) {
      case "logout":
        logout();
        window.location.reload();
        break;
      default:
    }
  };

  return (
    <BrowserRouter>
      <div className="wrapper">
        <header className="header">
          <a href="/home" title={t("nav.HOME")}>
            <Image
              src={siteLogo}
              alt="Site Logo"
              style={{
                height: "48px",
                margin: "8px 0 8px 0",
                float: "left",
              }}
            />
            <Language />
          </a>
        </header>

        <aside className="sider">
          <Menu
            theme="light"
            mode="inline"
            style={{ lineHeight: "64px" }}
            onSelect={handleSelect}
          >
            {isLogin() ? (
              <Menu.SubMenu
                title={loginUser().username}
                icon={<Person24Regular />}
              >
                <Menu.Item>
                  <Link to={"/user/info"}>
                    <Info24Regular />
                    {t("nav.user.INFO")}
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to={"/user/fav"}>
                    <Star24Regular />
                    {t("nav.user.FAV")}
                  </Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout" icon={<SignOut24Regular />}>
                  {t("nav.user.LOGOUT")}
                </Menu.Item>
              </Menu.SubMenu>
            ) : (
              <Menu.Item>
                <SignIn />
              </Menu.Item>
            )}
            <Menu.Item key="/home">
              <Link to={"/home"}>
                <Home24Regular />
                {t("nav.HOME")}
              </Link>
            </Menu.Item>
            <Menu.Item key="/post/explore" disabled={true}>
              <Link to={"/post/explore"}>
                <CompassNorthwest24Regular />
                {t("nav.EXPLORE")}
              </Link>
            </Menu.Item>
            <Menu.Item key="/post/latest">
              <Link to={"/post/latest"}>
                <News24Regular />
                {t("nav.LATEST")}
              </Link>
            </Menu.Item>
            <Menu.Item key={"/post/create"}>
              <Link to={"/post/create"}>
                <Add24Regular />
                {t("nav.CREATE_POST")}
              </Link>
            </Menu.Item>
          </Menu>
        </aside>
        <div className="content">
          <MessageBarGroup className={styles.messageBarGroup}>
            {msg.messages.map(({ intent, message, id }) => (
              <MessageBar key={id} intent={intent}>
                <MessageBarBody>
                  <MessageBarTitle>{t(`message.${intent}`)}</MessageBarTitle>
                  {message}
                </MessageBarBody>
                <MessageBarActions
                  containerAction={
                    <Button
                      onClick={() => msg.dismiss(id)}
                      aria-label="dismiss"
                      appearance="transparent"
                      icon={<DismissRegular />}
                    />
                  }
                />
              </MessageBar>
            ))}
          </MessageBarGroup>
          <Routes>
            <Route path="/" Component={Skeleton} />
            <Route path="/home" Component={Home} />
            <Route path="/post/explore" Component={Explore} />
            <Route path="/post/latest" Component={Latest} />
            <Route path="/post/create" Component={CreatePost} />
            <Route path="/user/info" Component={UserInfo} />
          </Routes>
        </div>
        <footer className="footer">
          Tortolla ©2019-2023 by M1Kight Technology
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
