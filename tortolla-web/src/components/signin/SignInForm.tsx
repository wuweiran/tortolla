import { useState } from "react";
import { UserSignInRequest, login } from "../../containers/user.ts";
import {
  Button,
  Checkbox,
  Field,
  Input,
  Spinner,
  makeStyles,
  Link,
} from "@fluentui/react-components";
import { useTranslation } from "react-i18next";
import { Person24Regular } from "@fluentui/react-icons";
import * as msg from "../../containers/message.ts";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
});

const SignInForm = (props: { onComplete: () => void }) => {
  const styles = useStyles();
  const { t } = useTranslation();

  const [isSigningIn, setSigningIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);

  const onFinish = (request: UserSignInRequest) => {
    setSigningIn(true);
    login(request)
      .then(() => {
        msg.info("Login succeeded!");
        props.onComplete();
      })
      .catch(() => {
        msg.info("Login failed");
      })
      .finally(() => {
        setSigningIn(false);
      });
  };

  return (
    <div className={styles.root}>
      <Field label={t("auth.USERNAME")}>
        <Input
          value={username}
          contentBefore={<Person24Regular />}
          onChange={(_, data) => {
            setUsername(data.value);
          }}
          placeholder="Username"
        />
      </Field>
      <Field label={t("auth.PASSWORD")}>
        <Input
          type="password"
          value={password}
          contentBefore={<Person24Regular />}
          onChange={(_, data) => {
            setPassword(data.value);
          }}
          placeholder="Password"
        />
      </Field>
      <Checkbox label={t("auth.REMEMBER")} />
      <Link href="/user/register">{t("auth.FORGOT")}</Link>
      <Button
        onClick={() =>
          onFinish({ username: username || "", password: password || "" })
        }
      >
        {isSigningIn ? <Spinner /> : t("auth.sign in")}
      </Button>
    </div>
  );
};

export default SignInForm;
