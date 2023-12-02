import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import {
  Home24Regular,
  CompassNorthwest24Regular,
  Add24Regular,
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
import Explore from "./components/Explore.tsx";
import CreatePost from "./components/post/CreatePost.tsx";
import UserInfo from "./components/UserInfo.tsx";
import { isSignedIn } from "./containers/user.ts";
import siteLogo from "./assets/site-logo.png";
import Language from "./components/Language.tsx";
import { useTranslation } from "react-i18next";
import { useMessage } from "./containers/message.ts";
import Account from "./components/user/Account.tsx";

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
  tray: {
    display: "flex",
    flexDirection: "row",
    columnGap: tokens.spacingHorizontalL,
    alignItems: "center",
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
          <div className={styles.tray}>
            <Account />
            <Language />
          </div>
        </header>

        <aside className="sider">
          <Button appearance="subtle" icon={<Home24Regular />}>
            <Link to={"/"}>{t("nav.home")}</Link>
          </Button>
          <Button appearance="subtle" icon={<CompassNorthwest24Regular />}>
            <Link to={"/explore-post"}>{t("nav.explore post")}</Link>
          </Button>
          <Button
            appearance="subtle"
            icon={<Add24Regular />}
            disabled={!isSignedIn()}
          >
            <Link to={"/create-post"}>{t("nav.create post")}</Link>
          </Button>
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
          Tortolla ©2019-2023 by M1Knight Technology
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
