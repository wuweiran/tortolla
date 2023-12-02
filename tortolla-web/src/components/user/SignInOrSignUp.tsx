import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
  Link,
} from "@fluentui/react-components";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SignInForm from "./SignInForm.tsx";
import SignUpForm from "./SignUpForm.tsx";

const SignInOrSignUp = () => {
  const { t } = useTranslation();

  const [open, setOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");

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
    <Dialog open={open} onOpenChange={(_, data) => setOpen(data.open)}>
      <DialogTrigger disableButtonEnhancement>
        <Button>
          {t("user.sign in")} / {t("user.sign up")}
        </Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>
            {mode === "sign-in" ? t("user.sign in") : t("user.sign up")}
          </DialogTitle>
          <DialogContent>
            {mode === "sign-in" ? (
              <SignInForm onComplete={onComplete} />
            ) : (
              <SignUpForm onComplete={onComplete} />
            )}
          </DialogContent>
          <DialogActions>
            <Link appearance="subtle" onClick={onToggle}>
              {mode === "sign-in"
                ? t("user.sign-in.go to sign up")
                : t("user.sign-up.go to sign in")}
            </Link>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Back</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default SignInOrSignUp;
