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
  makeStaticStyles,
  makeStyles,
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

const useStaticStyles = makeStaticStyles({
  body: {
    margin: 0,
  },
  ".wrapper": {
    display: "grid",
    backgroundColor: tokens.colorBrandBackground2,
    gridTemplateAreas: `
      "header header header"
      "sider content content"
      "sider footer footer"
    `,
    gridTemplateColumns: "1fr 3fr 3fr",
    gridTemplateRows: "auto 1fr auto",
    minHeight: "100vh",
    "@media(max-width: 456px)": {
      gridTemplateColumns: "1fr 5fr 5fr",
    },
  },
  ".header": {
    gridArea: "header",
    padding: "12px",
    zIndex: 3,
    backgroundColor: tokens.colorBrandBackground,
    display: "flex",
    justifyContent: "space-between",
    boxShadow: tokens.shadow8,
    "@media(max-width: 456px)": {
      padding: "8px",
    },
  },
  ".sider": {
    gridArea: "sider",
    padding: "12px",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    "@media(max-width: 456px)": {
      padding: "8px",
    },
  },
  ".content": {
    gridArea: "content",
    padding: "16px",
    marginTop: tokens.spacingVerticalS,
    marginBottom: tokens.spacingVerticalS,
    marginRight: tokens.spacingVerticalS,
    zIndex: 2,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow4,
    "@media(max-width: 456px)": {
      padding: "12px",
    },
  },
  ".footer": {
    gridArea: "footer",
    padding: "8px",
    marginBottom: tokens.spacingVerticalS,
    marginRight: tokens.spacingVerticalS,
    zIndex: 1,
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
  },
});

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
  tray: {
    display: "flex",
    flexDirection: "row",
    columnGap: tokens.spacingHorizontalL,
    alignItems: "center",
  },
});

const App = () => {
  useStaticStyles();
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
      <MessageBarGroup className={styles.messageBarGroup} animate="both">
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
        <div className="content">
          <Routes>
            <Route path="/" Component={Skeleton} />
            <Route path="/explore-post" element={<Explore />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/user-info" element={<UserInfo />} />
            <Route path="/post/:postId" element={<PostDetail />} />
          </Routes>
        </div>
        <footer className="footer">
          {t("tortolla")} ©2019-2024 {t("m1knight company name")}
        </footer>
      </div>
    </>
  );
};

export default App;
