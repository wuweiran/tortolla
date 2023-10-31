import { useState } from "react";
import { UserSignUpRequest, signUp } from "../../containers/user.ts";
import {
  Button,
  Field,
  Input,
  Spinner,
  makeStyles,
} from "@fluentui/react-components";
import { useTranslation } from "react-i18next";
import { Person24Regular, Key24Regular, Person24Filled } from "@fluentui/react-icons";
import * as msg from "../../containers/message.ts";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
});

const SignUpForm = (props: { onComplete: () => void }) => {
  const styles = useStyles();
  const { t } = useTranslation();

  const [isSigningUp, setSigningUp] = useState<boolean>(false);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [realName, setRealName] = useState<string | undefined>(undefined);

  const onFinish = (request: UserSignUpRequest) => {
    setSigningUp(true);
    signUp(request)
      .then(() => {
        msg.info("Sign-up succeeded!");
        props.onComplete();
      })
      .catch(() => {
        msg.info("Sign-up failed");
      })
      .finally(() => {
        setSigningUp(false);
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
          contentBefore={<Key24Regular />}
          onChange={(_, data) => {
            setPassword(data.value);
          }}
          placeholder="Password"
        />
      </Field>
      <Field label={t("auth.REALNAME")}>
        <Input
          value={realName}
          contentBefore={<Person24Filled />}
          onChange={(_, data) => {
            setRealName(data.value);
          }}
          placeholder="Real name"
        />
      </Field>
      <Button
        onClick={() =>
          onFinish({ username: username || "", password: password || "", realName: realName || "" })
        }
      >
        {isSigningUp ? <Spinner /> : t("auth.sign up")}
      </Button>
    </div>
  );
};

export default SignUpForm;
