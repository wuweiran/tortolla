import { useState } from "react";
import { UserSignInRequest, signIn } from "../../containers/user.ts";
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
import { Person24Regular, Key24Regular } from "@fluentui/react-icons";
import { useMessage } from "../../containers/message.ts";

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
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { success, warn } = useMessage();

  const onFinish = (request: UserSignInRequest) => {
    setSigningIn(true);
    signIn(request)
      .then(() => {
        success(t("message.sign in succeed"));
        props.onComplete();
      })
      .catch(() => {
        warn(t("message.sign in fail"));
      })
      .finally(() => {
        setSigningIn(false);
      });
  };

  return (
    <div className={styles.root}>
      <Field label={t("user.username")} required>
        <Input
          value={username}
          contentBefore={<Person24Regular />}
          onChange={(_, data) => {
            setUsername(data.value);
          }}
          placeholder="Username"
        />
      </Field>
      <Field label={t("user.password")} required>
        <Input
          type="password"
          value={password}
          contentBefore={<Key24Regular />}
          onChange={(_, data) => {
            setPassword(data.value);
          }}
          placeholder="Password"
        />
      </Field>
      <Checkbox label={t("user.sign-in.remember")} />
      <Link href="/user/register">{t("user.sign-in.forgot")}</Link>
      <Button
        onClick={() => onFinish({ username: username, password: password })}
      >
        {isSigningIn ? <Spinner /> : t("user.sign in")}
      </Button>
    </div>
  );
};

export default SignInForm;
