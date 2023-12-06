import {
  Route,
  Link,
  Routes,
  useNavigate,
} from "react-router-dom";
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
  mergeClasses,
  tokens,
} from "@fluentui/react-components";
import Explore from "./components/post/Explore.tsx";
import CreatePost from "./components/post/CreatePost.tsx";
import UserInfo from "./components/user/UserInfo.tsx";
import { isSignedIn } from "./containers/user.ts";
import siteLogo from "./assets/site-logo.png";
import Language from "./components/Language.tsx";
import { useTranslation } from "react-i18next";
import { useMessage } from "./containers/message.ts";
import Account from "./components/user/Account.tsx";
import PostDetail from "./components/post/PostDetail.tsx";

const useStyles = makeStyles({
  messageBarGroup: {
    paddingBottom: tokens.spacingVerticalMNudge,
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalS,
  },
  header: {
    backgroundColor: tokens.colorBrandBackground,
    display: "flex",
    justifyContent: "space-between",
    boxShadow: tokens.shadow8,
    zIndex: 3,
  },
  sider: {
    backgroundColor: tokens.colorBrandBackground2,
    boxShadow: tokens.shadow4,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    zIndex: 2,
  },
  content: {
    backgroundColor: tokens.colorNeutralBackground1,
    zIndex: 0,
  },
  footer: {
    backgroundColor: tokens.colorNeutralBackground3,
    zIndex: 1,
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
  const navigate = useNavigate();
  const { messages, dismiss } = useMessage();

  return (
      <div className="wrapper">
        <header className={mergeClasses("header", styles.header)}>
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

        <aside className={mergeClasses("sider", styles.sider)}>
          <Button
            appearance="subtle"
            icon={<Home24Regular />}
            onClick={() => {
              navigate("/");
            }}
          >
            {t("nav.home")}
          </Button>
          <Button
            appearance="subtle" 
            icon={<CompassNorthwest24Regular />}
            onClick={() => {
              navigate("/explore-post");
            }}
          >
            {t("nav.explore post")}
          </Button>
          <Button
            appearance="subtle"
            icon={<Add24Regular />}
            disabled={!isSignedIn()}
            onClick={() => {
              navigate("/create-post");
            }}
          >
            {t("nav.create post")}
          </Button>
        </aside>
        <div className={mergeClasses("content", styles.content)}>
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
            <Route path="/post/:postId" element={<PostDetail />} />
          </Routes>
        </div>
        <footer className={mergeClasses("footer", styles.footer)}>
          {t("tortolla")} ©2019-2023 {t("m1knight company name")}
        </footer>
      </div>
  );
};

export default App;
