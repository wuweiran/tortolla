import { Globe24Regular } from "@fluentui/react-icons";
import { Select, SelectOnChangeData, makeStyles, tokens } from "@fluentui/react-components";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalS,
  },
});

const Language = () => {
  const styles = useStyles();
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    i18n.language
  );

  const onLanguageSelect = (_: unknown, data: SelectOnChangeData) => {
    const selected = data.value;
    void i18n.changeLanguage(selected).then(() => {
      setSelectedLanguage(selected);
    });
  };

  return (
    <div className={styles.root}>
      <Globe24Regular />
      <Select
        value={selectedLanguage}
        onChange={onLanguageSelect}
        title={t("select lang")}
      >
        <option value="en">{t("lang.en")}</option>
        <option value="zh">{t("lang.zh")}</option>
      </Select>
    </div>
  );
};

export default Language;
