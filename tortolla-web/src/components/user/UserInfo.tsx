import {
  Field,
  Persona,
  Text,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { currentUser } from "../../containers/user.ts";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalS,
  },
});

const Explore = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const user = currentUser();
  return (
    user && (
      <div className={styles.root}>
        <Persona
          name={user.username}
          secondaryText={user.fullName}
          size="extra-large"
          presence={{ status: "available" }}
        />
        <Field label={t("user.id")}>
          <Text>{user.id}</Text>
        </Field>
        <Field label={t("user.created time")}>
          <Text>{new Date(user.createdTime).toLocaleString()}</Text>
        </Field>
      </div>
    )
  );
};

export default Explore;
