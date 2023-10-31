import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
} from "@fluentui/react-components";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SignInForm from "./SignInForm.tsx";
import SignUpForm from "./SignUpForm.tsx";

const SignIn = () => {
  const { t } = useTranslation();

  const [ open, setOpen ] = useState<boolean>(false);
  const [ mode, setMode ] = useState<"sign-in" | "sign-up">("sign-in");

  const onComplete = () => {
    setOpen(false);
    window.location.reload();
  };

  const onToggle = () => {
    if (mode === "sign-in") {
      setMode("sign-up");
    } else {
      setMode("sign-in");
    }
  };

  return (
    <Dialog open={open}>
      <DialogTrigger disableButtonEnhancement>
        <Button>
          {t("auth.sign in")} / {t("auth.register")}
        </Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>
            {mode === "sign-in" ? t("auth.sign in") : t("auth.register")}
          </DialogTitle>
          <DialogContent>
            {mode === "sign-in" ? (
              <SignInForm onComplete={onComplete} />
            ) : (
              <SignUpForm onComplete={onComplete} />
            )}
          </DialogContent>
          <DialogActions>
            <Button appearance="subtle" onClick={onToggle}>
              Already have an account? Sign in
            </Button>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Back</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default SignIn;