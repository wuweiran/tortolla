import {
  Image,
  LargeTitle,
  makeStyles,
  Subtitle2,
  tokens,
} from "@fluentui/react-components";
import logo from "../assets/logo.svg";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  banner: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
});

const Home = () => {
  const styles = useStyles();
  const { t } = useTranslation();

  return (
    <div className={styles.root}>
      <div className={styles.banner}>
        <Image
          shape="circular"
          src={logo}
          height={100}
          width={100}
        />
        <LargeTitle>{t("home.title")}</LargeTitle>
      </div>
      <Subtitle2>{t("home.description")}</Subtitle2>
    </div>
  );
};

export default Home;
