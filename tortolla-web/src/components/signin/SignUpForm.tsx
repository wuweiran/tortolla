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
import { useMessage } from "../../containers/message.ts";

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
  const { info } = useMessage();

  const onFinish = (request: UserSignUpRequest) => {
    setSigningUp(true);
    signUp(request)
      .then(() => {
        info(t("user.sign-up.succeed"));
        props.onComplete();
      })
      .catch(() => {
        info(t("user.sign-up.fail"));
      })
      .finally(() => {
        setSigningUp(false);
      });
  };

  return (
    <div className={styles.root}>
      <Field label={t("user.username")}>
        <Input
          value={username}
          contentBefore={<Person24Regular />}
          onChange={(_, data) => {
            setUsername(data.value);
          }}
          placeholder="Username"
        />
      </Field>
      <Field label={t("user.password")}>
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
      <Field label={t("user.real name")}>
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
        {isSigningUp ? <Spinner /> : t("user.sign up")}
      </Button>
    </div>
  );
};

export default SignUpForm;
