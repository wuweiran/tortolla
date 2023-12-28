import { Route, Link, Routes, useNavigate } from "react-router-dom";
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
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  messageBarGroup: {
    position: "fixed",
    top: tokens.spacingVerticalM,
    left: "50%",
    transform: "translateX(-50%)",
    width: `min(calc(100vw - ${tokens.spacingHorizontalS}), 500px)`,
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalS,
    zIndex: 4,
  },
  wrapper: {
    backgroundColor: tokens.colorBrandBackground2,
  },
  header: {
    backgroundColor: tokens.colorBrandBackground,
    display: "flex",
    justifyContent: "space-between",
    boxShadow: tokens.shadow8,
    zIndex: 3,
  },
  sider: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    zIndex: 1,
  },
  content: {
    backgroundColor: tokens.colorNeutralBackground1,
    zIndex: 2,
    borderTopLeftRadius: tokens.borderRadiusMedium,
    borderTopRightRadius: tokens.borderRadiusMedium,
    borderBottomLeftRadius: tokens.borderRadiusMedium,
    borderBottomRightRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow4,
    marginTop: tokens.spacingVerticalS,
    marginBottom: tokens.spacingVerticalS,
    marginRight: tokens.spacingVerticalS,
  },
  footer: {
    backgroundColor: tokens.colorNeutralBackground3,
    zIndex: 1,
    borderTopLeftRadius: tokens.borderRadiusMedium,
    borderTopRightRadius: tokens.borderRadiusMedium,
    borderBottomLeftRadius: tokens.borderRadiusMedium,
    borderBottomRightRadius: tokens.borderRadiusMedium,
    marginBottom: tokens.spacingVerticalS,
    marginRight: tokens.spacingVerticalS,
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
  const media = window.matchMedia("(max-width: 456px)");
  const [isMobile, setMobile] = useState<boolean>(media.matches);

  useEffect(() => {
    media.addEventListener("change", (event) => {
      setMobile(event.matches);
    });
  });

  return (
    <>
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
      <div className={mergeClasses("wrapper", styles.wrapper)}>
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
            title={t("nav.home")}
            onClick={() => {
              navigate("/");
            }}
          >
            {!isMobile && t("nav.home")}
          </Button>
          <Button
            appearance="subtle"
            icon={<CompassNorthwest24Regular />}
            title={t("nav.explore post")}
            onClick={() => {
              navigate("/explore-post");
            }}
          >
            {!isMobile && t("nav.explore post")}
          </Button>
          <Button
            appearance="subtle"
            icon={<Add24Regular />}
            disabled={!isSignedIn()}
            title={t("nav.create post")}
            onClick={() => {
              navigate("/create-post");
            }}
          >
            {!isMobile && t("nav.create post")}
          </Button>
        </aside>
        <div className={mergeClasses("content", styles.content)}>
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
    </>
  );
};

export default App;
