import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import {
  Home24Regular,
  CompassNorthwest24Regular,
  Add24Regular,
  Person24Regular,
  DismissRegular,
  SignOut24Regular
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
import Explore from "./components/Explore.tsx";
import CreatePost from "./components/post/CreatePost.tsx";
import UserInfo from "./components/UserInfo.tsx";
import { isSignedIn, signOut } from "./containers/user.ts";
import siteLogo from "./assets/site-logo.png";
import Language from "./components/Language.tsx";
import { useTranslation } from "react-i18next";
import { useMessage } from "./containers/message.ts";

const useStyles = makeStyles({
  messageBarGroup: {
    paddingLeft: tokens.spacingHorizontalMNudge,
    paddingRight: tokens.spacingHorizontalMNudge,
    paddingTop: tokens.spacingVerticalMNudge,
    paddingBottom: tokens.spacingVerticalMNudge,
    display: "flex",
    flexDirection: "column",
    marginTop: "10px",
  },
  selectLanguage: {
    display: "flex",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalS,
  },
});

const App = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const { messages, dismiss } = useMessage();

  return (
    <BrowserRouter>
      <div className="wrapper">
        <header className="header">
          <Link to={"/"}>
            <Image
              src={siteLogo}
              alt="Site Logo"
              style={{
                height: "48px",
                margin: "8px 0 8px 0",
                float: "left",
              }}
            />
          </Link>
          <Language className={styles.selectLanguage} />
        </header>

        <aside className="sider">
          <Button icon={<Home24Regular />}>
            <Link to={"/"}>{t("nav.home")}</Link>
          </Button>
          {isSignedIn() ? (
            <Button icon={<Person24Regular />}>
              <Link to={"/user-info"}>{t("nav.user info")}</Link>
            </Button>
          ) : (
            <SignIn />
          )}
          <Button icon={<CompassNorthwest24Regular />}>
            <Link to={"/explore-post"}>{t("nav.explore post")}</Link>
          </Button>
          <Button icon={<Add24Regular />} disabled={!isSignedIn()}>
            <Link to={"/create-post"}>{t("nav.create post")}</Link>
          </Button>
          {isSignedIn() && (
            <Button
              icon={<SignOut24Regular />}
              onClick={() => {
                signOut();
                window.location.reload();
              }}
            >
              {t("user.sign out")}
            </Button>
          )}
        </aside>
        <div className="content">
          <MessageBarGroup className={styles.messageBarGroup}>
            {messages.map(({ intent, message, id }) => (
              <MessageBar key={id} intent={intent}>
                <MessageBarBody>
                  <MessageBarTitle>{t(`message.${intent}`)}</MessageBarTitle>
                  {message}
                </MessageBarBody>
                <MessageBarActions
                  containerAction={
                    <Button
                      onClick={() => dismiss(id)}
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
            <Route path="/explore-post" element={<Explore />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/user-info" element={<UserInfo />} />
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
