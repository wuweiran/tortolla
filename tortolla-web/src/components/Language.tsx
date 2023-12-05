import { Globe24Regular } from "@fluentui/react-icons";
import {
  Menu,
  MenuButton,
  MenuItemRadio,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const Language = () => {
  const { t, i18n } = useTranslation();

  const [checkedValues, setCheckedValues] = useState<Record<string, string[]>>({
    lang: [i18n.language],
  });

  return (
    <Menu
      checkedValues={checkedValues}
      onCheckedValueChange={(_, { name, checkedItems }) => {
        const selected = checkedItems[0];
        void i18n.changeLanguage(selected).then(() => {
          setCheckedValues({ [name]: [selected] });
        });
      }}
    >
      <MenuTrigger disableButtonEnhancement>
        <MenuButton shape="circular" icon={<Globe24Regular />} size="medium" />
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItemRadio value="en" name="lang">
            {t("lang.en")}
          </MenuItemRadio>
          <MenuItemRadio value="zh" name="lang">
            {t("lang.zh")}
          </MenuItemRadio>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

export default Language;
